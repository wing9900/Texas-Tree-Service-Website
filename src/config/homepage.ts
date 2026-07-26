// ═══════════════════════════════════════════════════════════════════
// HOMEPAGE COPY — the human-written content slots for the GBP landing
// page (Rule 13 blueprint). Edit per business. Structure lives in
// src/pages/index.astro; words live here.
// ═══════════════════════════════════════════════════════════════════

export const homepage = {
  hero: {
    // H1 formula (Rule 18): primary category + city + HOOK. Reworded from
    // the title tag, not copied — humans see this one, so spend the extra
    // words on a benefit, differentiator, or social proof.
    // e.g. "[City]'s Highest-Rated Tree Removal — 300+ Five-Star Reviews, Licensed & Insured"
    h1: "Pasadena Tree Services by an ISA Certified Arborist",
    benefits: ['30 Years of Experience', 'Free Estimates', 'Satisfaction Guaranteed'],
    pillText: 'Trusted by Your Neighbors',

    // Speaks to the visitor's desired OUTCOME and works in core services.

    ctaLabel: 'Get a Free Estimate',

    // Hero photo (Rule 21: static, single best real shot of the core
    // offering — Rule 26 filename + alt requirements). Variants are
    // pre-generated compressed WebP; sizes list = the real widths on disk.
    image: {
      src: '/images/tree-removal-crew-pasadena-tx.webp',
      // Art-directed portrait crop served to phones so nothing important
      // gets cover-cropped away (worker, chipper, branded truck all in frame)
      mobileSrc: '/images/tree-removal-crew-pasadena-tx-mobile.webp',
      srcset:
        '/images/tree-removal-crew-pasadena-tx-640w.webp 640w, ' +
        '/images/tree-removal-crew-pasadena-tx-960w.webp 960w, ' +
        '/images/tree-removal-crew-pasadena-tx.webp 1354w',
      alt: 'Gulf Coast Tree Removal crew cutting a felled pine into logs with the bucket truck and wood chipper staged on a residential Pasadena, TX street',
      width: 1354,
      height: 1020,
    },
  },

  // Opening paragraph (Rule 13 #5 + Rule 21): talks TO the visitor about
  // their situation and why to convert. States the USP. Banned openers:
  // "Welcome to…", "We were founded in…", leading with the business name.
  // Authorized intro H2 (desktop-polish brief, Change 2)
  introH2: 'Full-Service Tree Care in Pasadena, TX',

  openingParagraph:
    "When you need tree services, you shouldn't have to worry whether the company you're calling can do the job safely and efficiently. Every project here is handled by an ISA Certified Arborist with 30 years of tree care experience on the Gulf Coast, because that's what your property deserves. Technical removals, crown pruning, stump grinding, and storm cleanup are just a few examples of the services guided by the same certified expertise. Every job is completed to the industry standards set by the American National Standards Institute (ANSI) using professional equipment to ensure it's done right, and to your satisfaction, guaranteed.",

  // Why Choose Us (Rule 13 #6) — high on the page, never buried.
  // Static grid, no carousel (Rule 24). Specifics beat adjectives (Rule 22).
  // Each card carries an icon key rendered by index.astro as an inlined
  // stroke icon framed in a matching tile. The ISA credential badge
  // itself lives on the hero (hero.badge below) and the about page.
  whyChooseUs: [
    {
      icon: 'leaf',
      title: 'On-Site, Not On-Call',
      text: 'Anyone can buy a chainsaw, but it takes dedication to understand tree biology, structural integrity, and local Gulf Coast diseases. By having an ISA Certified Arborist on every job, we replace reckless cutting with science-based arboriculture. We accurately diagnose hidden decay, structural risks, and disease before a single cut is made. You get the peace of mind that comes from a credentialed professional determining the safest, most effective plan for your landscape and personally seeing it through.',
    },
    {
      icon: 'book',
      title: 'Standards, Not Guesswork',
      text: "Your trees and your home are major investments, and we treat them that way. That's why we execute every job in accordance with ANSI A300 and ANSI Z133 guidelines. By holding ourselves to these standards, we ensure safe, controlled removals and research-based tree care. Whether we are dismantling a hazardous tree inches from your foundation or preserving a prized specimen, the work follows a written rulebook, not one crew's judgment in the moment.",
    },
    {
      icon: 'handshake',
      title: 'Transparent Pricing, Not Surprises',
      text: 'The tree care industry is infamous for vague estimates, bait-and-switch tactics, and sudden upcharges once the work begins. We refuse to operate that way. We provide comprehensive, fully transparent quotes before a single chainsaw is started. Whether your project requires complex rigging, deep stump grinding, or massive debris haul-away, every detail is clearly outlined, matching the exact scope of work. The price you agree to is the exact price you pay: no hidden fees, no "unforeseen" costs, and absolutely no surprises on your final invoice.',
    },
    {
      icon: 'crosshair',
      title: 'Surgical Dismantling, Not Free-Falling Timber',
      text: 'An amateur with a chainsaw lets gravity call the shots, resulting in crushed sprinkler heads, cracked concrete, and destroyed turf. We operate differently. Using friction devices and professional arborist rigging equipment, we control the descent of multi-ton logs with surgical precision. Instead of leaving that call to chance, we guide each piece to the ground exactly where it needs to go, keeping your pristine landscaping and expensive hardscaping untouched.',
    },
  ],

  // Social-proof band (Rule 23): badges/credential names shown under the
  // hero next to the live rating + review count (pulled from business.ts).
  // Link each to its proof (press article, certification page) when filled.
  // Google reviewer avatars for the proof band. Renders only when
  // populated: NEVER invent reviewers the profile can't back up.
  // FILL-IN (2 minutes, real reviewers only):
  //  1. Open the Google listing (business.ts gbp.profileUrl) > Reviews.
  //  2. For 4-5 recent reviewers: tap the reviewer photo, save it, drop
  //     the file into /public/images/reviewers/ (any name).
  //  3. Add one entry per reviewer: { img: '/images/reviewers/file.jpg' }
  //     If a reviewer has no photo, use Google-style initials instead:
  //     { initials: 'JM', bg: '#7b1fa2' }
  googleReviewers: [
    { img: '/images/reviewers/reviewer-1.webp' },
    { img: '/images/reviewers/reviewer-2.webp' },
    { img: '/images/reviewers/reviewer-3.webp' },
    { img: '/images/reviewers/reviewer-4-couple.webp' },
    { img: '/images/reviewers/reviewer-5.webp' },
  ] as ReadonlyArray<{ img?: string; initials?: string; bg?: string }>,


  // Homepage FAQs (Rule 13 #10, Rule 30 pattern): GENERAL questions only —
  // service-specific FAQs live on their service pages. Reword PAA questions,
  // never copy verbatim. Answer briefly; editorial-link to a supporting
  // page for depth (HTML allowed in answers for exactly that).
  faqs: [
    {
      q: 'What does an estimate cost?',
      a: 'Nothing. Call or text (281) 757-2938, describe the work you need done, and you get a free estimate with transparent pricing before any work starts.',
    },
    {
      q: 'Are you licensed and insured for tree work in Texas?',
      a: 'Yes. Every job is performed by an ISA Certified Arborist carrying full liability insurance. We can provide proof of coverage before any work starts.',
    },
  ],
} as const;
