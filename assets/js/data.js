/* ==========================================================================
   ProductMotive: homepage content data
   --------------------------------------------------------------------------
   Everything in this file feeds a reusable component in main.js.
   To add a category or a guide, add an object to the matching array.
   No HTML or CSS changes are needed.

   CATEGORY FIELDS
     id           URL-safe slug. Sent to the match flow as ?category=<id>
     name         Card heading
     description  One sentence, category-neutral tone
     examples     Optional. Short list shown at the bottom of the card
     icon         Optional. Matches a <symbol id="i-<icon>"> in index.html.
                  Falls back to a generic grid icon if not found.

   GUIDE FIELDS
     title, excerpt, tag, href
     icon         Same sprite as above (target, scale, compare, ...)
     pattern      Cover artwork: "grid" | "rings" | "steps"
                  (The first guide in the list is shown as the featured card.)
   ========================================================================== */

window.PM_DATA = {
  ctaHref: "/find-your-match",

  categories: [
    {
      id: "technology",
      name: "Technology",
      description: "Devices, gadgets and accessories for work and everyday life.",
      examples: ["Laptops", "Phones", "Audio"],
      icon: "technology"
    },
    {
      id: "home-office",
      name: "Home & Office",
      description: "Furniture, appliances and gear for the spaces you live and work in.",
      examples: ["Desks", "Chairs", "Appliances"],
      icon: "home-office"
    },
    {
      id: "software",
      name: "Software",
      description: "Apps, tools and platforms for individuals and teams.",
      examples: ["Productivity", "Design", "Security"],
      icon: "software"
    },
    {
      id: "business",
      name: "Business",
      description: "Services and tools for running and growing a company.",
      examples: ["Accounting", "CRM", "Payments"],
      icon: "business"
    },
    {
      id: "travel",
      name: "Travel",
      description: "Gear, services and tools for planning and taking trips.",
      examples: ["Luggage", "Booking tools", "Connectivity"],
      icon: "travel"
    },
    {
      id: "lifestyle",
      name: "Lifestyle",
      description: "Everyday products for health, hobbies and personal routines.",
      examples: ["Fitness", "Hobbies", "Wellness"],
      icon: "lifestyle"
    }
  ],

  guides: [
    {
      tag: "Getting started",
      title: "How to define what you need before you compare",
      excerpt: "Turn a loose wish list into a short set of requirements you can actually use.",
      href: "/guides/define-what-you-need",
      icon: "target",
      pattern: "grid"
    },
    {
      tag: "Budgeting",
      title: "Price and value: how to think about trade-offs",
      excerpt: "Why the cheapest and the most expensive options are rarely the right place to start.",
      href: "/guides/price-and-value",
      icon: "scale",
      pattern: "rings"
    },
    {
      tag: "Comparing",
      title: "How to compare options without getting lost in specs",
      excerpt: "Focus on the few criteria that change your decision and set the rest aside.",
      href: "/guides/compare-without-specs-overload",
      icon: "compare",
      pattern: "steps"
    }
  ]
};
