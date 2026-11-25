# Technical SEO

How the site is built for search engines, AI search and visitors without JavaScript. Brand rules are in
`brand-guide.md`, content direction in `content-strategy.md`, release steps in `deployment-checklist.md`.
Researched and decided 2026-11-25.

## 1. Static HTML (build-time pre-rendering)

**Before**: every page file held an empty `<div id="app"></div>`; the content appeared only after
JavaScript ran (verified in the built files).

**Now**: `npm run build` runs five steps (package.json):

1. `vite build` — the browser bundle.
2. `vite build --ssr src/entry-server.js --outDir node_modules/.cache/stepflect-ssr` — the same app
   bundled for Node, used only during the build (never deployed).
3. `node scripts/page-meta.js` — writes each page file's `<head>` (section 3).
4. `node scripts/prerender.js` — renders each address with `vue/server-renderer` and fills `#app`.
5. `node scripts/verify-dist.js` — checks the output (section 8); a failure stops the build.

GitHub Actions still runs `npm run build` and copies `dist/index.html` to `dist/404.html`; the workflow
did not change. No packages were added.

**Why this approach** (compared 2026-11-25):

| Option | Result |
|---|---|
| A. vite-ssg | Supports Vite 7 (v28.3.0, Feb 2026), but no stated vue-i18n 11 support and an open issue (#433) about custom routes not being pre-rendered — the language routes needed here. Adds a dependency. |
| **B. Vue's own `vue/server-renderer` + Vite SSR build** | **Chosen.** Already in `vue` and `vite`; the proof of concept rendered every page on the first try; full control over language routes and the existing page-meta step. |
| C. Headless-browser pre-rendering (Playwright etc.) | Needs a browser in CI and a new dependency; slower; nothing gained over B. |
| D. Nuxt static generation | Framework migration; out of proportion. |

**Hydration**: `src/main.js` reuses the pre-rendered HTML only when `<html data-prerender-path>`
matches the address; otherwise (GitHub's `404.html` copy, `/x.html` addresses) it clears it and renders
from scratch. The inline script in `index.html` hides `#app` in those cases until then
(`html.prerender-pending`).

**Browser-only code** must not run during the build: `useTheme.js` and `App.vue` check for `window` /
`document`; anything else that touches the browser belongs in `onMounted`. The theme button and
`LanguageHint` render their browser-dependent state only after mount, so the first browser render matches
the HTML. Scroll fade-ins only hide content under `html.js`, set by the inline script, so content stays
visible without JavaScript.

## 2. Languages and addresses

| Language | Home | Example |
|---|---|---|
| zh-TW (default) | `/` | `/coaches/isaac` |
| zh-CN | `/zh-CN/` | `/zh-CN/coaches/isaac` |
| en | `/en/` | `/en/coaches/isaac` |

- Rules live in `src/locale-paths.js` (`localePath`, `splitLocale`), shared by the router, components
  (`useLocalePath()`), and the build scripts. Existing zh-TW URLs did not change.
- **The address decides the language** (route `meta.locale`). A stored preference never pulls a visitor
  off an English or Simplified Chinese address.
- **Language links** (header) go to the same page in the other language and store
  `localStorage['locale-preference']`.
- **Redirect, owner decision 2026-11-25**: only the zh-TW home page `/` redirects, and only visitors who
  picked a language with the language links before (detection is never stored). Crawlers have no storage,
  so they always see each address as is. Google advises against language redirects
  ([managing multi-regional sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites));
  this narrow case keeps returning visitors in their language without affecting crawling.
- **First-time visitors** whose browser prefers another of our languages see `LanguageHint.vue`, a
  dismissible note linking to the same page in that language.
- Unknown addresses under `/en/` or `/zh-CN/` show the 404 page in that language.

## 3. Metadata (`scripts/page-meta.js`)

Single source: the locale files (`src/locales/*.json`) and `scripts/site-pages.js` (the page list).
Each page file gets, in its language:

| Tag | Source |
|---|---|
| `<html lang>` | the page language |
| `<title>` | home `site.home_title`; others `site.page_title` with the page name (coach pages: `site.coach_page_name` = name + their own title from the locale file) |
| description | home `site.home_description`; coaches index, coach pages, privacy from their content; services `site.services_description` |
| `og:title` / `og:description` | home `site.og_title` / `site.og_description`; other pages = title / description |
| `og:site_name`, `og:image:alt`, `twitter:*` | `site.brand`, `site.og_image_alt`, same as og |
| `og:locale` (+ `og:locale:alternate`) | zh_TW / zh_CN / en_US |
| `og:image` | `og-image.png?v=…` from `index.html` (raise `v` when the image changes) |

`App.vue` sets `document.title` with the same keys while browsing, so titles do not change after the
page loads. Strings read by page-meta must not use vue-i18n syntax except placeholders it fills and the
escaped `{'|'}`; the build fails otherwise.

Keep in `index.html`: Google Search Console verification, Cloudflare Web Analytics, Inter font link. They
are copied into every page file.

## 4. Canonical, hreflang, sitemap

- **Canonical**: every page file points to its own address in its own language. The zh-TW home
  (`index.html`) has none on purpose: CI copies it to `404.html`, and a canonical there would make every
  missing address claim to be the home page; without one, the page is its own canonical. Alias files
  (`about.html`, `coaches/index.html`) point to the real page.
- **hreflang**: every page lists all three languages (itself included) and `x-default` → the zh-TW page,
  per [Google](https://developers.google.com/search/docs/specialty/international/localized-versions).
- **sitemap.xml**: 21 URLs (7 pages × 3 languages) with `xhtml:link` alternates. No `lastmod`: the build
  cannot know when content last changed, and a build date on every page would be false.
- Never list the Brand Lab, previews or test pages.

## 5. Structured data (JSON-LD)

One `@graph` per page with stable `@id`s, so every page describes the same entities:

| Entity | @id | Notes |
|---|---|---|
| WebSite | `/#website` | name Stepflect, alternateName Stepflect 進一程 / 進一程 |
| Organization | `/#organization` | the coaching team brand; logo `icon-192.png`; members = the coaches. No address, legal name or registration (none exists). No `sameAs`: the brand has no official social accounts yet. |
| Service | `/#service` | one-to-one coaching; provider = Organization; languages zh, en; booking form as the channel. No price, offer or rating. |
| Person ×3 | `/coaches/<id>#person` | name, Chinese name, job title and intro from the locale files, `sameAs` = the social link shown on their page, memberOf = Organization. No credentials beyond what the site states. |
| WebPage / ProfilePage | `<page url>#webpage` | ProfilePage on coach pages (mainEntity = the coach) |

Google facts (2026-11-25): Organization has no required properties and suits a team without an address;
ProfilePage fits staff/author pages; Service and stand-alone Person have no Google search feature; the
FAQ rich result is no longer shown (since 2026-05-07), so FAQ content stays as plain page content.
Valid schema does not guarantee any rich result. Validate with https://validator.schema.org/ and
https://search.google.com/test/rich-results after release.

## 6. Robots and AI crawlers

`public/robots.txt` allows every crawler (owner decision 2026-11-25: keep allowing all, including
training crawlers).

| Crawler | Purpose | Respects robots.txt |
|---|---|---|
| Googlebot | Google Search | yes |
| Google-Extended | token only: Gemini training / grounding, not Search | robots.txt token |
| Bingbot | Bing (and Copilot, per secondary sources) | yes |
| OAI-SearchBot | ChatGPT search | yes |
| GPTBot | OpenAI training | yes |
| ChatGPT-User | user-initiated fetches | "may not apply" |
| Claude-SearchBot / ClaudeBot / Claude-User | Anthropic search / training / user fetches | yes |
| PerplexityBot / Perplexity-User | Perplexity search / user fetches | yes / generally not |
| Applebot / Applebot-Extended | Apple search / training opt-out token | yes |
| CCBot | Common Crawl | blockable via robots.txt |

To stop training while staying in search later, add `Disallow: /` groups for GPTBot, ClaudeBot,
Google-Extended, Applebot-Extended and CCBot. Sources (read 2026-11-25):
https://developers.openai.com/api/docs/bots · https://support.claude.com/en/articles/8896518 ·
https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers ·
https://docs.perplexity.ai/guides/bots · https://support.apple.com/en-us/119829 ·
https://commoncrawl.org/ccbot

**llms.txt**: not added. No search engine or AI company has said its crawler uses it, and Google states
no special files are needed for AI features. Static HTML, clear headings and structured data serve both
search engines and AI systems.

## 7. 404 and legacy addresses

- `/about` (and `/en/about`, `/zh-CN/about`) → Isaac's page; `about.html` files keep returning HTTP 200.
- `/index.html` → home.
- Unknown addresses get GitHub's `404.html` (HTTP 404) and the app shows the 404 page in the address's
  language. Not a soft 404: the status is 404.

## 8. Build checks (`scripts/verify-dist.js`)

Fails the build when any page file has: wrong `<html lang>` or `data-prerender-path`, not exactly one
title or description, no `<h1>` in the body, "Coach Isaac", a wrong or missing canonical, a missing
hreflang link, invalid JSON-LD or missing entities, a missing general booking link, or (coach pages) a
changed pre-filled booking link; or when a sitemap URL has no file. `prerender.js` also fails if any HTML
file still has an empty `#app`.

## 9. Maintenance

- **New page**: add the route in `src/router.js` (`pages`), add it to `scripts/site-pages.js` with a
  `kind`, give it a title/description case in `page-meta.js`, and texts in all three locale files.
- **New language**: add it to `LOCALES` / `LOCALE_PREFIX` in `src/locale-paths.js`, a locale file,
  `OG_LOCALE` and `PUNCT` in `page-meta.js`, and the language links in `NavBar.vue` / `LanguageHint.vue`.
- **Changing the share image**: regenerate from `docs/og-card.html` and raise `?v=` in `index.html`.
- **New domain**: write a migration plan first (redirects, canonical, sitemap, Search Console, hreflang).
  `SITE` lives in `scripts/site-pages.js`; `index.html` also has the URL in og tags.
- Lab measurements (local preview, 2026-11-25): HTML per page grew from ~3.6 kB to ~20–30 kB (body
  included); the browser JS from 228.2 kB to 246.7 kB (+18.5 kB: hydration, language routes, new texts).
  No Lighthouse is available on the build machine, so no Core Web Vitals figures are claimed; check
  PageSpeed Insights after release.
