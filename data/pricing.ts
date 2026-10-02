export type Market = "india" | "international";

export type PricingPackage = {
  id: string;
  title: string;
  badge?: string;
  description: string;
  scopeLabel: string;
  subtext: string;
  ctaText: string;
  billingType: "instant-quote" | "custom-proposal" | "retainer";
  features: readonly string[];
  recommended?: boolean;
  price: {
    india: string | number;
    international: string | number;
  };
};

export interface MarketComparisonRow {
  deliverable: string;
  traditionalAgency: string;
  freelancer: string;
  psdigilabs: string;
}

export interface ComparisonCategory {
  category: string;
  items: MarketComparisonRow[];
}

export interface BaseRate {
  inr: number;
  usd: number;
  timelineDays: number;
  scopeModifierMax: number;
}

// 1. Internal Engine Rates (Used behind the scenes for auto-quote calculations)
export const INTERNAL_PACKAGE_RATES: Record<string, BaseRate> = {
  "landing-page": {
    inr: 8000,
    usd: 199,
    timelineDays: 7,
    scopeModifierMax: 1.2,
  },
  "business-website": {
    inr: 18000,
    usd: 449,
    timelineDays: 14,
    scopeModifierMax: 1.3,
  },
  "cms-pro": {
    inr: 30000,
    usd: 749,
    timelineDays: 21,
    scopeModifierMax: 1.25,
  },
  "advanced-platform": {
    inr: 45000,
    usd: 1099,
    timelineDays: 35,
    scopeModifierMax: 1.35,
  },
  ecommerce: {
    inr: 40000,
    usd: 999,
    timelineDays: 28,
    scopeModifierMax: 1.3,
  },
  "custom-web-application": {
    inr: 60000,
    usd: 1499,
    timelineDays: 45,
    scopeModifierMax: 1.4,
  },
  maintenance: {
    inr: 3000,
    usd: 99,
    timelineDays: 30,
    scopeModifierMax: 1.0,
  },
};

// 2. Public Packages
export const pricingPackages: readonly PricingPackage[] = [
  {
    id: "landing-page",
    title: "Landing Page",
    badge: "Fast Track",
    description: "High-converting, performance-tuned single page for product launches, events, or ads.",
    scopeLabel: "Instant Automated Quote",
    subtext: "Competitively generated on request",
    ctaText: "Get Instant Quote",
    billingType: "instant-quote",
    price: {
      india: "₹8,000",
      international: "$199",
    },
    features: [
      "Modern conversion-focused layout",
      "Mobile-first responsive architecture",
      "Lead capture / WhatsApp / CRM integration",
      "Automated on-page SEO & speed scoring",
      "Full analytics & event tracking setup",
      "Turnkey domain & cloud hosting deployment",
    ],
  },
  {
    id: "business-website",
    title: "Business Website",
    badge: "Essential",
    description: "Multi-page digital identity built to communicate authority and capture qualified leads.",
    scopeLabel: "Instant Automated Quote",
    subtext: "Competitively generated on request",
    ctaText: "Get Instant Quote",
    billingType: "instant-quote",
    price: {
      india: "₹18,000",
      international: "$449",
    },
    features: [
      "Multi-page custom design & development",
      "Brand-aligned design components",
      "Interactive enquiry workflows & form logic",
      "Technical SEO foundations & schema tags",
      "Cross-browser performance optimization",
      "Continuous build & deployment pipeline",
    ],
  },
  {
    id: "cms-pro",
    title: "CMS Pro Website",
    badge: "Most Popular",
    description: "Dynamic, database-backed platform allowing non-technical teams to edit all content.",
    scopeLabel: "Dynamic Scope Quote",
    subtext: "Calculated based on content models",
    ctaText: "Calculate Scope & Quote",
    billingType: "instant-quote",
    price: {
      india: "₹30,000",
      international: "$749",
    },
    features: [
      "Complete custom visual frontend",
      "Intuitive headless CMS / admin panel",
      "Dynamic collections (Blogs, Case Studies, Team)",
      "Secure authentication & editor permissions",
      "Automated backup & staging workflow",
      "Search, filter, and categorization engines",
    ],
    recommended: true,
  },
  {
    id: "advanced-platform",
    title: "Advanced Business Platform",
    badge: "Enterprise Grade",
    description: "Workflow tools, complex portals, and role-based apps for modern operational efficiency.",
    scopeLabel: "Custom Scoped Proposal",
    subtext: "Tailored sprint & capability pricing",
    ctaText: "Request Tailored Proposal",
    billingType: "custom-proposal",
    price: {
      india: "₹45,000",
      international: "$1,099",
    },
    features: [
      "Multi-role user authentication (RBAC / OAuth)",
      "Real-time database triggers & backend workflows",
      "Custom business dashboards & metrics",
      "Transactional email / SMS pipelines",
      "Granular audit trails & security hardening",
      "External API & webhook integrations",
    ],
  },
  {
    id: "ecommerce",
    title: "E-Commerce Solution",
    badge: "Commerce Ready",
    description: "Storefront built for fast checkout, seamless payments, and simple inventory management.",
    scopeLabel: "Dynamic Scope Quote",
    subtext: "Calculated based on SKU & gateway needs",
    ctaText: "Get Instant Quote",
    billingType: "instant-quote",
    price: {
      india: "₹40,000",
      international: "$999",
    },
    features: [
      "Fast storefront with catalog search & filter",
      "Secure payment gateway integration",
      "Cart, checkout, and discount rule engines",
      "Admin inventory and order dashboard",
      "Automated customer notification emails",
      "Conversion tracking (Pixel, GA4, CAPI)",
    ],
  },
  {
    id: "custom-web-application",
    title: "Custom Web Application",
    badge: "Full Custom",
    description: "Bespoke SaaS products or software workflows engineered to scale without licensing lock-in.",
    scopeLabel: "Architected Proposal",
    subtext: "Sprint-scoped competitive estimate",
    ctaText: "Talk to an Architect",
    billingType: "custom-proposal",
    price: {
      india: "₹60,000",
      international: "$1,499",
    },
    features: [
      "Full-stack custom software architecture",
      "High-concurrency database design",
      "Microservice or serverless API layer",
      "Enterprise security & access control",
      "Third-party ERP / CRM integrations",
      "Dedicated CI/CD & infrastructure scripting",
    ],
  },
  {
    id: "maintenance",
    title: "Retainer & Ongoing Support",
    badge: "Reliability",
    description: "Proactive security, uptime monitoring, performance tuning, and on-demand updates.",
    scopeLabel: "Flexible Retainer",
    subtext: "Adjustable monthly SLA",
    ctaText: "Select Retainer Scope",
    billingType: "retainer",
    price: {
      india: "₹3,000",
      international: "$99",
    },
    features: [
      "Routine feature updates & bug fixes",
      "Core dependency & security patches",
      "Speed, CWV, and SEO health monitoring",
      "Cloud hosting & domain management",
      "Guaranteed turnaround SLA response",
      "Monthly performance & analytics reports",
    ],
  },
] as const;

// 3. Trend-Aligned Deliverable Comparison Matrix
export const pdfComparisonCategories: readonly ComparisonCategory[] = [
  {
    category: "Architecture & Code Quality",
    items: [
      {
        deliverable: "Source Code Ownership",
        traditionalAgency: "Often held hostage / locked into proprietary platforms",
        freelancer: "Full code, but lacking architecture standards",
        psdigilabs: "100% Client Ownership with Clean Modular Standards",
      },
      {
        deliverable: "Tech Stack",
        traditionalAgency: "Heavy legacy themes (e.g., outdated WordPress)",
        freelancer: "Template builders (Wix, Elementor, Squarespace)",
        psdigilabs: "Modern Next.js, React, Tailwind & Scalable Serverless APIs",
      },
      {
        deliverable: "Performance & Core Web Vitals",
        traditionalAgency: "Sub-par (bloated plugins, 40-60 PageSpeed)",
        freelancer: "Hit or miss (often 50-70 PageSpeed)",
        psdigilabs: "Optimized 90+ Lighthouse / Sub-second TTFB targets",
      },
    ],
  },
  {
    category: "Cost & Scoping Model",
    items: [
      {
        deliverable: "Pricing Methodology",
        traditionalAgency: "High overhead markups with hidden maintenance fees",
        freelancer: "Unpredictable hourly billing or arbitrary estimates",
        psdigilabs: "Transparent algorithmic scoping based on exact deliverables",
      },
      {
        deliverable: "Cost vs. Output Efficiency",
        traditionalAgency: "Inflated project minimums to cover agency overhead",
        freelancer: "Cheaper up front, higher rework costs later",
        psdigilabs: "Highly competitive, value-optimized project milestones",
      },
    ],
  },
  {
    category: "Delivery & Post-Launch Assurance",
    items: [
      {
        deliverable: "Turnaround Time",
        traditionalAgency: "8 – 16 Weeks (Bureaucratic delays)",
        freelancer: "Inconsistent timelines / availability drops",
        psdigilabs: "Rapid 1 – 4 Week Agile Sprints",
      },
      {
        deliverable: "Post-Launch Warranty",
        traditionalAgency: "Paid maintenance contract required immediately",
        freelancer: "Rarely included once final invoice clears",
        psdigilabs: "Complimentary warranty period + transparent retainers",
      },
    ],
  },
] as const;

export const pricingPreview = [
  { title: "Website Development", packageId: "landing-page" },
  { title: "CMS & Business Platforms", packageId: "cms-pro" },
  { title: "Custom Web Applications", packageId: "custom-web-application" },
] as const;

export function getPricingPackage(id: string): PricingPackage {
  const pkg = pricingPackages.find((item) => item.id === id);
  return pkg || pricingPackages[0];
}