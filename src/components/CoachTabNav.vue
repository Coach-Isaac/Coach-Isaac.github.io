<script setup>
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'

const { t } = useI18n()
const route = useRoute()

// Check if current route is a sub-route of /coaches
const isActive = (path) => {
  return route.path === path
}
</script>

<template>
  <nav class="coach-tabs">
    <RouterLink 
      to="/coaches" 
      class="tab-item" 
      :class="{ active: isActive('/coaches') }"
    >
      {{ t('coaches_index.tab_all') || 'Overview' }}
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
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1rem;
}

.tab-item {
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.tab-item:hover {
  background-color: var(--bg-card);
  color: var(--text-main);
}

.tab-item.active {
  background-color: var(--color-primary);
  color: white;
  box-shadow: 0 2px 4px rgba(66, 185, 131, 0.2);
}
</style>
