<script setup>
import { computed, watch, watchEffect } from 'vue'
import NavBar from './components/NavBar.vue'
import BottomTabBar from './components/BottomTabBar.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { BOOKING_URL, findCoach } from './data/coaches'

const { t, locale } = useI18n()
const route = useRoute()
const bookingUrl = BOOKING_URL
const year = new Date().getFullYear()

watch(locale, (lang) => {
  document.documentElement.lang = lang
}, { immediate: true })

// Browser tab title per page and language, e.g. "林依雯 Pauline Lin｜Coach Isaac".
const pageName = computed(() => {
  const coach = route.meta.coachId && findCoach(route.meta.coachId)
  if (coach) return t(`${coach.prefix}.name`).replace(/\n/g, ' ')
  if (route.meta.titleKey) return t(route.meta.titleKey)
  return null
})

watchEffect(() => {
  document.title = pageName.value
    ? t('site.page_title', { page: pageName.value })
    : t('site.home_title')
})
</script>

<template>
  <div class="app-layout">
    <NavBar />

    <main>
      <RouterView />
    </main>

    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <RouterLink to="/" class="footer-logo">Coach <span>Isaac</span></RouterLink>
          <p>{{ t('footer.tagline') }}</p>
        </div>
        <nav class="footer-links">
          <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
          <RouterLink to="/coaches">{{ t('nav.about') }}</RouterLink>
          <RouterLink to="/services">{{ t('nav.services') }}</RouterLink>
        </nav>
        <a :href="bookingUrl" target="_blank" rel="noopener" class="footer-cta">{{ t('nav.free_trial_cta') }}</a>
      </div>
      <p class="footer-copy">&copy; {{ year }} Coach Isaac. All rights reserved.</p>
    </footer>

    <BottomTabBar />
    <ScrollToTop />
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

.site-footer {
  background: var(--color-surface);
  border-top: 1px solid var(--border-color);
  color: var(--text-muted);
  padding-top: 2.5rem;
  padding-bottom: calc(1.5rem + var(--tabbar-h) + env(safe-area-inset-bottom, 0px));
  padding-left: max(1rem, env(safe-area-inset-left, 0px));
  padding-right: max(1rem, env(safe-area-inset-right, 0px));
}

.footer-inner {
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.footer-logo {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-primary);
}

.footer-logo span {
  color: var(--accent-text);
}

.footer-brand p {
  margin: 0.35rem 0 0;
  font-size: 0.9rem;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25rem 1.25rem;
}

.footer-links a {
  color: var(--text-main);
  font-size: 0.95rem;
  padding: 0.5rem 0.25rem;
}

.footer-links a:hover {
  color: var(--color-primary);
}

.footer-cta {
  background: var(--color-secondary);
  color: var(--accent-ink);
  font-weight: 700;
  padding: 0.75rem 1.4rem;
  border-radius: 999px;
  white-space: nowrap;
}

.footer-cta:hover {
  color: var(--accent-ink);
}

.footer-copy {
  max-width: 1120px;
  margin: 2rem auto 0;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-color);
  font-size: 0.8rem;
  text-align: center;
}

@media (min-width: 768px) {
  .site-footer {
    padding-bottom: 1.5rem;
    padding-left: max(1.5rem, env(safe-area-inset-left, 0px));
    padding-right: max(1.5rem, env(safe-area-inset-right, 0px));
  }

}

@media (min-width: 960px) {
  .footer-inner {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}
</style>
