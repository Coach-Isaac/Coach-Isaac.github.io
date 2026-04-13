<script setup>
import { useI18n } from 'vue-i18n'
const { t, tm, rt } = useI18n()

const bookingUrl = 'https://forms.gle/t65d74KfDD28cQkaA'

const coaches = [
  {
    key: 'isaac',
    nameKey: 'coach_isaac.name',
    titleKey: 'coach_isaac.title',
    tags: ['coach_isaac.tag_career', 'coach_isaac.tag_relationships'],
    email: 'coach.isaac.lu@gmail.com',
    social: { url: 'https://www.instagram.com/coach.isaac.lu/', label: 'Instagram' },
    route: '/coaches/isaac',
  },
  {
    key: 'pauline',
    nameKey: 'coach_pauline.name',
    titleKey: 'coach_pauline.title',
    tags: ['coach_pauline.tag_self', 'coach_pauline.tag_transition'],
    email: 'hrpaulinelin@gmail.com',
    social: { url: 'https://www.linkedin.com/in/paulinelin/', label: 'LinkedIn' },
    route: '/coaches/pauline',
  },
  {
    key: 'vincent',
    nameKey: 'coach_vince.name',
    titleKey: 'coach_vince.title',
    tags: ['coach_vince.tag_leadership', 'coach_vince.tag_performance'],
    email: 'coach_vincewli@myyahoo.com',
    social: { url: 'https://www.linkedin.com/in/vincent-w-li-8924372a9', label: 'LinkedIn' },
    route: '/coaches/vincent',
  },
]
</script>

<template>
  <div class="services-container page-container fade-in-up">

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

    <!-- Coach Cards CTA -->
    <section class="coaches-cta">
      <h2>{{ t('services.coaches_cta_title') }}</h2>
      <p class="coaches-cta-subtitle">{{ t('services.coaches_cta_subtitle') }}</p>
      <div class="coaches-cta-grid">
        <div v-for="coach in coaches" :key="coach.key" class="coach-cta-card">
          <div class="coach-cta-avatar">{{ t(coach.nameKey).charAt(0) }}</div>
          <h3>{{ t(coach.nameKey) }}</h3>
          <p class="coach-cta-role">{{ t(coach.titleKey) }}</p>
          <div class="coach-cta-tags">
            <span v-for="tag in coach.tags" :key="tag" class="coach-tag">{{ t(tag) }}</span>
          </div>
          <a :href="bookingUrl" target="_blank" rel="noopener" class="contact-btn book-btn">{{ t('services.cta_book') }}</a>
          <div class="coach-cta-links">
            <a :href="'mailto:' + coach.email" class="contact-btn email-btn">✉ Email</a>
            <a :href="coach.social.url" target="_blank" rel="noopener" class="contact-btn social-btn">↗ {{ coach.social.label }}</a>
          </div>
          <RouterLink :to="coach.route" class="profile-link">{{ t('common.view_profile') }} →</RouterLink>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
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

/* ===== COACH CARDS CTA ===== */
.coaches-cta {
  margin-top: 3.5rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--border-color);
}

.coaches-cta h2 {
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
  padding-left: 0.75rem;
  border-left: 4px solid var(--color-secondary);
}

.coaches-cta-subtitle {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin: 0 0 2rem 0;
  padding-left: 0.75rem;
}

.coaches-cta-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

@media (max-width: 768px) {
  .coaches-cta-grid {
    grid-template-columns: 1fr;
  }
}

.coach-cta-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.coach-cta-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-card);
}

.coach-cta-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--hero-gradient);
  color: #fff;
  font-size: 1.4rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.coach-cta-card h3 {
  margin: 0;
  color: var(--text-main);
  font-size: 1rem;
  font-weight: 700;
  white-space: pre-line;
}

.coach-cta-role {
  margin: 0;
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.coach-cta-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: center;
}

.coach-tag {
  background: var(--bg-surface, #f5f0eb);
  color: var(--color-primary);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.65rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.coach-cta-links {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.25rem;
}

.contact-btn {
  display: inline-block;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  text-decoration: none;
  transition: opacity 0.15s;
}

.contact-btn:hover {
  opacity: 0.8;
}

.book-btn {
  width: 100%;
  background: var(--hero-gradient);
  color: #fff;
  font-size: 0.9rem;
  padding: 0.55rem 1rem;
  border-radius: 20px;
  text-align: center;
}

.email-btn {
  background: var(--color-primary);
  color: #fff;
}

.social-btn {
  background: transparent;
  color: var(--color-primary);
  border: 1.5px solid var(--color-primary);
}

.profile-link {
  font-size: 0.82rem;
  color: var(--color-secondary, #b07d5b);
  text-decoration: none;
  font-weight: 600;
  margin-top: auto;
}

.profile-link:hover {
  text-decoration: underline;
}
</style>
