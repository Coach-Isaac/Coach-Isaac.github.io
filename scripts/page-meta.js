// Runs after `vite build` (see package.json). Writes one HTML file per page and language
// (scripts/site-pages.js), each with its own <html lang>, <title>, description, share tags,
// canonical, hreflang links and JSON-LD, plus sitemap.xml. scripts/prerender.js then fills the body.
// Why separate files: GitHub Pages has no file for /coaches/isaac etc., so it answered with 404.html
// and HTTP 404; a file such as coaches/isaac.html is served at /coaches/isaac with HTTP 200.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { coaches, BOOKING_URL } from '../src/data/coaches.js'
import { LOCALES, DEFAULT_LOCALE, localePath } from '../src/locale-paths.js'
import { SITE, PAGES, pageFiles } from './site-pages.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
// DIST_DIR lets a check build go elsewhere without touching the preview's dist/.
const dist = resolve(root, process.env.DIST_DIR || 'dist')

const messages = Object.fromEntries(
  LOCALES.map((l) => [l, JSON.parse(readFileSync(join(root, `src/locales/${l}.json`), 'utf8'))]),
)
const OG_LOCALE = { 'zh-TW': 'zh_TW', 'zh-CN': 'zh_CN', en: 'en_US' }
// Punctuation for the descriptions assembled below.
const PUNCT = {
  'zh-TW': { colon: '：', list: '、', stop: '。', bar: '｜' },
  'zh-CN': { colon: '：', list: '、', stop: '。', bar: '｜' },
  en: { colon: ': ', list: ', ', stop: '. ', bar: ' | ' },
}

// Reads a locale string. vue-i18n syntax ({name}, @:link, plural |) would leak into previews, so it
// is rejected, except the escaped literal {'|'} (English titles) and placeholders filled via `vars`.
function text(locale, key, vars) {
  const value = key.split('.').reduce((node, part) => node?.[part], messages[locale])
  if (typeof value !== 'string' || !value.trim()) throw new Error(`page-meta: ${locale} text "${key}" is missing`)
  // Check what is left once the allowed forms are removed, then substitute.
  const placeholders = vars ? Object.keys(vars).map((name) => `{${name}}`) : []
  const rest = placeholders.reduce((s, ph) => s.split(ph).join(''), value.replace(/\{'\|'\}/g, ''))
  if (/[{}@|]/.test(rest)) {
    throw new Error(`page-meta: ${locale} text "${key}" uses vue-i18n syntax, which previews cannot show`)
  }
  let out = value.replace(/\{'\|'\}/g, '|')
  if (vars) out = out.replace(/\{(\w+)\}/g, (m, name) => (name in vars ? vars[name] : m))
  return out.replace(/\n/g, ' ')
}

const pageTitle = (locale, name) => text(locale, 'site.page_title', { page: name })
const coachName = (locale, c) => text(locale, `${c.prefix}.name`)
const coachPageName = (locale, c) => text(locale, 'site.coach_page_name', { name: coachName(locale, c), title: text(locale, `${c.prefix}.title`) })
const url = (path, locale) => SITE + localePath(path, locale)

function headFor(page, locale) {
  const p = PUNCT[locale]
  switch (page.kind) {
    case 'home':
      return {
        title: text(locale, 'site.home_title'),
        description: text(locale, 'site.home_description'),
        ogTitle: text(locale, 'site.og_title'),
        ogDescription: text(locale, 'site.og_description'),
      }
    case 'coaches':
      return {
        title: pageTitle(locale, text(locale, 'coaches_index.title')),
        description: `${text(locale, 'coaches_index.subtitle')}${p.colon}${coaches.map((c) => coachName(locale, c)).join(p.list)}${p.stop}${text(locale, 'profile.cta_desc')}`,
      }
    case 'coach': {
      const c = page.coach
      return {
        title: pageTitle(locale, coachPageName(locale, c)),
        description: `${text(locale, `${c.prefix}.title`)}${p.bar}${c.tags.map((tag) => text(locale, `${c.prefix}.${tag}`)).join(p.list)}${p.stop}${text(locale, `${c.prefix}.intro`)}`,
      }
    }
    case 'services':
      return { title: pageTitle(locale, text(locale, 'site.services_page_title')), description: text(locale, 'site.services_description') }
    case 'privacy':
      return { title: pageTitle(locale, text(locale, 'privacy.title')), description: text(locale, 'privacy.intro') }
    default:
      throw new Error(`page-meta: unknown page kind ${page.kind}`)
  }
}

// One graph per page: the brand (Organization), the site, the coaching service and the coaches,
// all with stable @ids so every page describes the same entities, plus this page itself.
function jsonLd(page, locale, head) {
  const ORG = `${SITE}/#organization`
  const WEBSITE = `${SITE}/#website`
  const SERVICE = `${SITE}/#service`
  const personId = (c) => `${SITE}${c.route}#person`
  const pageUrl = url(page.path, locale)
  const persons = coaches.map((c) => ({
    '@type': 'Person',
    '@id': personId(c),
    name: c.englishName,
    ...(c.chineseName ? { alternateName: c.chineseName } : {}),
    jobTitle: text(locale, `${c.prefix}.title`),
    description: text(locale, `${c.prefix}.intro`),
    url: url(c.route, locale),
    memberOf: { '@id': ORG },
    sameAs: [c.social.url],
  }))
  const pageNode = {
    '@type': page.kind === 'coach' ? 'ProfilePage' : 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: head.title,
    description: head.description,
    inLanguage: locale,
    isPartOf: { '@id': WEBSITE },
    ...(page.kind === 'coach' ? { mainEntity: { '@id': personId(page.coach) } } : {}),
    ...(page.kind === 'home' ? { about: { '@id': ORG } } : {}),
    ...(page.kind === 'services' ? { mainEntity: { '@id': SERVICE } } : {}),
  }
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE,
        url: `${SITE}/`,
        name: 'Stepflect',
        alternateName: ['Stepflect 進一程', '進一程'],
        inLanguage: LOCALES,
        publisher: { '@id': ORG },
      },
      {
        '@type': 'Organization',
        '@id': ORG,
        name: 'Stepflect',
        alternateName: ['Stepflect 進一程', '進一程', '进一程'],
        url: `${SITE}/`,
        logo: { '@type': 'ImageObject', url: `${SITE}/icon-192.png`, width: 192, height: 192 },
        description: text(locale, 'site.home_description'),
        member: coaches.map((c) => ({ '@id': personId(c) })),
      },
      {
        '@type': 'Service',
        '@id': SERVICE,
        name: text(locale, 'site.service_name'),
        serviceType: 'Coaching',
        description: text(locale, 'site.og_description'),
        provider: { '@id': ORG },
        url: url('/services', locale),
        // availableLanguage belongs to the channel; schema.org does not define it on Service.
        availableChannel: { '@type': 'ServiceChannel', serviceUrl: BOOKING_URL, availableLanguage: ['zh', 'en'] },
      },
      ...persons,
      pageNode,
    ],
  }
}

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Replace exactly one match; anything else means index.html changed shape, so stop the build.
function replaceOnce(html, pattern, replacement, label) {
  const count = html.match(new RegExp(pattern.source, 'g'))?.length ?? 0
  if (count !== 1) throw new Error(`page-meta: expected one ${label} in index.html, found ${count}`)
  return html.replace(pattern, replacement)
}

function setMeta(html, attr, name, value) {
  const pattern = new RegExp(`(<meta ${attr}="${name}" content=")[^"]*(")`)
  return replaceOnce(html, pattern, (_, start, end) => `${start}${escapeHtml(value)}${end}`, `${name} tag`)
}

const template = readFileSync(join(dist, 'index.html'), 'utf8')
if (template.includes('rel="canonical"')) throw new Error('page-meta: index.html already has a canonical link')

for (const { page, locale, file, alias } of pageFiles()) {
  const head = headFor(page, locale)
  const pageUrl = url(page.path, locale)
  let html = template
  html = replaceOnce(html, /<html lang="[^"]*">/, () => `<html lang="${locale}">`, '<html lang>')
  html = replaceOnce(html, /<title>[^<]*<\/title>/, () => `<title>${escapeHtml(head.title)}</title>`, '<title>')
  html = setMeta(html, 'name', 'description', head.description)
  html = setMeta(html, 'property', 'og:site_name', text(locale, 'site.brand'))
  html = setMeta(html, 'property', 'og:title', head.ogTitle ?? head.title)
  html = setMeta(html, 'property', 'og:description', head.ogDescription ?? head.description)
  html = setMeta(html, 'property', 'og:url', pageUrl)
  html = setMeta(html, 'property', 'og:image:alt', text(locale, 'site.og_image_alt'))
  html = setMeta(html, 'name', 'twitter:title', head.ogTitle ?? head.title)
  html = setMeta(html, 'name', 'twitter:description', head.ogDescription ?? head.description)
  html = setMeta(html, 'name', 'twitter:image:alt', text(locale, 'site.og_image_alt'))
  html = replaceOnce(
    html,
    /<meta property="og:locale" content="[^"]*" \/>/,
    () => [`<meta property="og:locale" content="${OG_LOCALE[locale]}" />`, ...LOCALES.filter((l) => l !== locale).map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}" />`)].join('\n    '),
    'og:locale tag',
  )
  html = replaceOnce(
    html,
    /<script type="application\/ld\+json">[^<]*<\/script>/,
    () => `<script type="application/ld+json">${JSON.stringify(jsonLd(page, locale, head)).replace(/</g, '\\u003c')}</script>`,
    'JSON-LD',
  )
  // Every language version lists all of them (itself included), plus x-default for everyone else.
  const links = [
    ...LOCALES.map((l) => `<link rel="alternate" hreflang="${l}" href="${url(page.path, l)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${url(page.path, DEFAULT_LOCALE)}" />`,
  ]
  // The zh-TW home page stays without a canonical link: CI copies index.html to 404.html, which must not
  // claim to be the home page. Without one, the page counts as its own canonical. Aliases point to the page.
  const isRootHome = locale === DEFAULT_LOCALE && page.kind === 'home' && !alias
  if (!isRootHome) links.push(`<link rel="canonical" href="${pageUrl}" />`)
  html = replaceOnce(html, /<\/head>/, () => `  ${links.join('\n    ')}\n  </head>`, '</head>')

  const out = join(dist, file)
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, html)
}

// Sitemap: each page in each language, with its language alternates. No lastmod: the build cannot
// tell when a page's content last changed, and a build date on every page would be false.
const entries = PAGES.flatMap((page) =>
  LOCALES.map((locale) => {
    const alternates = [...LOCALES, 'x-default'].map((l) => {
      const target = l === 'x-default' ? DEFAULT_LOCALE : l
      return `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(page.path, target)}" />`
    })
    return `  <url>\n    <loc>${url(page.path, locale)}</loc>\n${alternates.join('\n')}\n  </url>`
  }),
)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)

console.log(`page-meta: wrote ${pageFiles().length} files and sitemap.xml (${entries.length} URLs)`)
