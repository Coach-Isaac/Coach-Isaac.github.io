<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div class="home-container">
    <section class="hero">
      <h1>{{ t('home.hero_title') }}</h1>
      <p class="subtitle">{{ t('home.hero_subtitle') }}</p>
    </section>

    <section class="what-is-coaching">
      <h2>{{ t('coaching.title') }}</h2>
      <p>{{ t('coaching.description') }}</p>
      
      <div class="distinctions">
        <h3>{{ t('coaching.distinctions_title') }}</h3>
        <ul>
          <li><strong>{{ t('coaching.distinction_1_title') }}:</strong> {{ t('coaching.distinction_1_desc') }}</li>
          <li><strong>{{ t('coaching.distinction_2_title') }}:</strong> {{ t('coaching.distinction_2_desc') }}</li>
          <li><strong>{{ t('coaching.distinction_3_title') }}:</strong> {{ t('coaching.distinction_3_desc') }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
.hero {
  text-align: center;
  margin-bottom: 3rem;
}
.hero h1 {
  font-size: 2.5rem;
  color: var(--text-main);
  margin-bottom: 1rem;
}
.subtitle {
  font-size: 1.2rem;
  color: var(--text-muted);
}
.what-is-coaching {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 8px;
  color: var(--text-main);
  border: 1px solid var(--border-color);
}
</style>
