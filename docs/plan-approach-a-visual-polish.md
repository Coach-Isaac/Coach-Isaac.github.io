<!-- /autoplan restore point: /Users/isaaclu/.gstack/projects/Coach-Isaac-Coach-Isaac.github.io/develop-autoplan-restore-20260422-163416.md -->
# Plan: Approach A — Visual Polish (5 UI Improvements)

Branch: develop
Repo: Coach-Isaac/Coach-Isaac.github.io
Date: 2026-04-22
Status: DRAFT
Design doc: docs/design-client-acquisition.md

## Context

This is a coaching services website (Vue.js SPA, GitHub Pages) for three ICF-in-training coaches. The site exists to attract clients. The design doc approved "Approach B" (booking flow + positioning improvements) which has already shipped. This plan is for "Approach A Visual Polish" — 5 visual/UX improvements identified during a brainstorm session (/office-hours) to beautify and improve the site's perceived quality.

A wireframe was presented to the user showing all 5 changes. User approved it as "感覺不錯" (looks good). These are purely frontend changes to the Vue.js SPA — no backend, no new routes, no new dependencies.

## The 5 Improvements

### ① Hero Geometric Decoration
**What:** Add subtle decorative geometric shapes (2-3 faint circles) and a ✦ symbol to the hero section background. Purely decorative, CSS-only.
**Why:** The hero currently looks flat. The circles add visual depth without competing with the headline.
**Files:** `src/views/HomeView.vue` — add CSS pseudo-elements or extra `<div>` elements inside `.hero`
**Approach:** Add absolutely-positioned `<div class="hero-deco-circle">` elements + CSS. No JS.

### ② Testimonial Large Quote Marks
**What:** Add an oversized `"` (48px, color: var(--color-secondary), opacity: 0.10) as decorative background element on each testimonial card.
**Why:** Immediately signals "this is a testimonial" and adds modern magazine-style design language.
**Files:** `src/views/HomeView.vue` — modify `.testimonial-card` CSS
**Approach:** CSS `::before` pseudo-element with `content: '"'`, positioned top-left of each card.

### ③ Trust Strip SVG Icons
**What:** Replace the current emoji icons in the trust strip (🏅💬🌐🔒☕) with clean inline SVG icons.
**Why:** Emoji rendering is inconsistent cross-platform (especially Windows vs Mac, light/dark mode). SVGs are crisp, consistent, and look more professional.
**Files:** `src/views/HomeView.vue` — the trust strip rendering
**Approach:** Keep locale emoji data unchanged; map positions to hardcoded SVG icons in the template. No locale structure changes.

### ④ Mobile Fixed Bottom Booking Bar
**What:** On mobile viewports (< 768px), show a fixed green bottom bar linking to the Google Form booking URL.
**Why:** The main CTA (booking button) is in the hero, which the user scrolls past. On mobile there is no persistent CTA. This increases conversion without disrupting desktop layout.
**Files:** `src/views/HomeView.vue` — add new `<div class="mobile-booking-bar">` + CSS
**Approach:**
  - New fixed `<div>` at bottom with `position: fixed; bottom: 0; left: 0; right: 0`
  - Only visible on mobile via `@media (max-width: 767px)`
  - Uses existing `bookingUrl` ref from the component
  - Green gradient matching `--color-primary`
  - Accounts for iOS Safari's bottom notch (padding-bottom: env(safe-area-inset-bottom))
  - Uses `t('services.cta_book')` for the button label (trilingual)

### ⑤ Scroll Fade-In Animation
**What:** Sections fade in from slightly below when they enter the viewport, using IntersectionObserver.
**Why:** Modern sites use scroll animations to give a sense of progression and polish. IntersectionObserver is built-in, zero dependencies, performant.
**Files:** `src/views/HomeView.vue` (primary); optionally `ServicesView.vue`, `AboutView.vue`
**Approach:**
  - CSS: `.fade-in-section { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }`
  - CSS: `.fade-in-section.is-visible { opacity: 1; transform: translateY(0); }`
  - In `onMounted()`: create IntersectionObserver, observe all `.fade-in-section` elements, add `.is-visible` on intersection
  - Disconnect observer `onUnmounted()` to prevent memory leaks
  - Apply to: testimonial cards (staggered 0s/0.1s/0.2s delay), coaching cards, trust strip, section headings
  - Respect `prefers-reduced-motion`: wrap transition in `@media (prefers-reduced-motion: no-preference)`

## Technical Stack

- Vue 3 + Composition API (`<script setup>`)
- vue-i18n for all text strings
- CSS custom properties (`--color-primary: #4a6741`, `--color-secondary: #c17f4a`)
- No animation libraries (IntersectionObserver + CSS transitions only)
- No new npm dependencies

## Files Affected

1. `src/views/HomeView.vue` — all 5 changes
2. Optionally: `src/views/ServicesView.vue`, `src/views/AboutView.vue` — scroll animation only

## Constraints

- No new npm dependencies
- Must work on iOS Safari (safe-area-inset-bottom)
- Must not break existing mobile RWD at 375px, 390px, 768px
- Respect `prefers-reduced-motion`
- Observer must be disconnected on unmount (no memory leaks)

## Out of Scope

- Coach photos
- New routes or pages
- Content/copy changes
- SEO / GA tracking

## Success Criteria

- Hero has subtle geometric background decoration
- Testimonial cards show large decorative quote mark
- Trust strip icons are crisp SVGs cross-platform
- Mobile: fixed booking bar at bottom when scrolled
- Sections animate on scroll (skipped if prefers-reduced-motion)
- No regressions at 375px/390px/768px

## Decision Audit Trail

| # | Phase | Decision | Classification | Principle | Rationale | Rejected |
|---|-------|----------|----------------|-----------|-----------|---------|
