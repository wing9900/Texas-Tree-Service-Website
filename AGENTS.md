# Instructions for AI coding agents

READ README.md IN FULL before creating, editing, or deleting anything in this repo — it is the complete operating manual: file map, frontmatter schemas, the two build workflows (new single-location vs established multi-area), content rules, and verification steps.

**THEN READ OPEN-ITEMS.md.** It is the audited list of everything currently wrong, missing, or temporary on this site, with evidence and a verification command per item. If you were asked "what still needs fixing on the website?", that file is the answer. It also contains a **Guardrails** section describing things that look like bugs or clutter but are deliberate — read it before deleting anything, because one of those guardrails is the only reason a placeholder rating currently on the homepage is not being published to Google as a false claim.

Non-negotiables (details and rationale in README §4–5):
- Anything user-facing that shows a rating, review count or reviewer must gate on `gbp.ratingValue > 0 && gbp.reviewCount > 0`, and the demo placeholder block in business.ts must never be merged into `gbp.*` (OPEN-ITEMS.md § G-1).
- NAP/phone/hours exist ONLY in src/config/business.ts — never hardcode them elsewhere.
- Never add accordions, tabs, carousels, popups-on-load, client-side JS, or anything that hides content on first load.
- Filenames in src/content/ are URL slugs = target keywords. _-prefixed files are templates, not content.
- Every content page needs: required frontmatter (build enforces), reworded (never verbatim) PAA FAQs, 3–5 editorial links, ≥1 external validation link, genuinely local wording.
- After changes: `npm run build` must pass; verify against README §6. If deleted content still builds, clear node_modules/.astro.
