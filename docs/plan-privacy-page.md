# Plan: privacy page

Status: approved 2026-11-24 (user chose "add a privacy page"; the preview is the draft the user
reviews before release). Ships together with Cloudflare Web Analytics (PR #7).

## Requirements (confirmed by the user)

- A privacy page in en / zh-TW / zh-CN, linked from the footer.
- Facts it states, and only these:
  - Cloudflare Web Analytics: no cookies, no tracking of individuals; we see anonymous totals only.
  - Google Fonts and the Cloudflare script load from Google / Cloudflare servers.
  - Language and theme choices stay in the visitor's own browser (localStorage).
  - Booking uses Google Forms (data stored by Google). Isaac receives the answers and forwards only
    what is needed to the chosen coach. Used only to arrange and contact about sessions; not given
    to other third parties.
  - Session content is confidential; recorded and possibly transcribed with consent, only for the
    coach's ICF credential review (same as the agreement list).
  - Kept until no longer needed; the visitor can ask to see, correct or delete it at any time.
  - Contact: coach.isaac.lu@gmail.com (CONTACT_EMAIL).
- Not legal advice; the user is told so. The Google Form's own notice is the user's to write.

## Approach

- `src/views/PrivacyView.vue` (new, lazy route `/privacy`, `meta.titleKey: 'privacy.title'`).
- Text in `privacy.*` in the three locale files: title, updated date, intro, sections (title + body),
  contact line. Contact email rendered from `CONTACT_EMAIL`.
- Footer: link next to the copyright line.
- `scripts/page-meta.js`: add `/privacy` → `privacy.html` (title + intro as description); sitemap picks it up.

## Acceptance criteria

- AC1: `/privacy` shows the page in all three languages with the tab title "隱私權說明｜Coach Isaac" (zh-TW).
- AC2: Footer link reaches it from every page; layout fine at 375px and desktop, light and dark.
- AC3: `dist/privacy.html` exists with its own title/description/canonical; sitemap lists 7 URLs.
- AC4: No console errors other than the expected Cloudflare beacon CORS error on the local preview.
- AC5: After release, `curl -sI /privacy` returns 200.
