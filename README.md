# Stepflect｜進一程

Website for Stepflect, a team of three ICF coaches in training who offer a 45-minute online intro
coaching session. Live at https://coach-isaac.github.io/ (English, 繁體中文, 简体中文).
The site was called "Coach Isaac" until November 2026; the URL and repository name are unchanged.

## Develop

```
npm ci
npm run dev      # local dev server
npm run build    # client + SSR bundles, then scripts/page-meta.js (heads, sitemap),
                 # scripts/prerender.js (page bodies) and scripts/verify-dist.js (checks); see docs/technical-seo.md
npm run preview  # serve the build locally
```

## Where things live

- Page text in three languages: `src/locales/{en,zh-TW,zh-CN}.json`
- Coach details and booking links: `src/data/coaches.js`
- Pages: `src/views/`, shared parts: `src/components/`
- Languages: zh-TW at `/`, English at `/en/`, Simplified Chinese at `/zh-CN/` (`src/locale-paths.js`)
- Brand: `docs/brand-guide.md` (name, voice, wording rules), `docs/design-spec.md` (logo, colors,
  assets); the logo component is `src/components/BrandLogo.vue`
- Search and content: `docs/technical-seo.md` (pre-rendering, metadata, hreflang, structured data,
  robots), `docs/content-strategy.md` (search intent, session topics), `docs/deployment-checklist.md`
  (release, Search Console, external brand checks)
- Share image source: `docs/og-card.html` (screenshot at 1200×630 into `public/og-image.png`)
- Plans and acceptance criteria for past changes: `docs/`

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to the
`gh-pages` branch that GitHub Pages serves.
