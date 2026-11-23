<script setup>
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import ContactIcon from '../components/ContactIcon.vue'
import { coaches, BOOKING_URL } from '../data/coaches'

const { t, tm, rt } = useI18n()

const coachName = (c) => t(`${c.prefix}.name`).replace(/\n/g, ' ')

// Icons for the six agreement items, in locale order:
// recording, consent, confidentiality, responsibility, scheduling, scope.
const agreementIcons = [
  '<path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z"/><path d="M19 11a7 7 0 0 1-14 0M12 18v3"/>',
  '<path d="M20 6 9 17l-5-5"/>',
  '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
  '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
]
</script>

<template>
  <div class="services fade-in-up">
    <div class="container">
      <header class="page-head">
        <h1>{{ t('services.title') }}</h1>
        <p>{{ t('services.philosophy') }}</p>
      </header>

      <!-- Process -->
      <section class="block">
        <h2 class="block-title">{{ t('services.process_title') }}</h2>
        <ol class="steps">
          <li v-for="(step, i) in tm('services.process_steps')" :key="i" class="step">
            <span class="step-no" aria-hidden="true">{{ i + 1 }}</span>
            <div class="step-body">
              <h3>{{ rt(step.title) }}</h3>
              <p>{{ rt(step.desc) }}</p>
            </div>
          </li>
        </ol>
      </section>

      <!-- Agreement -->
      <section class="block">
        <h2 class="block-title">{{ t('services.agreement_title') }}</h2>
        <ul class="agreement">
          <li v-for="(item, i) in tm('services.agreement_items')" :key="i">
            <span class="agree-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="agreementIcons[i]"></svg>
            </span>
            <div>
              <h3>{{ rt(item.title) }}</h3>
              <p>{{ rt(item.desc) }}</p>
            </div>
          </li>
        </ul>
      </section>

      <!-- Coaches -->
      <section class="block">
        <h2 class="block-title">{{ t('services.coaches_cta_title') }}</h2>
        <p class="block-sub">{{ t('services.coaches_cta_subtitle') }}</p>
        <div class="coach-grid">
          <article v-for="c in coaches" :key="c.id" class="coach-card">
            <RouterLink :to="c.route" class="card-top">
              <span class="avatar">
                <img v-if="c.photo" :src="c.photo" alt="" />
                <span v-else aria-hidden="true">{{ c.initial }}</span>
              </span>
              <span class="who">
                <span class="name">{{ coachName(c) }}</span>
                <span class="role">{{ t(`${c.prefix}.title`) }}</span>
              </span>
            </RouterLink>
            <span class="tags">
              <span v-for="tag in c.tags" :key="tag" class="tag">{{ t(`${c.prefix}.${tag}`) }}</span>
            </span>
            <div class="actions">
              <a :href="BOOKING_URL" target="_blank" rel="noopener" class="btn btn-accent">{{ t('services.cta_book') }}</a>
              <div class="contact-row">
                <a :href="`mailto:${c.email}`" class="btn btn-outline">
                  <ContactIcon type="email" />Email
                </a>
                <a :href="c.social.url" target="_blank" rel="noopener" class="btn btn-outline">
                  <ContactIcon :type="c.social.type" />{{ c.social.type === 'instagram' ? 'Instagram' : 'LinkedIn' }}
                </a>
              </div>
              <RouterLink :to="c.route" class="more">{{ t('common.view_profile') }} →</RouterLink>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.services {
  text-align: left;
  padding-bottom: 3rem;
}

.container {
  max-width: 1120px;
  margin: 0 auto;
  padding-left: max(1.25rem, env(safe-area-inset-left, 0px));
  padding-right: max(1.25rem, env(safe-area-inset-right, 0px));
  box-sizing: border-box;
}

.page-head {
  padding-top: 2rem;
  margin-bottom: 1rem;
}

.page-head h1 {
  font-size: clamp(1.75rem, 6vw, 2.4rem);
  line-height: 1.25;
  margin: 0 0 0.75rem;
  color: var(--text-main);
}

.page-head p {
  margin: 0;
  max-width: 46em;
  line-height: 1.85;
  color: var(--text-muted);
}

.block {
  margin-top: 2.5rem;
}

.block-title {
  font-size: clamp(1.35rem, 5vw, 1.7rem);
  margin: 0 0 1rem;
  color: var(--text-main);
}

.block-sub {
  margin: -0.5rem 0 1.25rem;
  color: var(--text-muted);
}

/* ===== Process: vertical timeline on phones ===== */
.steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0;
}

.step {
  position: relative;
  display: flex;
  gap: 1rem;
  padding-bottom: 1.5rem;
}

.step:last-child {
  padding-bottom: 0;
}

/* connector line between numbers */
.step:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 21px;
  top: 46px;
  bottom: 4px;
  width: 2px;
  background: var(--border-color);
}

.step-no {
  flex: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--hero-gradient);
  color: var(--on-hero);
  font-weight: 700;
  font-size: 1.1rem;
}

.step-body h3 {
  margin: 0.55rem 0 0.35rem;
  font-size: 1.1rem;
  color: var(--text-main);
}

.step-body p {
  margin: 0;
  line-height: 1.75;
  color: var(--text-muted);
}

/* ===== Agreement list ===== */
.agreement {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
}

.agreement li {
  display: flex;
  gap: 0.9rem;
  padding: 1.1rem 1.25rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--border-color);
}

.agree-icon {
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: var(--color-soft);
  color: var(--color-primary);
}

.agree-icon svg {
  width: 20px;
  height: 20px;
}

.agreement h3 {
  margin: 0.1rem 0 0.3rem;
  font-size: 1rem;
  color: var(--text-main);
}

.agreement p {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--text-muted);
}

/* ===== Coach cards ===== */
.coach-grid {
  display: grid;
  gap: 1rem;
}

.coach-card {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1.5rem;
  background: var(--color-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
}

.card-top {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  color: var(--text-main);
}

.card-top:hover {
  color: var(--color-primary);
}

.avatar {
  flex: none;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: var(--color-soft);
  color: var(--color-primary);
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 700;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.who {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.name {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
}

.role {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  background: var(--color-soft);
  color: var(--color-primary);
}

.actions {
  margin-top: auto;
  display: grid;
  gap: 0.6rem;
}

.contact-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: 44px;
  padding: 0 1rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.92rem;
  white-space: nowrap;
}

.btn-accent {
  background: var(--color-secondary);
  color: var(--accent-ink);
}

.btn-accent:hover {
  color: var(--accent-ink);
}

.btn-outline {
  color: var(--color-primary);
  box-shadow: inset 0 0 0 1.5px var(--border-color);
}

.btn-outline:hover {
  color: var(--color-primary);
  box-shadow: inset 0 0 0 1.5px var(--color-primary);
}

.more {
  justify-self: center;
  padding: 0.5rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-primary);
}

/* ===== Breakpoints ===== */
@media (max-width: 359px) {
  .contact-row {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 640px) {
  .coach-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Two columns: let an odd last card span the row instead of sitting alone */
@media (min-width: 640px) and (max-width: 959px) {
  .coach-card:last-child:nth-child(odd) {
    grid-column: 1 / -1;
  }
}

@media (min-width: 768px) {
  .agreement {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .steps {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .step {
    flex-direction: column;
    padding: 1.5rem;
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    border: 1px solid var(--border-color);
  }

  .step:not(:last-child)::before {
    display: none;
  }

  .step-body h3 {
    margin-top: 0;
  }

  .coach-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
