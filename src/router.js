import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'

import ServicesView from './views/ServicesView.vue'

const CoachProfileView = () => import('./views/CoachProfileView.vue')

// meta.titleKey / meta.coachId drive the browser tab title (see App.vue).
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    // Leave room for the sticky top bar (68px on desktop, 60px on mobile)
    if (to.hash) return { el: to.hash, top: 80 }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/coaches',
      name: 'coaches',
      component: () => import('./views/CoachesIndexView.vue'),
      meta: { titleKey: 'coaches_index.title' }
    },
    {
      path: '/about', // Legacy Redirect
      redirect: '/coaches/isaac'
    },
    {
      path: '/coaches/isaac',
      name: 'coach-isaac',
      component: CoachProfileView,
      props: { coachId: 'isaac' },
      meta: { coachId: 'isaac' }
    },
    {
      path: '/coaches/pauline',
      name: 'coach-pauline',
      component: CoachProfileView,
      props: { coachId: 'pauline' },
      meta: { coachId: 'pauline' }
    },
    {
      path: '/coaches/vincent',
      name: 'coach-vincent',
      component: CoachProfileView,
      props: { coachId: 'vincent' },
      meta: { coachId: 'vincent' }
    },
    {
      path: '/services',
      name: 'services',
      component: ServicesView,
      meta: { titleKey: 'services.title' }
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('./views/PrivacyView.vue'),
      meta: { titleKey: 'privacy.title' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('./views/NotFoundView.vue'),
      meta: { titleKey: 'not_found.title' }
    }
  ]
})

export default router
