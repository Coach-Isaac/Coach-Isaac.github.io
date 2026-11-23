# Plan: per-page share previews, search indexing, language detection, FAQ

Status: approved 2026-11-24. Items 1, 2, 4 and 5 from the 2026-11-24 suggestion list.
Item 3 (analytics), coach photos and Vincent's copy are out of scope.

## Requirements (confirmed by the user)

1. Coach profile, coaches and services URLs must stop returning HTTP 404, and each must carry its own
   share preview (title, description) so LINE and Google see the right page.
2. Add `sitemap.xml` and `robots.txt`. Google Search Console registration is done by the user later.
3. First visit picks the language from the browser; a language the visitor chose before still wins.
4. Add a FAQ section, written in all three languages, with these confirmed answers:
   - Meeting software: depends on the coach (Google Meet or Zoom); the coach sends the link once the time is set.
   - Online first; meeting in person can be discussed.
   - The thank-you (coffee, a drink or a book) is decided freely after the session; no fixed amount.
   - No commitment after the intro session; decide afterwards whether to continue (about 3 to 6 sessions).
   - Confidentiality and recording, coaching vs. counselling, language: reuse what the agreement list
     and site already say. No new facts.

## Out of scope

- Analytics, coach photos, Vincent's copy, per-coach share images (all pages keep `og-image.png`).
- Full prerendering of page content. Google renders the Vue app itself; only the `<head>` is generated.
- `.github/` (the workflow keeps `npm run build` then `cp dist/index.html dist/404.html`).
- No new npm packages.

## Approach

### 1. Per-page HTML files (build step)

- New `scripts/page-meta.js`, run after Vite: `"build": "vite build && node scripts/page-meta.js"`.
- It reads `dist/index.html` and writes one copy per page with that page's `<title>`, description,
  `og:*`, `twitter:*` and a `<link rel="canonical">`:

  | URL | File | Title (zh-TW) |
  |---|---|---|
  | `/` | `index.html` (left untouched; CI copies it to `404.html`) | unchanged |
  | `/coaches` | `coaches.html` and `coaches/index.html` | 我們的教練團隊｜Coach Isaac |
  | `/coaches/isaac` | `coaches/isaac.html` | Isaac Lu｜Coach Isaac |
  | `/coaches/pauline` | `coaches/pauline.html` | 林依雯 Pauline Lin｜Coach Isaac |
  | `/coaches/vincent` | `coaches/vincent.html` | 阿哲 Vincent Li｜Coach Isaac |
  | `/services` | `services.html` | 服務流程與方案｜Coach Isaac |

- Text comes from `src/locales/zh-TW.json` and `src/data/coaches.js`, the same sources the pages use,
  so the preview cannot drift from the page. Coach description: title, tags, then the coach's `intro`.
- `file.html` rather than `file/index.html`: GitHub Pages serves `/coaches/isaac` from
  `coaches/isaac.html` with HTTP 200 and no redirect, so URLs stay exactly as they are today.
- The build fails (non-zero exit) if a tag to replace is not found exactly once, or a text key is
  missing, so a broken preview never ships silently.
- Unknown URLs still fall back to `404.html` and show the 404 page, as today. `/about` still redirects.

Risk: GitHub does not document what wins when `coaches.html` and the folder `coaches/` both exist.
`coaches/index.html` is written too, so if the folder wins, `/coaches` redirects to `/coaches/` and
still gets the right page with status 200. Checked with curl after release.

The build also fails if a locale text used in a preview contains vue-i18n syntax (`{`, `}`, `@`),
because the script reads raw strings.

### 2. Search indexing

- The same script writes `dist/sitemap.xml` from the page list above.
- `public/robots.txt`: allow all, point to the sitemap.

### 3. Language detection (`src/i18n.js`)

- Order: saved choice → first supported browser language → `en`.
- Mapping: `zh-TW`, `zh-HK`, `zh-MO`, `zh-Hant*`, bare `zh` → `zh-TW`; `zh-CN`, `zh-SG`, `zh-MY`, `zh-Hans*`
  (also with `_`) → `zh-CN`; `en*` → `en`; no supported language → `en`.
- A browser set to English first and Chinese second gets English, even in Taiwan.
- Crawlers (user agent with `bot/`, a whole-word `bot`, crawler, spider) always get `zh-TW`, so Google
  indexes the Chinese page that matches the zh-TW share preview.
- Detection does not save anything; only a manual switch saves (unchanged).

### 4. FAQ (`src/views/ServicesView.vue`, three locale files)

- New section after the agreement list and before the coach cards, as `<details>` items (no JS).
- Six questions: software, in person, the thank-you, continuing after the intro, confidentiality and
  recording, coaching vs. counselling.

## Acceptance criteria

- AC1: After release, `curl -sI` on `/coaches`, `/services` and the three profile URLs returns 200
  (`/coaches` may stay 404 if GitHub prefers the folder; reported, not hidden).
- AC2: Each generated file has its own `<title>`, description, `og:title`, `og:description`, `og:url`
  and canonical, matching the table above; home `index.html` is unchanged.
- AC3: In the preview, every page still renders, navigation between pages works, and the browser
  console has no errors.
- AC4: `sitemap.xml` lists the six URLs; `robots.txt` points to it.
- AC5: With no saved choice, an English browser opens in English and a zh-CN browser in Simplified
  Chinese; a saved choice overrides the browser; a crawler user agent gets zh-TW.
- AC6: FAQ shows six questions in each language, opens and closes by tap and keyboard, and matches the
  site style at 375px and desktop widths.
- AC7: `npm run build` fails if a meta tag or locale key the script needs is missing.

## Verification

- Build locally, read the generated files in `dist/`, browse each URL on the preview at 375px and
  desktop, test language by setting the browser language where the browse tool allows it.
- After release: `coach-wait-live <SHA> sitemap.xml robots.txt coaches/isaac.html`, then `curl -sI` the URLs.
- Peer review: run by a fresh subagent (user opted in). No Blocker/High. Fixed: `coaches/index.html`
  fallback, no canonical on home/404, narrower crawler check, `zh-MY` and `zh_CN`, raw-syntax check on
  preview text, FAQ transcript wording and styling aligned with the agreement list. Not changed:
  `/coaches/isaac.html` typed directly shows the 404 page (nothing links there; canonical is correct).
