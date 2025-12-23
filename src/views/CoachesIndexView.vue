<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import CoachTabNav from '../components/CoachTabNav.vue'

const { t } = useI18n()
const router = useRouter()

const coaches = [
  {
    id: 'isaac',
    nameKey: 'coach_isaac.name', 
    descriptionKey: 'coach_isaac.intro', 
    route: '/coaches/isaac'
  },
  {
    id: 'pauline',
    nameKey: 'coach_pauline.name',
    descriptionKey: 'coach_pauline.intro',
    route: '/coaches/pauline'
  }
]

const navigateTo = (path) => {
    router.push(path)
}
</script>

<template>
  <div class="coaches-container page-container fade-in-up">
    <CoachTabNav />
    <section class="hero">
      <h1>{{ t('coaches_index.title') }}</h1> 
      <p class="subtitle">{{ t('coaches_index.subtitle') }}</p>
    </section>

    <div class="coaches-grid">
      <div v-for="coach in coaches" :key="coach.id" class="coach-card" @click="navigateTo(coach.route)">
        <div class="content">
            <h2>{{ t(coach.nameKey) }}</h2>
            <p>{{ t(coach.descriptionKey) }}</p>
            <button class="view-profile-btn">{{ t('common.view_profile') || 'View Profile' }}</button>
        </div>
      </div>
    </div>

    <!-- Moved Credentials Section -->
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
.hero {
  text-align: center;
  margin-bottom: 3rem;
}
.hero h1 {
  font-size: 2.5rem;
  color: var(--text-main);
  margin-bottom: 1rem;
}
.subtitle {
  font-size: 1.2rem;
  color: var(--text-muted);
}

.coaches-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .coaches-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.coach-card {
  background: var(--bg-card);
  padding: 2.5rem 2rem;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
}

.coach-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.coach-card h2 {
    color: var(--color-primary);
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

.coach-card p {
    color: var(--text-muted);
    margin-bottom: 2rem;
    line-height: 1.6;
    flex-grow: 1;
}

.view-profile-btn {
    background-color: var(--color-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
}

.view-profile-btn:hover {
    background-color: var(--color-secondary);
}
</style>

<style scoped>
.credentials-section {
  text-align: center; /* Centered for overview page */
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.credentials-section h2 {
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.credential-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin: 2rem auto;
  max-width: 900px;
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
  text-align: left;
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
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.mindset-box blockquote {
  margin: 0;
  font-style: italic;
  font-size: 1.1rem;
}
</style>
