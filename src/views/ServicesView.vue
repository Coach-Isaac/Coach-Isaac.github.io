<script setup>
import { useI18n } from 'vue-i18n'
const { t, tm, rt } = useI18n()
</script>

<template>
  <div class="services-container page-container fade-in-up">
    <section class="service-intro">
      <h1>{{ t('services.title') }}</h1>
      <p class="philosophy">{{ t('services.philosophy') }}</p>
    </section>

    <section class="process-steps">
      <h2>{{ t('services.process_title') }}</h2>
      <div class="steps-container">
        <div v-for="(step, index) in tm('services.process_steps')" :key="index" class="step-card">
          <h3>{{ rt(step.title) }}</h3>
          <p>{{ rt(step.desc) }}</p>
        </div>
      </div>
    </section>

    <section class="agreement-section page-container">
      <h2>{{ t('services.agreement_title') }}</h2>
      <div class="agreement-grid">
        <div v-for="(item, index) in tm('services.agreement_items')" :key="index" class="agreement-card">
          <h3>{{ rt(item.title) }}</h3>
          <p>{{ rt(item.desc) }}</p>
        </div>
      </div>
    </section>

    <section class="offer-section">
      <div class="offer-box">
        <h3>✨ {{ t('services.special_offer_title') }}</h3>
        <p>{{ t('services.special_offer_desc') }}</p>

      </div>
    </section>
  </div>
</template>

<style scoped>
.services-container {
  /* max-width handled by page-container */
}

.philosophy {
  font-size: 1.3rem;
  color: var(--color-primary);
  font-style: italic;
  margin-bottom: 3rem;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 0;
}

.step-card {
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid var(--color-secondary);
  border-top: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  transition: transform 0.2s, box-shadow 0.2s;
}

.step-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.step-card h3 {
  margin-top: 0;
  color: var(--text-main);
}

.agreement-section {
  margin: 4rem 0;
}

.agreement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.agreement-card {
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.agreement-card h3 {
  color: var(--color-primary);
  margin-top: 0;
  font-size: 1.1rem;
}

.offer-section {
  margin-top: 4rem;
}

.offer-box {
  background: linear-gradient(135deg, var(--color-primary), #2c3e50);
  color: white;
  padding: 2.5rem;
  border-radius: 12px;
  text-align: center;
}

.offer-box h3 {
  margin-top: 0;
  font-size: 1.5rem;
}

.cta-area {
  margin-top: 2rem;
}

.cta-button {
  background: white;
  color: var(--color-primary);
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.2s;
  display: inline-block;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
</style>
