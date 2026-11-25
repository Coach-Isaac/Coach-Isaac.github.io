import { createApp, createSSRApp } from 'vue'
import App from './App.vue'
import { createAppI18n } from './i18n'
import { createAppRouter } from './router'

// Shared by the browser entry (main.js) and the build-time renderer (entry-server.js), so the
// pre-rendered HTML and the live page come from the same components, routes and translations.
export function createStepflectApp({ hydrate, locale, history }) {
  const app = hydrate ? createSSRApp(App) : createApp(App)
  const i18n = createAppI18n(locale)
  const router = createAppRouter(history)
  app.use(i18n).use(router)
  return { app, router, i18n }
}
