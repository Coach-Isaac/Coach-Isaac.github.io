// Single source for coach facts shown on the home, coaches, services and profile pages.
// Translated text (title, tags, bio…) lives in src/locales under each coach's `prefix`.

export const BOOKING_URL = 'https://forms.gle/t65d74KfDD28cQkaA'

export const coaches = [
  {
    id: 'isaac',
    route: '/coaches/isaac',
    prefix: 'coach_isaac',
    initial: 'I',
    photo: null,
    englishName: 'Isaac Lu',
    chineseName: null,
    shortName: { en: 'Isaac', zh: 'Isaac' },
    tags: ['tag_career', 'tag_relationships'],
    email: 'coach.isaac.lu@gmail.com',
    social: { type: 'instagram', url: 'https://www.instagram.com/coach.isaac.lu/', label: '@coach.isaac.lu' },
  },
  {
    id: 'pauline',
    route: '/coaches/pauline',
    prefix: 'coach_pauline',
    initial: '林',
    photo: null,
    englishName: 'Pauline Lin',
    chineseName: '林依雯',
    shortName: { en: 'Pauline', zh: 'Pauline' },
    tags: ['tag_self', 'tag_transition'],
    email: 'hrpaulinelin@gmail.com',
    social: { type: 'linkedin', url: 'https://www.linkedin.com/in/paulinelin/', label: 'Pauline Lin' },
  },
  {
    id: 'vincent',
    route: '/coaches/vincent',
    prefix: 'coach_vince',
    initial: '哲',
    photo: null,
    englishName: 'Vincent Li',
    chineseName: '阿哲',
    shortName: { en: 'Vincent', zh: '阿哲' },
    tags: ['tag_leadership', 'tag_performance'],
    email: 'coach_vincewli@myyahoo.com',
    social: { type: 'linkedin', url: 'https://www.linkedin.com/in/vincent-w-li-8924372a9', label: 'Vincent W. Li' },
  },
]

export const findCoach = (id) => coaches.find((c) => c.id === id)
