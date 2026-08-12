import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ─────────────────────────────────────────────────────────────
// DUPLICATION STEP: set `site` to the real production domain.
// Required for canonical URLs + sitemap-index.xml generation.
// Also update the Sitemap line in /public/robots.txt to match.
// ─────────────────────────────────────────────────────────────
export default defineConfig({
  site: 'https://conroetreeco.com',
  output: 'static', // LOCKED: static output only. No SSR, no client-rendered SPA (AI crawlers don't execute JS).
  integrations: [sitemap()],
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'always' }, // CSS ships inside the HTML — zero render-blocking requests
  devToolbar: { enabled: false }, // dev-server-only overlay; disabled so previews match production
});
