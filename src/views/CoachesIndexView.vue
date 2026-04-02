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
    route: '/coaches/isaac',
    photo: null,
    tags: ['coach_isaac.tag_career', 'coach_isaac.tag_relationships']
  },
  {
    id: 'pauline',
    nameKey: 'coach_pauline.name',
    descriptionKey: 'coach_pauline.intro',
    route: '/coaches/pauline',
    photo: null,
    tags: ['coach_pauline.tag_self', 'coach_pauline.tag_transition']
  },
  {
    id: 'vincent',
    nameKey: 'coach_vince.name',
    descriptionKey: 'coach_vince.intro',
    route: '/coaches/vincent',
    photo: null,
    tags: ['coach_vince.tag_leadership', 'coach_vince.tag_performance']
  }
]

const getInitial = (nameKey) => {
  const name = t(nameKey)
  // Return first non-whitespace character
  return name.trim().charAt(0)
}

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
        <!-- Avatar -->
        <div class="coach-avatar">
          <img v-if="coach.photo" :src="coach.photo" :alt="t(coach.nameKey)" />
          <div v-else class="avatar-placeholder">{{ getInitial(coach.nameKey) }}</div>
        </div>
        <!-- Name -->
        <h2>{{ t(coach.nameKey) }}</h2>
        <!-- Tags -->
        <div class="coach-tags">
          <span v-for="tag in coach.tags" :key="tag" class="coach-tag">{{ t(tag) }}</span>
        </div>
        <!-- Description -->
        <p>{{ t(coach.descriptionKey) }}</p>
        <button class="view-profile-btn">{{ t('common.view_profile') || 'View Profile' }}</button>
      </div>
    </div>

    <!-- Credentials -->
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
  margin-bottom: 2.5rem;
  margin-top: 2rem;
}

.hero h1 {
  font-size: 2.2rem;
  color: var(--text-main);
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.subtitle {
  font-size: 1.1rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}

/* ===== COACHES GRID ===== */
.coaches-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 4rem;
}

@media (min-width: 640px) {
  .coaches-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .coaches-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ===== COACH CARD ===== */
.coach-card {
  background: var(--bg-card);
  padding: 2rem 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

/* Gradient top accent bar */
.coach-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: var(--hero-gradient);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.coach-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(15, 118, 153, 0.12);
  border-color: var(--color-primary);
}

/* ===== AVATAR ===== */
.coach-avatar {
  width: var(--coach-avatar-size);
  height: var(--coach-avatar-size);
  border-radius: 50%;
  margin: 0 auto 1.25rem;
  border: 3px solid var(--color-primary);
  overflow: hidden;
  background: var(--coach-avatar-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.coach-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1;
  user-select: none;
}

/* ===== NAME ===== */
.coach-card h2 {
  color: var(--text-main);
  margin: 0 0 0.6rem 0;
  font-size: 1.35rem;
  font-weight: 700;
  white-space: pre-line;
  line-height: 1.4;
}

/* ===== TAGS ===== */
.coach-tags {
  display: flex;
  gap: 0.4rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.coach-tag {
  font-size: 0.75rem;
  padding: 0.2rem 0.65rem;
  border-radius: 12px;
  background: rgba(66, 185, 131, 0.12);
  color: var(--color-secondary);
  font-weight: 600;
  border: 1px solid rgba(66, 185, 131, 0.25);
}

/* ===== DESCRIPTION ===== */
.coach-card p {
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  line-height: 1.7;
  flex-grow: 1;
  font-size: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ===== BUTTON ===== */
.view-profile-btn {
  background: transparent;
  color: var(--color-primary);
  border: 1.5px solid var(--color-primary);
  padding: 0.6rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  width: 100%;
  margin-top: auto;
}

.view-profile-btn:hover {
  background-color: var(--color-primary);
  color: #fff;
}

/* ===== CREDENTIALS ===== */
.credentials-section {
  text-align: center;
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
  gap: 1.25rem;
  margin: 2rem auto;
  max-width: 800px;
}

@media (min-width: 640px) {
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
  color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.mindset-box blockquote {
  margin: 0;
  font-style: italic;
  font-size: 1.05rem;
}
</style>
