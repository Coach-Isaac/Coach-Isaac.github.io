import { ref, watchEffect } from 'vue'

const STORAGE_KEY = 'theme-preference'

function getSystemDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function getInitialDark() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark') return true
  if (stored === 'light') return false
  return getSystemDark()
}

const isDark = ref(getInitialDark())

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
}

applyTheme(isDark.value)

watchEffect(() => {
  applyTheme(isDark.value)
})

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
mediaQuery.addEventListener('change', (e) => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    isDark.value = e.matches
  }
})

function toggle() {
  isDark.value = !isDark.value
  localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
}

function resetToSystem() {
  localStorage.removeItem(STORAGE_KEY)
  isDark.value = getSystemDark()
}

export function useTheme() {
  return { isDark, toggle, resetToSystem }
}
