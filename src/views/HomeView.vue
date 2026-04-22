<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, tm, rt } = useI18n()

const bookingUrl = 'https://forms.gle/t65d74KfDD28cQkaA'

const infoCards = [
  { titleKey: 'coaching.card_guide_title', descKey: 'coaching.hiking_metaphor_desc' },
  { titleKey: 'coaching.card_vs_therapy_title', descKey: 'coaching.distinction_1_desc' },
  { titleKey: 'coaching.card_vs_consult_title', descKey: 'coaching.distinction_2_desc' },
]

// ③ Trust strip SVG icons — mapped by locale icon emoji key
const svgIcons = {
  '🏅': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>',
  '💬': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  '🌐': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  '🔒': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  '☕': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
}

// ④ Mobile booking bar — show after hero exits viewport
const heroRef = ref(null)
const showBar = ref(false)

let heroObserver = null
let fadeObserver = null

onMounted(() => {
  // ④ Watch hero: show bar when hero is off-screen
  if (heroRef.value) {
    heroObserver = new IntersectionObserver(
      ([entry]) => { showBar.value = !entry.isIntersecting },
      { threshold: 0.1 }
    )
    heroObserver.observe(heroRef.value)
  }

  // ⑤ Fade-in: one-time reveal per element
  const fadeEls = document.querySelectorAll('.fade-in-section')
  if (fadeEls.length > 0) {
    fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.isConnected) {
            entry.target.classList.add('is-visible')
            fadeObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    fadeEls.forEach(el => fadeObserver.observe(el))
  }
})

// 當 bar 顯示時，在 body 加 class，讓 footer 和 TOP 按鈕自動上移
watch(showBar, (val) => {
  document.body.classList.toggle('has-mobile-bar', val)
})

onUnmounted(() => {
  heroObserver?.disconnect()
  fadeObserver?.disconnect()
  document.body.classList.remove('has-mobile-bar')
})
</script>

<template>
  <div class="home-container fade-in-up">
    <!-- Hero -->
    <section class="hero" ref="heroRef">
      <!-- ① Geometric decoration -->
      <div class="hero-deco hero-deco-1" aria-hidden="true"></div>
      <div class="hero-deco hero-deco-2" aria-hidden="true"></div>
      <span class="hero-deco-symbol" aria-hidden="true">✦</span>

      <span class="hero-tag">{{ t('home.hero_badge') }}</span>
      <h1>{{ t('home.hero_title') }}</h1>
      <p class="subtitle">{{ t('home.hero_subtitle') }}</p>
      <div class="hero-actions">
        <a :href="bookingUrl" target="_blank" rel="noopener" class="btn-hero-primary">{{ t('nav.free_trial_cta') }}</a>
        <a href="#what-is-coaching" class="btn-hero-secondary">{{ t('home.hero_learn_more') }}</a>
      </div>
      <p class="hero-note">{{ t('home.hero_note') }}</p>
    </section>

    <!-- Trust Strip -->
    <section class="trust-strip">
      <div v-for="item in tm('home.trust')" :key="rt(item.text)" class="trust-item">
        <!-- ③ SVG icons mapped by icon key -->
        <span class="trust-icon" v-html="svgIcons[rt(item.icon)] || rt(item.icon)"></span>
        {{ rt(item.text) }}
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials-section fade-in-section">
      <div class="page-container">
        <h2 class="testimonials-title">{{ t('home.testimonials_title') }}</h2>
        <div class="testimonials-grid">
          <!-- ② Large quote marks via ::before on .testimonial-card -->
          <div
            v-for="(item, i) in tm('home.testimonials')"
            :key="i"
            class="testimonial-card fade-in-section"
            :style="{ transitionDelay: i * 0.1 + 's' }"
          >
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
    <section id="what-is-coaching" class="what-is-coaching page-container fade-in-section">
      <h2>{{ t('coaching.title') }}</h2>
      <p class="intro-desc">{{ t('coaching.description') }}</p>

      <div class="info-cards-grid fade-in-section">
        <div v-for="card in infoCards" :key="card.titleKey" class="info-card">
          <h4>{{ t(card.titleKey) }}</h4>
          <p>{{ t(card.descKey) }}</p>
        </div>
      </div>

      <div class="target-audience-section fade-in-section">
        <h3>{{ t('coaching.target_audience_title') }}</h3>
        <p class="section-intro">{{ t('coaching.target_audience_desc') }}</p>
        <div class="cards-grid">
          <div v-for="(item, index) in tm('coaching.target_audience_list')" :key="index" class="feature-card audience-card">
            <h4>{{ rt(item.title) }}</h4>
            <p>{{ rt(item.desc) }}</p>
          </div>
        </div>
      </div>

      <div class="principles-section fade-in-section">
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

  <!-- ④ Mobile booking bar — Teleport to body to escape transform ancestor -->
  <Teleport to="body">
    <a
      v-show="showBar"
      :href="bookingUrl"
      target="_blank"
      rel="noopener"
      class="mobile-booking-bar"
      aria-label="預約初次對話"
    >
      {{ t('services.cta_book') }} →
    </a>
  </Teleport>
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

/* ① Geometric decoration */
.hero-deco {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  pointer-events: none;
}

.hero-deco-1 {
  width: 180px;
  height: 180px;
  bottom: -40px;
  left: -40px;
}

.hero-deco-2 {
  width: 100px;
  height: 100px;
  top: 30px;
  left: 20%;
}

.hero-deco-symbol {
  position: absolute;
  top: 1.5rem;
  right: 1.8rem;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.25);
  pointer-events: none;
  user-select: none;
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
  position: relative;
}

.hero h1 {
  font-size: 2.6rem;
  font-weight: 800;
  line-height: 1.25;
  color: #fff;
  margin: 0 auto 1.25rem;
  max-width: 700px;
  position: relative;
}

.subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.88);
  max-width: 520px;
  margin: 0 auto 2rem;
  line-height: 1.75;
  position: relative;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  position: relative;
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
  position: relative;
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

/* ③ SVG icon sizing */
.trust-icon {
  display: flex;
  align-items: center;
  color: var(--color-primary);
  opacity: 0.75;
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
  position: relative;
  overflow: hidden;
}

/* ② Large decorative quote mark */
.testimonial-card::before {
  content: '\201C';
  position: absolute;
  top: -0.5rem;
  left: 1rem;
  font-size: 6rem;
  line-height: 1;
  color: var(--color-secondary);
  opacity: 0.18;
  font-family: var(--font-heading);
  pointer-events: none;
  user-select: none;
}

.testimonial-quote {
  font-style: italic;
  font-size: 1.1rem;
  line-height: 1.75;
  color: var(--text-main);
  margin: 0 0 1.5rem;
  font-family: var(--font-heading);
  position: relative;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  position: relative;
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

/* ===== ⑤ SCROLL FADE-IN ===== */
@media (prefers-reduced-motion: no-preference) {
  .fade-in-section {
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .fade-in-section.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<!-- ④ Mobile booking bar — global styles for Teleported element -->
<style>
.mobile-booking-bar {
  display: none;
}

@media (max-width: 767px) {
  .mobile-booking-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.9rem 1.5rem;
    padding-bottom: calc(0.9rem + env(safe-area-inset-bottom, 0px));
    background: linear-gradient(135deg, #4a6741, #3d5636);
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    letter-spacing: 0.3px;
  }

  /* 當 bar 出現時，footer 和 TOP 按鈕往上移 */
  body.has-mobile-bar footer {
    padding-bottom: calc(2rem + 56px + env(safe-area-inset-bottom, 0px));
  }

  body.has-mobile-bar .scroll-to-top {
    bottom: calc(1.5rem + 56px + env(safe-area-inset-bottom, 0px));
  }
}
</style>
