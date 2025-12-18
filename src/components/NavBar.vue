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
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

/* Remove brand styles */

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-main);
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-links a:hover {
  background-color: var(--bg-card);
}

.nav-links a.router-link-active {
  color: var(--color-secondary);
  font-weight: bold;
}

.lang-switch {
  display: flex;
  align-items: center;
}

.lang-switch button {
  background: transparent;
  border: 1px solid var(--border-color);
  padding: 0.25rem 0.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  color: var(--text-main);
  font-size: 0.9rem;
}

.lang-switch button.active {
  background-color: var(--color-secondary);
  color: white;
  border-color: var(--color-secondary);
}

/* Mobile Optimizations */
@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.95rem;
  }
  
  .nav-links a {
    padding: 0.25rem 0.5rem;
    margin: 0;
  }

  .lang-switch {
    width: 100%;
    justify-content: center;
  }
}
</style>
