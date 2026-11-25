import { createMemoryHistory } from 'vue-router'
import { renderToString } from 'vue/server-renderer'
import { createStepflectApp } from './app'

// Build-time only (see scripts/prerender.js): renders one page to HTML with the same components
// the browser uses. Nothing here runs on a server after deployment.
export async function render(url, locale) {
  const { app, router } = createStepflectApp({ hydrate: true, locale, history: createMemoryHistory() })
  await router.push(url)
  await router.isReady()
  return renderToString(app)
}
