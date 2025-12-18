<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div class="about-container page-container fade-in-up">
    <section class="bio-section">
      <h1>{{ t('about.title') }}</h1>
      <p class="intro">{{ t('about.intro') }}</p>
      
      <div class="bio-card">
        <h2>{{ t('about.bio_title') }}</h2>
        <p>{{ t('about.bio_content') }}</p>
      </div>
    </section>

    <section class="credentials-section">
      <h2>{{ t('about.icf_title') }}</h2>
      <p>{{ t('about.icf_desc') }}</p>

      <div class="credential-grid">
        <div class="cred-card">
          <h3>ICF / ACC</h3>
          <p>{{ t('about.credentials.acc') }}</p>
        </div>
        <div class="cred-card highlight">
          <h3>PCC Goal</h3>
          <p>{{ t('about.credentials.pcc') }}</p>
        </div>
      </div>
      
      <div class="mindset-box">
        <blockquote>{{ t('about.credentials.mindset') }}</blockquote>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-container {
  /* max-width handled by page-container */
}

.intro {
  font-size: 1.2rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.bio-card {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 16px; /* More rounded */
  border: 1px solid var(--border-color);
  margin-bottom: 3rem;
}

.credentials-section {
  text-align: left;
}

.credentials-section h2 {
  color: var(--color-primary);
}

.credential-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin: 2rem 0;
}

@media (min-width: 768px) {
  .credential-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.cred-card {
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.cred-card.highlight {
  border-color: var(--color-secondary);
  background: rgba(66, 185, 131, 0.05);
}

.cred-card h3 {
  color: var(--color-primary);
  margin-top: 0;
}

.mindset-box {
  background: var(--color-primary);
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
}

.mindset-box blockquote {
  margin: 0;
  font-style: italic;
  font-size: 1.1rem;
}
</style>
