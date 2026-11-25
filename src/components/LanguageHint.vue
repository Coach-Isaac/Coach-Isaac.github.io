<script setup>
// A dismissible note for first-time visitors whose browser prefers another of our languages:
// the address decides the page language, so instead of redirecting them (Google advises against
// language redirects) we point to the same page in their language. Shown only after mount, so the
// pre-rendered HTML stays the same for everyone; never shown to crawlers or once dismissed.
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { detectClientLocale, LOCALE_STORAGE_KEY } from '../i18n'
import { localePath } from '../locale-paths'
import { useLocalePath } from '../composables/useLocalePath'

const DISMISS_KEY = 'locale-hint-dismissed'

// Written in the visitor's language, not the page's.
const text = {
  en: { note: 'This page is also available in English.', link: 'View in English', close: 'Close', region: 'Language' },
  'zh-TW': { note: '這一頁也有繁體中文版。', link: '看繁體中文版', close: '關閉', region: '語言' },
  'zh-CN': { note: '这一页也有简体中文版。', link: '看简体中文版', close: '关闭', region: '语言' },
}

const { locale } = useI18n()
const { basePath } = useLocalePath()
const suggested = ref(null)

onMounted(() => {
  try {
    if (localStorage.getItem(DISMISS_KEY)) return
  } catch {
    // Storage blocked: still offer the hint, it just cannot be remembered as dismissed.
  }
  if (/bot\/|\bbot\b|crawler|spider|slurp/i.test(navigator.userAgent)) return
  // The language the visitor picked before, else the browser's (detectClientLocale does both).
  const preferred = detectClientLocale()
  if (preferred !== locale.value && text[preferred]) suggested.value = preferred
})

// Any language change (the header's language links, or this hint's link) answers the question.
watch(locale, () => { suggested.value = null })

const visible = computed(() => suggested.value && suggested.value !== locale.value)
const target = computed(() => localePath(basePath.value || '/', suggested.value))

function remember(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // The choice then lasts only for this visit.
  }
}
const choose = () => remember(LOCALE_STORAGE_KEY, suggested.value)
const dismiss = () => {
  remember(DISMISS_KEY, '1')
  suggested.value = null
}
</script>

<template>
  <!-- Floats above the page (and above the phone tab bar) so it never pushes the content down. -->
  <aside v-if="visible" class="lang-hint" :lang="suggested" :aria-label="text[suggested].region">
    <span>{{ text[suggested].note }}</span>
    <RouterLink :to="target" :hreflang="suggested" class="go" @click="choose">{{ text[suggested].link }} →</RouterLink>
    <button type="button" class="close" :aria-label="text[suggested].close" @click="dismiss">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
    </button>
  </aside>
</template>

<style scoped>
.lang-hint {
  position: fixed;
  z-index: 90;
  left: max(0.75rem, env(safe-area-inset-left, 0px));
  right: max(0.75rem, env(safe-area-inset-right, 0px));
  bottom: calc(var(--tabbar-h) + env(safe-area-inset-bottom, 0px) + 0.75rem);
  margin: 0 auto;
  max-width: 34rem;
  padding: 0.4rem 0.4rem 0.4rem 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem 0.75rem;
  box-sizing: border-box;
  background: var(--color-surface);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  font-size: 0.85rem;
  text-align: left;
}

@media (min-width: 768px) {
  .lang-hint {
    bottom: 1.25rem;
  }
}

.go {
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  font-weight: 700;
  color: var(--color-primary);
}

.close {
  margin-left: auto;
  width: 36px;
  height: 36px;
  padding: 0;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--text-muted);
}

.close:hover {
  color: var(--text-main);
}
</style>
