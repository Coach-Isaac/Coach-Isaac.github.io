<script setup>
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()

const isActive = (path) => route.path === path
</script>

<template>
  <nav class="coach-tabs">
    <RouterLink
      to="/coaches"
      class="tab-item"
      :class="{ active: isActive('/coaches') }"
    >
      {{ t('coaches_index.tab_all') }}
    </RouterLink>
    <RouterLink
      to="/coaches/isaac"
      class="tab-item"
      :class="{ active: isActive('/coaches/isaac') }"
    >
      Isaac
    </RouterLink>
    <RouterLink
      to="/coaches/pauline"
      class="tab-item"
      :class="{ active: isActive('/coaches/pauline') }"
    >
      Pauline
    </RouterLink>
    <RouterLink
      to="/coaches/vincent"
      class="tab-item"
      :class="{ active: isActive('/coaches/vincent') }"
    >
      Vincent
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
</style>
