import { createApp, createSSRApp } from 'vue'
import App from './App.vue'
import { createAppI18n } from './i18n'
import { createAppRouter } from './router'
import { DEFAULT_LOCALE } from './locale-paths'

// Shared by the browser entry (main.js) and the build-time renderer (entry-server.js), so the
// pre-rendered HTML and the live page come from the same components, routes and translations.
// The address decides the language: every route carries meta.locale.
export function createStepflectApp({ hydrate, locale, history }) {
  const app = hydrate ? createSSRApp(App) : createApp(App)
  const i18n = createAppI18n(locale)
  const router = createAppRouter(history)
  // After the navigation is confirmed, so a failed one (e.g. a page chunk gone after a release)
  // does not leave the old page in the new language. Still runs before router.push() resolves.
  router.afterEach((to, from, failure) => {
    if (!failure) i18n.global.locale.value = to.meta.locale ?? DEFAULT_LOCALE
  })
  app.use(i18n).use(router)
  return { app, router, i18n }
}
