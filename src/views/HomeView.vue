<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { coaches, BOOKING_URL as bookingUrl } from '../data/coaches'
import { useLocalePath } from '../composables/useLocalePath'
const { t, tm, rt } = useI18n()
const { lp } = useLocalePath()

const infoCards = [
  { titleKey: 'coaching.card_guide_title', descKey: 'coaching.hiking_metaphor_desc' },
  { titleKey: 'coaching.card_vs_therapy_title', descKey: 'coaching.distinction_1_desc' },
  { titleKey: 'coaching.card_vs_consult_title', descKey: 'coaching.distinction_2_desc' },
]


// Locale names may contain "\n" (e.g. "林依雯\nPauline Lin"); show them on one line in the small cards.
const coachName = (c) => t(`${c.prefix}.name`).replace(/\n/g, ' ')

// Trust strip SVG icons — mapped by locale icon emoji key
const svgIcons = {
  '🏅': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>',
  '💬': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  '🌐': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  '🔒': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  '☕': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
}

let fadeObserver = null

onMounted(() => {
  // Scroll fade-in: one-time reveal per element
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

onUnmounted(() => {
  fadeObserver?.disconnect()
})
</script>

<template>
  <div class="home fade-in-up">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-text">
          <span class="hero-tag">{{ t('home.hero_badge') }}</span>
          <h1>{{ t('home.hero_title') }}</h1>
          <p class="lede">{{ t('home.hero_lede') }}</p>
          <p class="subtitle">{{ t('home.hero_subtitle') }}</p>
          <div class="hero-actions">
            <a :href="bookingUrl" target="_blank" rel="noopener" class="btn btn-accent">{{ t('nav.book_intro_cta') }}</a>
            <a href="#what-is-coaching" class="btn btn-ghost">{{ t('home.hero_learn_more') }}</a>
          </div>
          <p class="hero-note">{{ t('home.hero_note') }}</p>
        </div>

        <!-- Desktop: coach cards beside the hero text -->
        <div class="hero-coaches">
          <RouterLink v-for="c in coaches" :key="c.id" :to="lp(c.route)" class="coach-card">
            <span class="avatar" aria-hidden="true">{{ c.initial }}</span>
            <span class="coach-info">
              <span class="coach-name">{{ coachName(c) }}</span>
              <span class="coach-title">{{ t(`${c.prefix}.title`) }}</span>
              <span class="coach-tags">
                <span v-for="tag in c.tags" :key="tag" class="tag">{{ t(`${c.prefix}.${tag}`) }}</span>
              </span>
            </span>
            <span class="go" aria-hidden="true">›</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Trust strip -->
    <section class="section trust-section">
      <div class="container">
        <ul class="trust">
          <li v-for="item in tm('home.trust')" :key="rt(item.text)">
            <span class="trust-icon" v-html="svgIcons[rt(item.icon)] || rt(item.icon)"></span>
            {{ rt(item.text) }}
          </li>
        </ul>
      </div>
    </section>

    <!-- Topics people bring to coaching: examples only, not service packages (docs/content-strategy.md) -->
    <section class="section topics-section" aria-labelledby="topics-title">
      <div class="container">
        <h2 id="topics-title" class="section-title">{{ t('home.topics_title') }}</h2>
        <p class="section-sub">{{ t('home.topics_desc') }}</p>
        <ul class="topics-grid">
          <li v-for="(topic, i) in tm('home.topics')" :key="i" class="topic-card">
            <h3>{{ rt(topic.title) }}</h3>
            <p class="topic-items">{{ rt(topic.items) }}</p>
            <p class="topic-question"><span class="topic-label">{{ t('home.topics_example') }}</span>{{ rt(topic.question) }}</p>
          </li>
        </ul>
        <p class="topics-note">{{ t('home.topics_note') }}</p>
        <a :href="bookingUrl" target="_blank" rel="noopener" class="btn btn-accent topics-cta">{{ t('nav.book_intro_cta') }}</a>
      </div>
    </section>

    <!-- Mobile: coach cards as their own section -->
    <section class="section coaches-section">
      <div class="container">
        <h2 class="section-title">{{ t('home.coaches_title') }}</h2>
        <p class="section-sub">{{ t('home.coaches_subtitle') }}</p>
        <div class="coach-list">
          <RouterLink v-for="c in coaches" :key="c.id" :to="lp(c.route)" class="coach-card">
            <span class="avatar" aria-hidden="true">{{ c.initial }}</span>
            <span class="coach-info">
              <span class="coach-name">{{ coachName(c) }}</span>
              <span class="coach-title">{{ t(`${c.prefix}.title`) }}</span>
              <span class="coach-tags">
                <span v-for="tag in c.tags" :key="tag" class="tag">{{ t(`${c.prefix}.${tag}`) }}</span>
              </span>
            </span>
            <span class="go" aria-hidden="true">›</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section testimonials-section fade-in-section">
      <div class="container">
        <h2 class="section-title">{{ t('home.testimonials_title') }}</h2>
        <div class="testimonials-grid">
          <figure
            v-for="(item, i) in tm('home.testimonials')"
            :key="i"
            class="testimonial-card"
          >
            <blockquote>{{ rt(item.quote) }}</blockquote>
            <figcaption>
              <span class="author-name">{{ rt(item.name) }}</span>
              <span class="author-context">{{ rt(item.context) }}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- What is coaching -->
    <section id="what-is-coaching" class="section coaching-section fade-in-section">
      <div class="container">
        <h2 class="section-title">{{ t('coaching.title') }}</h2>
        <p class="intro-desc">{{ t('coaching.description') }}</p>

        <div class="info-grid">
          <div v-for="card in infoCards" :key="card.titleKey" class="info-card">
            <h3>{{ t(card.titleKey) }}</h3>
            <p>{{ t(card.descKey) }}</p>
          </div>
        </div>

        <div class="sub-block">
          <h3 class="sub-title">{{ t('coaching.target_audience_title') }}</h3>
          <p class="section-sub">{{ t('coaching.target_audience_desc') }}</p>
          <div class="card-grid">
            <div v-for="(item, index) in tm('coaching.target_audience_list')" :key="index" class="feature-card">
              <h4>{{ rt(item.title) }}</h4>
              <p>{{ rt(item.desc) }}</p>
            </div>
          </div>
        </div>

        <div class="sub-block">
          <h3 class="sub-title">{{ t('coaching.core_principles_title') }}</h3>
          <div class="card-grid">
            <div v-for="(item, index) in tm('coaching.principles')" :key="index" class="feature-card principle-card">
              <span class="principle-no">{{ index + 1 }}</span>
              <h4>{{ rt(item.title) }}</h4>
              <p>{{ rt(item.desc) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  text-align: left;
}

.container {
  max-width: 1120px;
  margin: 0 auto;
  padding-left: max(1.25rem, env(safe-area-inset-left, 0px));
  padding-right: max(1.25rem, env(safe-area-inset-right, 0px));
  box-sizing: border-box;
}

/* ===== Buttons ===== */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: 50px;
  padding: 0.6rem 1.6rem;
  box-sizing: border-box;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
  text-decoration: none;
  /* The English booking label is longer than a phone is wide, so it may wrap. */
  white-space: normal;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
}

.btn-accent {
  background: var(--color-secondary);
  color: var(--accent-ink);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}

.btn-accent:hover {
  color: var(--accent-ink);
  transform: translateY(-2px);
}

.btn-ghost {
  color: var(--on-hero);
  box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--on-hero) 65%, transparent);
}

.btn-ghost:hover {
  color: var(--on-hero);
  background: color-mix(in srgb, var(--on-hero) 12%, transparent);
}

/* ===== Hero ===== */
.hero {
  background: var(--hero-gradient);
  color: var(--on-hero);
  position: relative;
  overflow: hidden;
}

.hero::before,
.hero::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: color-mix(in srgb, var(--on-hero) 7%, transparent);
  pointer-events: none;
}

.hero::before {
  width: 320px;
  height: 320px;
  top: -120px;
  right: -110px;
}

.hero::after {
  width: 200px;
  height: 200px;
  bottom: -90px;
  left: -70px;
}

.hero-inner {
  position: relative;
  z-index: 1;
  max-width: 1120px;
  margin: 0 auto;
  padding: 2.5rem max(1.25rem, env(safe-area-inset-right, 0px)) 2.25rem max(1.25rem, env(safe-area-inset-left, 0px));
  box-sizing: border-box;
}

.hero-tag {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--on-hero) 15%, transparent);
}

.hero h1 {
  font-size: clamp(1.85rem, 7.4vw, 3.1rem);
  line-height: 1.25;
  margin: 1rem 0 0.6rem;
  color: var(--on-hero);
  white-space: pre-line;
}

.lede {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0 0 0.9rem;
}

.subtitle {
  font-size: 1rem;
  line-height: 1.75;
  margin: 0;
  max-width: 34em;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 1.75rem 0 0.9rem;
}

.hero-note {
  margin: 0;
  font-size: 0.82rem;
  opacity: 0.75;
}

.hero-coaches {
  display: none;
}

/* ===== Coach cards (hero + mobile section) ===== */
.coach-card {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.9rem 1rem;
  background: var(--color-surface);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.coach-card:hover {
  color: var(--text-main);
  transform: translateY(-2px);
  box-shadow: var(--shadow-card);
}

.avatar {
  flex: none;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--color-soft);
  color: var(--color-primary);
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
}

.coach-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.coach-name {
  font-weight: 700;
  font-size: 1rem;
}

.coach-title {
  font-size: 0.82rem;
  color: var(--text-muted);
}

.coach-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.3rem;
}

.tag {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.15rem 0.55rem;
  border-radius: 6px;
  background: var(--color-soft);
  color: var(--color-primary);
}

.go {
  margin-left: auto;
  font-size: 1.5rem;
  line-height: 1;
  color: var(--color-primary);
}

/* ===== Sections ===== */
.section {
  padding: 2.5rem 0;
}

.section-title {
  font-size: clamp(1.5rem, 5.5vw, 2rem);
  color: var(--text-main);
  margin: 0 0 0.4rem;
}

.section-sub {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.7;
  margin: 0 0 1.25rem;
}

.trust-section {
  padding: 1.25rem 0 0;
}

.trust {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.trust li {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  background: var(--color-soft);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-main);
}

.trust-icon {
  display: flex;
  color: var(--color-primary);
}

.coach-list {
  display: grid;
  gap: 0.75rem;
}

/* Topics */
.topics-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.topic-card {
  padding: 1.35rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--border-color);
}

.topic-card h3 {
  margin: 0 0 0.45rem;
  font-size: 1.1rem;
  color: var(--text-main);
}

.topic-items {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--text-muted);
}

.topic-question {
  margin: 0.9rem 0 0;
  padding-top: 0.8rem;
  border-top: 1px solid var(--border-color);
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--text-main);
}

.topic-label {
  display: block;
  margin-bottom: 0.15rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--accent-text);
}

.topics-note {
  margin: 1.25rem 0 0;
  max-width: 46em;
  font-size: 0.9rem;
  line-height: 1.75;
  color: var(--text-muted);
}

.topics-cta {
  margin-top: 1.25rem;
}

/* Testimonials */
.testimonials-section .section-title {
  margin-bottom: 1.25rem;
}

.testimonials-grid {
  display: grid;
  gap: 1rem;
}

.testimonial-card {
  margin: 0;
  padding: 1.5rem;
  background: var(--color-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.25rem;
  position: relative;
}

.testimonial-card::before {
  content: '\201C';
  font-family: Georgia, serif;
  font-size: 3.5rem;
  line-height: 0.6;
  height: 1.5rem;
  color: var(--color-secondary);
}

.testimonial-card blockquote {
  margin: 0;
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-main);
}

.testimonial-card figcaption {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.author-name {
  font-weight: 700;
  font-size: 0.9rem;
}

.author-context {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* What is coaching */
.coaching-section {
  background: var(--color-surface);
  border-top: 1px solid var(--border-color);
  padding-bottom: 3rem;
}

.intro-desc {
  font-size: 1rem;
  line-height: 1.85;
  color: var(--text-muted);
  max-width: 46em;
  margin: 0.5rem 0 1.75rem;
}

.info-grid,
.card-grid {
  display: grid;
  gap: 1rem;
}

.info-card {
  padding: 1.35rem;
  border-radius: var(--radius-lg);
  background: var(--color-soft);
}

.info-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: var(--color-primary);
}

.info-card p,
.feature-card p {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.75;
  color: var(--text-muted);
}

.sub-block {
  margin-top: 2.5rem;
}

.sub-title {
  font-size: 1.3rem;
  margin: 0 0 0.5rem;
  color: var(--text-main);
}

.feature-card {
  padding: 1.35rem;
  border-radius: var(--radius-lg);
  background: var(--bg-color);
  border: 1px solid var(--border-color);
}

.feature-card h4 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-main);
}

.principle-no {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  margin-bottom: 0.75rem;
  border-radius: 50%;
  background: var(--color-secondary);
  color: var(--accent-ink);
  font-weight: 700;
  font-size: 0.9rem;
}

/* ===== ≥ 600px ===== */
@media (min-width: 600px) {
  .hero-actions {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .info-grid,
  .card-grid,
  .testimonials-grid,
  .topics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ===== ≥ 768px ===== */
@media (min-width: 768px) {
  .hero-inner {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .section {
    padding: 3.5rem 0;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .lede {
    font-size: 1.35rem;
  }
}

/* ===== ≥ 960px: two-column hero, coaches move into it ===== */
@media (min-width: 960px) {
  .hero-inner {
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
    gap: 3rem;
    align-items: center;
    padding-top: 5rem;
    padding-bottom: 5rem;
  }

  .hero-coaches {
    display: grid;
    gap: 0.75rem;
    padding: 1.25rem;
    border-radius: var(--radius-xl);
    background: color-mix(in srgb, var(--on-hero) 10%, transparent);
  }

  .coaches-section {
    display: none;
  }

  .info-grid,
  .testimonials-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .card-grid,
  .topics-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ===== Scroll fade-in ===== */
/* Only when scripts run (html.js, set in index.html): without them the sections must stay visible. */
@media (prefers-reduced-motion: no-preference) {
  html.js .fade-in-section {
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  html.js .fade-in-section.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
