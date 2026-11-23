import { ref, watchEffect } from 'vue'

const STORAGE_KEY = 'theme-preference'

// Storage can be blocked (site data disabled, some in-app WebViews) and then throws.
// This module runs before the app mounts, so an uncaught error would leave the page blank.
function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function writeStored(value) {
  try {
    if (value === null) localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // The choice then lasts only for this visit.
  }
}

function getSystemDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function getInitialDark() {
  const stored = readStored()
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
  if (!readStored()) {
    isDark.value = e.matches
  }
})

function toggle() {
  isDark.value = !isDark.value
  writeStored(isDark.value ? 'dark' : 'light')
}

function resetToSystem() {
  writeStored(null)
  isDark.value = getSystemDark()
}

export function useTheme() {
  return { isDark, toggle, resetToSystem }
}
