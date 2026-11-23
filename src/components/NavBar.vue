<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'
import { useTheme } from '../composables/useTheme'
import { LOCALE_STORAGE_KEY } from '../i18n'
import { BOOKING_URL } from '../data/coaches'

const { locale, t } = useI18n()
const route = useRoute()
const bookingUrl = BOOKING_URL

const languages = [
  { code: 'en', short: 'EN' },
  { code: 'zh-TW', short: '繁' },
  { code: 'zh-CN', short: '简' },
]

const langOpen = ref(false)
const langMenuRef = ref(null)

const changeLanguage = (lang) => {
  locale.value = lang
  langOpen.value = false
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, lang)
  } catch {
    // Storage can be unavailable (private mode); the choice then lasts only for this visit.
  }
}

const isCoachesPage = computed(() => route.path === '/coaches' || route.path.startsWith('/coaches/'))
const isServicesPage = computed(() => route.path === '/services' || route.path.startsWith('/services/'))

const currentLanguageShort = computed(() => languages.find(l => l.code === locale.value)?.short ?? 'EN')

const onDocClick = (e) => {
  if (langOpen.value && langMenuRef.value && !langMenuRef.value.contains(e.target)) {
    langOpen.value = false
  }
}
const onKey = (e) => {
  if (e.key === 'Escape') langOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})

const { isDark, toggle } = useTheme()
</script>

<template>
  <nav class="navbar">
    <div class="nav-inner">
      <RouterLink to="/" class="nav-brand">Coach <span>Isaac</span></RouterLink>

      <div class="nav-links">
        <RouterLink to="/" exact-active-class="is-active">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/coaches" :class="{ 'is-active': isCoachesPage }" :aria-current="isCoachesPage ? 'page' : null">{{ t('nav.about') }}</RouterLink>
        <RouterLink to="/services" :class="{ 'is-active': isServicesPage }" :aria-current="isServicesPage ? 'page' : null">{{ t('nav.services') }}</RouterLink>
      </div>

      <div class="nav-right">
        <!-- Desktop: segmented language switch -->
        <div class="lang-segment" role="group" :aria-label="t('nav.language')">
          <button
            v-for="lang in languages"
            :key="lang.code"
            type="button"
            :class="{ active: locale === lang.code }"
            :aria-pressed="locale === lang.code"
            @click="changeLanguage(lang.code)"
          >{{ lang.short }}</button>
        </div>

        <!-- Mobile: compact language menu -->
        <div ref="langMenuRef" class="lang-menu">
          <button
            type="button"
            class="icon-btn"
            :aria-label="t('nav.language')"
            :aria-expanded="langOpen"
            aria-haspopup="true"
            @click="langOpen = !langOpen"
          >{{ currentLanguageShort }}</button>
          <div v-show="langOpen" class="lang-pop">
            <button
              v-for="lang in languages"
              :key="lang.code"
              type="button"
              :class="{ active: locale === lang.code }"
              @click="changeLanguage(lang.code)"
            >{{ lang.short }}</button>
          </div>
        </div>

        <button
          type="button"
          class="icon-btn"
          :aria-label="isDark ? t('nav.theme_light') : t('nav.theme_dark')"
          @click="toggle"
        >
          <svg v-if="isDark" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
          <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
        </button>

        <a :href="bookingUrl" target="_blank" rel="noopener" class="nav-cta">{{ t('nav.free_trial_cta') }}</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: color-mix(in srgb, var(--bg-color) 88%, transparent);
  -webkit-backdrop-filter: saturate(160%) blur(12px);
  backdrop-filter: saturate(160%) blur(12px);
  border-bottom: 1px solid var(--border-color);
  padding-top: env(safe-area-inset-top, 0px);
}

.nav-inner {
  max-width: 1120px;
  margin: 0 auto;
  height: var(--header-h);
  padding-left: max(1rem, env(safe-area-inset-left, 0px));
  padding-right: max(1rem, env(safe-area-inset-right, 0px));
  display: flex;
  align-items: center;
  gap: 1rem;
  box-sizing: border-box;
}

.nav-brand {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-primary);
  white-space: nowrap;
  text-decoration: none;
}

.nav-brand span {
  color: var(--accent-text);
}

.nav-links {
  display: none;
  gap: 0.25rem;
  margin-left: 1.5rem;
}

.nav-links a {
  color: var(--text-muted);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  white-space: nowrap;
  transition: background-color 0.2s, color 0.2s;
}

.nav-links a:hover {
  color: var(--text-main);
  background: var(--color-soft);
}

.nav-links a.is-active {
  color: var(--color-primary);
  background: var(--color-soft);
  font-weight: 600;
}

.nav-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon-btn {
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 50%;
  border: 0;
  background: var(--color-soft);
  color: var(--text-main);
  font-size: 0.85rem;
  font-weight: 600;
  display: grid;
  place-items: center;
}

.icon-btn:hover {
  color: var(--color-primary);
}

.lang-segment {
  display: none;
  background: var(--color-soft);
  border-radius: 999px;
  padding: 3px;
}

.lang-segment button {
  border: 0;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 0.7rem;
  border-radius: 999px;
  min-width: 36px;
}

.lang-segment button.active {
  background: var(--color-surface);
  color: var(--color-primary);
  box-shadow: var(--shadow-soft);
}

.lang-menu {
  position: relative;
}

.lang-pop {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  display: flex;
  flex-direction: column;
  min-width: 96px;
  padding: 6px;
  background: var(--color-surface);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  box-shadow: var(--shadow-card);
}

.lang-pop button {
  border: 0;
  background: transparent;
  color: var(--text-main);
  min-height: 44px;
  border-radius: 10px;
  font-weight: 600;
}

.lang-pop button.active {
  background: var(--color-soft);
  color: var(--color-primary);
}

.nav-cta {
  display: none;
  background: var(--color-secondary);
  color: var(--accent-ink);
  padding: 0.6rem 1.15rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 700;
  white-space: nowrap;
  transition: transform 0.2s, box-shadow 0.2s;
}

.nav-cta:hover {
  color: var(--accent-ink);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px color-mix(in srgb, var(--color-secondary) 35%, transparent);
}

@media (min-width: 768px) {
  .nav-inner {
    height: 68px;
    padding-left: max(1.5rem, env(safe-area-inset-left, 0px));
    padding-right: max(1.5rem, env(safe-area-inset-right, 0px));
  }

  .nav-links,
  .lang-segment,
  .nav-cta {
    display: flex;
  }

  .lang-menu {
    display: none;
  }

  .nav-links {
    margin-left: 0.5rem;
  }
}

@media (min-width: 768px) and (max-width: 959px) {
  .lang-segment {
    display: none;
  }

  .lang-menu {
    display: block;
  }

  .nav-links a {
    padding: 0.5rem 0.6rem;
    font-size: 0.9rem;
  }

  .nav-cta {
    font-size: 0.85rem;
    padding: 0.55rem 0.9rem;
  }
}
</style>
