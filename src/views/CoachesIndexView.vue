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
  },
  {
    id: 'vincent',
    nameKey: 'coach_vince.name',
    descriptionKey: 'coach_vince.intro',
    route: '/coaches/vincent'
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
  margin-top: 2rem; /* Add space from tabs */
}
.hero h1 {
  font-size: 2.5rem;
  color: var(--text-main);
  margin-bottom: 1rem;
  line-height: 1.3; /* Ensure spacing if text wraps */
}
.subtitle {
  font-size: 1.2rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin-top: 0;
}

.coaches-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px; /* Wider to fit 3 cards */
  margin: 0 auto 5rem auto;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .coaches-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .coaches-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 Columns on desktop */
  }
}

.coach-card {
  background: var(--bg-card);
  padding: 2.5rem 2rem;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05); /* Subtle base shadow */
}

.coach-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  border-color: var(--color-primary);
}

.coach-card h2 {
    color: var(--color-primary);
    margin-bottom: 1rem;
    font-size: 1.6rem;
    letter-spacing: 0.5px;
    font-weight: 600;
}

.coach-card p {
    color: var(--text-muted);
    margin-bottom: 2.5rem;
    line-height: 1.7;
    flex-grow: 1;
    font-size: 1.05rem;
    display: -webkit-box;
    -webkit-line-clamp: 5; /* Limit text lines for consistency */
    line-clamp: 5; /* Standard property */
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.view-profile-btn {
    background-color: transparent;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    padding: 0.8rem 2rem;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.9rem;
    margin-top: auto; /* Push to bottom */
}

.view-profile-btn:hover {
    background-color: var(--color-primary);
    color: white;
    box-shadow: 0 4px 12px rgba(66, 185, 131, 0.3);
}

.credentials-section {
  text-align: center;
  margin-top: 5rem; /* Increased top margin */
  padding-top: 3rem;
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
