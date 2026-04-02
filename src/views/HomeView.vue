<script setup>
import { useI18n } from 'vue-i18n'
const { t, tm, rt } = useI18n()

const ctaEmail = 'coach.isaac.lu@gmail.com'

const infoCards = [
  { titleKey: 'coaching.card_guide_title', descKey: 'coaching.hiking_metaphor_desc' },
  { titleKey: 'coaching.card_vs_therapy_title', descKey: 'coaching.distinction_1_desc' },
  { titleKey: 'coaching.card_vs_consult_title', descKey: 'coaching.distinction_2_desc' },
]
</script>

<template>
  <div class="home-container fade-in-up">
    <!-- Hero -->
    <section class="hero">
      <span class="hero-tag">{{ t('home.hero_badge') }}</span>
      <h1>{{ t('home.hero_title') }}</h1>
      <p class="subtitle">{{ t('home.hero_subtitle') }}</p>
      <div class="hero-actions">
        <a :href="'mailto:' + ctaEmail" class="btn-hero-primary">{{ t('nav.free_trial_cta') }}</a>
        <a href="#what-is-coaching" class="btn-hero-secondary">{{ t('home.hero_learn_more') }}</a>
      </div>
      <p class="hero-note">{{ t('home.hero_note') }}</p>
    </section>

    <!-- Trust Strip -->
    <section class="trust-strip">
      <div v-for="item in tm('home.trust')" :key="rt(item.text)" class="trust-item">
        <span class="trust-icon">{{ rt(item.icon) }}</span>
        {{ rt(item.text) }}
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials-section">
      <div class="page-container">
        <h2 class="testimonials-title">{{ t('home.testimonials_title') }}</h2>
        <div class="testimonials-grid">
          <div v-for="(item, i) in tm('home.testimonials')" :key="i" class="testimonial-card">
            <p class="testimonial-quote">"{{ rt(item.quote) }}"</p>
            <div class="testimonial-author">
              <span class="author-name">— {{ rt(item.name) }}</span>
              <span class="author-context">{{ rt(item.context) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What is Coaching -->
    <section id="what-is-coaching" class="what-is-coaching page-container">
      <h2>{{ t('coaching.title') }}</h2>
      <p class="intro-desc">{{ t('coaching.description') }}</p>

      <!-- 2x2 Info Cards (replaces verbose metaphor sections) -->
      <div class="info-cards-grid">
        <div v-for="card in infoCards" :key="card.titleKey" class="info-card">
          <h4>{{ t(card.titleKey) }}</h4>
          <p>{{ t(card.descKey) }}</p>
        </div>
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
    </section>
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
}

/* ===== HERO ===== */
.hero {
  background: var(--hero-gradient);
  text-align: center;
  padding: 5rem 2rem 4rem;
  color: #fff;
  position: relative;
  overflow: hidden;
}

@media (max-width: 600px) {
  .hero {
    padding: 3rem 1.5rem 2.5rem;
  }
}

.hero::before {
  content: '';
  position: absolute;
  top: -60px; right: -60px;
  width: 280px; height: 280px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  pointer-events: none;
}

.hero-tag {
  display: inline-block;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  padding: 0.35rem 1rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
}

.hero h1 {
  font-size: 2.6rem;
  font-weight: 800;
  line-height: 1.25;
  color: #fff;
  margin: 0 auto 1.25rem;
  max-width: 700px;
}

.subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.88);
  max-width: 520px;
  margin: 0 auto 2rem;
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.btn-hero-primary {
  background: #fff;
  color: var(--color-primary);
  padding: 0.85rem 2rem;
  border-radius: 28px;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-hero-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  color: var(--color-primary);
}

.btn-hero-secondary {
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.65);
  padding: 0.75rem 1.75rem;
  border-radius: 28px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s;
}

.btn-hero-secondary:hover {
  background-color: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.hero-note {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.65);
  margin: 0;
}

/* ===== TRUST STRIP ===== */
.trust-strip {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem 2rem;
  background: var(--trust-strip-bg, #fff);
  border-bottom: 1px solid var(--trust-strip-border, var(--border-color));
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: var(--text-muted);
  font-weight: 500;
  white-space: nowrap;
}

.trust-icon {
  font-size: 0.95rem;
}

/* ===== WHAT IS COACHING ===== */
.what-is-coaching {
  padding-top: 3.5rem;
  padding-bottom: 3rem;
}

.what-is-coaching h2 {
  text-align: center;
  margin-bottom: 1.25rem;
  color: var(--color-primary);
  font-size: 1.8rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
}

.what-is-coaching h2::after {
  content: '';
  display: block;
  width: 40px;
  height: 3px;
  background: var(--color-secondary);
  border-radius: 2px;
  margin: 0.5rem auto 0;
}

.intro-desc {
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: var(--text-muted);
  text-align: center;
}

/* 2x2 info cards */
.info-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
  margin-bottom: 3rem;
}

@media (max-width: 600px) {
  .info-cards-grid {
    grid-template-columns: 1fr;
  }
}

.info-card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  padding: 1.5rem;
}

.info-card h4 {
  margin: 0 0 0.6rem 0;
  color: var(--color-primary);
  font-size: 1rem;
  font-weight: 700;
  padding-left: 0.75rem;
  border-left: 3px solid var(--color-secondary);
}

.info-card p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.65;
}

.what-is-coaching h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  border-left: 4px solid var(--color-secondary);
  padding-left: 1rem;
}

.target-audience-section {
  margin: 3rem 0;
}

.section-intro {
  font-size: 1rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

@media (min-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }

  .hero h1 {
    font-size: 3rem;
  }
}

.feature-card {
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
}

.feature-card h4 {
  color: var(--color-secondary);
  margin-top: 0;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.audience-card h4 {
  color: var(--color-primary);
}

.principles-section {
  margin-top: 1rem;
}

/* ===== TESTIMONIALS ===== */
.testimonials-section {
  background: var(--bg-card);
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  padding: 4rem 0;
}

@media (max-width: 600px) {
  .testimonials-section {
    padding: 2.5rem 0;
  }
}

.testimonials-title {
  text-align: center;
  font-size: 1.8rem;
  color: var(--color-primary);
  margin-bottom: 2.5rem;
  position: relative;
}

.testimonials-title::after {
  content: '';
  display: block;
  width: 40px;
  height: 3px;
  background: var(--color-secondary);
  border-radius: 2px;
  margin: 0.5rem auto 0;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 600px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}

.testimonial-card {
  background: var(--bg-color);
  border-radius: var(--radius-lg);
  padding: 2rem;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.testimonial-quote {
  font-style: italic;
  font-size: 0.98rem;
  line-height: 1.75;
  color: var(--text-main);
  margin: 0 0 1.5rem;
  font-family: var(--font-heading);
  font-size: 1.1rem;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.author-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-main);
}

.author-context {
  color: var(--text-muted);
  font-size: 0.82rem;
}
</style>
