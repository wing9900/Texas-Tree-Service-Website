import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Filename (minus .md) becomes the URL slug — make it the keyword
// (Rule 19): tree-removal.md → /services/tree-removal/…
// Files starting with "_" (the _TEMPLATE files) are ignored by the loader.

const faq = z.object({ q: z.string(), a: z.string() });

/**
 * CATEGORIES — mirror the GBP's 3–4 categories exactly (Rule 11).
 * One .md file per category. Renders at /services/[category]/
 */
const categories = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/categories' }),
  schema: z.object({
    title: z.string(),               // category name, e.g. "Tree Removal" — used in title tag + H1 formulas
    h1: z.string().optional(),       // optional H1 override (keyword + city + hook)
    metaDescription: z.string(),     // REQUIRED — 150–160 chars, hand-written ad copy (Rule 20)
    homepageBlurb: z.string(),       // 50–100 words shown on the homepage under this category's H2 (Rule 13 #7)
    order: z.number().default(0),
    faqs: z.array(faq).default([]),  // category-level FAQs (reworded PAA), fully visible on load
  }),
});

/**
 * SERVICES — one page per GBP-listed service (Rule 15). 20–30 files on a
 * real build; the #1 local organic ranking factor is a dedicated page per
 * service. Renders at /services/[category]/[service]/
 */
const services = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),               // service name, e.g. "Stump Grinding"
    category: z.string(),            // parent category slug — MUST match a category filename
    h1: z.string().optional(),       // optional H1 override (service + city + hook)
    metaDescription: z.string(),     // REQUIRED — 150–160 chars (Rule 20)
    categoryBlurb: z.string(),       // 50–100 words shown on the parent category page under this service's H2 (Rule 14)
    order: z.number().default(0),
    faqs: z.array(faq).default([]),  // service-specific FAQs → FAQPage schema
  }),
});

/**
 * LOCATIONS — geographic pages (Rule 31), two kinds in one collection:
 *  kind "town"     — mini-hub for a town the business genuinely serves
 *                    (multi-area clients ship these at launch)
 *  kind "landmark" — within-city expansion page (rank-map driven batches)
 * Renders at /locations/[location]/  The homepage service-areas strip
 * appears automatically once entries exist, and the header's permanent
 * Service Areas tab re-points itself from /service-areas/ to the
 * /locations/ hub the moment there is a hub worth indexing.
 */
const locations = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/locations' }),
  schema: z.object({
    title: z.string(),               // town: "[Primary Category] in [Town], [ST]" · landmark: "[Service] in [Landmark]"
    kind: z.enum(['town', 'landmark']).default('landmark'),
    shortName: z.string().optional(),// town display name for strips/breadcrumbs, e.g. "Kilgore"
    metaDescription: z.string(),
    relatedServices: z.array(z.string()).default([]), // service slugs to editorially link (towns: several; landmarks: usually one)
    order: z.number().default(0),
    faqs: z.array(faq).default([]),
  }),
});

/**
 * PROJECTS — the "gallery," done right. Never a naked image dump (thin
 * content): every project REQUIRES a caption block — service performed,
 * where, and a short description — turning photos into crawlable,
 * entity-rich supporting content. Renders at /projects/
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),               // "[Service] near [Landmark/Neighborhood]"
    service: z.string(),             // related service slug — editorial link target
    description: z.string(),         // 2–3 sentences: what was done, for whom, outcome
    order: z.number().default(0),
  }),
});

export const collections = { categories, services, locations, projects };
