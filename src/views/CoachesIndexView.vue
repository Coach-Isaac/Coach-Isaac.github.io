<script setup>
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import CoachTabNav from '../components/CoachTabNav.vue'
import { coaches } from '../data/coaches'

const { t } = useI18n()
const coachName = (c) => t(`${c.prefix}.name`).replace(/\n/g, ' ')
</script>

<template>
  <div class="coaches fade-in-up">
    <div class="container">
      <div class="tabs-wrap">
        <CoachTabNav />
      </div>

      <header class="page-head">
        <h1>{{ t('coaches_index.title') }}</h1>
        <p>{{ t('coaches_index.subtitle') }}</p>
      </header>

      <div class="coach-grid">
        <RouterLink
          v-for="c in coaches"
          :key="c.id"
          :to="c.route"
          class="coach-card"
          :aria-label="`${coachName(c)} — ${t('common.view_profile')}`"
        >
          <div class="card-top">
            <span class="avatar">
              <img v-if="c.photo" :src="c.photo" alt="" />
              <span v-else aria-hidden="true">{{ c.initial }}</span>
            </span>
            <span class="who">
              <span class="name">{{ coachName(c) }}</span>
              <span class="role">{{ t(`${c.prefix}.title`) }}</span>
            </span>
          </div>
          <span class="tags">
            <span v-for="tag in c.tags" :key="tag" class="tag">{{ t(`${c.prefix}.${tag}`) }}</span>
          </span>
          <span class="intro">{{ t(`${c.prefix}.intro`) }}</span>
          <span class="more">{{ t('common.view_profile') }} →</span>
        </RouterLink>
      </div>

      <!-- ICF credentials -->
      <section class="cred-panel">
        <h2>{{ t('about.icf_title') }}</h2>
        <p class="cred-desc">{{ t('about.icf_desc') }}</p>
        <div class="cred-grid">
          <div class="cred-card">
            <span class="cred-badge">{{ t('about.credentials.acc_title') }}</span>
            <p>{{ t('about.credentials.acc') }}</p>
          </div>
          <div class="cred-card">
            <span class="cred-badge goal">{{ t('about.credentials.pcc_title') }}</span>
            <p>{{ t('about.credentials.pcc') }}</p>
          </div>
        </div>
        <blockquote class="mindset">{{ t('about.credentials.mindset') }}</blockquote>
      </section>
    </div>
  </div>
</template>

<style scoped>
.coaches {
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

.page-head {
  margin: 0.5rem 0 1.5rem;
}

.page-head h1 {
  font-size: clamp(1.75rem, 6vw, 2.4rem);
  line-height: 1.25;
  margin: 0 0 0.4rem;
  color: var(--text-main);
}

.page-head p {
  margin: 0;
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
  color: var(--text-main);
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}

.coach-card:hover {
  color: var(--text-main);
  transform: translateY(-3px);
  box-shadow: var(--shadow-card);
  border-color: color-mix(in srgb, var(--color-primary) 35%, var(--border-color));
}

.card-top {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.avatar {
  flex: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: var(--color-soft);
  color: var(--color-primary);
  font-family: var(--font-heading);
  font-size: 1.5rem;
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
  font-size: 1.2rem;
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

.intro {
  flex: 1;
  font-size: 0.93rem;
  line-height: 1.75;
  color: var(--text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.more {
  font-weight: 700;
  font-size: 0.92rem;
  color: var(--color-primary);
}

/* ===== Credentials ===== */
.cred-panel {
  margin-top: 2.5rem;
  padding: 1.75rem 1.5rem;
  border-radius: var(--radius-xl);
  background: var(--color-soft);
}

.cred-panel h2 {
  margin: 0 0 0.5rem;
  font-size: 1.4rem;
  color: var(--text-main);
}

.cred-desc {
  margin: 0 0 1.25rem;
  line-height: 1.8;
  color: var(--text-muted);
}

.cred-grid {
  display: grid;
  gap: 0.9rem;
}

.cred-card {
  padding: 1.25rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--border-color);
}

.cred-card p {
  margin: 0.6rem 0 0;
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--text-main);
}

/* Neither credential is held yet, so both badges are outlined; a solid badge would read as earned. */
.cred-badge {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  background: transparent;
  color: var(--color-primary);
  box-shadow: inset 0 0 0 1.5px var(--color-primary);
}

.cred-badge.goal {
  color: var(--accent-text);
  box-shadow: inset 0 0 0 1.5px var(--color-secondary);
}

.mindset {
  margin: 1rem 0 0;
  padding: 1.1rem 1.25rem;
  border-left: 4px solid var(--color-secondary);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  font-family: var(--font-heading);
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-main);
}

/* ===== Breakpoints ===== */
@media (min-width: 640px) {
  .coach-grid,
  .cred-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .cred-panel {
    padding: 2rem;
  }
}

/* Two columns: let an odd last card span the row instead of sitting alone */
@media (min-width: 640px) and (max-width: 959px) {
  .coach-card:last-child:nth-child(odd) {
    grid-column: 1 / -1;
  }
}

@media (min-width: 960px) {
  .coach-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .page-head {
    margin-bottom: 2rem;
  }
}
</style>
