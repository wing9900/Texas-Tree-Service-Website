// ═══════════════════════════════════════════════════════════════════
// HOMEPAGE COPY — the human-written content slots for the GBP landing
// page (Rule 13 blueprint). Edit per business. Structure lives in
// src/pages/index.astro; words live here.
//
// CONROE TREE CO.: pre-GBP rank-and-rent build. No reviews, no photos,
// no credentials are claimed anywhere on this page until they are real.
// ═══════════════════════════════════════════════════════════════════

export const homepage = {
  hero: {
    // H1 formula (Rule 18): primary category + city + HOOK. Reworded from
    // the title tag, not copied — humans see this one, so spend the extra
    // words on a benefit, differentiator, or social proof.
    h1: "Conroe's Top Rated Tree Service",
    benefits: ['Free Estimates', '24/7 Emergency Service', 'Fully Licensed & Insured'],
    pillText: 'Serving Conroe and Montgomery County',

    ctaLabel: 'Get a Free Estimate',

    // Hero photo — DEMO ONLY, not a real Conroe job photo (violates Rule
    // 29's no-stock policy). Dropped in for a founder walkthrough video;
    // swap for a real, licensed Conroe/Montgomery County crew photo
    // (per IMAGES.md's pipeline) before this site actually launches.
    image: {
      src: '/images/hero-bucket-truck-demo.webp',
      alt: 'A bucket truck lifts an arborist in a hard hat up into a mature tree to trim branches on a quiet residential street',
      width: 1672,
      height: 941,
    },
  },

  // Opening paragraph (Rule 13 #5 + Rule 21): talks TO the visitor about
  // their situation and why to convert. States the USP. Banned openers:
  // "Welcome to…", "We were founded in…", leading with the business name.
  introH2: 'Full-Service Tree Care in Conroe, TX',

  openingParagraph:
    'The pines around Conroe grow past 90 feet, and every storm season some of them come down. When one of yours needs to go, you want a crew that shows up when they said they would, quotes the whole job in writing, and leaves your yard cleaner than they found it. That is the standard here for every removal, trim, and stump grind in Montgomery County. You get a free written estimate before any work starts, straight answers about what your tree actually needs, and a finished job with the wood hauled off and the lawn raked.',

  // Why Choose Us (Rule 13 #6) — high on the page, never buried.
  // Static grid, no carousel (Rule 24). Specifics beat adjectives (Rule 22).
  whyChooseUs: [
    {
      icon: 'leaf',
      title: 'Crews That Know Montgomery County Trees',
      text: 'A loblolly pine that made it through the last storm is not automatically safe, and a water oak with a full green crown can be hollow at the trunk. The crews here climb and cut around these exact species every week: pines with shallow roots in wet sandy soil, post oaks that decline after construction traffic, sweetgums split by wind. That repetition is the difference between guessing from the ground and knowing what a tree will do before the first cut is made.',
    },
    {
      icon: 'handshake',
      title: 'One Written Price, No Surprises',
      text: 'You get the full price in writing before any saw starts: the removal, the stump if you want it ground, the hauling, and the cleanup, all spelled out. If the scope changes because you add work, the price changes with your say so, not after the fact. Nobody quotes you one number in the driveway and hands you a bigger one from the truck.',
    },
    {
      icon: 'crosshair',
      title: 'Controlled Removals, Not Falling Timber',
      text: 'A surprising amount of the tree damage in Conroe yards is not done by storms. It is done by cut-rate removals that let limbs free fall onto fences, sprinkler heads, and driveways. A tall pine near a house should come down in pieces, lowered on ropes with rigging that controls where every log lands. Your removal should end with a clean yard, not a claim on your homeowners policy.',
    },
    {
      icon: 'book',
      title: 'Work to a Written Standard',
      text: 'Texas does not license tree companies, so anyone with a chainsaw and a magnetic sign can call themselves a tree service. The work here follows ANSI A300, the national standard that spells out how trimming cuts should be made and how much live canopy a healthy trim takes. Ask any company you call what standard they cut to. If the answer is a blank look, keep calling around.',
    },
  ],

  // Google reviewer avatars for the hero pill. Renders only when
  // populated: NEVER invent reviewers the profile can't back up.
  // [PENDING — stays EMPTY until the Conroe GBP exists and has real
  // reviews. Do not copy avatars or reviewers from any other site.]
  googleReviewers: [] as ReadonlyArray<{ img?: string; initials?: string; bg?: string }>,

  // Homepage FAQs (Rule 13 #10, Rule 30 pattern): GENERAL questions only —
  // service-specific FAQs live on their service pages. Reword PAA questions,
  // never copy verbatim. Answer briefly; editorial-link to a supporting
  // page for depth (HTML allowed in answers for exactly that).
  faqs: [
    {
      q: 'What does an estimate cost?',
      a: 'Nothing. Tell us what the tree is doing and where it sits on the property, and you get a written price before any work goes on the schedule. <a href="/contact/">Request your free estimate here</a>.',
    },
    {
      q: 'How much does tree removal cost in Conroe?',
      a: 'Most residential removals in Conroe run from around $500 for a small tree with easy access to $3,000 or more for a tall pine leaning over a house. Height, access, and what sits underneath the tree drive the price. <a href="/services/tree-removal/">See what goes into removal pricing</a>.',
    },
    {
      q: 'Do I need a permit to remove a tree on my own property in Conroe?',
      a: 'For most single family homes in Conroe, no. The city’s tree preservation rules mainly apply to new development and commercial projects. HOA covenants in neighborhoods like Grand Central Park and Woodforest can add their own approval steps, so check yours before removing a healthy tree.',
    },
  ],
} as const;
