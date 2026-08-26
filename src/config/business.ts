// ═══════════════════════════════════════════════════════════════════
// BUSINESS CONFIG — the single source of truth for the entire site.
//
// Every page pulls NAP, phone, hours, and schema data from THIS file,
// which is what mechanically guarantees Rule 12's consistency signals:
// the address and phone can never drift out of sync with the GBP
// because they only exist in one place.
//
// DUPLICATION STEP: this is the first file you edit for a new business.
// Copy every value CHARACTER-FOR-CHARACTER from the Google Business
// Profile. "St." vs "Street" mismatches cost trust with the algorithm.
//
// CONROE TREE CO. STATUS: pre-GBP rank-and-rent build. This site
// launches organic-only; the GBP arrives when the renting operator
// verifies it. Every [BRACKETED] value below is pending real data and
// MUST be resolved before launch (README §7: no brackets at launch).
// ═══════════════════════════════════════════════════════════════════

export const business = {
  // ── Identity ──────────────────────────────────────────────────────
  name: 'Conroe Tree Co.',
  brandLockup: ['Conroe', 'Tree Co.'],  // two-line header wordmark next to the logo
  // Primary GBP category — the #1 local ranking factor. Most specific
  // option available. Drives the homepage title tag + H1 formulas.
  primaryCategory: 'Tree Service',

  // ── NAP (must match GBP character-for-character — Rule 12) ────────
  // Service-area business presentation: street stays EMPTY until the
  // renting operator's verified GBP address exists (if the GBP ends up
  // showing an address at all — SAB listings usually hide it). Every
  // component and the schema omit the street line when this is ''.
  address: {
    street: '',
    city: 'Conroe',
    state: 'Texas',
    stateAbbr: 'TX',
    zip: '77301',
    country: 'US',
  },
  phone: '[PENDING-TWILIO-E164]',            // E.164 for tel: links + schema, e.g. +19365550100
  phoneDisplay: '[PENDING 936 TRACKING NUMBER]',   // exactly as it will appear on the GBP

  // ── Geo + service area ────────────────────────────────────────────
  geo: { lat: 30.3118769, lng: -95.4560512 },  // Conroe city center; replace with GBP pin once verified
  // Every town that gets a town page MUST also be listed here — this
  // feeds areaServed in LocalBusiness + Service schema, which is what
  // Google and AI assistants read to decide if you serve a searcher's town.
  // Launch is single-location (README §3-A): no town pages yet, so this
  // list stays short and honest — Conroe plus immediate Montgomery
  // County neighbors a Conroe crew genuinely covers.
  serviceAreas: [
    'Conroe',
    'Willis',
    'Montgomery',
    'Panorama Village',
    'Cut and Shoot',
    'Grangerland',
  ],

  // ── Hours (match GBP exactly — Rule 7: open-at-time-of-search is top-5) ──
  // days: schema.org day names. 24/7 answering (AI receptionist)? Extend
  // legitimately — SABs rank through every hour competitors are closed.
  hours: [
    // Emergency tree work answers around the clock; six Conroe
    // competitors list "Open 24 hours". Mirror that seven days —
    // CONFIRM with the renting operator before the GBP goes live.
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' },
  ],

  // ── Google Business Profile hooks ─────────────────────────────────
  // No GBP yet (renter verifies it later). Empty strings + zero counts
  // keep the build honest; components that render rating/review UI must
  // be checked to gate on these before launch.
  gbp: {
    // City-level Conroe embed until the GBP exists; swap for the GBP pin's
    // own "Share → Embed a map" URL the day the listing is verified.
    mapsEmbedUrl: 'https://maps.google.com/maps?q=Conroe%2C%20TX&z=11&output=embed',
    profileUrl: '',     // [PENDING — canonical Maps listing link]
    ratingValue: 0,     // no reviews yet — never fabricate
    reviewCount: 0,
  },

  // ── Schema ────────────────────────────────────────────────────────
  // Most specific schema.org LocalBusiness subtype that applies
  // (e.g. 'HomeAndConstructionBusiness', 'Plumber', 'RoofingContractor',
  // 'Electrician', 'HVACBusiness'). Falls back to 'LocalBusiness'.
  schemaType: 'HomeAndConstructionBusiness', // no tree-specific subtype exists; this is the closest
  siteUrl: 'https://conroetreeco.com',   // must match astro.config.mjs `site` + robots.txt Sitemap
  sameAs: [
    // [PENDING — Facebook page URL once created; add citations as they go live]
  ],

  // ── Lead capture ──────────────────────────────────────────────────
  // The contact form posts straight to Web3Forms (no JavaScript, no
  // third-party script, nothing to maintain). Submissions email the
  // address the key was issued to. Get a free key in 30 seconds at
  // web3forms.com: enter the inbox you want leads in, paste the key it
  // emails you below, and the form switches itself on. Empty key leaves
  // a visible placeholder instead of a broken form.
  forms: {
    accessKey: '',      // [PENDING: Web3Forms access key]
    redirectUrl: '',    // optional thank-you page URL after submit
  },

  // ── SEO ───────────────────────────────────────────────────────────
  seo: {
    // Homepage title formula (Rule 17): [Primary category] + [City, ST] + [Brand]
    // is built automatically in src/pages/index.astro from the fields above.
    //
    // titleTail = the OFFENSIVE LONG-TITLE zone: keyword space past the
    // ~60-char display truncation that no human sees but Google reads.
    // Load with neighborhood names + topical variants, pipe-separated.
    titleTail: 'Tree Removal | Stump Grinding | Emergency Storm Cleanup | Land Clearing | Lake Conroe | Willis | Montgomery | River Plantation | Grand Central Park',
    // Social share image — path under /public (e.g. '/og-image.webp'),
    // 1200×630. Leave '' to skip.
    ogImage: '',  // [PENDING — real Conroe/Montgomery County job photo, 1200×630 JPEG]
    homepageMetaDescription:
      'Tree removal, trimming, and stump grinding in Conroe, TX from a crew that knows Montgomery County pines and oaks. Free estimates, cleanup included.',
  },
} as const;

// Convenience strings used across templates
export const cityState = `${business.address.city}, ${business.address.stateAbbr}`;
export const telHref = `tel:${business.phone}`;
