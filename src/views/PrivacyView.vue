<script setup>
import { useI18n } from 'vue-i18n'
import { CONTACT_EMAIL } from '../data/coaches'

const { t, tm, rt } = useI18n()
</script>

<template>
  <article class="privacy fade-in-up">
    <header class="head">
      <h1>{{ t('privacy.title') }}</h1>
      <p class="updated">{{ t('privacy.updated') }}</p>
      <p class="intro">{{ t('privacy.intro') }}</p>
    </header>

    <section v-for="(s, i) in tm('privacy.sections')" :key="i" class="section">
      <h2>{{ rt(s.title) }}</h2>
      <p>{{ rt(s.body) }}</p>
    </section>

    <section class="section contact">
      <h2>{{ t('privacy.contact_title') }}</h2>
      <p>{{ t('privacy.contact_body') }}</p>
      <a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a>
    </section>
  </article>
</template>

<style scoped>
.privacy {
  max-width: 46rem;
  margin: 0 auto;
  padding: 2rem max(1.25rem, env(safe-area-inset-right, 0px)) 3rem max(1.25rem, env(safe-area-inset-left, 0px));
  text-align: left;
}

.head h1 {
  font-size: clamp(1.75rem, 6vw, 2.4rem);
  line-height: 1.25;
  margin: 0 0 0.4rem;
  color: var(--text-main);
}

.updated {
  margin: 0 0 1.25rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.intro {
  margin: 0;
  line-height: 1.85;
  color: var(--text-main);
}

.section {
  margin-top: 1.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.section h2 {
  margin: 0 0 0.5rem;
  font-size: 1.15rem;
  color: var(--text-main);
}

.section p {
  margin: 0;
  line-height: 1.85;
  color: var(--text-muted);
}

.contact a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-weight: 700;
  color: var(--color-primary);
}
</style>
