<script setup>
import { useI18n } from 'vue-i18n'
const { t, tm, rt } = useI18n()
</script>

<template>
  <div class="home-container page-container fade-in-up">
    <section class="hero">
      <h1>{{ t('home.hero_title') }}</h1>
      <p class="subtitle">{{ t('home.hero_subtitle') }}</p>
    </section>

    <section class="what-is-coaching">
      <h2>{{ t('coaching.title') }}</h2>
      <p class="intro-desc">{{ t('coaching.description') }}</p>

      <div class="metaphor-section">
        <h3>{{ t('coaching.hiking_metaphor_title') }}</h3>
        <p>{{ t('coaching.hiking_metaphor_desc') }}</p>
      </div>

      <div class="metaphor-section climber-theme">
        <h3>{{ t('coaching.climber_metaphor_title') }}</h3>
        <p>{{ t('coaching.climber_metaphor_desc') }}</p>
      </div>

      <div class="target-audience-section">
        <h3>{{ t('coaching.target_audience_title') }}</h3>
        <p class="section-intro">{{ t('coaching.target_audience_desc') }}</p>
        <div class="cards-grid">
          <div v-for="(item, index) in tm('coaching.target_audience_list')" :key="index" class="feature-card audience-card">
            <h4>{{ rt(item.title) }}</h4>
            <p>{{ rt(item.desc) }}</p>
          </div>
        </div>
      </div>

      <div class="principles-section">
        <h3>{{ t('coaching.core_principles_title') }}</h3>
        <div class="cards-grid">
          <div v-for="(item, index) in tm('coaching.principles')" :key="index" class="feature-card">
            <h4>{{ rt(item.title) }}</h4>
            <p>{{ rt(item.desc) }}</p>
          </div>
        </div>
      </div>

      <div class="neuroscience-section">
        <h3>{{ t('coaching.neuroscience_title') }}</h3>
        <p>{{ t('coaching.neuroscience_desc') }}</p>
      </div>
      
      <div class="distinctions">
        <h3>{{ t('coaching.distinctions_title') }}</h3>
        <div class="distinction-grid">
          <div class="distinction-item">
            <h4>{{ t('coaching.distinction_1_title') }}</h4>
            <p>{{ t('coaching.distinction_1_desc') }}</p>
          </div>
          <div class="distinction-item">
            <h4>{{ t('coaching.distinction_2_title') }}</h4>
            <p>{{ t('coaching.distinction_2_desc') }}</p>
          </div>
          <div class="distinction-item">
            <h4>{{ t('coaching.distinction_3_title') }}</h4>
            <p>{{ t('coaching.distinction_3_desc') }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  /* max-width handled by page-container */
}
.hero {
  text-align: center;
  margin-bottom: 4rem;
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

.intro-desc {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.what-is-coaching h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-primary);
}

.what-is-coaching h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  border-left: 4px solid var(--color-secondary);
  padding-left: 1rem;
}

.metaphor-section, .neuroscience-section {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 16px; /* Playful Roundness */
  margin-bottom: 3rem;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

@media (min-width: 768px) {
  .metaphor-section.climber-theme {
  background-color: rgba(66, 185, 131, 0.1); /* Secondary color tint */
  border-left: 5px solid var(--color-secondary);
  border-right: none;
}

.target-audience-section {
  margin: 4rem 0;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.audience-card h4 {
  color: var(--color-secondary); /* Distinguish from principles */
}

.feature-card h4 {
  margin-top: 0;
  color: var(--color-primary);
  font-size: 1.2rem;
}
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-card {
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h4 {
  color: var(--color-secondary);
  margin-top: 0;
}

.distinctions {
  margin-top: 3rem;
}

.distinction-grid {
  display: grid;
  gap: 1.5rem;
}

.distinction-item {
  background: var(--bg-color);
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.distinction-item h4 {
  margin: 0 0 0.5rem 0;
  color: var(--text-main);
}

.distinction-item p {
  margin: 0;
  font-size: 0.95rem;
  color: var(--text-muted);
}
</style>
