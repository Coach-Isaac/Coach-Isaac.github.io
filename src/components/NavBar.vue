<script setup>
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { locale, t } = useI18n()

const changeLanguage = (lang) => {
  locale.value = lang
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-brand">
      <RouterLink to="/">Coach Isaac</RouterLink>
    </div>
    <div class="nav-links">
      <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
      <RouterLink to="/about">{{ t('nav.about') }}</RouterLink>
      <RouterLink to="/services">{{ t('nav.services') }}</RouterLink>
    </div>
    <div class="lang-switch">
      <button :class="{ active: locale === 'en' }" @click="changeLanguage('en')">EN</button>
      <button :class="{ active: locale === 'zh-TW' }" @click="changeLanguage('zh-TW')">繁</button>
      <button :class="{ active: locale === 'zh-CN' }" @click="changeLanguage('zh-CN')">简</button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--bg-color);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-bottom: 1px solid var(--border-color);
}

.nav-brand a {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-primary);
  text-decoration: none;
}

.nav-links a {
  margin: 0 1rem;
  text-decoration: none;
  color: var(--text-main);
  font-weight: 500;
}

.nav-links a.router-link-active {
  color: #42b983;
}

.lang-switch button {
  background: transparent;
  border: 1px solid var(--border-color);
  padding: 0.25rem 0.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  color: var(--text-main);
}

.lang-switch button.active {
  background-color: var(--color-secondary);
  color: white;
  border-color: var(--color-secondary);
}
</style>
