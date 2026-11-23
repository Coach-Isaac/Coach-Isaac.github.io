// Single source for coach facts shown on the home, coaches, services and profile pages.
// Translated text (title, tags, bio…) lives in src/locales under each coach's `prefix`.
// scripts/page-meta.js also imports this file with plain Node at build time, so it must not
// import anything Vite-only (e.g. an image file); reference photos by public URL instead.

// Booking form with no coach chosen; used by the general booking buttons.
export const BOOKING_URL = 'https://forms.gle/t65d74KfDD28cQkaA'

// Each coach's `bookingUrl` is the same form with "Which coach" pre-selected.
// Copied from Google Forms' "Get pre-filled link": the value must match the
// dropdown option text exactly, or the question silently stays blank.
// If an option is reworded in the form, regenerate that coach's link.
const FORM_PREFILL = 'https://docs.google.com/forms/d/e/1FAIpQLSc_ILHMU1RAEJYi8DtwMxVr-GWQl3yuOQEKDr2kl2gQL2ChOw/viewform?usp=pp_url&entry.832195159='

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
    bookingUrl: FORM_PREFILL + 'Isaac+Lu+%E2%80%94+%E8%81%B7%E6%B6%AF%E7%99%BC%E5%B1%95%E3%80%81%E4%BA%BA%E9%9A%9B%E9%97%9C%E4%BF%82+/+Career+Development,+Relationships',
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
    bookingUrl: FORM_PREFILL + 'Pauline+Lin+%E2%80%94+%E8%87%AA%E6%88%91%E6%8E%A2%E7%B4%A2%E3%80%81%E7%94%9F%E6%B6%AF%E8%BD%89%E6%8F%9B+/+Self-Discovery,+Career+Transition',
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
    bookingUrl: FORM_PREFILL + 'Vincent+Li+%E2%80%94+%E9%A0%98%E5%B0%8E%E5%8A%9B%E3%80%81%E5%B7%A5%E4%BD%9C%E8%A1%A8%E7%8F%BE+/+Leadership,+Performance',
  },
]

export const findCoach = (id) => coaches.find((c) => c.id === id)
