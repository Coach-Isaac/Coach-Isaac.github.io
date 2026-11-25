import { createRouter } from 'vue-router'
import HomeView from './views/HomeView.vue'

import ServicesView from './views/ServicesView.vue'

const CoachProfileView = () => import('./views/CoachProfileView.vue')

// One router per app instance: the build renders each page with its own (memory history),
// the browser uses web history. meta.titleKey / meta.coachId drive the tab title (see App.vue).
export function createAppRouter(history) {
  return createRouter({
    history,
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
        // GitHub Pages serves index.html at this path too; show home instead of the 404 page.
        path: '/index.html',
        redirect: '/'
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
}
