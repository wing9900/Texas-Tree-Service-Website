# Core 30 Local SEO Site Template — Operating Manual

Mobile-first Astro (static output) framework implementing the master local-SEO rules doc. Duplicate per business: edit two config files, add content files, re-skin one token block, deploy the `dist/` folder to any static host (Cloudflare Pages default). **Zero JavaScript ships to the browser. All content lives in raw HTML** — fully readable by Googlebot and non-JS AI crawlers (GPTBot, ClaudeBot, PerplexityBot).

This README is the complete manual. An agent working on this repo should read it fully before changing anything.

---

## 1. Complete file map

```
astro.config.mjs             site URL (CHANGE PER BUSINESS) · static output · sitemap · CSS inlining
package.json                 deps: astro, @astrojs/sitemap only
tsconfig.json                strict Astro TS config
public/robots.txt            allow-all + Sitemap URL (CHANGE PER BUSINESS)
README.md                    this manual
OPEN-ITEMS.md                ★ audited backlog: every known bug, placeholder and piece of
                             dead code, each with evidence, why it matters and a command to
                             re-verify it, plus GUARDRAILS — things that look wrong but are
                             deliberate. Start here when asked "what still needs fixing?"
HANDOFF.md                   info still to be collected from the owner (narrower than above)

src/config/
  business.ts                ★ SINGLE SOURCE OF TRUTH: name, primary category, NAP,
                             phone, hours, geo, serviceAreas, GBP data (rating/count/
                             embed URLs), schemaType, siteUrl, titleTail, ogImage,
                             homepage meta description. Every page reads NAP/phone/hours
                             from here — they exist nowhere else, so site and GBP can
                             never disagree (Rule 12 signals 6–7 by construction).
  homepage.ts                Homepage copy slots: hero h1 + subheadline + CTA label,
                             opening paragraph, whyChooseUs[4], proofBadges[], faqs[].

src/content.config.ts        Zod schemas for all four collections (fields in §2).
src/content/
  categories/                One .md per GBP category → /services/[slug]/
                             Ships 6 samples (category-1..6) — DELETE and replace;
                             keep only as many as the business genuinely has (3–6).
  services/                  One .md per GBP-listed service → /services/[cat]/[slug]/
                             Ships 12 samples — real builds need 20–30. The #1 local
                             organic ranking factor is a dedicated page per service.
  locations/                 Geographic pages → /service-areas/[slug]/ · ships 6 towns.
                             kind "town" = multi-area mini-hubs (ship at launch for
                             established clients). kind "landmark" = within-city
                             expansion (rank-map driven, later phase).
  projects/                  "Recent Work" gallery entries → listed on /projects/ ·
                             EMPTY by default. Captioned photo write-ups, never bare
                             image dumps.
  */_TEMPLATE*.md            Authoring specs per collection (loader ignores _-prefixed
                             files). Copy → rename to keyword slug → fill.

src/layouts/
  BaseLayout.astro           Wraps every page. REQUIRES title + description props
                             (build fails without). Emits: canonical, robots directives
                             (noindex flag OR max-image-preview:large etc.), og tags,
                             skip link, sitewide LocalBusiness schema, header/footer/
                             mobile call bar.

src/components/
  Header.astro               Brand · Menu (mobile) · full number + Free Estimate (desktop) ·
                             CSS-only checkbox nav (zero JS, links always in DOM).
                             "Service Areas" item is PERMANENT and always points at
                             /service-areas/, which indexes a page per town (and
                             noindexes itself while the collection is empty).
                             Sticky at all sizes; mobile nav is a right-aligned
                             overlay dropdown under the Menu button with tap-outside
                             scrim close + glyph flip — all CSS-only, zero JS.
  Footer.astro               NAP + hours from config, quick links.
  Hero.astro                 STATIC hero (no sliders): h1 + sub + call + estimate
                             above the fold. Swap gradient for one real photo at
                             fill-in.
  SocialProofBand.astro      Live rating + review count from config, linked badges.
  FAQ.astro                  Renders ALL Q&A fully expanded (never accordions) +
                             auto-emits FAQPage schema. Answers accept HTML for
                             editorial links.
  ReviewsEmbed.astro         Marked slot for a LIVE GBP review widget + crawlable
                             aggregate-rating text. Never re-typed testimonials.
  MapNAP.astro               GBP maps embed + NAP block + hours (all from config).
  CTA.astro                  Closing band: Call (primary) + Free Estimate (outline).
  ServiceAreas.astro         Homepage "Proudly Serving" strip linking town pages.
                             AUTO-RENDERS only when kind:"town" entries exist —
                             a single-location build can never show a fake area list.
  schema/LocalBusinessSchema.astro   Sitewide, subtype from config, @id anchor.
  schema/ServiceSchema.astro         Per service page, provider → @id.
  schema/BreadcrumbSchema.astro      Category/service/location pages.

src/pages/
  index.astro                GBP LANDING PAGE. Rule 13's 12 sections in exact order;
                             all 8 Rule 12 consistency signals. Title formula:
                             [Primary category] in [City, ST] | [Brand] (+titleTail).
                             Each category = its own H2 + blurb + editorial link.
  services/index.astro       Services hub: every category + its service links.
  services/[category]/index.astro    Category page: [category]+[city] title/H1,
                             each service = its own H2 + 50–100 word blurb +
                             editorial link (Rule 14).
  services/[category]/[service].astro  Service page: [service]+[city] title/H1,
                             Service + FAQPage + Breadcrumb schema, deep content
                             body, prose links to siblings/category/home (Rule 16 —
                             no orphans).
  service-areas/index.astro  Service Areas hub + header nav target. Cards every town
                             page; also names any business.serviceAreas entry without
                             a page, so the page and schema areaServed never disagree.
                             Towns sort before landmarks. NOINDEX while collection empty.
  service-areas/[location].astro  Dual template: town titles keep their own geo;
                             landmark titles auto-append home city (Rule 31).
                             Auto-builds a punctuated related-services sentence
                             from relatedServices[].
  projects/index.astro       Recent Work gallery. NOINDEX while empty. Each entry:
                             title + description + photos + auto editorial link to
                             its service page.
  testimonials.astro         LLM-citable reviews page: aggregate stats in plain
                             HTML + live embed slot (Rule 23).
  about.astro                Trust page scaffold (second-person, credentials-first).
  contact.astro              Phone-first + GHL FORM SLOT (name/phone/message max).
                             Estimate buttons across the site route here.
  404.astro                  Routes lost visitors back to call/services.

src/styles/global.css        Mobile-first (~375px base; 48rem/64rem scale-ups).
                             ★ RE-SKIN = edit the token block at the top only.
                             Enforces: H1 largest text, 48px tap targets, sticky
                             header ≥48rem + anchor offset, reduced-motion support.
```

## 2. Content collections — frontmatter reference

**categories/** — `title` (GBP category name) · `h1?` (override: keyword+city+hook) · `metaDescription` (REQUIRED, 150–160 chars ad copy) · `homepageBlurb` (REQUIRED, 50–100 words for the homepage section) · `order` · `faqs[{q,a}]`. Body = category intro (2–4 short paragraphs, second person, city named naturally).

**services/** — `title` · `category` (REQUIRED — must equal a category filename) · `h1?` · `metaDescription` (REQUIRED) · `categoryBlurb` (REQUIRED, 50–100 words shown on the parent category page) · `order` · `faqs[]`. Body = the deep service content (spec in `_TEMPLATE.md`).

**locations/** — `title` · `kind` ("town"|"landmark", default landmark) · `shortName?` (town display name for strip/breadcrumbs) · `metaDescription` · `relatedServices[]` (service slugs; towns list several, landmarks usually one) · `order` · `faqs[]`. Town title format: `[Primary Category] in [Town], [ST]`. Landmark: `[Service] in [Landmark]`.

**projects/** — `title` ("[Service] near [Landmark]") · `service` (REQUIRED slug → auto editorial link) · `description` (REQUIRED 2–3 sentences) · `order`. Body = photos (markdown images obeying §5 image rules) + optional detail.

## 3. Build workflows

**A. New single-location build (rank-and-rent or new client)**
1. `npm install`
2. `src/config/business.ts` — every value character-for-character from the GBP; most specific `schemaType`; set `siteUrl`.
3. `astro.config.mjs` `site` + `public/robots.txt` Sitemap → real domain (3 places total incl. `business.ts siteUrl` — keep identical).
4. `src/config/homepage.ts` — all copy slots.
5. Delete sample category/service files. Create 3–6 categories + 20–30 services from templates. Filename = keyword slug.
6. LEAVE `locations/` EMPTY. Landmark pages come later, in 10–20 page batches, only when the rank map hits the Top 3% threshold (25–50% of the market leader's green).
7. Optional at launch: 6+ `projects/` entries (else the nav item can be removed in Header.astro; page is noindexed anyway).
8. Re-skin tokens in `global.css`; swap hero gradient for one real photo.
9. Wire GHL form (contact), live GBP review embed (ReviewsEmbed slot), maps embed URL (config).
10. `npm run build` → verify §6 → deploy `dist/`.

**B. Established multi-area client (one address serving a region)**
Steps 1–5, 7–10 identical, plus: create one town page per genuinely served town (within ~50 miles) from `_TEMPLATE-town.md` AT LAUNCH — the topical-authority gate protects new sites; an aged GBP with reviews/links usually clears it (run a rank map to prioritize weak towns, not to gate). Add every town to `serviceAreas` in `business.ts` (feeds schema areaServed). The homepage strip and the `/service-areas/` hub cards both activate automatically. Towns beyond the GBP's realistic radius need a second verified location — never a page.

## 4. What's mechanically enforced (framework guarantees)

NAP/phone/hours render only from config (can't drift from GBP) · title + metaDescription required per page (build fails) · title formulas per page type incl. long-title `titleTail` zone · exactly one H1/page, above fold, largest text · each category an H2 on the homepage, each service an H2 on its category page · editorial link chains homepage→categories→services→siblings (no orphans possible) · FAQs always fully expanded + FAQPage schema · LocalBusiness (sitewide) + Service + BreadcrumbList + AggregateRating schema · canonical + sitemap + robots directives · locations/projects noindex while empty · Service Areas hub cards + homepage strip auto-gate on town pages · static hero, no carousels/accordions/tabs anywhere · tap-to-call in the hero, every CTA band, and the tablet/desktop sticky header · anchor-offset compensation · zero external requests (system fonts, inlined CSS, no JS).

## 5. Rules the AGENT must uphold when writing content

- Meta descriptions 150–160 chars, hand-written ad copy. Blurbs 50–100 words.
- FAQ questions REWORDED from People Also Ask — never verbatim. Brief answer on-page; deep answers get a supporting page linked editorially from inside the answer.
- Question-based H2s with the direct answer in the FIRST sentence beneath.
- Name the city/town naturally and often. No generic industry filler ("5 signs you need…" is banned).
- Every content page: 3–5 editorial links to related pages + ≥1 external validation link.
- Second person; specifics over adjectives; short paragraphs (2–3 sentences); ~6th–8th grade level.
- NO EM DASHES (`—`) in any visible page copy, ever: owner's standing preference. Use a period, a comma, a colon, or parentheses instead. This covers headlines, body copy, button labels, FAQ answers, meta descriptions and alt text. En dashes in true ranges (`Mon–Sun`, `150–160`) are fine and are not what this bans.
- Images: REAL job photos only (no stock, no AI imagery for local proof) · descriptive keyword filenames (`oak-removal-longview-crane.webp`, never `IMG_4382.jpg`) · specific human-useful alt text, never repeated · compressed WebP.
- NEVER add: accordions/tabs/read-mores, carousels, popups on load, client-side JS frameworks, localStorage, hardcoded NAP outside config, animation that hides content on load or uses JS libraries. CSS-only interaction effects (hover/transform/opacity) are fine.
- Unique content per site when duplicating across a portfolio — structure repeats, words never do.

## 6. Verify every build

`npm run build` (page count = 1 homepage + 1 services hub + categories + services + testimonials/about/contact/projects/locations-hub/404 + location pages) · spot-check titles/H1s in `dist/` · Google Rich Results Test on homepage + one service page ("No items detected" = failed build) · run the kit's audit script · Screaming Frog crawl post-deploy · deploy `dist/` to Cloudflare Pages (any static host works — no platform lock-in).

## 7. Gotchas

- `theme-color` meta in BaseLayout.astro must match the page background (`--c-bg`) when re-skinning — it's what stops iOS Safari from tinting its toolbar with the amber call bar's color (renders as a giant amber block after navigation until the user scrolls).
- The site URL lives in THREE places: `astro.config.mjs site`, `business.ts siteUrl`, `robots.txt` Sitemap line. Keep identical.
- Astro's content layer caches entries in `node_modules/.astro` — if a deleted content file still builds, delete that folder (and `.astro/`, `dist/`) and rebuild.
- "collection empty" build warnings for locations/projects are expected on fresh builds.
- `npm run dev` previews match production 1:1 (the Astro dev toolbar is disabled in config); the built site never contained it either way.
- `_`-prefixed content files are loader-ignored by design (that's why templates live there).
- Sample content uses `[Bracketed Placeholders]` — every bracket must be gone before launch.

For real builds inside Claude Code, run the site-planning skill first (client-config.md → site-plan.md → approval); this template is the build target it maps onto.
