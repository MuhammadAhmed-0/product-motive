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
  ctaHref: "web-hosting.html",

  categories: [
    {
      id: "web-hosting",
      name: "Web Hosting",
      description: "Shared, VPS, cloud and managed WordPress hosting for your site.",
      examples: ["WordPress", "VPS", "Managed cloud"],
      icon: "server",
      href: "web-hosting.html"
    },
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
      href: "guides/define-what-you-need.html",
      icon: "target",
      pattern: "grid"
    },
    {
      tag: "Budgeting",
      title: "Price and value: how to think about trade-offs",
      excerpt: "Why the cheapest and the most expensive options are rarely the right place to start.",
      href: "guides/price-and-value.html",
      icon: "scale",
      pattern: "rings"
    },
    {
      tag: "Comparing",
      title: "How to compare options without getting lost in specs",
      excerpt: "Focus on the few criteria that change your decision and set the rest aside.",
      href: "guides/compare-without-specs-overload.html",
      icon: "compare",
      pattern: "steps"
    }
  ],

  /* Match flow (see assets/js/match.js) -------------------------------- */
  matchFlow: {
    any: {
      id: "any",
      name: "Any category",
      description: "Keep it open — show me what fits best.",
      icon: "grid"
    },
    priorities: [
      { id: "reliability", label: "Reliability" },
      { id: "ease-of-use", label: "Ease of use" },
      { id: "value", label: "Value for money" },
      { id: "features", label: "Feature depth" },
      { id: "design", label: "Design & polish" },
      { id: "support", label: "Help & support" }
    ],
    budgets: {
      goods: [
        { id: "under-100", label: "Under $100", note: "Budget-friendly" },
        { id: "100-300", label: "$100–$300", note: "Solid mid-range" },
        { id: "300-700", label: "$300–$700", note: "Well-equipped" },
        { id: "700-plus", label: "$700+", note: "Premium" }
      ],
      subscription: [
        { id: "free", label: "Free", note: "Free tier" },
        { id: "under-20", label: "Under $20/mo", note: "Lean" },
        { id: "20-60", label: "$20–$60/mo", note: "Team-ready" },
        { id: "60-plus", label: "$60+/mo", note: "Enterprise" }
      ]
    },
    budgetFor: {
      technology: "goods",
      "home-office": "goods",
      travel: "goods",
      lifestyle: "goods",
      software: "subscription",
      business: "subscription",
      any: "goods"
    },
    useCases: {
      default: ["Casual & everyday", "Work", "Creative", "Something else"],
      technology: ["Everyday", "Work", "Creative", "Gaming", "Something else"],
      "home-office": ["Working from home", "Home living", "Small spaces", "Something else"],
      software: ["Personal use", "Team use", "Business use", "Something else"],
      business: ["Freelance", "Startup", "Small business", "Something else"],
      travel: ["Light travel", "Frequent flyer", "Family trips", "Something else"],
      lifestyle: ["Fitness", "Hobbies", "Wellness", "Something else"]
    }
  },


  /* Hosting landing data lives in assets/js/data-hosting.js (loaded on web-hosting.html). */
};
