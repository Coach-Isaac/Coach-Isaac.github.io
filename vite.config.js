import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
  // DIST_DIR lets a check build go elsewhere without touching the preview's dist/ (see scripts/).
  build: { outDir: process.env.DIST_DIR || 'dist' },
})
