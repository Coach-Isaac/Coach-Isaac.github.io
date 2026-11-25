// Last step of `npm run build`: checks the files that will actually be deployed, so a page body in the
// wrong language, a missing title, canonical or language link, or a broken booking link fails the build
// (locally and in CI) instead of shipping. Reads dist/ and the locale files only.
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BOOKING_URL } from '../src/data/coaches.js'
import { LOCALES, DEFAULT_LOCALE, localePath } from '../src/locale-paths.js'
import { SITE, pageFiles } from './site-pages.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, process.env.DIST_DIR || 'dist')
const problems = []
const count = (html, re) => html.match(re)?.length ?? 0
// The "Home" nav label differs in every language, so it shows which language the body was rendered in.
const navHome = Object.fromEntries(
  LOCALES.map((l) => [l, JSON.parse(readFileSync(join(root, `src/locales/${l}.json`), 'utf8')).nav.home]),
)
const escapeAttr = (s) => s.replace(/&/g, '&amp;')

for (const { page, locale, file, address, alias } of pageFiles()) {
  const html = readFileSync(join(dist, file), 'utf8')
  const fail = (msg) => problems.push(`${file}: ${msg}`)
  const expectedUrl = SITE + localePath(page.path, locale)

  if (!html.includes(`<html lang="${locale}" data-prerender-path="${address}">`)) fail('wrong <html lang> or data-prerender-path')
  if (count(html, /<title>/g) !== 1) fail('needs exactly one <title>')
  if (!/<title>[^<]*Stepflect[^<]*<\/title>/.test(html)) fail('title without the brand name')
  const body = html.slice(html.indexOf('<div id="app">'))
  if (!body.includes(`>${navHome[locale]}<`)) fail(`body is not in ${locale} (no "${navHome[locale]}" link)`)
  for (const other of LOCALES.filter((l) => navHome[l] !== navHome[locale])) {
    if (body.includes(`>${navHome[other]}<`)) fail(`body contains ${other} navigation`)
  }
  if (count(html, /<meta name="description"/g) !== 1) fail('needs exactly one meta description')
  if (!/<h1[\s>]/.test(html)) fail('no <h1> in the pre-rendered body')
  if (html.includes('Coach Isaac')) fail('old brand name "Coach Isaac"')

  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map((m) => m[1])
  const rootHome = locale === DEFAULT_LOCALE && page.kind === 'home' && !alias
  if (rootHome ? canonicals.length !== 0 : canonicals.length !== 1 || canonicals[0] !== expectedUrl) {
    fail(`canonical ${JSON.stringify(canonicals)} (expected ${rootHome ? 'none' : expectedUrl})`)
  }
  for (const l of [...LOCALES, 'x-default']) {
    const target = SITE + localePath(page.path, l === 'x-default' ? DEFAULT_LOCALE : l)
    if (!html.includes(`<link rel="alternate" hreflang="${l}" href="${target}" />`)) fail(`missing hreflang ${l}`)
  }

  const ld = html.match(/<script type="application\/ld\+json">([^<]*)<\/script>/)
  try {
    const types = JSON.parse(ld[1])['@graph'].map((n) => n['@type'])
    for (const t of ['WebSite', 'Organization', 'Service', page.kind === 'coach' ? 'ProfilePage' : 'WebPage']) {
      if (!types.includes(t)) fail(`JSON-LD lacks ${t}`)
    }
  } catch (e) {
    fail(`JSON-LD missing or invalid (${e.message})`)
  }

  // Booking links must survive untouched: the general form, and each coach's pre-filled form.
  if (!html.includes(`href="${BOOKING_URL}"`)) fail('general booking link missing')
  if (page.kind === 'coach' && !html.includes(`href="${escapeAttr(page.coach.bookingUrl)}"`)) fail('pre-filled booking link missing')
}

// Every sitemap URL must be a page the build wrote.
const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8')
for (const [, loc] of sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)) {
  const path = loc.slice(SITE.length)
  const file = path.endsWith('/') ? `${path.slice(1)}index.html` : `${path.slice(1)}.html`
  if (!existsSync(join(dist, file))) problems.push(`sitemap.xml: ${loc} has no file ${file}`)
}

if (problems.length) {
  console.error(problems.join('\n'))
  throw new Error(`verify-dist: ${problems.length} problem(s)`)
}
console.log(`verify-dist: ${pageFiles().length} files and sitemap.xml look right`)
