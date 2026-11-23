<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'
import { BOOKING_URL } from '../data/coaches'

const { t } = useI18n()
const route = useRoute()
const bookingUrl = BOOKING_URL

const isHome = computed(() => route.path === '/')
const isCoaches = computed(() => route.path === '/coaches' || route.path.startsWith('/coaches/'))
const isServices = computed(() => route.path === '/services' || route.path.startsWith('/services/'))
</script>

<template>
  <nav class="tabbar" :aria-label="t('nav.landmark_tabs')">
    <RouterLink to="/" class="tab" :class="{ on: isHome }" :aria-current="isHome ? 'page' : null">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>
      <span>{{ t('nav.home') }}</span>
    </RouterLink>
    <RouterLink to="/coaches" class="tab" :class="{ on: isCoaches }" :aria-current="isCoaches ? 'page' : null">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.8c1.8.7 3 2.5 3.5 5.2"/></svg>
      <span>{{ t('nav.about') }}</span>
    </RouterLink>
    <RouterLink to="/services" class="tab" :class="{ on: isServices }" :aria-current="isServices ? 'page' : null">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/></svg>
      <span>{{ t('nav.services') }}</span>
    </RouterLink>
    <!-- Styled like the other tabs so it is never mistaken for the current page; the arrow marks that it opens the form in a new tab. -->
    <a :href="bookingUrl" target="_blank" rel="noopener" class="tab">
      <span class="book-ic">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>
        <svg class="ext" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>
      </span>
      <span>{{ t('nav.book') }}</span>
    </a>
  </nav>
</template>

<style scoped>
.tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  min-height: var(--tabbar-h);
  padding: 6px max(8px, env(safe-area-inset-right, 0px)) calc(6px + env(safe-area-inset-bottom, 0px)) max(8px, env(safe-area-inset-left, 0px));
  box-sizing: border-box;
  background: color-mix(in srgb, var(--color-surface) 92%, transparent);
  -webkit-backdrop-filter: saturate(160%) blur(12px);
  backdrop-filter: saturate(160%) blur(12px);
  border-top: 1px solid var(--border-color);
}

.tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  min-height: 48px;
  color: var(--text-muted);
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1.2;
  text-decoration: none;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
}

.tab svg {
  width: 22px;
  height: 22px;
}

.tab:hover,
.tab.on {
  color: var(--color-primary);
}

.book-ic {
  position: relative;
  display: grid;
}

.tab .ext {
  position: absolute;
  top: -3px;
  right: -10px;
  width: 11px;
  height: 11px;
}

@media (min-width: 768px) {
  .tabbar {
    display: none;
  }
}
</style>
