// Runs after `vite build` (see package.json). Writes one HTML file per page, each with its own
// <title>, description, share tags and canonical link, plus sitemap.xml.
// Why: GitHub Pages has no file for /coaches/isaac etc., so it answered with 404.html and HTTP 404;
// Google skipped those pages and LINE showed the home preview for every link. A file such as
// coaches/isaac.html is served at /coaches/isaac with HTTP 200, so the URLs stay the same.
// The page body is still rendered by the Vue app; only <head> differs between the files.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { coaches } from '../src/data/coaches.js'

const SITE = 'https://coach-isaac.github.io'
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

// Share previews use zh-TW, the site's default language and the one index.html is written in.
const zh = JSON.parse(readFileSync(join(root, 'src/locales/zh-TW.json'), 'utf8'))

// Reads the raw locale string, so vue-i18n syntax ({name}, @:link, {'|'}) would leak into the
// preview; such text is rejected instead. site.page_title's own {page} is filled in below.
function text(key, { allowPlaceholder = false } = {}) {
  const value = key.split('.').reduce((node, part) => node?.[part], zh)
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`page-meta: zh-TW text "${key}" is missing`)
  }
  if (!allowPlaceholder && /[{}@]/.test(value)) {
    throw new Error(`page-meta: zh-TW text "${key}" uses vue-i18n syntax, which previews cannot show`)
  }
  return value.replace(/\n/g, ' ')
}

function pageTitle(name) {
  const title = text('site.page_title', { allowPlaceholder: true }).replace('{page}', () => name)
  if (/[{}@]/.test(title)) throw new Error(`page-meta: unexpected placeholder in "${title}"`)
  return title
}

const coachDescription = (c) =>
  `${text(`${c.prefix}.title`)}｜${c.tags.map((tag) => text(`${c.prefix}.${tag}`)).join('、')}。${text(`${c.prefix}.intro`)}`

const pages = [
  {
    path: '/coaches',
    file: 'coaches.html',
    // GitHub does not document whether coaches.html or the coaches/ folder wins for /coaches.
    // If the folder wins, /coaches redirects to /coaches/, which then still gets this page.
    alsoAt: ['coaches/index.html'],
    title: pageTitle(text('coaches_index.title')),
    description: `${text('coaches_index.subtitle')}：${coaches.map((c) => text(`${c.prefix}.name`)).join('、')}。${text('profile.cta_desc')}`,
  },
  ...coaches.map((c) => ({
    path: c.route,
    file: `${c.route.slice(1)}.html`,
    title: pageTitle(text(`${c.prefix}.name`)),
    description: coachDescription(c),
  })),
  {
    path: '/services',
    file: 'services.html',
    title: pageTitle(text('services.title')),
    description: text('services.philosophy'),
  },
  {
    path: '/privacy',
    file: 'privacy.html',
    title: pageTitle(text('privacy.title')),
    description: text('privacy.intro'),
  },
]

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

function addCanonical(html, url) {
  if (html.includes('rel="canonical"')) throw new Error('page-meta: index.html already has a canonical link')
  return replaceOnce(html, /<\/head>/, `  <link rel="canonical" href="${url}" />\n  </head>`, '</head>')
}

const template = readFileSync(join(dist, 'index.html'), 'utf8')

for (const page of pages) {
  const url = SITE + page.path
  let html = template
  html = replaceOnce(html, /<title>[^<]*<\/title>/, () => `<title>${escapeHtml(page.title)}</title>`, '<title>')
  html = setMeta(html, 'name', 'description', page.description)
  html = setMeta(html, 'property', 'og:title', page.title)
  html = setMeta(html, 'property', 'og:description', page.description)
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'name', 'twitter:title', page.title)
  html = setMeta(html, 'name', 'twitter:description', page.description)
  html = addCanonical(html, url)

  for (const file of [page.file, ...(page.alsoAt ?? [])]) {
    const out = join(dist, file)
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, html)
  }
}

// index.html is left as written: CI copies it to 404.html, which must not carry a canonical link.

const urls = ['/', ...pages.map((p) => p.path)]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((p) => `  <url><loc>${SITE}${p}</loc></url>`).join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)

console.log(`page-meta: wrote ${pages.length} pages and sitemap.xml (${urls.length} URLs)`)
