/* ==========================================================================
   ProductMotive: web hosting landing data
   --------------------------------------------------------------------------
   All the hosting config for web-hosting.html (types, questions, hosts,
   plans, rules and the mismatch checklist). Kept out of data.js so the
   global page scripts stay small; this file is loaded ONLY on
   web-hosting.html (just before assets/js/hosting.js).
   ========================================================================== */

window.PM_DATA = window.PM_DATA || {};
window.PM_DATA.hosting = {
  /* First step: pin the type of hosting that fits (shared / static / vps /
     cloud / managed-wp). Each type declares altPriority: the ordered list
     of types we prefer when choosing the "alternative" card, so the card
     never contradicts the type banner silently. */
  types: [
    {
      id: "shared",
      name: "Shared hosting",
      tagline: "Your site shares a server with others — the cheapest, simplest option and right for most small sites.",
      altPriority: ["shared", "managed-wp", "cloud", "vps"],
      rules: [
        { when: { use: "blog" }, points: 10, why: "Blogs and portfolios are small and simple" },
        { when: { use: "unsure" }, points: 7, why: "The easiest place to start" },
        { when: { use: "business" }, points: 5, why: "Great for simple business sites" },
        { when: { use: "store" }, points: 3, why: "Stores can start here at low sales volume" },
        { when: { skill: "beginner" }, points: 8, why: "Everything is handled for you" },
        { when: { platform: "wordpress" }, points: 4, why: "Runs WordPress fine" },
        { when: { platform: "sitebuilder" }, points: 9, why: "Most hosts bundle a drag-and-drop builder" },
        { when: { platform: "static" }, points: -6, why: "A static site hosts free — don't pay for a server you don't need" },
        { when: { platform: "unsure" }, points: 5, why: "Both builders and blogs run here" },
        { when: { traffic: "low" }, points: 8, why: "Light traffic stays well within limits" },
        { when: { traffic: "unsure" }, points: 6 },
        { when: { traffic: "medium" }, points: 3 },
        { when: { sites: "one" }, points: 6, why: "A single site fits a shared plan easily" },
        { when: { sites: "few" }, points: 4 },
        { when: { budget: "minimum" }, points: 8, why: "The cheapest way to get online" },
        { when: { budget: "standard" }, points: 3 },
        { when: { use: "app" }, points: -10 },
        { when: { use: "agency" }, points: -2 },
        { when: { platform: "custom" }, points: -8 },
        { when: { traffic: "high" }, points: -8, why: "Shared plans choke under heavy traffic" },
        { when: { skill: "expert" }, points: -4 },
        { when: { budget: "premium" }, points: -5 }
      ]
    },
    {
      id: "static",
      name: "Free static hosting",
      tagline: "Plain HTML and CSS served free from a fast global CDN (Cloudflare Pages, Netlify or GitHub Pages) — no server, no monthly bill.",
      altPriority: ["static", "shared", "cloud"],
      rules: [
        { when: { platform: "static" }, points: 10, why: "Static sites are literally built for this" },
        { when: { traffic: "low" }, points: 9, why: "Free tiers comfortably handle a few thousand visits" },
        { when: { budget: "minimum" }, points: 8, why: "There's no monthly bill for most static sites" },
        { when: { skill: "beginner" }, points: 3, why: "Drag-and-drop uploads on Netlify or Cloudflare Pages" },
        { when: { skill: "mid" }, points: 4 },
        { when: { sites: "one" }, points: 5, why: "One static site fits a free plan easily" },
        { when: { sites: "few" }, points: 3 },
        { when: { use: "blog" }, points: 3 },
        { when: { use: "unsure" }, points: 3 },
        { when: { platform: "unsure" }, points: 1 },
        { when: { platform: "wordpress" }, points: -10 },
        { when: { platform: "sitebuilder" }, points: -5 },
        { when: { platform: "custom" }, points: -10 },
        { when: { use: "store" }, points: -8 },
        { when: { use: "app" }, points: -8 },
        { when: { use: "agency" }, points: -3 },
        { when: { traffic: "medium" }, points: -4 },
        { when: { traffic: "high" }, points: -9 },
        { when: { budget: "standard" }, points: -5 },
        { when: { budget: "premium" }, points: -10 }
      ]
    },
    {
      id: "vps",
      name: "VPS hosting",
      tagline: "A dedicated slice of a server with root access — real power at a fair price, but you maintain it.",
      altPriority: ["vps", "cloud", "shared"],
      rules: [
        { when: { skill: "expert" }, points: 9, why: "You're comfortable managing a server" },
        { when: { skill: "mid" }, points: 4 },
        { when: { platform: "custom" }, points: 10, why: "Full control for custom software" },
        { when: { use: "app" }, points: 9, why: "Built for real applications" },
        { when: { use: "agency" }, points: 6, why: "One VPS can host many client sites" },
        { when: { traffic: "medium" }, points: 5, why: "Handles growth without surprise bills" },
        { when: { traffic: "high" }, points: 5, why: "Scales predictably for predictable traffic" },
        { when: { budget: "minimum" }, points: 3 },
        { when: { budget: "standard" }, points: 3 },
        { when: { sites: "many" }, points: 4, why: "Client projects fit neatly on a VPS" },
        { when: { skill: "beginner" }, points: -9, why: "VPS setup expects you to know servers" },
        { when: { platform: "sitebuilder" }, points: -7 },
        { when: { use: "blog" }, points: -3 },
        { when: { traffic: "low" }, points: -4 }
      ]
    },
    {
      id: "cloud",
      name: "Managed cloud hosting",
      tagline: "Cloud infrastructure without the sysadmin work — scales with your site and stays simpler to run.",
      altPriority: ["cloud", "managed-wp", "vps", "shared"],
      rules: [
        { when: { skill: "mid" }, points: 8, why: "Cloud power without managing servers" },
        { when: { skill: "expert" }, points: 6 },
        { when: { platform: "wordpress" }, points: 6, why: "WordPress runs beautifully on managed cloud" },
        { when: { use: "agency" }, points: 7, why: "Many sites on one managed platform" },
        { when: { use: "business" }, points: 5 },
        { when: { use: "store" }, points: 6, why: "E-commerce likes the extra headroom" },
        { when: { use: "app" }, points: 6 },
        { when: { traffic: "medium" }, points: 7, why: "Grows past shared limits cleanly" },
        { when: { traffic: "high" }, points: 8, why: "Handles spikes without manual scaling" },
        { when: { budget: "standard" }, points: 6 },
        { when: { budget: "premium" }, points: 5 },
        { when: { sites: "many" }, points: 5 },
        { when: { skill: "beginner" }, points: -8, why: "Still assumes more than the basics" },
        { when: { budget: "minimum" }, points: -8 },
        { when: { traffic: "low" }, points: -5, why: "Overkill for light traffic" },
        { when: { platform: "static" }, points: -3 }
      ]
    },
    {
      id: "managed-wp",
      name: "Managed WordPress hosting",
      tagline: "WordPress-specific hosting where updates, security, backups and speed are handled for you — at a premium.",
      altPriority: ["managed-wp", "cloud", "shared", "vps"],
      rules: [
        { when: { platform: "wordpress" }, points: 10, why: "Everything WordPress is taken care of" },
        { when: { use: "store" }, points: 8, why: "Stores justify the premium with uptime and speed" },
        { when: { use: "business" }, points: 7, why: "Business downtime is expensive" },
        { when: { use: "agency" }, points: 6, why: "Client sites under one managed roof" },
        { when: { traffic: "medium" }, points: 6, why: "Stays fast under steady traffic" },
        { when: { traffic: "high" }, points: 9, why: "Holds up where shared hosting wilts" },
        { when: { budget: "premium" }, points: 9, why: "Premium price for premium support" },
        { when: { budget: "standard" }, points: -4 },
        { when: { skill: "beginner" }, points: 3, why: "The most hands-off WordPress option" },
        { when: { skill: "mid" }, points: 4 },
        { when: { platform: "custom" }, points: -9 },
        { when: { platform: "sitebuilder" }, points: -7 },
        { when: { platform: "static" }, points: -8 },
        { when: { use: "blog" }, points: -3 },
        { when: { traffic: "low" }, points: -7, why: "Overkill before the traffic is there" },
        { when: { budget: "minimum" }, points: -9 }
      ]
    }
  ],

  questions: [
    {
      id: "use",
      title: "What are you hosting?",
      copy: "The kind of site decides which host makes sense. Pick the closest one.",
      options: [
        { id: "blog", label: "Blog or portfolio", copy: "A personal or content site" },
        { id: "business", label: "Business website", copy: "Company, services or brochure site" },
        { id: "store", label: "Online store", copy: "Selling products or services online" },
        { id: "agency", label: "Client or agency work", copy: "Building sites for other people" },
        { id: "app", label: "Web app or SaaS", copy: "A real application, not just content" },
        { id: "unsure", label: "Not sure yet", copy: "Just exploring options" }
      ]
    },
    {
      id: "skill",
      title: "How hands-on do you want to be?",
      copy: "Be honest — a host that matches your comfort level saves you days of frustration.",
      options: [
        { id: "beginner", label: "Beginner", copy: "I want everything handled for me" },
        { id: "mid", label: "Some experience", copy: "Comfortable with cPanel or a similar panel" },
        { id: "expert", label: "Developer", copy: "Comfortable with the command line" }
      ]
    },
    {
      id: "platform",
      title: "What will your site run on?",
      copy: "WordPress, a drag-and-drop builder and a custom app need very different hosts.",
      options: [
        { id: "wordpress", label: "WordPress" },
        { id: "sitebuilder", label: "A website builder", copy: "Drag-and-drop builders like Elementor, Sitejet" },
        { id: "static", label: "Static or simple site", copy: "Plain HTML/CSS or a small site" },
        { id: "custom", label: "Custom app", copy: "Node.js, Python, PHP, databases, and so on" },
        { id: "unsure", label: "Not sure" }
      ]
    },
    {
      id: "traffic",
      title: "How much traffic do you expect?",
      copy: "A rough range is enough — it keeps the shortlist honest.",
      options: [
        { id: "low", label: "A few thousand visits a month" },
        { id: "medium", label: "Thousands to tens of thousands" },
        { id: "high", label: "50k+ or growing fast" },
        { id: "unsure", label: "Just starting out" }
      ]
    },
    {
      id: "sites",
      title: "How many sites will you host?",
      copy: "One site is different from juggling client projects.",
      options: [
        { id: "one", label: "One site" },
        { id: "few", label: "Two or three sites" },
        { id: "many", label: "Many or client sites" }
      ]
    },
    {
      id: "budget",
      title: "What's your budget preference?",
      copy: "Price is a feature too. Roughly: minimum ≈ $2–6/mo, standard ≈ $6–20/mo, premium ≈ $20–150+/mo.",
      options: [
        { id: "minimum", label: "Keep it minimal", copy: "The cheapest that's still reliable — roughly $2–6/mo" },
        { id: "standard", label: "Standard", copy: "A good balance — roughly $6–20/mo (some managed plans cost more)" },
        { id: "premium", label: "Premium", copy: "Best performance, managed if possible — roughly $20–150+/mo" }
      ]
    }
  ],

  hosts: [
    {
      slug: "free-static",
      name: "Free static hosting",
      mark: "F",
      accent: "#0E7A4D",
      type: "Free static (CDN)",
      typeCat: ["static"],
      skill: "Beginner–mid",
      budget: "free",
      budgetTag: "Free",
      priceClass: 0,
      renewal: "Free — nothing to renew",
      bestFor: "Static sites, portfolios and simple landing pages that shouldn't cost anything",
      tagline: "Cloudflare Pages, Netlify and GitHub Pages host plain HTML/CSS sites free, with free SSL and a built-in CDN.",
      reason: "A static site costs $0/month on a generous free CDN tier",
      tradeoff: "No server-side code — PHP, databases and app logic need a different host.",
      cta: "Host it free",
      pros: ["$0/month on generous free tiers", "Free SSL and a global CDN", "Deploy by drag-and-drop (Netlify) or git push"],
      cons: ["No PHP, MySQL or server-side logic", "Free tiers cap bandwidth and build minutes"],
      url: "https://pages.cloudflare.com",
      plans: [
        { name: "Free tier", tag: "$0", popular: true, price: "$0/mo", when: { traffic: "low", sites: "one" }, note: "Enough for a personal or small-business static site." },
        { name: "Pro tier (optional)", tag: "Paid", price: "from $5/mo", when: { traffic: "medium" }, note: "More bandwidth if you ever need it." }
      ],
      rules: [
        { when: { platform: "static" }, points: 10 },
        { when: { traffic: "low" }, points: 8 },
        { when: { budget: "minimum" }, points: 9 },
        { when: { skill: "beginner" }, points: 4 },
        { when: { skill: "mid" }, points: 4 },
        { when: { sites: "one" }, points: 6 },
        { when: { sites: "few" }, points: 3 },
        { when: { use: "blog" }, points: 4 },
        { when: { use: "unsure" }, points: 4 },
        { when: { platform: "unsure" }, points: 2 },
        { when: { traffic: "medium" }, points: -4 },
        { when: { traffic: "high" }, points: -8 },
        { when: { budget: "standard" }, points: -4 },
        { when: { budget: "premium" }, points: -9 },
        { when: { platform: "wordpress" }, points: -10 },
        { when: { platform: "sitebuilder" }, points: -6 },
        { when: { platform: "custom" }, points: -9 },
        { when: { use: "store" }, points: -9 },
        { when: { use: "app" }, points: -8 },
        { when: { use: "agency" }, points: -3 }
      ]
    },
    {
      slug: "bluehost",
      name: "Bluehost",
      mark: "B",
      accent: "#2B65EC",
      type: "Shared & WordPress",
      typeCat: ["shared"],
      skill: "Beginner",
      budget: "standard",
      budgetTag: "Standard",
      priceClass: 2,
      renewal: "Renews higher after the intro term",
      bestFor: "WordPress beginners who want an easy first host",
      tagline: "A beginner-friendly shared host with a strong WordPress focus and 24/7 support.",
      reason: "Easy WordPress setup and onboarding make it the classic starter host",
      tradeoff: "Renewal prices rise after the intro term, and the dashboard pushes upsells.",
      pros: ["One-click WordPress plus guided setup", "Free domain name and CDN on most plans", "24/7 phone and chat support"],
      cons: ["Renewal pricing is higher than the promo rate", "Plans get pricey once you need more resources"],
      aff: "https://bluehost.sjv.io/aeducateweb",
      url: "https://www.bluehost.com",
      plans: [
        { name: "Basic", tag: "Entry", price: "from $2.95/mo", when: { sites: "one", traffic: "low" }, note: "One site, plenty for a first project." },
        { name: "Choice Plus", tag: "Most popular", popular: true, price: "from $5.45/mo", when: { sites: "few", budget: "standard" }, note: "Multiple sites with backups and domain privacy." },
        { name: "Online Store", tag: "Stores", price: "from $9.95/mo", when: { use: "store" }, note: "A plan aimed at online stores." },
        { name: "Pro", tag: "Scale", price: "from $13.95/mo", when: { traffic: "high" }, note: "More resources once you outgrow shared." }
      ],
      rules: [
        { when: { platform: "wordpress" }, points: 8 },
        { when: { skill: "beginner" }, points: 6 },
        { when: { use: "blog" }, points: 6 },
        { when: { use: "business" }, points: 5 },
        { when: { use: "store" }, points: 3 },
        { when: { use: "unsure" }, points: 5 },
        { when: { budget: "minimum" }, points: 2 },
        { when: { budget: "standard" }, points: 4 },
        { when: { budget: "premium" }, points: -3 },
        { when: { traffic: "medium" }, points: 2 },
        { when: { traffic: "high" }, points: -6 },
        { when: { platform: "sitebuilder" }, points: 3 },
        { when: { platform: "custom" }, points: -8 },
        { when: { skill: "expert" }, points: -5 },
        { when: { sites: "many" }, points: -2 }
      ]
    },
    {
      slug: "hostinger",
      name: "Hostinger",
      mark: "H",
      accent: "#673DE6",
      type: "Shared, VPS & Cloud",
      typeCat: ["shared", "vps"],
      skill: "Beginner–mid",
      budget: "budget",
      budgetTag: "Budget",
      priceClass: 1,
      renewal: "Renews roughly 2× the intro rate",
      bestFor: "Great value shared hosting for small sites and beginners",
      tagline: "Consistently low pricing, a modern panel and solid performance make it a strong budget pick.",
      reason: "Excellent price-to-performance across shared plans",
      tradeoff: "Support is chat-only on the cheapest tiers.",
      pros: ["Some of the lowest prices around", "Modern, fast custom control panel", "LiteSpeed servers for snappy sites"],
      cons: ["Support is chat-only at budget tier", "Higher tiers oversell what small sites need"],
      aff: "https://hostinger.sjv.io/aeducateweb",
      url: "https://www.hostinger.com",
      plans: [
        { name: "Single", tag: "Entry", price: "from $2.99/mo", when: { sites: "one", budget: "minimum" }, note: "One site at the lowest price." },
        { name: "Premium", tag: "Most popular", popular: true, price: "from $3.99/mo", when: { sites: "few", skill: "beginner" }, note: "The usual sweet spot — more room, still cheap." },
        { name: "Business", tag: "Performance", price: "from $4.99/mo", when: { use: "business", traffic: "medium" }, note: "Daily backups and extra performance." },
        { name: "Cloud Startup", tag: "Cloud", price: "from $9.99/mo", when: { traffic: "high" }, note: "Cloud infrastructure for growing traffic." }
      ],
      rules: [
        { when: { budget: "minimum" }, points: 8 },
        { when: { budget: "standard" }, points: 4 },
        { when: { budget: "premium" }, points: -4 },
        { when: { skill: "beginner" }, points: 5 },
        { when: { skill: "mid" }, points: 4 },
        { when: { platform: "wordpress" }, points: 7 },
        { when: { platform: "sitebuilder" }, points: 6 },
        { when: { platform: "unsure" }, points: 5 },
        { when: { traffic: "low" }, points: 5 },
        { when: { traffic: "medium" }, points: 4 },
        { when: { traffic: "unsure" }, points: 4 },
        { when: { traffic: "high" }, points: -5 },
        { when: { use: "blog" }, points: 5 },
        { when: { use: "business" }, points: 4 },
        { when: { use: "unsure" }, points: 4 },
        { when: { use: "store" }, points: 2 },
        { when: { sites: "one" }, points: 3 }
      ]
    },
    {
      slug: "hostgator",
      name: "HostGator",
      mark: "G",
      accent: "#F18C33",
      type: "Shared hosting",
      typeCat: ["shared"],
      skill: "Beginner",
      budget: "budget",
      budgetTag: "Budget",
      priceClass: 1,
      renewal: "Renews higher after the intro term",
      bestFor: "Budget shared hosting for simple sites and small blogs",
      tagline: "A familiar cPanel shared host with cheap intro plans and a long money-back window.",
      reason: "Cheap intro plans with the cPanel people already know",
      tradeoff: "Intro pricing renews higher and performance is mid-tier.",
      pros: ["Low intro pricing", "45-day money-back guarantee", "cPanel plus free site migration"],
      cons: ["Renewal pricing jumps", "Shared neighbours can slow you down under spikes"],
      aff: "https://hostgator.pvxt.net/aeducateweb",
      url: "https://www.hostgator.com",
      plans: [
        { name: "Hatchling", tag: "Entry", price: "from $3.75/mo", when: { sites: "one" }, note: "One site at the cheapest intro price." },
        { name: "Baby", tag: "Most popular", popular: true, price: "from $4.50/mo", when: { sites: "few" }, note: "Multiple sites on a familiar cPanel." },
        { name: "Business", tag: "More power", price: "from $6.25/mo", when: { use: "business", traffic: "medium" }, note: "Extra resources and backup options." }
      ],
      rules: [
        { when: { budget: "minimum" }, points: 6 },
        { when: { budget: "standard" }, points: 2 },
        { when: { budget: "premium" }, points: -4 },
        { when: { skill: "beginner" }, points: 6 },
        { when: { skill: "mid" }, points: 3 },
        { when: { platform: "wordpress" }, points: 5 },
        { when: { platform: "sitebuilder" }, points: 4 },
        { when: { traffic: "low" }, points: 4 },
        { when: { traffic: "medium" }, points: 2 },
        { when: { traffic: "high" }, points: -6 },
        { when: { traffic: "unsure" }, points: 3 },
        { when: { use: "blog" }, points: 5 },
        { when: { use: "business" }, points: 4 },
        { when: { use: "unsure" }, points: 4 },
        { when: { platform: "custom" }, points: -6 }
      ]
    },
    {
      slug: "digitalocean",
      name: "DigitalOcean",
      mark: "DO",
      accent: "#0369FF",
      type: "Cloud VPS",
      typeCat: ["vps"],
      skill: "Expert",
      budget: "standard",
      budgetTag: "Standard",
      priceClass: 2,
      renewal: "Hourly billing, no contract",
      bestFor: "Developers who want simple, per-hour cloud servers",
      tagline: "Predictable, transparently-priced cloud droplets for developers building real apps.",
      reason: "Transparent per-hour pricing and developer-favourite documentation",
      tradeoff: "You run and maintain the server yourself.",
      pros: ["Simple pricing billed per hour", "Fast SSD droplets in many regions", "Excellent docs and an app platform"],
      cons: ["Assumes comfort with the command line", "No hand-holding support tier for beginners"],
      aff: "https://digitalocean.pxf.io/aeducateweb",
      url: "https://www.digitalocean.com",
      plans: [
        { name: "Basic Droplet", tag: "Entry VPS", price: "from $4/mo", when: { traffic: "low", budget: "standard" }, note: "The cheapest way to run a real VPS." },
        { name: "General Purpose Droplet", tag: "Performance", popular: true, price: "from $12/mo", when: { traffic: "medium", use: "app" }, note: "More CPU and RAM for real workloads." },
        { name: "App Platform", tag: "No-server", price: "from $5/mo", when: { skill: "mid", use: "app" }, note: "Push code, get a managed deployment — no server admin." },
        { name: "CPU Optimized Droplet", tag: "Scale", price: "from $24/mo", when: { traffic: "high" }, note: "Heavy compute for when you need it." }
      ],
      rules: [
        { when: { skill: "expert" }, points: 8 },
        { when: { platform: "custom" }, points: 10 },
        { when: { use: "app" }, points: 10 },
        { when: { use: "agency" }, points: 5 },
        { when: { use: "unsure" }, points: 2 },
        { when: { traffic: "medium" }, points: 5 },
        { when: { traffic: "high" }, points: 6 },
        { when: { budget: "standard" }, points: 3 },
        { when: { budget: "premium" }, points: 2 },
        { when: { budget: "minimum" }, points: -2 },
        { when: { skill: "beginner" }, points: -10 },
        { when: { skill: "mid" }, points: -2 },
        { when: { platform: "wordpress" }, points: -5 },
        { when: { platform: "sitebuilder" }, points: -8 },
        { when: { platform: "static" }, points: -2 },
        { when: { sites: "one" }, points: 2 }
      ]
    },
    {
      slug: "wpengine",
      name: "WP Engine",
      mark: "WE",
      accent: "#17939F",
      type: "Managed WordPress",
      typeCat: ["managed-wp"],
      skill: "Beginner–mid",
      budget: "premium",
      budgetTag: "Premium",
      priceClass: 3,
      renewal: "Annual plates typically, no intro-price games",
      bestFor: "Business or store WordPress sites that need premium managed hosting",
      tagline: "Best-in-class managed WordPress — speed, security and support at a premium.",
      reason: "Top-tier managed WordPress with staging, security and expert support",
      tradeoff: "The most expensive option here, and WordPress-only.",
      pros: ["Managed security, backups and updates", "Fast at scale for WordPress", "Staging sites and expert support"],
      cons: ["Premium pricing", "WordPress sites only"],
      aff: "https://www.wqwln8trk.com/7X9SZP1PN/724Q2W6B2/",
      url: "https://wpengine.com",
      plans: [
        { name: "Startup", tag: "Entry", price: "from $20/mo", when: { sites: "one" }, note: "The first managed plan — a single site." },
        { name: "Professional", tag: "Most popular", popular: true, price: "from $40/mo", when: { sites: "few" }, note: "More sites and faster support." },
        { name: "Growth", tag: "Scale", price: "from $77/mo", when: { traffic: "high", use: "store" }, note: "Built to scale with traffic." }
      ],
      rules: [
        { when: { platform: "wordpress" }, points: 8 },
        { when: { traffic: "high" }, points: 8 },
        { when: { traffic: "medium" }, points: 5 },
        { when: { budget: "premium" }, points: 9 },
        { when: { budget: "standard" }, points: -2 },
        { when: { budget: "minimum" }, points: -9 },
        { when: { use: "business" }, points: 6 },
        { when: { use: "store" }, points: 7 },
        { when: { use: "agency" }, points: 5 },
        { when: { skill: "beginner" }, points: 2 },
        { when: { skill: "mid" }, points: 4 },
        { when: { traffic: "low" }, points: -6 },
        { when: { platform: "custom" }, points: -8 },
        { when: { platform: "sitebuilder" }, points: -6 },
        { when: { use: "blog" }, points: -3 }
      ]
    },
    {
      slug: "cloudways",
      name: "Cloudways",
      mark: "C",
      accent: "#D6369C",
      type: "Managed cloud VPS",
      typeCat: ["cloud"],
      skill: "Mid–expert",
      budget: "standard",
      budgetTag: "Standard",
      priceClass: 2,
      renewal: "Hourly, pay-as-you-go",
      bestFor: "Growing sites and agencies that want managed cloud without the sysadmin work",
      tagline: "Managed VPS on top of AWS, DigitalOcean and Google Cloud — cloud power without running a server.",
      reason: "Managed cloud VPS that scales with your traffic",
      tradeoff: "Pay-as-you-go costs can run higher than shared hosting.",
      pros: ["Pick your cloud provider (AWS, DigitalOcean, more)", "Staging, backups and monitoring built in", "Great fit for WordPress and PHP apps"],
      cons: ["Costs grow with usage", "Feels advanced for absolute beginners"],
      aff: "https://www.shareasale.com/u.cfm?d=889391&m=75038&u=3355619",
      url: "https://www.cloudways.com",
      plans: [
        { name: "Small (1–2 GB RAM)", tag: "Entry", price: "from $11/mo", when: { traffic: "low", budget: "standard" }, note: "The smallest managed server — cheap to start." },
        { name: "Standard (2–4 GB RAM)", tag: "Most popular", popular: true, price: "from $23/mo", when: { traffic: "medium" }, note: "The sweet spot for most growing sites." },
        { name: "Scaling servers (4 GB+)", tag: "Scale", price: "from $47/mo", when: { traffic: "high", sites: "many" }, note: "Add RAM and CPU as demand grows." }
      ],
      rules: [
        { when: { skill: "mid" }, points: 6 },
        { when: { skill: "expert" }, points: 6 },
        { when: { platform: "wordpress" }, points: 6 },
        { when: { platform: "custom" }, points: 4 },
        { when: { use: "agency" }, points: 6 },
        { when: { use: "store" }, points: 5 },
        { when: { use: "business" }, points: 5 },
        { when: { use: "app" }, points: 7 },
        { when: { traffic: "medium" }, points: 6 },
        { when: { traffic: "high" }, points: 7 },
        { when: { budget: "standard" }, points: 5 },
        { when: { budget: "premium" }, points: 5 },
        { when: { budget: "minimum" }, points: -6 },
        { when: { skill: "beginner" }, points: -5 },
        { when: { platform: "sitebuilder" }, points: -2 },
        { when: { platform: "static" }, points: -2 },
        { when: { sites: "many" }, points: 3 }
      ]
    },
    {
      slug: "interserver",
      name: "InterServer",
      mark: "IS",
      accent: "#16324F",
      type: "Shared & VPS",
      typeCat: ["shared", "vps"],
      skill: "Mid–expert",
      budget: "budget",
      budgetTag: "Budget",
      priceClass: 1,
      renewal: "Price locked — no jump at renewal",
      bestFor: "Value seekers who want stable pricing, especially a cheap VPS",
      tagline: "A no-nonsense provider known for its price-lock guarantee and affordable VPS plans.",
      reason: "Price-lock guarantee and genuinely cheap VPS tiers",
      tradeoff: "The control panel feels dated and there's less hand-holding.",
      pros: ["Price lock: your rate doesn't jump at renewal", "Very cheap VPS plans", "Unlimited storage on standard web plans"],
      cons: ["Older, no-frills interface", "Less hand-holding for beginners"],
      aff: "https://www.jdoqocy.com/click-100952366-11145908",
      url: "https://www.interserver.net",
      plans: [
        { name: "Standard Web Hosting", tag: "Shared", price: "from $2.50/mo", when: { platform: "wordpress", budget: "minimum" }, note: "Their price-locked shared plan." },
        { name: "Standard VPS", tag: "Budget VPS", popular: true, price: "from $6/mo", when: { platform: "custom", skill: "expert" }, note: "The value choice for a self-managed VPS." },
        { name: "Larger VPS tiers", tag: "More power", price: "from $12/mo", when: { traffic: "high" }, note: "Step up CPU and RAM as you grow." }
      ],
      rules: [
        { when: { budget: "minimum" }, points: 7 },
        { when: { budget: "standard" }, points: 3 },
        { when: { budget: "premium" }, points: -3 },
        { when: { skill: "mid" }, points: 4 },
        { when: { skill: "expert" }, points: 4 },
        { when: { platform: "static" }, points: 4 },
        { when: { platform: "custom" }, points: 4 },
        { when: { use: "agency" }, points: 3 },
        { when: { traffic: "medium" }, points: 3 },
        { when: { sites: "few" }, points: 2 },
        { when: { sites: "many" }, points: 2 },
        { when: { skill: "beginner" }, points: -2 },
        { when: { platform: "sitebuilder" }, points: -3 }
      ]
    },
    {
      slug: "verpex",
      name: "Verpex",
      mark: "V",
      accent: "#0F9D58",
      type: "Shared hosting",
      typeCat: ["shared"],
      skill: "Beginner",
      budget: "budget",
      budgetTag: "Budget",
      priceClass: 1,
      renewal: "Renewal-friendly pricing",
      bestFor: "Budget shared hosting with renewal-friendly pricing and global data centres",
      tagline: "Cheap shared hosting with free migrations and servers on several continents.",
      reason: "Low pricing that stays low at renewal, with global servers",
      tradeoff: "A younger brand with a shorter track record.",
      pros: ["Cheap plans with renewal-friendly pricing", "Free site migration", "Data centres across multiple continents"],
      cons: ["Newer provider, shorter history", "Fewer advanced developer features"],
      aff: "https://clients.verpex.com/aff/?a_aid=refid&a_aid=aeducateweb",
      url: "https://www.verpex.com",
      plans: [
        { name: "Entry shared plan", tag: "Entry", popular: true, price: "from $2/mo", when: { sites: "one", budget: "minimum" }, note: "One site at the lowest price." },
        { name: "Multi-site shared plan", tag: "Sites", price: "from $4/mo", when: { sites: "few" }, note: "Room for two or three sites." },
        { name: "Higher / business tier", tag: "More power", price: "from $6/mo", when: { use: "business", traffic: "medium" }, note: "Extra performance when you need it." }
      ],
      rules: [
        { when: { budget: "minimum" }, points: 7 },
        { when: { budget: "standard" }, points: 3 },
        { when: { budget: "premium" }, points: -5 },
        { when: { skill: "beginner" }, points: 6 },
        { when: { skill: "mid" }, points: 3 },
        { when: { platform: "wordpress" }, points: 5 },
        { when: { platform: "sitebuilder" }, points: 5 },
        { when: { platform: "static" }, points: 4 },
        { when: { use: "blog" }, points: 6 },
        { when: { use: "business" }, points: 4 },
        { when: { use: "unsure" }, points: 5 },
        { when: { traffic: "low" }, points: 5 },
        { when: { traffic: "medium" }, points: 3 },
        { when: { traffic: "unsure" }, points: 4 },
        { when: { traffic: "high" }, points: -5 }
      ]
    }
  ],

  /* Price tier per budget answer, used to sanity-check the pick */
  budgetClass: { minimum: 1, standard: 2, premium: 3 },

  /* Common mismatches worth flagging on the results screen */
  checklist: [
    { when: { skill: "beginner", platform: "custom" }, text: "Custom apps usually assume developer comfort. If you're just starting out, lean on a managed platform with support — or bring a developer in." },
    { when: { traffic: "high", budget: "minimum" }, text: "High traffic on the cheapest plans is a recipe for slowdowns. Budget for at least a mid-tier plan." },
    { when: { budget: "premium", traffic: "low" }, text: "Premium hosting is excellent, but for light traffic it may be more than you need to spend right now." },
    { when: { use: "agency", skill: "beginner" }, text: "Hosting client sites is serious business. If you're new, start with one managed provider, learn its panel, then scale." },
    { when: { use: "store", budget: "minimum" }, text: "A store takes real money in real time — the cheapest plans get throttled at busy moments. If sales matter, plan for at least a mid-tier plan." }
  ]
};