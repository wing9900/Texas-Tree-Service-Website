# HANDOFF — Missing Info & Pre-Launch Verification

Everything below is what the live site + citations could NOT supply, or
supplied with conflicts. Sources used: gulfcoasttreeremoval.com (2 pages),
Google Business Profile (via Places, 2026-07-18), Yelp, Facebook,
chamberofcommerce.com, Nextdoor, EcoHome, their Square site.

## MISSING — collect before launch

0. ⚠️ **REMOVE THE DEMO RATING BEFORE LAUNCH** — the hero currently shows
   "4.9 ★★★★★ 127 Google reviews", drawn from
   `business.demoPlaceholderRating`. **Those numbers are invented**, put
   up for walkthrough demos at the owner's request. Replace them with the
   real rating, review count and `gbp.profileUrl` in `gbp.*`, and set
   `demoPlaceholderRating.enabled` to false (or delete the block) in the
   same edit. Nothing false is published as structured data today:
   `AggregateRating` reads `gbp.*`, which is still 0, so Google is told
   nothing — that stops being true the moment someone "tidies" the demo
   numbers into `gbp.*`. Find the element in built HTML by its
   `data-placeholder="true"` attribute.
1. **Maps embed URL** — Google Maps → the GBP listing → Share → "Embed a
   map" → copy the iframe `src` → paste into `gbp.mapsEmbedUrl` in
   `src/config/business.ts`. (30 seconds; Rule 12 signal #3.)
2. **Live review widget** — create the GBP embed (Elfsight/EmbedSocial
   free tier) and drop it in the marked slot in
   `src/components/ReviewsEmbed.astro`.
3. **GHL form** — wire the quote form (name · phone · message only) into
   the marked slot in `src/pages/contact.astro`.
4. **Photos** — run the IMAGES.md protocol (hero, og-image, about photo,
   project photos). The only visual-judgment step left.
5. ~~Robert's last name~~ — RESOLVED: **Robert W. Ebbecke**, verified
   against his ISA certificate and his signed review replies. Wired into
   About copy + `business.owner` + schema founder entity.
6. ~~Email~~ — RESOLVED: gulfcoasttreeremoval@gmail.com added to config,
   contact page, footer, and LocalBusiness schema.

## VERIFY with Robert / the GBP — conflicts & assumptions

1. **GBP name suffix** — GBP reads "GULF COAST TREE REMOVAL - ISA
   Certified Arborist"; every citation (Yelp, FB, chamber) reads "Gulf
   Coast Tree Removal". Site uses the clean brand. Per the master rules,
   the keyword-suffixed GBP name without a real-world rebrand is a
   suspension-risk flag worth raising with him gently — pitch angle, not
   accusation.
2. **Primary GBP category** — Places types hint the profile may sit under
   a contractor-type category rather than "Tree Service". Check with GMB
   Everywhere; if it's wrong, fixing it is the single highest-impact
   30-second change in the pitch (survey factor #1). Config assumes
   "Tree Service".
3. **Hours** — GBP now says Mon–Sat Open 24 hours, Sun closed (site
   matches). Yelp says M–F 8–6 with Sat–Sun CLOSED (stale), chamber says
   Sat 9–3, and a Wheree scrape shows 7 AM–7 PM. Four different hour sets
   across the web. Confirm 24-hr answering is real, then fix Yelp +
   chamber to match the GBP — this is the citation-cleanup exhibit A.
4. **Phone display format** — config uses "(281) 757-2938"; his site
   writes "281-757-2938". Match whatever the GBP displays.
5. **Service list confirmation** — pages built ONLY from verified
   offerings (his site, GBP reviews, FB): hazardous/emergency/large
   removal, pruning/canopy/storm-prep trimming, stump removal, root
   removal, lot clearing, brush hogging, debris removal, wood chipping.
   Two need his nod on naming: **emergency tree removal** (justified by
   his 24-hr GBP hours) and **storm preparation trimming** (justified by
   a review outcome). If he confirms more services (cabling, arborist
   reports, firewood?), add pages toward the 20–30 target.
6. **Service area** — config claims Pasadena only. Get his real radius
   (Deer Park? La Porte? South Houston? Clear Lake?) before adding towns
   to `serviceAreas` or building town pages (Workflow B).
7. **Review count drift** — 5.0 / 88 hardcoded from 2026-07-18; refresh
   `gbp.reviewCount` at launch.
8. **sameAs URLs** — 4 citation profiles included; verify each is
   his listing before launch (esp. Nextdoor, which is filed under
   "Houston").

## New since v1 (from Bob's uploads + fresh research)

- **ISA credential fully verified:** cert issued 2024-04-11, expires
  **2027-06-30** — set a renewal reminder; the cert image on the About
  page shows the dates, so swap it when he renews.
- **Press coverage found:** KPRC 2 / Click2Houston, Jan 10 2024 — Robert
  cleared a Pasadena mom's storm-damaged tree free of charge. Now a
  linked press badge in the proof band + an About-page story. This is an
  existing unstructured citation (AI-visibility factor #4) most tree
  companies would kill for.
- **Veteran/military discount** confirmed in review text — added as a
  proof badge + About mention. Confirm the exact discount with Robert.
- **"Call or text"** confirmed from his card — contact page now has a
  tap-to-text button alongside tap-to-call.
- Business-card graphic NOT used on-site: it's text-as-an-image (Rule 25
  violation); every fact on it now lives in crawlable HTML instead.

## Pitch ammo discovered along the way (for the upsell call)

- Current site: 2 pages, no title tags/meta, no NAP anywhere, no address,
  no reviews shown, no schema — invisible to Google AND to AI assistants.
- 88 five-star reviews with zero on-site presence = his biggest unused
  asset; the testimonials page + live embed fixes it.
- Citation rot: three different hours across Google/Yelp/chamber, stale
  review counts — a citation-cleanup line item.
- GBP category + name-suffix risks above.
- His 24-hr Mon–Sat answering + your GHL Voice AI story write themselves.
