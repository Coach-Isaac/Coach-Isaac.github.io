<script setup>
import { computed, watch, watchEffect } from 'vue'
import NavBar from './components/NavBar.vue'
import BottomTabBar from './components/BottomTabBar.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import ContactIcon from './components/ContactIcon.vue'
import BrandLogo from './components/BrandLogo.vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { BOOKING_URL, CONTACT_EMAIL, findCoach } from './data/coaches'

const { t, locale } = useI18n()
const route = useRoute()
const bookingUrl = BOOKING_URL
const year = new Date().getFullYear()

// The pre-rendered HTML already carries lang and <title>; these keep them right while browsing.
const inBrowser = typeof document !== 'undefined'

watch(locale, (lang) => {
  if (inBrowser) document.documentElement.lang = lang
}, { immediate: true })

// Browser tab title per page and language, e.g. "林依雯 Pauline Lin｜Stepflect 進一程".
const pageName = computed(() => {
  const coach = route.meta.coachId && findCoach(route.meta.coachId)
  if (coach) return t(`${coach.prefix}.name`).replace(/\n/g, ' ')
  if (route.meta.titleKey) return t(route.meta.titleKey)
  return null
})

watchEffect(() => {
  if (!inBrowser) return
  document.title = pageName.value
    ? t('site.page_title', { page: pageName.value })
    : t('site.home_title')
})
</script>

<template>
  <div class="app-layout">
    <NavBar />

    <main>
      <RouterView />
    </main>

    <footer class="site-footer">
      <div class="footer-top">
        <div class="footer-brand">
          <RouterLink to="/" class="footer-logo" :aria-label="t('site.brand')"><BrandLogo /></RouterLink>
          <p class="footer-slogan">{{ t('footer.slogan') }}</p>
          <p class="footer-tagline">{{ t('footer.tagline') }}</p>
        </div>
        <nav class="footer-links" :aria-label="t('nav.landmark_footer')">
          <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
          <RouterLink to="/coaches">{{ t('nav.about') }}</RouterLink>
          <RouterLink to="/services">{{ t('nav.services') }}</RouterLink>
        </nav>
        <div class="footer-contact">
          <h2>{{ t('footer.contact_title') }}</h2>
          <a :href="`mailto:${CONTACT_EMAIL}`" class="contact-email">
            <ContactIcon type="email" />{{ CONTACT_EMAIL }}
          </a>
          <RouterLink to="/services#coaches" class="contact-coaches">{{ t('footer.contact_coaches') }}</RouterLink>
        </div>
        <!-- Short label: the long one squeezes the brand column on tablets and small desktops. -->
        <a :href="bookingUrl" target="_blank" rel="noopener" class="footer-cta">{{ t('nav.free_trial_cta') }}</a>
      </div>
      <div class="footer-bottom">
        <div class="footer-notice">
          <p>{{ t('footer.disclaimer') }}</p>
          <p>
            <i18n-t keypath="footer.crisis" tag="span" scope="global">
              <template #hotline><a href="tel:1925" class="hotline">1925</a></template>
            </i18n-t>
          </p>
        </div>
        <p class="footer-copy">
          &copy; {{ year }} {{ t('site.brand') }}
          <span aria-hidden="true">·</span>
          <RouterLink to="/privacy">{{ t('privacy.title') }}</RouterLink>
        </p>
      </div>
    </footer>

    <BottomTabBar />
    <ScrollToTop />
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

.site-footer {
  background: var(--color-surface);
  border-top: 1px solid var(--border-color);
  color: var(--text-muted);
  text-align: left;
  padding-top: 2rem;
  padding-bottom: calc(1rem + var(--tabbar-h) + env(safe-area-inset-bottom, 0px));
  padding-left: max(1.25rem, env(safe-area-inset-left, 0px));
  padding-right: max(1.25rem, env(safe-area-inset-right, 0px));
}

/* Phones: one left-aligned column. Tablets: brand, contact and booking in a row, links below.
   Desktop: one row of four columns. The notice and copyright sit under a rule in every layout. */
.footer-top,
.footer-bottom {
  max-width: 1120px;
  margin: 0 auto;
}

.footer-top {
  display: grid;
  gap: 0.75rem;
}

.footer-logo {
  --brand-size: 30px;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
}

.footer-brand p {
  margin: 0;
}

.footer-slogan {
  margin-top: 0.35rem !important;
  color: var(--text-main);
  font-weight: 600;
  font-size: 0.95rem;
}

.footer-tagline {
  margin-top: 0.15rem !important;
  font-size: 0.82rem;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0 1.25rem;
}

.footer-links a {
  color: var(--text-main);
  font-size: 0.92rem;
  padding: 0.45rem 0;
}

.footer-links a:hover {
  color: var(--color-primary);
}

.footer-contact {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0 1.25rem;
}

.footer-contact h2 {
  flex-basis: 100%;
  margin: 0;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--text-main);
}

.contact-email,
.contact-coaches {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 44px;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-primary);
}

.contact-email:hover,
.contact-coaches:hover {
  color: var(--color-primary-light);
}

/* Phones already have "Book" in the bottom tab bar, so the footer button starts hidden. */
.footer-cta {
  display: none;
  background: var(--color-secondary);
  color: var(--accent-ink);
  font-weight: 700;
  padding: 0.75rem 1.4rem;
  border-radius: 999px;
  white-space: nowrap;
}

.footer-cta:hover {
  color: var(--accent-ink);
}

.footer-bottom {
  margin-top: 1rem;
  padding-top: 0.9rem;
  border-top: 1px solid var(--border-color);
  display: grid;
  gap: 0.4rem;
  font-size: 0.76rem;
  line-height: 1.55;
}

.footer-notice p {
  margin: 0;
}

.hotline {
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.footer-copy {
  margin: 0;
}

.footer-copy a {
  display: inline-block;
  padding: 0.4rem 0.15rem;
  color: var(--text-muted);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.footer-copy a:hover {
  color: var(--color-primary);
}

@media (min-width: 768px) {
  .site-footer {
    padding-top: 2.25rem;
    padding-bottom: 1.25rem;
    padding-left: max(1.5rem, env(safe-area-inset-left, 0px));
    padding-right: max(1.5rem, env(safe-area-inset-right, 0px));
  }

  .footer-top {
    grid-template-columns: minmax(12rem, 1fr) auto auto;
    grid-template-areas: 'brand contact cta' 'links links links';
    align-items: start;
    column-gap: 2.5rem;
  }

  .footer-brand { grid-area: brand; }
  .footer-contact { grid-area: contact; }
  .footer-links { grid-area: links; }

  .footer-cta {
    display: inline-flex;
    grid-area: cta;
    align-self: center;
  }
}

@media (min-width: 960px) {
  .footer-top {
    grid-template-columns: minmax(12rem, 1fr) auto auto auto;
    grid-template-areas: 'brand links contact cta';
    column-gap: 3rem;
  }

  .footer-links {
    flex-direction: column;
  }

  .footer-links a {
    padding: 0.2rem 0;
  }

  .footer-contact {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-contact h2 {
    flex-basis: auto;
    margin-bottom: 0.1rem;
  }

  .contact-email,
  .contact-coaches {
    min-height: 32px;
  }

  .footer-bottom {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    column-gap: 3rem;
  }

  .footer-copy {
    text-align: right;
    white-space: nowrap;
  }
}
</style>
