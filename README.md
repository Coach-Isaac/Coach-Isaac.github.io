# Coach Isaac

Website for three ICF coaches in training who offer a 45-minute online intro session.
Live at https://coach-isaac.github.io/ (English, 繁體中文, 简体中文).

## Develop

```
npm ci
npm run dev      # local dev server
npm run build    # vite build, then scripts/page-meta.js writes per-page HTML and sitemap.xml
npm run preview  # serve the build locally
```

## Where things live

- Page text in three languages: `src/locales/{en,zh-TW,zh-CN}.json`
- Coach details and booking links: `src/data/coaches.js`
- Pages: `src/views/`, shared parts: `src/components/`
- Plans and acceptance criteria for past changes: `docs/`

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to the
`gh-pages` branch that GitHub Pages serves.
