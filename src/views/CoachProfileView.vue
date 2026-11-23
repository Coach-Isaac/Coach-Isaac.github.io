<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CoachTabNav from '../components/CoachTabNav.vue'
import ContactIcon from '../components/ContactIcon.vue'
import { findCoach, BOOKING_URL } from '../data/coaches'

const props = defineProps({
  coachId: { type: String, required: true },
})

const { t, tm, rt, locale } = useI18n()

const coach = computed(() => findCoach(props.coachId))
const key = (name) => `${coach.value.prefix}.${name}`
// Chinese copy puts no spaces around the name; a Latin name still gets one on each side ("想和 Isaac 聊聊嗎" vs "想和阿哲聊聊嗎").
const ctaName = computed(() => {
  if (!locale.value.startsWith('zh')) return coach.value.shortName.en
  const name = coach.value.shortName.zh
  return /^[A-Za-z]/.test(name) ? ` ${name} ` : name
})

const socialName = computed(() => {
  const platform = coach.value.social.type === 'instagram' ? 'Instagram' : 'LinkedIn'
  return `${platform}: ${coach.value.social.label}`
})

const sideSections = computed(() => [
  { id: 'focus', title: key('focus_title'), list: key('focus_list') },
  { id: 'style', title: key('style_title'), list: key('style_list'), core: key('style_core') },
  { id: 'background', title: key('background_title'), list: key('background_list') },
])
</script>

<template>
  <div v-if="coach" class="profile fade-in-up">
    <div class="container tabs-wrap">
      <CoachTabNav />
    </div>

    <!-- Header band -->
    <header class="profile-hero">
      <div class="container hero-inner">
        <div class="avatar">
          <img v-if="coach.photo" :src="coach.photo" :alt="coach.englishName" />
          <span v-else aria-hidden="true">{{ coach.initial }}</span>
        </div>
        <div class="hero-text">
          <h1 class="name">
            {{ coach.englishName }}
            <span v-if="coach.chineseName" class="name-zh">{{ coach.chineseName }}</span>
          </h1>
          <p class="role">{{ t(key('title')) }}</p>
          <div class="tags">
            <span v-for="tag in coach.tags" :key="tag" class="tag">{{ t(key(tag)) }}</span>
          </div>
          <div class="hero-actions">
            <a :href="BOOKING_URL" target="_blank" rel="noopener" class="btn btn-accent">{{ t('nav.free_trial_cta') }}</a>
            <a :href="`mailto:${coach.email}`" class="icon-link" :aria-label="`Email ${coach.email}`">
              <ContactIcon type="email" />
            </a>
            <a :href="coach.social.url" target="_blank" rel="noopener" class="icon-link" :aria-label="socialName">
              <ContactIcon :type="coach.social.type" />
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- Body: one column on phones, two columns from 960px -->
    <div class="container layout">
      <section class="card about">
        <h2 class="sec-title">{{ t(key('about_title')) }}</h2>
        <p class="lead-quote">{{ t(key('about_quote')) }}</p>
        <p class="body-text">{{ t(key('about_content')) }}</p>
      </section>

      <aside class="side">
        <div class="side-card">
          <section v-for="s in sideSections" :key="s.id" class="side-section">
            <h3 class="side-title">{{ t(s.title) }}</h3>
            <ul class="dot-list">
              <li v-for="(item, i) in tm(s.list)" :key="i">{{ rt(item) }}</li>
            </ul>
            <p v-if="s.core" class="core">{{ t(s.core) }}</p>
          </section>
          <section class="side-section">
            <h3 class="side-title">{{ t('profile.contact') }}</h3>
            <a :href="`mailto:${coach.email}`" class="contact-link">
              <ContactIcon type="email" />
              <span>{{ coach.email }}</span>
            </a>
            <a :href="coach.social.url" target="_blank" rel="noopener" class="contact-link" :aria-label="socialName">
              <ContactIcon :type="coach.social.type" />
              <span>{{ coach.social.label }}</span>
            </a>
          </section>
        </div>
      </aside>

      <blockquote class="pull-quote">{{ t(key('focus_quote')) }}</blockquote>

      <section class="card practice">
        <h2 class="sec-title">{{ t(key('practice_title')) }}</h2>
        <p class="body-text">{{ t(key('practice_content')) }}</p>
        <ul class="check-list">
          <li v-for="(item, i) in tm(key('practice_list'))" :key="i">{{ rt(item) }}</li>
        </ul>
      </section>

      <section class="cta-card">
        <div>
          <h2>{{ t('profile.cta_title', { name: ctaName }) }}</h2>
          <p>{{ t('profile.cta_desc') }}</p>
        </div>
        <a :href="BOOKING_URL" target="_blank" rel="noopener" class="btn btn-accent">{{ t('nav.free_trial_cta') }}</a>
      </section>
    </div>
  </div>
</template>

<style scoped>
.profile {
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

.tabs-wrap {
  padding-top: 1.25rem;
}

.tabs-wrap :deep(.coach-tabs) {
  margin-bottom: 1.25rem;
}

/* ===== Buttons ===== */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 1.4rem;
  border-radius: 999px;
  font-weight: 700;
  white-space: nowrap;
  transition: transform 0.2s;
}

.btn-accent {
  background: var(--color-secondary);
  color: var(--accent-ink);
}

.btn-accent:hover {
  color: var(--accent-ink);
  transform: translateY(-1px);
}

/* ===== Header band ===== */
.profile-hero {
  background: var(--hero-gradient);
  color: var(--on-hero);
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.avatar {
  flex: none;
  width: 104px;
  height: 104px;
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--on-hero) 16%, transparent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--on-hero) 30%, transparent);
  font-family: var(--font-heading);
  font-size: 2.6rem;
  font-weight: 700;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.name {
  margin: 0;
  font-size: clamp(1.8rem, 7vw, 2.6rem);
  line-height: 1.2;
  color: var(--on-hero);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  gap: 0.25rem 0.6rem;
}

.name-zh {
  font-size: 0.7em;
  opacity: 0.85;
}

.role {
  margin: 0.4rem 0 0;
  opacity: 0.9;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 0.75rem;
}

.tag {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--on-hero) 16%, transparent);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.25rem;
}

.icon-link {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--on-hero);
  box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--on-hero) 55%, transparent);
}

.icon-link:hover {
  color: var(--on-hero);
  background: color-mix(in srgb, var(--on-hero) 12%, transparent);
}

/* ===== Body ===== */
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas:
    "about"
    "side"
    "quote"
    "practice"
    "cta";
  gap: 1rem;
  padding-top: 1.5rem;
}

.about { grid-area: about; }
.side { grid-area: side; }
.pull-quote { grid-area: quote; }
.practice { grid-area: practice; }
.cta-card { grid-area: cta; }

.card,
.side-card {
  background: var(--color-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}

.sec-title {
  font-size: 1.35rem;
  margin: 0 0 0.9rem;
  color: var(--text-main);
}

.lead-quote {
  margin: 0 0 1rem;
  font-size: 1.1rem;
  line-height: 1.7;
  font-weight: 600;
  color: var(--color-primary);
}

.body-text {
  margin: 0 0 1rem;
  line-height: 1.85;
  color: var(--text-main);
}

.body-text:last-child {
  margin-bottom: 0;
}

.side-section + .side-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.side-title {
  margin: 0 0 0.75rem;
  font-size: 1.05rem;
  color: var(--text-main);
}

.dot-list,
.check-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.6rem;
}

.dot-list li,
.check-list li {
  position: relative;
  padding-left: 1.4rem;
  line-height: 1.6;
}

.dot-list li {
  font-size: 0.95rem;
  color: var(--text-muted);
}

.dot-list li::before {
  content: '';
  position: absolute;
  left: 0.2rem;
  top: 0.62em;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-secondary);
}

.check-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  font-weight: 700;
  color: var(--accent-text);
}

.core {
  margin: 0.9rem 0 0;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-sm);
  background: var(--color-soft);
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--text-main);
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-height: 44px;
  color: var(--text-main);
  font-size: 0.92rem;
  word-break: break-all;
}

.contact-link:hover {
  color: var(--color-primary);
}

.pull-quote {
  margin: 0;
  padding: 1.5rem 1.5rem 1.5rem 1.75rem;
  border-radius: var(--radius-lg);
  background: var(--color-soft);
  border-left: 4px solid var(--color-secondary);
  font-family: var(--font-heading);
  font-size: 1.15rem;
  line-height: 1.75;
  color: var(--text-main);
}

.cta-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.75rem 1.5rem;
  border-radius: var(--radius-lg);
  background: var(--hero-gradient);
  color: var(--on-hero);
}

.cta-card h2 {
  margin: 0 0 0.35rem;
  font-size: 1.35rem;
  color: var(--on-hero);
}

.cta-card p {
  margin: 0;
  opacity: 0.88;
}

/* ===== ≥ 600px ===== */
@media (min-width: 600px) {
  .hero-inner {
    flex-direction: row;
    text-align: left;
    gap: 1.75rem;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }

  .avatar {
    width: 128px;
    height: 128px;
    font-size: 3rem;
  }

  .name,
  .tags,
  .hero-actions {
    justify-content: flex-start;
  }

  .card,
  .side-card {
    padding: 1.75rem 2rem;
  }

  .cta-card {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
  }
}

/* ===== ≥ 960px: two columns ===== */
/* The side card is not sticky: it can be taller than the viewport (Isaac's background has six items). */
@media (min-width: 960px) {
  .layout {
    grid-template-columns: minmax(0, 1fr) 340px;
    /* The empty 4th row absorbs the extra height of a tall side card, so the left cards stay packed at the top */
    grid-template-rows: auto auto auto 1fr auto;
    grid-template-areas:
      "about side"
      "quote side"
      "practice side"
      ". side"
      "cta cta";
    gap: 1.25rem 1.5rem;
    padding-top: 2rem;
    align-items: start;
  }
}
</style>
