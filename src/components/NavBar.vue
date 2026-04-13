<script setup>
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { locale, t } = useI18n()
const bookingUrl = 'https://forms.gle/t65d74KfDD28cQkaA'

const changeLanguage = (lang) => {
  locale.value = lang
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-brand">Coach<span> Isaac</span></div>
    <div class="nav-center">
      <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
      <RouterLink to="/coaches">{{ t('nav.about') }}</RouterLink>
      <RouterLink to="/services">{{ t('nav.services') }}</RouterLink>
    </div>
    <div class="nav-right">
      <div class="lang-switch">
        <button :class="{ active: locale === 'en' }" @click="changeLanguage('en')">EN</button>
        <button :class="{ active: locale === 'zh-TW' }" @click="changeLanguage('zh-TW')">繁</button>
        <button :class="{ active: locale === 'zh-CN' }" @click="changeLanguage('zh-CN')">简</button>
      </div>
      <a :href="bookingUrl" target="_blank" rel="noopener" class="nav-cta">{{ t('nav.free_trial_cta') }}</a>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem 2rem;
  background-color: var(--bg-color);
  box-shadow: 0 2px 8px rgba(15, 118, 153, 0.08);
  border-bottom: 2px solid var(--color-primary);
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  gap: 1rem;
}

.nav-brand {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--color-primary);
  letter-spacing: -0.5px;
  white-space: nowrap;
  flex-shrink: 0;
}

.nav-brand span {
  color: var(--color-secondary);
}

.nav-center {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.nav-center a {
  text-decoration: none;
  color: var(--text-main);
  font-weight: 500;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  white-space: nowrap;
  font-size: 0.95rem;
}

.nav-center a:hover {
  background-color: var(--bg-card);
}

.nav-center a.router-link-active {
  color: var(--color-primary);
  font-weight: 700;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.lang-switch {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.lang-switch button {
  background: transparent;
  border: 1px solid var(--border-color);
  padding: 0.2rem 0.45rem;
  cursor: pointer;
  border-radius: 4px;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.lang-switch button.active {
  background-color: var(--color-secondary);
  color: white;
  border-color: var(--color-secondary);
}

.nav-cta {
  background: var(--color-secondary);
  color: #fff;
  padding: 0.5rem 1.1rem;
  border-radius: 24px;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(66, 185, 131, 0.3);
  transition: opacity 0.2s, transform 0.2s;
}

.nav-cta:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  color: #fff;
}

/* Mobile */
@media (max-width: 600px) {
  .navbar {
    flex-wrap: wrap;
    padding: 0.75rem 1rem;
    gap: 0.5rem;
  }

  .nav-brand {
    font-size: 1rem;
  }

  .nav-center {
    order: 3;
    width: 100%;
    justify-content: center;
    gap: 0.25rem;
  }

  .nav-center a {
    font-size: 0.85rem;
    padding: 0.3rem 0.5rem;
  }

  .nav-right {
    gap: 0.5rem;
  }

  .nav-cta {
    font-size: 0.78rem;
    padding: 0.4rem 0.8rem;
  }
}
</style>
