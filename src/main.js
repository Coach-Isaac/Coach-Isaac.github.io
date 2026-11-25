import { createWebHistory } from 'vue-router'
import './style.css'
import './composables/useTheme.js' // init theme before first render to avoid FOUC
import { createStepflectApp } from './app'
import { detectClientLocale } from './i18n'

// Pages are pre-rendered at build time (scripts/prerender.js), which records on <html> the path
// and language each file holds. Reuse that HTML (hydrate) only when it is exactly what this visitor
// would see; otherwise (GitHub Pages' 404.html copy of the home page, a "/x.html" address, or a
// visitor whose language differs) render from scratch so no wrong content stays on screen.
// The inline script in index.html applies the same path rule to hide the page until then.
const root = document.documentElement
const container = document.getElementById('app')
const locale = detectClientLocale()
const path = window.location.pathname.replace(/(.)\/$/, '$1')
const hydrate = root.dataset.prerenderPath === path && root.dataset.prerenderLocale === locale
if (!hydrate) container.textContent = ''

const { app, router } = createStepflectApp({ hydrate, locale, history: createWebHistory(import.meta.env.BASE_URL) })
router.isReady().then(() => {
  app.mount('#app')
  // Set by the inline script in index.html when the pre-rendered HTML might not be this visitor's page.
  root.classList.remove('prerender-pending')
})
