// Runs last in `npm run build`, after scripts/page-meta.js has written each page's <head>.
// Fills every page file's empty <div id="app"> with the HTML the Vue app renders for that URL,
// so visitors and crawlers get the content without running JavaScript. The browser then reuses
// (hydrates) it; see src/main.js. Uses the SSR bundle built by `vite build --ssr src/entry-server.js`.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { coaches } from '../src/data/coaches.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, process.env.DIST_DIR || 'dist')
const ssrBundle = resolve(root, 'node_modules/.cache/stepflect-ssr/entry-server.js')
const LOCALE = 'zh-TW'

// Every file page-meta.js writes, plus the home page, with the URL it is served at.
const pages = [
  { file: 'index.html', path: '/' },
  { file: 'coaches.html', path: '/coaches' },
  { file: 'coaches/index.html', path: '/coaches' },
  ...coaches.map((c) => ({ file: `${c.route.slice(1)}.html`, path: c.route })),
  { file: 'about.html', path: '/about' },
  { file: 'services.html', path: '/services' },
  { file: 'privacy.html', path: '/privacy' },
]

// Production builds of vue, vue-i18n and the server renderer (they are loaded from node_modules).
process.env.NODE_ENV ??= 'production'
const { render } = await import(pathToFileURL(ssrBundle).href)
const EMPTY_APP = '<div id="app"></div>'
const HTML_TAG = '<html lang="zh-TW">'

for (const page of pages) {
  const file = join(dist, page.file)
  const html = readFileSync(file, 'utf8')
  for (const marker of [EMPTY_APP, HTML_TAG]) {
    if (html.split(marker).length !== 2) throw new Error(`prerender: expected one ${marker} in ${page.file}`)
  }
  const body = await render(page.path, LOCALE)
  if (!body.includes('<h1')) throw new Error(`prerender: ${page.path} rendered without an <h1>`)
  // src/main.js and the inline script in index.html read these to decide whether this HTML is
  // the visitor's page.
  const htmlTag = `<html lang="${LOCALE}" data-prerender-path="${page.path}" data-prerender-locale="${LOCALE}">`
  writeFileSync(file, html.replace(HTML_TAG, () => htmlTag).replace(EMPTY_APP, () => `<div id="app">${body}</div>`))
}

// A page added to page-meta.js but not to the list above would ship as an empty shell; stop instead.
const htmlFiles = readdirSync(dist, { recursive: true }).filter((f) => String(f).endsWith('.html'))
const empty = htmlFiles.filter((f) => readFileSync(join(dist, String(f)), 'utf8').includes(EMPTY_APP))
if (empty.length) throw new Error(`prerender: not pre-rendered: ${empty.join(', ')}`)

console.log(`prerender: filled ${pages.length} pages`)
