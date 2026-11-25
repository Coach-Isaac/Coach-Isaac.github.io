import { createRouter } from 'vue-router'
import HomeView from './views/HomeView.vue'
import ServicesView from './views/ServicesView.vue'
import { LOCALES, localePath } from './locale-paths'

const CoachProfileView = () => import('./views/CoachProfileView.vue')
const CoachesIndexView = () => import('./views/CoachesIndexView.vue')
const PrivacyView = () => import('./views/PrivacyView.vue')
const NotFoundView = () => import('./views/NotFoundView.vue')

// Language-neutral pages. Each is registered once per language (see locale-paths.js);
// meta.titleKey / meta.coachId drive the tab title (see App.vue).
const pages = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/coaches', name: 'coaches', component: CoachesIndexView, meta: { titleKey: 'coaches_index.title' } },
  { path: '/coaches/isaac', name: 'coach-isaac', component: CoachProfileView, props: { coachId: 'isaac' }, meta: { coachId: 'isaac' } },
  { path: '/coaches/pauline', name: 'coach-pauline', component: CoachProfileView, props: { coachId: 'pauline' }, meta: { coachId: 'pauline' } },
  { path: '/coaches/vincent', name: 'coach-vincent', component: CoachProfileView, props: { coachId: 'vincent' }, meta: { coachId: 'vincent' } },
  { path: '/services', name: 'services', component: ServicesView, meta: { titleKey: 'site.services_page_title' } },
  { path: '/privacy', name: 'privacy', component: PrivacyView, meta: { titleKey: 'privacy.title' } },
]

function localizedRoutes(locale) {
  const suffix = locale === 'zh-TW' ? '' : `-${locale}`
  return [
    ...pages.map((page) => ({
      ...page,
      path: localePath(page.path, locale),
      name: `${page.name}${suffix}`,
      meta: { ...page.meta, locale, basePath: page.path },
    })),
    // GitHub Pages serves index.html at this address too; show home instead of the 404 page.
    { path: localePath('/index.html', locale), redirect: localePath('/', locale) },
    // Old address of Isaac's page.
    { path: localePath('/about', locale), redirect: localePath('/coaches/isaac', locale) },
  ]
}

// vue-router ranks routes by specificity, not order: "/en/:pathMatch" (static first segment) wins
// over the root catch-all, and real pages win over both.
const routes = [
  ...LOCALES.filter((l) => l !== 'zh-TW').flatMap((locale) => [
    ...localizedRoutes(locale),
    {
      path: `${localePath('/', locale)}:pathMatch(.*)*`,
      name: `not-found-${locale}`,
      component: NotFoundView,
      meta: { titleKey: 'not_found.title', locale },
    },
  ]),
  ...localizedRoutes('zh-TW'),
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView, meta: { titleKey: 'not_found.title', locale: 'zh-TW' } },
]

// One router per app instance: the build renders each page with its own (memory history),
// the browser uses web history.
export function createAppRouter(history) {
  return createRouter({
    history,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition
      // Leave room for the sticky top bar (68px on desktop, 60px on mobile)
      if (to.hash) return { el: to.hash, top: 80 }
      return { top: 0 }
    },
    routes,
  })
}
