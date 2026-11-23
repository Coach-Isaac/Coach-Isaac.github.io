import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zhTW from './locales/zh-TW.json'
import zhCN from './locales/zh-CN.json'

export const LOCALE_STORAGE_KEY = 'locale-preference'

const messages = {
  en,
  'zh-TW': zhTW,
  'zh-CN': zhCN
}

function getInitialLocale() {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (stored && Object.hasOwn(messages, stored)) return stored
  } catch {
    // Storage unavailable: fall back to the default below.
  }
  return 'zh-TW'
}

const i18n = createI18n({
  legacy: false, // Usage with Composition API
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages
})

export default i18n
