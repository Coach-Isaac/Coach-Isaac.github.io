<script setup>
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { coaches } from '../data/coaches'
import { useLocalePath } from '../composables/useLocalePath'

const { t, locale } = useI18n()
const { lp, basePath } = useLocalePath()

const isActive = (path) => basePath.value === path
// Same short name the profile's booking card uses ("阿哲" in Chinese, "Vincent" in English).
const shortName = (c) => (locale.value.startsWith('zh') ? c.shortName.zh : c.shortName.en)
</script>

<template>
  <nav class="coach-tabs" :aria-label="t('nav.landmark_coaches')">
    <RouterLink
      :to="lp('/coaches')"
      class="tab-item"
      :class="{ active: isActive('/coaches') }"
    >
      {{ t('coaches_index.tab_all') }}
    </RouterLink>
    <RouterLink
      v-for="c in coaches"
      :key="c.id"
      :to="lp(c.route)"
      class="tab-item"
      :class="{ active: isActive(c.route) }"
    >
      {{ shortName(c) }}
    </RouterLink>
  </nav>
</template>

<style scoped>
.coach-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25rem;
  margin: 0 auto 2rem;
  padding: 4px;
  width: fit-content;
  max-width: 100%;
  box-sizing: border-box;
  background: var(--color-soft);
  border-radius: 999px;
}

.tab-item {
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.9rem;
  min-height: 40px;
  padding: 0 1rem;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  white-space: nowrap;
  transition: background-color 0.2s, color 0.2s;
}

.tab-item:hover {
  color: var(--text-main);
}

.tab-item.active {
  background-color: var(--color-surface);
  color: var(--color-primary);
  box-shadow: var(--shadow-soft);
}

@media (max-width: 400px) {
  .tab-item {
    padding: 0 0.7rem;
    font-size: 0.85rem;
  }
}

/* Keep all four tabs on one line on the narrowest phones (320px, English) */
@media (max-width: 359px) {
  .tab-item {
    padding: 0 0.5rem;
    font-size: 0.8rem;
  }
}
</style>
