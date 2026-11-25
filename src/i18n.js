import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zhTW from './locales/zh-TW.json'
import zhCN from './locales/zh-CN.json'

export const LOCALE_STORAGE_KEY = 'locale-preference'
export const DEFAULT_LOCALE = 'zh-TW'

const messages = {
  en,
  'zh-TW': zhTW,
  'zh-CN': zhCN
}

// First site language the browser prefers; English when it prefers none of ours.
// Crawlers get zh-TW so search results match the zh-TW share previews in the page <head>.
function browserLocale() {
  // "bot/" and a whole-word "bot" match Googlebot/2.1, bingbot/2.0 etc. but not phone models like "CUBOT X30".
  if (/bot\/|\bbot\b|crawler|spider|slurp/i.test(navigator.userAgent)) return DEFAULT_LOCALE
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const raw of preferred) {
    const tag = String(raw || '').toLowerCase()
    if (tag.startsWith('zh')) return /^zh[-_](cn|sg|my)|hans/.test(tag) ? 'zh-CN' : 'zh-TW'
    if (tag.startsWith('en')) return 'en'
  }
  return 'en'
}

// Browser only. A language the visitor picked before wins over the browser's; detection itself saves nothing.
export function detectClientLocale() {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (stored && Object.hasOwn(messages, stored)) return stored
  } catch {
    // Storage unavailable: use the browser language below.
  }
  return browserLocale()
}

// One instance per app: the build renders pages in a fixed language, the browser in the visitor's.
export function createAppI18n(locale) {
  return createI18n({
    legacy: false, // Usage with Composition API
    locale,
    fallbackLocale: 'en',
    messages
  })
}
