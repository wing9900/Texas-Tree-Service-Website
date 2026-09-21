---
# ═══ TOWN TEMPLATE: for businesses genuinely serving multiple towns ═══
# Established multi-area clients ship these AT LAUNCH. One page per real
# town served (within ~50 miles / the GBP's realistic radius).
# Filename = slug = the town, e.g. kilgore.md -> /service-areas/kilgore/
# (the base path already carries the keyword; no need to repeat it)
title: "[Primary Category] in [Town], [ST]"   # e.g. "Tree Service in Kilgore, TX"
kind: "town"
shortName: "[Town]"                  # used in the homepage strip + breadcrumbs
metaDescription: "[150–160 chars: category + town + what they get + why to click.]"
relatedServices: ["[service-slug-1]", "[service-slug-2]", "[service-slug-3]"]
order: 1
faqs:
  - q: "[Town-specific reworded question?]"
    a: "[~25-word direct answer.]"
---

[TOWN MINI-HUB CONTENT: several short sections. Requirements:
- Question-based H2s (## in markdown) with the answer in the first sentence.
- GENUINELY local: drive time from the home base, this town's housing and
  tree/property stock and the service issues that follow, named landmarks
  and businesses, storm/weather patterns.
- 3–5 editorial links to service pages woven into sentences (in addition
  to the auto-generated related-services line), >=1 external validation
  link (Rule 45).
- ALSO REQUIRED: add "[Town]" to serviceAreas in src/config/business.ts
  so schema areaServed declares it.]
