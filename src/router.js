import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'

import ServicesView from './views/ServicesView.vue'

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
      component: () => import('./views/CoachesIndexView.vue')
    },
    {
      path: '/about', // Legacy Redirect
      redirect: '/coaches/isaac'
    },
    {
      path: '/coaches/isaac',
      name: 'coach-isaac',
      component: () => import('./views/CoachIsaacView.vue') // Was AboutView
    },
    {
      path: '/coaches/pauline',
      name: 'coach-pauline',
      component: () => import('./views/CoachPaulineView.vue')
    },
    {
      path: '/coaches/vincent',
      name: 'coach-vincent',
      component: () => import('./views/CoachVincentView.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: ServicesView
    }
  ]
})

export default router
