// Language versions live at their own addresses: zh-TW at the root (the original URLs),
// English under /en, Simplified Chinese under /zh-CN. Plain JS so the router, the components and
// the build scripts (page-meta.js, prerender.js) all use the same rules.

export const LOCALES = ['zh-TW', 'zh-CN', 'en']
export const DEFAULT_LOCALE = 'zh-TW'
export const LOCALE_PREFIX = { 'zh-TW': '', 'zh-CN': '/zh-CN', en: '/en' }

// Language-neutral path ("/coaches/isaac") → address in that language ("/en/coaches/isaac").
// Home pages end with "/" ("/en/") because GitHub Pages serves them from en/index.html.
export function localePath(path, locale) {
  const prefix = LOCALE_PREFIX[locale] ?? ''
  if (!prefix) return path
  return path === '/' ? `${prefix}/` : `${prefix}${path}`
}

// Address → { locale, path } with the language prefix removed ("/en/services" → en, "/services").
export function splitLocale(address) {
  for (const locale of LOCALES) {
    const prefix = LOCALE_PREFIX[locale]
    if (prefix && (address === prefix || address.startsWith(`${prefix}/`))) {
      return { locale, path: address.slice(prefix.length) || '/' }
    }
  }
  return { locale: DEFAULT_LOCALE, path: address }
}
