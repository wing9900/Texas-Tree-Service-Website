# OPEN ITEMS — audited backlog for conroetreeco.com

**This file is the single list of everything known to be wrong, missing, or
temporary on this site.** It exists so the work can be picked up later by
someone (or some assistant) who was not part of the conversation that found
it.

Last full audit: **2026-09-24**, against the built output in `dist/`, not
against memory or the other docs. Two items below (OI-03, OI-11) are places
where `HANDOFF.md` was already out of date, which is the reason every entry
here carries its own evidence.

---

## If you are an AI assistant reading this

The owner will ask you things like *"what needs fixing on the website?"* or
*"what did we still have to change?"*. To answer:

1. **Read this whole file.** It is ordered by severity, not by effort.
2. **Re-verify before you act.** Every entry has a `Verify` block with a
   command that prints the current state. Items get fixed out of band; a
   stale entry here is likelier than a stale codebase. If the check shows
   it is already done, say so and mark it `RESOLVED` with the date.
3. **Respect the ownership tag.** `[AGENT]` means you can do it from the
   repo alone. `[OWNER]` means it needs information only the business owner
   has, and no amount of code will substitute. Never invent the missing
   value to close an `[OWNER]` item.
4. **Read `§ Guardrails` before changing anything.** Several things in this
   codebase look like bugs or clutter and are deliberate. Undoing them
   causes real harm, in one case publishing a false claim to Google.
5. Also read `AGENTS.md` and `README.md` first, as those files instruct.
   Their rules outrank anything here.

Before starting, run `npm install && npm run build` once. The build must
pass (41 pages) before and after your change.

---

## Index

| ID | Item | Severity | Who |
|---|---|---|---|
| OI-01 | Demo review rating is live and invented | **Blocker** | `[OWNER]` |
| OI-02 | No social preview image on any page but `/appointment/` | **High** | `[OWNER]` + `[AGENT]` |
| OI-03 | Business email renders nowhere on the site | **High** | `[AGENT]` |
| OI-04 | `/appointment/` mixes www and non-www | **High** | `[AGENT]` |
| OI-05 | Hero photo is stock, against the repo's own rule | **High** | `[OWNER]` |
| OI-06 | LocalBusiness schema is missing 4 fields | Medium | `[AGENT]` + `[OWNER]` |
| OI-07 | The rating claim contradicts the rest of the site | Medium | `[OWNER]` |
| OI-08 | Google Business Profile data is all placeholder | Medium | `[OWNER]` |
| OI-09 | Phone is a California area code for a Texas business | Medium | `[OWNER]` |
| OI-10 | Quote card runs past the fold at 1024–1180px | Medium | `[AGENT]` |
| OI-11 | Dead code: pill CSS, unused config, Web3Forms block | Low | `[AGENT]` |
| OI-12 | `/projects/` is empty and noindexed | Low | `[OWNER]` |

---

## OI-01 — The homepage shows an invented Google rating `[OWNER]` · Blocker

**What.** The hero reads **"4.9 ★★★★★ 127 Google reviews"**. Those numbers
are made up. They were put there at the owner's explicit request so the
site could be shown in walkthrough demos before the Google Business Profile
has any reviews.

**Where.** `src/config/business.ts` → `demoPlaceholderRating` (line ~114).
Rendered by `src/components/GoogleRating.astro`, which is its only reader.

**Why this has to change before launch.** Three separate reasons, any one
of which is sufficient:

- **It is false.** A homeowner deciding who drops a pine over their roof is
  being shown 127 endorsements that do not exist.
- **The FTC's Rule on Fake Reviews and Testimonials** (effective October
  2024) covers fabricated review indicators and star ratings, with civil
  penalties per violation. A demo is not a defence once the site is public
  and taking leads.
- **Google can penalise the whole domain** for fake review signals. Right
  now it cannot see this one (see Guardrail G-1), but that protection ends
  the moment someone consolidates the config.

**Fix.**
1. Get the real rating, review count and Maps listing URL from the live GBP.
2. Put them in `gbp.ratingValue`, `gbp.reviewCount`, `gbp.profileUrl`.
3. Set `demoPlaceholderRating.enabled: false`, or delete the block.

Real values take precedence automatically, so step 3 is belt-and-braces.
Doing this also resolves OI-07 and OI-08 and lights up the `AggregateRating`
schema, the proof band and the Reviews nav item together.

**Verify.**
```bash
grep -n "enabled" src/config/business.ts          # expect: false, or block gone
grep -c "data-placeholder" dist/index.html        # expect: 0
grep -c "aggregateRating" dist/index.html         # 0 while fake, 1 once real
```

**Do not** move the demo numbers into `gbp.*` to tidy the config. See G-1.

---

## OI-02 — No social preview image on any page except `/appointment/` `[OWNER]` + `[AGENT]` · High

**What.** `business.seo.ogImage` is an empty string
(`src/config/business.ts:190`). `BaseLayout.astro:39-40` falls back to it
for every page, and every `og:image` tag is conditional on it being set, so
**the homepage and all 39 other pages emit no `og:image`, no
`twitter:image`, and no `summary_large_image` card at all.** Only
`/appointment/` has artwork, because that page passes its own `social.image`.

**Why it matters.** Every time the owner texts, posts or emails a link to
the site, it renders as a bare grey box with no picture. The appointment
page was given a share card deliberately *because it gets texted* — the same
logic applies to the homepage, which is the link that actually gets shared.
This is the highest-visibility item on the list per hour of work.

**Fix.** Ideally a real 1200×630 job photo (see `IMAGES.md`). As an
immediate stopgap the repo already ships `public/images/estimate-preview-v2.jpg`:

```ts
ogImage: '/images/estimate-preview-v2.jpg',
```

A **relative** path is correct here: `BaseLayout` runs it through
`new URL(..., Astro.site)`, which produces the right absolute non-www URL
automatically and keeps it consistent with the canonical. Do not hardcode
an absolute URL, and especially not a `www.` one (see OI-04).

**Verify.**
```bash
grep -o '<meta property="og:image"[^>]*>' dist/index.html   # expect one, non-www
```

---

## OI-03 — The business email appears nowhere on the website `[AGENT]` · High

**What.** `business.email` is set to `aiyana0098@gmail.com`
(`src/config/business.ts:162`) but **no component reads it.** There is no
email address anywhere in the built site — not one, on any of the 41
pages. (The quote form does ask for the visitor's email, but that form is a
cross-origin HighLevel iframe; it is not the business's address and it is
not in this site's HTML.)

**HANDOFF.md is wrong about this.** Its item 6 says *"RESOLVED:
gulfcoasttreeremoval@gmail.com added to config, contact page, footer, and
LocalBusiness schema."* None of that is in the output, and the address it
names is not the one in the config either. Treat this entry as the accurate
one, and fix HANDOFF.md when you fix the code.

**Why it matters.**
- **Toll-free SMS verification.** `TFV-COMPLIANCE.md` line ~215 gives the
  carrier a help message that directs customers to this email. A reviewer
  who checks the site and cannot find it has a documented reason to reject.
- **Local SEO.** `email` is a recognised `LocalBusiness` property (see
  OI-06) and a normal trust signal on a contact page.
- **Leads.** Some people will not fill in a form and will not call.

**Fix.** Decide which address is correct (owner confirms), then surface it
in at least: the contact page, the footer, and `LocalBusinessSchema.astro`.
Use `business.email` everywhere; never hardcode it, per the NAP rule in
`AGENTS.md`.

**Verify.**
```bash
grep -rhoE "[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}" dist --include=*.html | sort -u
# today: prints nothing at all. Expect the real address once wired.
# NOTE: run this on a clean `npm run build`. Preview/scratch files left in
# dist/ by screenshot tooling can contain stray placeholder addresses.
```

---

## OI-04 — `/appointment/` mixes www and non-www `[AGENT]` · High

**What.** The canonical host for this site is **non-www**, set in three
places that `README.md § 7` requires to match, and they do match:
`astro.config.mjs:10`, `business.ts:125`, `public/robots.txt:5` — all
`https://conroetreeco.com`.

But `src/pages/appointment.astro` hardcodes **www** in two places
(lines 29 and 40), producing this in the built page:

```
canonical: https://conroetreeco.com/appointment/
og:url:    https://www.conroetreeco.com/appointment/
og:image:  https://www.conroetreeco.com/images/estimate-preview-v2.jpg
```

**Why it matters.** `og:url` is what a scraper treats as the canonical
identity of the shared page, and it disagrees with the actual canonical.
More concretely: if `www` does not resolve or does not carry a certificate,
the share card image silently fails to load — on the one page in the whole
site that was deliberately given a share card because it gets texted.

**Fix.** Change both to non-www, or better, derive them from
`business.siteUrl` so they can never drift again.

**Note.** The image filename is versioned on purpose (`-v2`) because
scrapers cache by URL. Changing the *host* does not require a new version
bump, but changing the *artwork* does — read the comment at
`appointment.astro:30-39` before touching that line.

**Verify.**
```bash
grep -rn "www\.conroetreeco" src/    # expect: no matches
```

---

## OI-05 — The hero photo is stock, against the repo's own rule `[OWNER]` · High

**What.** `public/images/hero-bucket-truck-demo.webp`, referenced at
`src/config/homepage.ts:28`, is not a Conroe job and not this crew. The
config comment above it says so and calls it a violation of Rule 29 (no
stock, no AI imagery for local proof).

**Why it matters.** It is the first thing every visitor sees, and it is the
single strongest "this is a real local operator" signal the page has. A
stock truck is also a risk if a competitor recognises it. `README.md § 5`
and `IMAGES.md` both require real job photos with descriptive filenames and
specific alt text.

**Fix.** Owner supplies real photos; run the `IMAGES.md` protocol. One good
hero shot also solves OI-02.

---

## OI-06 — The LocalBusiness schema is missing four fields `[AGENT]` + `[OWNER]` · Medium

**What.** The `HomeAndConstructionBusiness` JSON-LD on the homepage
currently emits: `@context, @id, @type, address, areaServed, geo, name,
openingHoursSpecification, telephone, url`.

Absent: **`email`** (OI-03), **`image`** (OI-02/OI-05), **`hasMap`**
(needs `gbp.profileUrl`, OI-08), **`sameAs`** (empty array at
`business.ts:126`, no social profiles yet).

`aggregateRating` is also absent, and that one is **correct and
deliberate** — see G-1.

**Why it matters.** These are the properties Google uses to connect the
website to the Business Profile and to other citations. `sameAs` and
`hasMap` in particular are how the entity gets tied together; missing them
weakens exactly the local-pack ranking this whole site is built to win.

**Fix.** Most of these unblock themselves once OI-02, OI-03 and OI-08 land;
`LocalBusinessSchema.astro` already gates each field on its config value, so
supplying the data is usually the whole job. `sameAs` needs the owner to
create/confirm the Facebook page and any citation profiles.

**Verify.**
```bash
python3 - <<'PY'
import json,re
s=open('dist/index.html').read()
for m in re.findall(r'<script type="application/ld\+json">(.*?)</script>', s, re.S):
    d=json.loads(m)
    if 'Business' in str(d.get('@type')): print(sorted(d.keys()))
PY
```

---

## OI-07 — The rating claim contradicts the rest of the site `[OWNER]` · Medium

**What.** While OI-01's placeholder is live, the homepage claims 127 Google
reviews, and simultaneously:

- there is **no Reviews link in the nav** (gated on the real, zero rating),
- there is **no reviews section** on the homepage (`ReviewsEmbed` holds an
  empty array, `src/components/ReviewsEmbed.astro:24`),
- **nothing on the homepage links to `/testimonials/`** at all, and
- `/testimonials/` itself says *"we would rather show you nothing than show
  you filler."*

**Why it matters.** Every other rating surface is honestly gated on the real
numbers, so only the hero lies, and the contradiction is visible to anyone
who looks for the reviews. For a demo whose purpose is to look convincing,
this is the detail that gives it away. It resolves itself entirely when
OI-01 is resolved, which is the point: the inconsistency is a symptom, not
a separate bug to paper over.

**Do not** fix this by faking review cards, a Reviews nav item, or
testimonial quotes. That converts one placeholder into a site-wide
fabrication. Fix OI-01 instead.

---

## OI-08 — Google Business Profile data is all placeholder `[OWNER]` · Medium

**What.** In `business.ts`:

| Field | Line | State |
|---|---|---|
| `gbp.mapsEmbedUrl` | 86 | City-level Conroe embed, not the business pin |
| `gbp.profileUrl` | 87 | Empty |
| `gbp.ratingValue` / `reviewCount` | 88-89 | `0` (correct until real, see G-1) |

**Why it matters.** The map on the contact page points at the city, not at
the business, which is a wasted proximity signal. The empty `profileUrl`
means the rating line renders as plain text instead of a link to the
listing — and *"verify this yourself on Google"* is the single most
credible thing a rating can offer. It also leaves `hasMap` out of the
schema (OI-06).

**Fix.** Google Maps → the listing → Share → "Embed a map" → copy the
iframe `src` into `mapsEmbedUrl`. Copy the listing's canonical URL into
`profileUrl`. Both are about 30 seconds once the listing is verified.

---

## OI-09 — The phone number is a California area code `[OWNER]` · Medium

**What.** `phone: '+19169942497'` / `phoneDisplay: '(916) 994-2497'`
(`business.ts:40-41`). **916 is Sacramento, California.** The business is in
Conroe, Texas (Montgomery County), where the local codes are 936, 281, 832,
713 and 409.

It is used consistently everywhere and appears in `TFV-COMPLIANCE.md`, so it
is probably a deliberate HighLevel/tracking number rather than a leftover.
**This is a question for the owner, not a bug to "fix" unilaterally.**

**Why it matters.**
- **NAP consistency** is a direct local-ranking factor: the number on the
  site must match the Google Business Profile character for character.
- **Local trust.** Conroe homeowners notice an out-of-state area code, and
  for emergency storm work "are these people actually nearby" is the whole
  question.
- The toll-free SMS verification pack (`TFV-COMPLIANCE.md`) is written
  around this number; changing it means re-verifying.

**Fix.** Confirm with the owner whether a local 936/281 number is available.
If it changes, it changes in `business.ts` **only** — every page pulls from
there, per `AGENTS.md`.

---

## OI-10 — The quote card runs past the fold at 1024–1180px `[AGENT]` · Medium

**What.** Between `64rem` and `73.75rem` viewport width, the homepage quote
card uses the older narrow-and-tall layout: **432 × 861px**, bottom edge
~168px below the fold at 800px viewport height. Above 1180px it is
558 × 625px and clears the fold comfortably.

This is **pre-existing**, not caused by the hero resize done in September
2026, and was left alone deliberately because fixing it involves a real
trade-off rather than a clear win.

**Why it matters.** On a 1024–1180px laptop the Submit button is below the
fold, which measurably costs form completions.

**Why it was not just fixed.** The embedded form has an internal breakpoint
at ~640px: below it, Phone and Email stack and the document grows ~137px
taller. So narrowing the card makes it *bigger*. The `--quote-scale` dial
(see G-2) solves this above 1180px by zooming the iframe, but applying it
in this tier means either shrinking the copy column below the width the
headline needs for three lines, or scaling the form's text below ~13px.
Read the long comment block above the `73.75rem` media query in
`src/styles/global.css` before attempting this.

**Verify.**
```bash
# after `npm run build`, serve dist/ and measure .hero__form-panel at 1100x800
```

---

## OI-11 — Dead code left behind `[AGENT]` · Low

Three pieces of code that nothing reads. All are harmless today and all
will mislead the next person:

1. **`.hero__pill*` / `.hero__avatar*` CSS** — `src/styles/global.css`
   lines ~332-378 and ~1131-1133. The hero pill was replaced by
   `GoogleRating.astro` in September 2026. Nothing renders these classes
   anywhere on the site. Kept for one round in case the pill was wanted
   back; if nobody has asked by now, delete them.
2. **`homepage.ts:19` `hero.pillText` and `homepage.ts:75` `googleReviewers`**
   — both only ever fed that pill. `googleReviewers` is annotated as unused;
   `pillText` is not. A future proof band could use `googleReviewers`, so
   check `SocialProofBand.astro` before deleting.
3. **The Web3Forms block** — `business.ts:134-138`, with
   `accessKey: ''` marked `[PENDING]`. **Nothing reads it.** The contact
   page now uses the same HighLevel iframe form as the homepage, so this
   config is obsolete rather than pending.

**`HANDOFF.md` is wrong about #3 too:** its item 3, "wire the GHL form into
`contact.astro`", is **already done**. Mark it resolved.

**Verify.**
```bash
grep -rn "hero__pill\|hero__avatar" src/ --include=*.astro   # expect: no matches
grep -rn "accessKey\|pillText\|googleReviewers" src/          # config only
```

---

## OI-12 — `/projects/` is empty and noindexed `[OWNER]` · Low

**What.** The `projects` content collection has no entries, so the page
noindexes itself and the "Recent Work" nav item hides itself. This is the
framework behaving correctly, not a fault, and it is why every build prints
`The collection "projects" does not exist or is empty` — that warning is
expected and can be ignored.

**Why it matters.** Real before/after job photos are among the strongest
conversion assets a tree service has, and the page is built and waiting.

**Fix.** Owner supplies photos; add 6+ entries from
`src/content/projects/_TEMPLATE.md` per `IMAGES.md`.

---

# § Guardrails — things that look wrong but are deliberate

**Do not "clean up" any of the following.** Each one has a specific reason,
and in at least one case removing it publishes a false claim to Google.

### G-1 · `demoPlaceholderRating` must stay separate from `gbp.*`

The demo rating (OI-01) lives in its own config block, and
`gbp.ratingValue` / `gbp.reviewCount` stay at `0`. This looks like
duplication. It is the safety mechanism.

`LocalBusinessSchema.astro`, `SocialProofBand.astro`, `ReviewsEmbed.astro`
and the Reviews nav item all read `gbp.*`. `GoogleRating.astro` is the only
thing that reads the demo block, and only to draw pixels. That is why
`aggregateRating` is **absent** from the structured data while a fake
rating is visible on the page: Google is being told nothing.

**Consolidating those two blocks silently converts a visible demo into a
false structured-data claim to Google.** Never do it. The correct way to
remove the duplication is to resolve OI-01.

### G-2 · `--quote-scale` and `zoom` on the quote form iframe

`src/styles/global.css`, the `73.75rem` media query. The form's iframe
carries `zoom: var(--quote-scale)` and the grid column is computed as
`calc(41rem * var(--quote-scale))`. Three rules:

- **Do not replace `zoom` with `transform: scale()`.** `zoom` lays the
  content out at full resolution and paints it down; `transform` resamples
  the rendered frame, which is what made an earlier build's form blurry.
- **Do not hand-set the column width.** It must stay derived from the dial,
  or the iframe's internal viewport stops being 656px and the form crosses
  its own ~640px breakpoint, growing ~137px taller.
- **Do not "tidy" 41rem to a rounder number.** It is a measured floor, not
  a taste call.

### G-3 · The hero's `min-height` subtracts `5.625rem`

`min-height: calc(100lvh - 5.625rem)` on `.hero--photo.hero--split`. The
90px is the tallest this header gets at any desktop width. Without the
floor, shrinking the quote card gains nothing, because the hero collapses
with it and the photo loses exactly the height the card gave up. Without
the subtraction, the header's own height pushes the hero past the fold.

### G-4 · Every "free estimate" button goes to `/appointment/`, not `/contact/`

Buttons and in-content links offering an *estimate* point at the booking
calendar. `/contact/` remains correct for "send us a message" wording, the
emergency page's "Reach us here", the service-area coverage question, and
the appointment page's own fallback line. Keep the two straight when adding
CTAs. See the note in `Header.astro`.

### G-5 · Zero rating renders zero markup

`GoogleRating.astro` emits nothing at all when there is no rating, as did
the pill before it. Components that render rating UI **must** gate on
`gbp.ratingValue > 0 && gbp.reviewCount > 0`. This is the repo's standing
rule — see the comments at `business.ts:80-82` and `homepage.ts:73`.

---

# § Recently completed (for context, no action needed)

September 2026, all on `main`:

- Hero quote card resized from 656×737 to 558×625 via the `--quote-scale`
  dial, giving ~20% more of the hero photo back and pulling Submit above the
  fold at 1280×800 and 1366×768 where it previously fell below.
- Every "free estimate" button (10 of them) and both in-content estimate
  links repointed from `/contact/` to `/appointment/`.
- The hero review pill replaced by `GoogleRating.astro`: real SVG stars,
  fractional fill, exact counts, no avatars, no capsule.
- The demo placeholder rating added at the owner's request, with the
  structural separation described in G-1.
