import { createMemoryHistory } from 'vue-router'
import { renderToString } from 'vue/server-renderer'
import { createStepflectApp } from './app'
import { splitLocale } from './locale-paths'

// Build-time only (see scripts/prerender.js): renders one address to HTML with the same components
// the browser uses, in the language of that address. Nothing here runs on a server after deployment.
export async function render(url) {
  const { locale } = splitLocale(url)
  const { app, router } = createStepflectApp({ hydrate: true, locale, history: createMemoryHistory() })
  await router.push(url)
  await router.isReady()
  return renderToString(app)
}
