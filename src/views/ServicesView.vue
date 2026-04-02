<script setup>
import { useI18n } from 'vue-i18n'
const { t, tm, rt } = useI18n()

const ctaEmail = 'coach.isaac.lu@gmail.com'
</script>

<template>
  <div class="services-container page-container fade-in-up">

    <!-- FREE TRIAL CTA — moved to top -->
    <section class="offer-section">
      <div class="offer-box">
        <span class="offer-badge">✨ {{ t('services.special_offer_title') }}</span>
        <h2>{{ t('services.offer_headline') }}</h2>
        <p>{{ t('services.special_offer_desc') }}</p>
        <a :href="'mailto:' + ctaEmail" class="cta-button">{{ t('services.cta_button') }}</a>
        <p class="offer-note">{{ t('services.offer_note') }}</p>
      </div>
    </section>

    <!-- Page title + philosophy -->
    <section class="service-intro">
      <h1>{{ t('services.title') }}</h1>
      <p class="philosophy">{{ t('services.philosophy') }}</p>
    </section>

    <!-- Process Steps -->
    <section class="process-steps">
      <h2>{{ t('services.process_title') }}</h2>
      <div class="steps-container">
        <div v-for="(step, index) in tm('services.process_steps')" :key="index" class="step-card">
          <div class="step-number">{{ index + 1 }}</div>
          <h3>{{ rt(step.title) }}</h3>
          <p>{{ rt(step.desc) }}</p>
        </div>
      </div>
    </section>

    <!-- Agreement Section -->
    <section class="agreement-section">
      <h2>{{ t('services.agreement_title') }}</h2>
      <div class="agreement-grid">
        <div v-for="(item, index) in tm('services.agreement_items')" :key="index" class="agreement-card">
          <h3>{{ rt(item.title) }}</h3>
          <p>{{ rt(item.desc) }}</p>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* ===== FREE TRIAL OFFER (top of page) ===== */
.offer-section {
  margin-bottom: 3rem;
}

.offer-box {
  background: var(--hero-gradient);
  color: #fff;
  padding: 3.5rem 2.5rem;
  border-radius: var(--radius-xl);
  text-align: center;
  position: relative;
  overflow: hidden;
}

@media (max-width: 600px) {
  .offer-box {
    padding: 2rem 1.25rem;
    border-radius: var(--radius-lg);
  }

  .offer-box h2 {
    font-size: 1.5rem;
  }
}

.offer-box::before {
  content: '✦';
  position: absolute;
  top: -16px; right: 40px;
  font-size: 96px;
  opacity: 0.05;
  color: #fff;
  pointer-events: none;
}

.offer-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  margin-bottom: 1.25rem;
}

.offer-box h2 {
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.offer-box > p {
  font-size: 1rem;
  opacity: 0.9;
  max-width: 480px;
  margin: 0 auto 2rem;
  line-height: 1.75;
}

.cta-button {
  display: inline-block;
  background: #fff;
  color: var(--color-primary);
  padding: 0.9rem 2.2rem;
  border-radius: 32px;
  font-size: 1rem;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);
  transition: transform 0.2s, box-shadow 0.2s;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.22);
  color: var(--color-primary);
}

.offer-note {
  font-size: 0.8rem;
  opacity: 0.65;
  margin: 1rem 0 0 0;
}

/* ===== PAGE INTRO ===== */
.service-intro {
  margin-bottom: 2.5rem;
}

.service-intro h1 {
  font-size: 1.8rem;
  color: var(--text-main);
  margin-bottom: 0.75rem;
}

.philosophy {
  font-size: 1.1rem;
  color: var(--color-primary);
  font-style: italic;
  line-height: 1.75;
  margin: 0;
}

/* ===== PROCESS STEPS ===== */
.process-steps {
  margin-bottom: 3.5rem;
}

.process-steps h2 {
  color: var(--color-primary);
  margin-bottom: 2rem;
  font-size: 1.4rem;
  padding-left: 0.75rem;
  border-left: 4px solid var(--color-secondary);
}

/* Desktop: horizontal 3-column with connecting line */
.steps-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  position: relative;
}

/* Connecting line between step circles */
.steps-container::before {
  content: '';
  position: absolute;
  /* 16.6% = 1/6 of container, aligns to center of first/last columns in a 3-col grid */
  top: 28px;
  left: calc(16.6% + 12px);
  right: calc(16.6% + 12px);
  height: 2px;
  background: var(--hero-gradient);
  z-index: 0;
}

/* Mobile: vertical stack, no connecting line */
@media (max-width: 768px) {
  .steps-container {
    grid-template-columns: 1fr;
  }

  .steps-container::before {
    display: none;
  }
}

.step-card {
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  text-align: center;
  position: relative;
  z-index: 1;
  transition: transform 0.2s, box-shadow 0.2s;
}

.step-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
}

.step-number {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--hero-gradient);
  color: #fff;
  font-size: 1.3rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.step-card h3 {
  margin: 0 0 0.5rem 0;
  color: var(--text-main);
  font-size: 1rem;
  font-weight: 700;
}

.step-card p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.65;
}

/* ===== AGREEMENT ===== */
.agreement-section {
  margin-bottom: 2rem;
}

.agreement-section h2 {
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  padding-left: 0.75rem;
  border-left: 4px solid var(--color-secondary);
}

.agreement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
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
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.agreement-card p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.65;
}
</style>
