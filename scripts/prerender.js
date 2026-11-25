// Runs after scripts/page-meta.js has written each page's <head> (see package.json).
// Fills every page file's empty <div id="app"> with the HTML the Vue app renders for that address,
// so visitors and crawlers get the content without running JavaScript. The browser then reuses
// (hydrates) it; see src/main.js. Uses the SSR bundle built by `vite build --ssr src/entry-server.js`.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { pageFiles } from './site-pages.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, process.env.DIST_DIR || 'dist')
const ssrBundle = resolve(root, 'node_modules/.cache/stepflect-ssr/entry-server.js')

// Production builds of vue, vue-i18n and the server renderer (they are loaded from node_modules).
process.env.NODE_ENV ??= 'production'
const { render } = await import(pathToFileURL(ssrBundle).href)
const EMPTY_APP = '<div id="app"></div>'

const files = pageFiles()
for (const { file, address, locale } of files) {
  const path = join(dist, file)
  const html = readFileSync(path, 'utf8')
  const htmlTag = `<html lang="${locale}">`
  for (const marker of [EMPTY_APP, htmlTag]) {
    if (html.split(marker).length !== 2) throw new Error(`prerender: expected one ${marker} in ${file}`)
  }
  const body = await render(address)
  if (!body.includes('<h1')) throw new Error(`prerender: ${address} rendered without an <h1>`)
  // src/main.js and the inline script in index.html read this to decide whether this HTML is
  // the page for the address being visited.
  const marked = `<html lang="${locale}" data-prerender-path="${address}">`
  writeFileSync(path, html.replace(htmlTag, () => marked).replace(EMPTY_APP, () => `<div id="app">${body}</div>`))
}

// A page missing from scripts/site-pages.js would ship as an empty shell; stop instead.
const htmlFiles = readdirSync(dist, { recursive: true }).filter((f) => String(f).endsWith('.html'))
const empty = htmlFiles.filter((f) => readFileSync(join(dist, String(f)), 'utf8').includes(EMPTY_APP))
if (empty.length) throw new Error(`prerender: not pre-rendered: ${empty.join(', ')}`)

console.log(`prerender: filled ${files.length} files`)
