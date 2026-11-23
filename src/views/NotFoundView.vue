<script setup>
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { BOOKING_URL as bookingUrl } from '../data/coaches'

const { t } = useI18n()
</script>

<template>
  <section class="not-found">
    <p class="code" aria-hidden="true">404</p>
    <h1>{{ t('not_found.title') }}</h1>
    <p class="desc">{{ t('not_found.desc') }}</p>
    <div class="actions">
      <RouterLink to="/" class="btn btn-primary">{{ t('not_found.home') }}</RouterLink>
      <a :href="bookingUrl" target="_blank" rel="noopener" class="btn btn-accent">{{ t('nav.free_trial_cta') }}</a>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  max-width: 560px;
  margin: 0 auto;
  padding: 4rem max(1.25rem, env(safe-area-inset-right, 0px)) 4rem max(1.25rem, env(safe-area-inset-left, 0px));
  text-align: center;
}

.code {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 1;
  color: var(--color-soft);
  -webkit-text-stroke: 2px var(--color-primary);
}

h1 {
  font-size: 1.75rem;
  margin: 1.25rem 0 0.5rem;
  color: var(--text-main);
}

.desc {
  margin: 0 0 2rem;
  color: var(--text-muted);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 1.5rem;
  border-radius: 999px;
  font-weight: 700;
  white-space: nowrap;
}

.btn-primary {
  background: var(--color-primary);
  color: var(--bg-color);
}

.btn-primary:hover {
  color: var(--bg-color);
}

.btn-accent {
  background: var(--color-secondary);
  color: var(--accent-ink);
}

.btn-accent:hover {
  color: var(--accent-ink);
}
</style>
