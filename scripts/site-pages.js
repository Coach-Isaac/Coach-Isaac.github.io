// The pages the build writes, shared by page-meta.js (head), prerender.js (body) and
// verify-dist.js (checks). Paths are language-neutral; each page exists in every language
// (see src/locale-paths.js). `aliases` are extra files serving the same page at another address.
import { coaches } from '../src/data/coaches.js'
import { LOCALES, LOCALE_PREFIX } from '../src/locale-paths.js'

export const SITE = 'https://coach-isaac.github.io'

export const PAGES = [
  { path: '/', file: 'index.html', kind: 'home' },
  // GitHub does not document whether coaches.html or the coaches/ folder wins for /coaches; both exist.
  { path: '/coaches', file: 'coaches.html', kind: 'coaches', aliases: [{ file: 'coaches/index.html', path: '/coaches' }] },
  ...coaches.map((c) => ({
    path: c.route,
    file: `${c.route.slice(1)}.html`,
    kind: 'coach',
    coach: c,
    // The old /about URL redirects to Isaac in the router; it gets his page so old links get a 200.
    aliases: c.id === 'isaac' ? [{ file: 'about.html', path: '/about' }] : [],
  })),
  { path: '/services', file: 'services.html', kind: 'services' },
  { path: '/privacy', file: 'privacy.html', kind: 'privacy' },
]

// Every file to write: one per page and language, plus aliases. `address` is the path the browser
// shows (no trailing slash), which src/main.js compares with data-prerender-path.
export function pageFiles() {
  return LOCALES.flatMap((locale) => {
    const prefix = LOCALE_PREFIX[locale]
    const dir = prefix ? `${prefix.slice(1)}/` : ''
    return PAGES.flatMap((page) => [
      { page, locale, file: `${dir}${page.file}`, address: `${prefix}${page.path}`.replace(/(.)\/$/, '$1') || '/', alias: false },
      ...(page.aliases ?? []).map((a) => ({ page, locale, file: `${dir}${a.file}`, address: `${prefix}${a.path}`, alias: true })),
    ])
  })
}
