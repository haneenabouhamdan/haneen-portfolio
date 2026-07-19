/**
 * SITE TOGGLES
 * ------------
 * Freelance / consultancy block visibility:
 *   1) Set `showFreelance` below to false, OR
 *   2) Set env `NEXT_PUBLIC_SHOW_FREELANCE=false` (overrides the boolean when set).
 * Default is ON (show the Freelance & Consultancy section + Services nav link).
 * See also `.env.example`.
 */
export const showFreelanceContent = true;

/** Resolved at build/runtime: env wins when explicitly "true" or "false". */
export const showFreelance = (() => {
  const env = process.env.NEXT_PUBLIC_SHOW_FREELANCE;
  if (env === "false" || env === "0") return false;
  if (env === "true" || env === "1") return true;
  return showFreelanceContent;
})();

/**
 * Page section order. Hero is `top` (implicit eyebrow 01).
 * When `showFreelance` is false, Services is omitted and later eyebrows shift down.
 */
export type SectionNavItem = { id: string; label: string };

export const sectionNav: SectionNavItem[] = (() => {
  const list: SectionNavItem[] = [
    { id: "top", label: "Top" },
    { id: "work", label: "Work" },
    { id: "personal", label: "Builds" },
    { id: "about", label: "About" },
    { id: "stack", label: "Stack" },
  ];
  if (showFreelance) list.push({ id: "services", label: "Engage" });
  list.push(
    { id: "path", label: "Path" },
    { id: "certifications", label: "Certs" },
    { id: "contact", label: "Contact" },
  );
  return list;
})();

/** Eyebrow indices for non-hero sections — stays in sync when Services is toggled off. */
export const sectionEyebrow: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  let n = 2;
  for (const s of sectionNav) {
    if (s.id === "top") continue;
    map[s.id] = String(n++).padStart(2, "0");
  }
  return map;
})();

export const profile = {
  name: "Haneen Abou Hamdan",
  firstName: "Haneen",
  lastName: "Abou Hamdan",
  role: "Digital Lead · Senior Software Engineer",
  location: "Dubai, UAE",
  email: "haneenabouhamdan@gmail.com",
  phone: "+971 50 557 4438",
  linkedin: "https://www.linkedin.com/in/haneen-abou-hamdan/",
  github: "https://github.com/haneenabouhamdan",
  resume: "/resume/haneen-abou-hamdan.pdf",
  /** Optional Calendly (or similar) — edit this URL when you have a booking link. */
  bookingUrl: "https://calendly.com/haneen-abouhamdan/new-meeting",
  tagline: "Senior engineering leadership, delivered with taste.",
  heroWord: "MOMENTUM",
  available: "Available as a senior software developer — lead roles, consultancy & freelance",
  /** Services section lead — engagement-focused; Hero/About keep the “available as…” line. */
  servicesLead:
    "Open for senior software development — lead roles, technical consultancy, and selected freelance. Looking for an engineering lead, or a hands-on partner to ship web, mobile and AI products with taste.",
  intro:
    "I direct cross-functional engineering teams and scale enterprise web and mobile platforms — turning complex, multi-stream organizations into fast, modern, AI-enabled products. Available as a senior software developer for technical consultancy and freelance engagements.",
  summary:
    "Digital Lead and Senior Software Engineer with 5+ years directing engineering teams of up to 15 (onsite and offshore), driving enterprise delivery across hospitality, retail and entertainment. I align engineering with business priorities, own architecture and modernization, and embed AI deeply into how products are built and how teams work. Alongside my role at Emaar, I'm available as a senior software developer for technical consultancy and freelance work — helping teams ship faster with modern stacks and applied AI.",
};

export const stats = [
  { value: "5+", label: "Years engineering" },
  { value: "15", label: "Engineers led" },
  { value: "Multi", label: "Enterprise platforms" },
  { value: "10+", label: "Legacy apps retired" },
];

export const capabilities = [
  {
    title: "Leadership & Delivery",
    items: [
      "Multi-team coordination",
      "Agile / Scrum",
      "Roadmap alignment",
      "Mentorship & coaching",
      "Engineering standards",
    ],
  },
  {
    title: "Strategy & Architecture",
    items: [
      "System design",
      "Platform modernization",
      "Solution architecture",
      "Cost-aware engineering",
      "Vendor & integration",
    ],
  },
  {
    title: "Technical Stack",
    items: [
      "React · Next.js",
      "React Native · Expo",
      "Node.js · NestJS",
      "PostgreSQL · Redis",
      "Azure · OCI · Docker",
    ],
  },
  {
    title: "AI & Applied ML",
    items: [
      "AI-assisted engineering",
      "Copilot · Claude workflows",
      "LLM & NLP integration",
      "Content-moderation models",
      "Computer vision",
    ],
  },
];

export type Service = {
  title: string;
  detail: string;
};

export const services: Service[] = [
  {
    title: "Technical consultancy",
    detail:
      "Architecture reviews, modernization roadmaps and delivery strategy for teams scaling web and mobile platforms.",
  },
  {
    title: "Hands-on senior delivery",
    detail:
      "Freelance engineering — React, Next.js, React Native, Node/NestJS and PostgreSQL — shipping production-grade products end to end.",
  },
  {
    title: "Software & applied AI",
    detail:
      "Web and mobile builds with AI in the product: LLM features, NLP, content moderation and computer vision, plus Copilot/Claude-driven engineering.",
  },
  {
    title: "Fractional tech leadership",
    detail:
      "Standards, CI/CD, code quality and mentorship that keep distributed teams shipping dependably — without a full-time hire.",
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: "Digital Lead",
    company: "Emaar",
    period: "2026 — Present",
    location: "Dubai, UAE",
    points: [
      "Direct 10–12 onsite and ~5 offshore engineers shipping web and mobile platforms across hospitality, retail and entertainment.",
      "Own architecture and modernization decisions, anchoring workloads on existing UAE infrastructure to lower cloud spend.",
      "Coordinate delivery across parallel platform initiatives spanning hospitality, retail and entertainment — governing vendor alignment with Oracle, Salesforce, payment and AI providers.",
    ],
  },
  {
    role: "Scrum Master / Technical Lead",
    company: "Emaar",
    period: "2025 — 2026",
    location: "Dubai, UAE",
    points: [
      "Drove enterprise delivery for Emaar Malls, Hawkeye, the internal social platform, approvals workflows and enterprise AI apps.",
      "Decommissioned 10+ legacy applications (some untouched since 2010) and rebuilt them on modern, scalable platforms.",
      "Established CI/CD automation, code-quality practices and AI tooling embedded across development workflows.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Swftbox",
    period: "2021 — 2025",
    location: "Abu Dhabi, UAE",
    points: [
      "Owned end-to-end delivery of logistics, tracking and operations platforms with product and business stakeholders.",
      "Spearheaded backend architecture modernization that improved performance 4× and supported scalable company growth.",
      "Drove customer reporting that cut support inquiries by 50%, plus field-ops mobile — offline mode, barcode scanning, push notifications and real-time tracking.",
      "Strengthened engineering quality through automated testing, API documentation and standardized development practices across Node.js, NestJS, Next.js and React.",
    ],
  },
];

export type Task = { n: string; title: string; detail: string };

export type Project = {
  slug: string;
  index: string;
  name: string;
  client: string;
  year: string;
  category: string;
  role: string;
  headline: string;
  summary: string;
  stack: string[];
  tasks: Task[];
  desktop?: string;
  mobile?: string;
  /** Optional second mobile screen, shown beside `mobile` for mobile-first apps. */
  mobileSecondary?: string;
  primary: "desktop" | "mobile";
  /** Optional public repo. Emaar work is proprietary and intentionally omits this. */
  githubUrl?: string;
  /** Optional live product / marketing URL. */
  liveUrl?: string;
  /** Optional brand mark under /public/media/ (e.g. hawkeye-logo, swftbox-logo). */
  logo?: string;
};

export const projects: Project[] = [
  {
    slug: "emaar-com",
    index: "01",
    name: "Emaar.com",
    client: "Emaar",
    year: "2025",
    category: "Flagship Corporate Web",
    role: "Technical Lead",
    headline: "Modernizing the flagship, one release at a time.",
    summary:
      "Ongoing modernization and content upgrades of emaar.com — Emaar's flagship real-estate site — from its rotating launch hero and property search to featured communities. Faster performance, a componentized content model and a smoother editorial workflow for the brand's most-visited destination.",
    stack: ["Next.js", "Headless CMS", "ISR", "Edge Caching", "TypeScript", "SEO"],
    tasks: [
      {
        n: "01",
        title: "Content architecture",
        detail:
          "Restructured pages into a reusable, componentized content model so launches, communities and campaigns are assembled from shared, governed building blocks.",
      },
      {
        n: "02",
        title: "Content upgrades & CMS",
        detail:
          "Upgraded and updated site content through the headless CMS, giving marketing the editorial velocity to ship updates without engineering involvement.",
      },
      {
        n: "03",
        title: "Performance & Core Web Vitals",
        detail:
          "Improved load and responsiveness with ISR, image optimization and edge caching for a faster flagship experience at global scale.",
      },
      {
        n: "04",
        title: "Accessibility & SEO",
        detail:
          "Hardened semantic structure, accessibility and technical SEO across templates to protect ranking and reach on the brand's highest-traffic site.",
      },
    ],
    desktop: "/projects/emaar-desktop.png",
    mobile: "/projects/emaar-mobile.png",
    primary: "desktop",
  },
  {
    slug: "omni-central",
    index: "02",
    name: "Omni Central",
    client: "Emaar",
    year: "2025",
    category: "Enterprise Employee Platform",
    role: "Technical Lead",
    headline: "One super-app for every Emaar employee.",
    summary:
      "Omni Central — Emaar's employee super-app (web + mobile). Apps & Portals, multi-department approvals, social and knowledge, with EMAAR AI (suite of AI services, agents & integrations), EmaarMind, and Ask HR as first-class surfaces.",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "WebSockets", "Azure AD", "EmaarMind AI"],
    tasks: [
      {
        n: "01",
        title: "EMAAR AI suite & EmaarMind",
        detail:
          "Shipped the EMAAR AI suite — agents, integrations and a secure unified AI platform — plus EmaarMind and a central EMAAR AI hub in the app shell.",
      },
      {
        n: "02",
        title: "Ask HR & employee services",
        detail:
          "Integrated Ask HR alongside punch-in, handbook and attendance so HR questions and day-to-day employee services live in the same super-app.",
      },
      {
        n: "03",
        title: "Apps, portals & approvals",
        detail:
          "Unified Apps & Portals (HUB, Workflow Manager, Oracle Fusion, learning) with a multi-stage approvals engine (iMemo, CRM, EP-Malls, Finance, HR) and full audit trails.",
      },
      {
        n: "04",
        title: "Modular monorepo & realtime",
        detail:
          "Designed a NestJS + Next.js monorepo with Redis + WebSocket feeds powering news, recognitions and notifications behind a single SSO.",
      },
    ],
    desktop: "/projects/omni-desktop.png",
    mobile: "/projects/omni-mobile.png",
    primary: "desktop",
  },
  {
    slug: "hawkeye",
    index: "03",
    name: "Hawkeye",
    client: "Emaar",
    year: "2025",
    category: "Executive BI Mobile App",
    role: "Technical Lead",
    headline: "Power BI for management — in their pocket.",
    summary:
      "A mobile-first app for leadership to browse Power BI reports across departments, paired with a desktop admin for user access, roles and permissions. Row-level security so each leader sees exactly — and only — what's theirs.",
    stack: ["React Native", "Expo", "Power BI Embedded", "Azure AD", "NestJS", "RLS"],
    tasks: [
      {
        n: "01",
        title: "Mobile executive experience",
        detail:
          "Shipped a React Native app so management can browse department reports, KPIs and alerts on the go — the primary surface for Hawkeye.",
      },
      {
        n: "02",
        title: "Desktop access admin",
        detail:
          "Built a web admin to manage users, emails, roles and department permissions — who can access which reports beside the mobile catalog.",
      },
      {
        n: "03",
        title: "Secure Power BI embedding",
        detail:
          "Implemented server-side token brokering and row-level security so embedded reports stay governed per leader and department.",
      },
      {
        n: "04",
        title: "SSO & role mapping",
        detail:
          "Wired Azure AD single sign-on with role mapping across mobile and desktop — one identity model for both surfaces.",
      },
    ],
    desktop: "/projects/hawkeye-desktop.png",
    mobile: "/projects/hawkeye-mobile.png",
    primary: "mobile",
  },
  {
    slug: "malls",
    index: "04",
    name: "Emaar Malls",
    client: "Emaar",
    year: "2025",
    category: "Consolidated Mobile Platform",
    role: "Technical Lead",
    headline: "Every mall, consolidated into one app.",
    summary:
      "One multi-property Emaar Malls app — Dubai Mall, Dubai Hills Mall, Dubai Marina Mall and Square Mall — unified from separate apps into a single white-label React Native codebase with per-mall theming for directory, dining, events, wayfinding, parking and loyalty. Portfolio mockups show the mall selector home and a companion Dubai Hills Mall marketing site.",
    stack: ["React Native", "Expo", "TypeScript", "EAS", "GitHub Actions", "Push / Deep Links"],
    tasks: [
      {
        n: "01",
        title: "White-label consolidation",
        detail:
          "Merged multiple per-mall apps into one Expo codebase with a shared mall selector and per-mall theming, config and feature flags.",
      },
      {
        n: "02",
        title: "Core mall modules",
        detail:
          "Delivered store directory, wayfinding, dining, events, parking and loyalty with offline caching for weak-signal areas.",
      },
      {
        n: "03",
        title: "Engagement plumbing",
        detail:
          "Implemented push notifications, deep links and a shared design system across every mall.",
      },
      {
        n: "04",
        title: "One release pipeline",
        detail:
          "Shipped all malls from a single EAS + GitHub Actions pipeline, cutting release overhead dramatically.",
      },
    ],
    desktop: "/projects/malls-desktop.png",
    mobile: "/projects/malls-mobile.png",
    primary: "mobile",
  },
  {
    slug: "emaar-one",
    index: "05",
    name: "Emaar One",
    client: "Emaar",
    year: "2026",
    category: "Unified Owner & Guest Super-App",
    role: "Technical Lead",
    headline: "One super-app for every Emaar owner and guest.",
    summary:
      "Emaar One (My Emaar) consolidates the entire Emaar owner and guest experience into one modular platform — web interest registration, UAE PASS sign-in, ownership and buyer services, Quick Pay, Emaar Eye and the Had'reen Virtual Happiness Center — replacing a scattered set of standalone apps with a multi-language React Native + NestJS stack.",
    stack: ["React Native", "Expo", "UAE PASS", "i18n / RTL", "NestJS", "Payments"],
    tasks: [
      {
        n: "01",
        title: "UAE PASS authentication",
        detail:
          "Integrated UAE PASS single sign-on alongside email login and continue-as-guest, brokering national-identity tokens securely into the app's session and service layer.",
      },
      {
        n: "02",
        title: "Modular service architecture",
        detail:
          "Designed a modular guest-services architecture — Update Ownership, Buyer Registration, Emaar Eye, Authorization Letters and the Virtual Happiness Center — each a self-contained, independently shippable module.",
      },
      {
        n: "03",
        title: "Multi-language & RTL",
        detail:
          "Built full localization with English, Arabic (RTL) and Chinese, so layout, typography and flows adapt end to end for a truly regional audience.",
      },
      {
        n: "04",
        title: "Quick Pay & payments",
        detail:
          "Delivered Quick Pay and in-app payment flows for fast, authenticated transactions across ownership and guest journeys.",
      },
    ],
    desktop: "/projects/emaar-one-desktop.png",
    mobile: "/projects/emaar-one-login.png",
    primary: "desktop",
  },
  {
    slug: "vyom",
    index: "06",
    name: "Vyom by Emaar",
    client: "Emaar",
    year: "2026",
    category: "Property Portal · Web & Mobile",
    role: "Technical Lead",
    headline: "A premium portal for verified Emaar homes.",
    summary:
      "Vyom is Emaar's property portal for discovering verified homes for sale, resale and long-term rent across Dubai — a dark-teal, skyline-led web experience with interactive maps, plus a native mobile app with Exclusive Emaar Units, High Demand Areas and rich listing detail.",
    stack: ["Next.js", "React Native", "NestJS", "PostgreSQL", "Mapbox", "Redis"],
    tasks: [
      {
        n: "01",
        title: "Property search & filtering",
        detail:
          "Built fast, faceted search over verified Emaar listings — home carousels for Exclusive Emaar Units and High Demand Areas, plus buy/resale listing detail with type, price and beds/baths filters backed by indexed PostgreSQL queries.",
      },
      {
        n: "02",
        title: "Sell-property mobile flow",
        detail:
          "Shipped the native sell journey — choose a verified unit, search owned inventory and progress through listing steps — so owners can list from the app with the same trusted data as web.",
      },
      {
        n: "03",
        title: "Emaar One login",
        detail:
          "Wired welcome and authentication to Emaar One credentials (with guest continue) so PropTech access stays one identity across ownership and discovery.",
      },
      {
        n: "04",
        title: "Verified-listings pipeline",
        detail:
          "Engineered the ingestion and verification pipeline that keeps inventory, pricing and availability accurate and trustworthy across web and mobile.",
      },
    ],
    desktop: "/projects/vyom-desktop.png",
    mobile: "/projects/vyom-mobile.png",
    mobileSecondary: "/projects/vyom-mobile-secondary.png",
    primary: "desktop",
  },
  {
    slug: "emaar-international",
    index: "07",
    name: "Emaar International websites",
    client: "Emaar",
    year: "2026",
    category: "International Web Modernization",
    role: "Digital Lead",
    headline: "Modernizing Emaar's international websites.",
    summary:
      "Modernization of Emaar's international market websites — a shared Next.js + headless platform with localized content, region switching and a unified white-and-navy component library across country sites (reachable via emaar.com's country & language hub). Markets such as Egypt (Emaar Misr) keep their own launches and communities under one consistent brand experience.",
    stack: ["Next.js", "i18n / RTL", "Headless CMS", "SEO", "Edge"],
    tasks: [
      {
        n: "01",
        title: "Regional modernization",
        detail:
          "Rebuilt Emaar's international market sites on a modern Next.js + headless platform — one shared standard for multi-country property experiences.",
      },
      {
        n: "02",
        title: "Localization & region switching",
        detail:
          "Delivered i18n, RTL support and per-market content with seamless region switching so each country reflects its own launches and communities.",
      },
      {
        n: "03",
        title: "Design system unification",
        detail:
          "Unified fragmented regional sites onto one shared component library and content model for consistent, premium quality across markets.",
      },
      {
        n: "04",
        title: "Performance & SEO",
        detail:
          "Hardened performance and technical SEO region by region for fast, discoverable experiences worldwide.",
      },
    ],
    // Mockups use the Emaar Misr (Egypt) market site as the international example.
    desktop: "/projects/emaar-international-desktop.png",
    mobile: "/projects/emaar-international-mobile.png",
    primary: "desktop",
  },
  {
    slug: "hospitality",
    index: "08",
    name: "Hotels & Hospitality",
    client: "Emaar",
    year: "2026",
    category: "Hospitality Web Portfolio",
    role: "Digital Lead (Oversight)",
    headline: "Overseeing the hospitality web portfolio.",
    summary:
      "Oversight of Emaar's hotels and hospitality websites — Address Hotels + Resorts and the wider portfolio — governing booking integrations, vendor alignment and cost-aware infrastructure.",
    stack: ["Next.js", "Booking APIs", "Oracle", "Salesforce", "OCI"],
    tasks: [
      {
        n: "01",
        title: "Portfolio delivery",
        detail:
          "Oversaw delivery across hotels, resorts and hospitality brands with a consistent premium standard.",
      },
      {
        n: "02",
        title: "Booking integrations",
        detail:
          "Governed booking-engine and payment integrations, aligning Oracle, Salesforce and payment vendors.",
      },
      {
        n: "03",
        title: "Cost-aware infrastructure",
        detail:
          "Anchored workloads on existing UAE-based infrastructure instead of new cloud regions, lowering spend.",
      },
    ],
    desktop: "/projects/hotels-desktop.png",
    mobile: "/projects/hotels-mobile.png",
    primary: "desktop",
  },
  {
    slug: "swftbox",
    index: "09",
    name: "Swftbox",
    client: "Swftbox",
    year: "2021 — 2025",
    category: "Logistics & Delivery Tech",
    role: "Full Stack Developer",
    headline: "Four years shipping the platforms behind same-day delivery.",
    summary:
      "At Swftbox I owned end-to-end delivery of logistics, tracking and operations platforms — partnering closely with product and business from architecture through release. I led a backend modernization that improved performance 4× and supported scalable growth, while shipping customer reporting that cut support inquiries by 50% and field-ops mobile with offline mode, barcode scanning, push notifications and real-time location tracking. Across nearly four years I stayed hands-on in Node.js, NestJS, Next.js and React, strengthening quality with automated testing, API documentation and standardized engineering practices.",
    stack: ["Node.js", "NestJS", "Next.js", "React", "TypeScript", "PostgreSQL"],
    tasks: [
      {
        n: "01",
        title: "End-to-end platform ownership",
        detail:
          "Owned logistics, tracking and operations platforms in close partnership with product and business — scoping, architecture, delivery and iteration across the full stack.",
      },
      {
        n: "02",
        title: "Backend architecture modernization",
        detail:
          "Spearheaded backend modernization that improved performance 4× and supported scalable company growth as order volume and operational complexity increased.",
      },
      {
        n: "03",
        title: "Customer reporting systems",
        detail:
          "Drove reporting initiatives that reduced support inquiries by 50%, giving merchants and customers clearer shipment visibility without opening tickets.",
      },
      {
        n: "04",
        title: "Field operations mobile",
        detail:
          "Built mobile capabilities for field ops — offline mode, barcode scanning, push notifications and real-time location tracking for drivers on the road.",
      },
      {
        n: "05",
        title: "Operations & tracking workflows",
        detail:
          "Shipped the day-to-day surfaces ops teams live in — order status pipelines, depot-to-door tracking and fulfillment workflows that keep same-day deliveries on schedule.",
      },
      {
        n: "06",
        title: "Engineering quality & standards",
        detail:
          "Strengthened quality through automated testing, API documentation and standardized development practices so delivery stayed fast without sacrificing reliability.",
      },
      {
        n: "07",
        title: "Hands-on full-stack delivery",
        detail:
          "Contributed across Node.js, NestJS, Next.js and React while influencing technical decisions and release outcomes — not only architecture, but the code that shipped.",
      },
      {
        n: "08",
        title: "Product–engineering partnership",
        detail:
          "Balanced scope, dependencies and business expectations with stakeholders so high-impact logistics initiatives landed on time and stayed operable in production.",
      },
    ],
    desktop: "/projects/swftbox-desktop-v3.png",
    mobile: "/projects/swftbox-mobile-v3.png",
    primary: "desktop",
    liveUrl: "https://www.swftbox.com/",
    logo: "/media/swftbox-logo.png",
  },
];

export type PersonalProject = {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  year: string;
  /** Public repo when available. Omit when the project is private. */
  githubUrl?: string;
  /** Optional live URL for deployed personal projects. */
  liveUrl?: string;
  /** Optional hero screenshot rendered in a MacBook mockup for featured builds. */
  image?: string;
  imageAlt?: string;
  /** Optional muted autoplay loop shown inside the MacBook mockup. */
  video?: string;
  /** Optional poster frame for `video` (falls back to `image`). */
  videoPoster?: string;
  /** Optional mobile screenshot shown in an iPhone mockup beside the desktop. */
  mobile?: string;
  /** Optional technical highlight cards for featured builds. */
  tasks?: Task[];
};

export const personalProjects: PersonalProject[] = [
  {
    name: "Glam Girl",
    tagline: "Occasion-wear, built to convert.",
    description:
      "A full-stack occasion-wear storefront — dresses handpicked in Istanbul, delivered across the UAE — with catalog and detail pages, cart, checkout, accounts and order history. Webhook-driven order reconciliation keeps fulfillment tied to verified payments.",
    stack: ["TanStack Start", "React", "Vite", "Tailwind", "Neon Postgres"],
    year: "2026",
    // Private repo — no public GitHub link.
    liveUrl: "https://mayabella.vercel.app",
    image: "/projects/glam-girl-desktop.png",
    imageAlt: "Glam Girl occasion-wear storefront",
    video: "/projects/glam-girl.mp4",
    videoPoster: "/projects/glam-girl-poster.jpg",
    mobile: "/projects/glam-girl-mobile.png",
    tasks: [
      {
        n: "01",
        title: "Payments & webhooks",
        detail:
          "Integrated card checkout and made webhook reconciliation the source of truth — matching sessions to orders so fulfillment only ever follows a verified payment.",
      },
      {
        n: "02",
        title: "Security hardening",
        detail:
          "Locked down the app with CSRF protection, strict security headers and rate limiting on sensitive routes to keep checkout and accounts safe.",
      },
      {
        n: "03",
        title: "Full-stack architecture",
        detail:
          "Built on TanStack Start (React + Vite) with server routes and a Neon Postgres database — one type-safe codebase spanning UI, API and persistence.",
      },
      {
        n: "04",
        title: "Catalog, cart & orders",
        detail:
          "Delivered the product catalog and detail pages, a persistent cart, authenticated accounts with sessions, and durable order history backed by Postgres.",
      },
    ],
  },
  {
    name: "ATMAD",
    tagline: "Outcomes for brands. Codes shoppers can trust.",
    description:
      "A bilingual marketing site for ATMAD — a global performance marketing ecosystem with brand services, partnerships and media buying, plus a verified coupon-code catalog shoppers can browse worldwide.",
    stack: ["HTML", "CSS", "JavaScript", "Cloudflare", "i18n"],
    year: "2026",
    liveUrl: "https://atmad.io/",
    image: "/projects/atmad-desktop.png",
    imageAlt: "ATMAD performance marketing homepage",
    mobile: "/projects/atmad-mobile.png",
    tasks: [
      {
        n: "01",
        title: "Bilingual EN / AR",
        detail:
          "Shipped a full English–Arabic experience with a language toggle and RTL-aware layout so the same site reads cleanly for both audiences.",
      },
      {
        n: "02",
        title: "Agency + shopper surfaces",
        detail:
          "Combined an outcomes-led services story for brands with a public coupon catalog — one presence that serves both acquisition and deals discovery.",
      },
      {
        n: "03",
        title: "Responsive marketing site",
        detail:
          "Built a fast, static front end with custom CSS and light JavaScript — hero, services, resources and coupons tuned for desktop and mobile.",
      },
    ],
  },
  {
    name: "Supply Chain Management System",
    tagline: "Inventory, orders and logistics in one place.",
    description:
      "A full-stack platform for tracking inventory, purchase orders, suppliers and shipments end to end, with dashboards and role-based access.",
    stack: ["Next.js", "NestJS", "PostgreSQL", "TypeScript"],
    year: "2024",
    githubUrl: "https://github.com/haneenabouhamdan/supply-chain-management",
  },
  {
    name: "DevSpot",
    tagline: "A community platform for developers.",
    description:
      "A developer community app for posts, discussions and real-time chat — feeds, profiles and notifications powered by WebSockets.",
    stack: ["React", "Node.js", "WebSockets", "PostgreSQL"],
    year: "2023",
    githubUrl: "https://github.com/haneenabouhamdan/devSpot",
  },
  {
    name: "DPM",
    tagline: "Real-time real estate auctions.",
    description:
      "A real-estate auction platform with live bidding, property listings and secure transactions, built around a real-time auction engine.",
    stack: ["React", "NestJS", "WebSockets", "PostgreSQL"],
    year: "2023",
    githubUrl: "https://github.com/haneenabouhamdan/auction_frontend",
  },
];

export type TechItem = {
  name: string;
  /** Filename under /public/tech/ (without .svg) */
  slug: string;
  /** Brand hex for subtle accent wash */
  accent: string;
};

/** Core stack — logos live as local SVGs in /public/tech/ */
export const techStack: TechItem[] = [
  { name: "React", slug: "react", accent: "#61DAFB" },
  { name: "Next.js", slug: "nextdotjs", accent: "#000000" },
  { name: "React Native", slug: "reactnative", accent: "#61DAFB" },
  { name: "TypeScript", slug: "typescript", accent: "#3178C6" },
  { name: "Expo", slug: "expo", accent: "#1C2024" },
  { name: "Node.js", slug: "nodedotjs", accent: "#5FA04E" },
  { name: "NestJS", slug: "nestjs", accent: "#E0234E" },
  { name: "PostgreSQL", slug: "postgresql", accent: "#4169E1" },
  { name: "Redis", slug: "redis", accent: "#FF4438" },
  { name: "Docker", slug: "docker", accent: "#2496ED" },
  { name: "Azure", slug: "azure", accent: "#0078D4" },
  { name: "OCI", slug: "oracle", accent: "#F80000" },
  { name: "GitHub Actions", slug: "githubactions", accent: "#2088FF" },
  { name: "Kubernetes", slug: "kubernetes", accent: "#326CE5" },
  { name: "OpenAI", slug: "openai", accent: "#412991" },
  { name: "Claude", slug: "claude", accent: "#D97757" },
];

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  detail: string;
  /** Institute mark filename under /public/certs/ (include extension) */
  mark: string;
  /** Soft brand wash for the credential card */
  accent: string;
  /** Full certificate scan under /public/certs/ — shown in lightbox when present */
  image?: string;
};

export const certifications: Certification[] = [
  {
    title: "Fast Track to Senior Bootcamp",
    issuer: "OnRamp Academy",
    year: "Aug 2024",
    detail: "Scalable architecture, backend systems, Agile practices and engineering leadership.",
    mark: "onramp.png",
    accent: "#1B3A6B",
    image: "onramp-fast-track.png",
  },
  {
    title: "1 Million Prompters",
    issuer: "Dubai Future Foundation",
    year: "2026",
    detail:
      "Prompt engineering for AI systems — One Million Prompters initiative by Dubai Future Foundation and Dubai Centre for Artificial Intelligence.",
    mark: "prompters.png",
    accent: "#1B4FD8",
    image: "one-million-prompters.png",
  },
  {
    title: "Artificial Intelligence Bootcamp",
    issuer: "Zaka.ai",
    year: "Feb 2024",
    detail: "Machine learning, NLP, deep learning, computer vision and AI application development.",
    mark: "zaka.png",
    accent: "#E85D04",
    image: "zaka-ai-bootcamp.png",
  },
  {
    title: "Project Management Professional (PMP)",
    issuer: "Lebanese American University",
    year: "Sep 2022",
    detail: "Project-management methodologies, Agile delivery, planning and risk management.",
    mark: "lau.png",
    accent: "#0B3D3A",
    image: "lau-pmp.png",
  },
  {
    title: "Full Stack Web Development Bootcamp",
    issuer: "SE Factory",
    year: "Jan 2021",
    detail: "Frontend, backend, cloud fundamentals, APIs, security, Git and Agile workflows.",
    mark: "sefactory.png",
    accent: "#12B5A0",
    image: "se-factory.png",
  },
];

export const education = {
  degree: "B.Sc. Computer Science",
  school: "Lebanese University, Beirut",
  period: "2015 — 2020",
};
