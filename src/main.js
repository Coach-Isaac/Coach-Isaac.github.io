import { createWebHistory } from 'vue-router'
import './style.css'
import './composables/useTheme.js' // init theme before first render to avoid FOUC
import { createStepflectApp } from './app'
import { splitLocale } from './locale-paths'

// Every page is pre-rendered at build time (scripts/prerender.js) in the language of its address,
// and <html> records which path it holds. Reuse that HTML (hydrate) when it is this address's
// page; otherwise (GitHub Pages' 404.html copy of the home page, or a "/x.html" address) render
// from scratch so no wrong content stays on screen. The inline script in index.html applies the
// same path rule to hide the page until then.
const root = document.documentElement
const container = document.getElementById('app')
const path = window.location.pathname.replace(/(.)\/$/, '$1')
const { locale } = splitLocale(path)
const hydrate = root.dataset.prerenderPath === path
if (!hydrate) container.textContent = ''

const { app, router } = createStepflectApp({ hydrate, locale, history: createWebHistory(import.meta.env.BASE_URL) })
router.isReady().then(() => {
  app.mount('#app')
  root.classList.remove('prerender-pending')
})
