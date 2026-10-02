export const resources = [
  {
    slug: "nextjs-vs-wordpress-business-site",
    category: "Website strategy",
    title: "Next.js or WordPress for a business website?",
    summary: "Choose a platform by asking who updates the site, what it needs to do, and how much control the product requires.",
    readTime: "6 min read",
    published: "2026-10-02",
    sections: [
      { heading: "Start with the work the site must do", paragraphs: ["A brochure site, a publishing operation and a web application have different constraints. Start with the people who will maintain the site, the content workflow, integrations and expected release pace.", "WordPress is often a practical choice when editors need a familiar publishing interface and the site fits its plugin and theme ecosystem. It can be extended substantially, but extension quality and maintenance need active ownership."] },
      { heading: "When a custom Next.js build fits", paragraphs: ["Next.js suits teams that need tailored interactions, integration-heavy journeys, a React product surface or precise control over rendering and delivery. The trade-off is that somebody must own the codebase and content editing needs a CMS or a deliberate developer workflow.", "A fast framework does not guarantee a fast site. Image weight, third-party scripts, hosting, rendering choices and implementation discipline still determine the experience users receive."] },
      { heading: "Make the decision", paragraphs: ["List the required pages, editing roles, integrations, accessibility needs and likely changes over the next year. Compare the total cost of building and maintaining each option, not only the first launch quote.", "If your requirements are still unclear, scope a small discovery phase before committing to a platform. A good choice makes the next year of publishing and product work easier, not just the launch date closer."] },
    ],
  },
  {
    slug: "when-to-invest-in-automated-testing",
    category: "Quality engineering",
    title: "When should a product team invest in automated testing?",
    summary: "Automation is most useful when a stable check is repeated often and a missed regression has a meaningful cost.",
    readTime: "5 min read",
    published: "2026-10-02",
    sections: [
      { heading: "Look for repeatable risk", paragraphs: ["A test is a good automation candidate when the same steps are run frequently, the expected result is clear, and failure would block a customer journey or release. Sign-in, payment, data submission and core API contracts are common examples, but the right first checks depend on the product.", "Automating an unstable feature too early creates maintenance work. First agree on the behavior the test should protect and make the underlying workflow reliable enough to verify."] },
      { heading: "Balance the test layers", paragraphs: ["Use focused unit and API checks for fast feedback, then reserve browser automation for important end-to-end journeys. Keep exploratory and usability testing in the plan; scripts do not notice every confusing interaction or unexpected edge case.", "A smaller suite that teams trust is more useful than a large suite that fails intermittently or takes too long to run."] },
      { heading: "Measure whether it helps", paragraphs: ["Track the time spent on repeat checks, failures caught before release, flaky test rate and the time needed to diagnose a failed build. These measures can show whether automation is improving confidence or simply shifting effort into test maintenance.", "Start with one high-value journey, make the result visible in the delivery workflow, and expand when the team trusts the signal."] },
    ],
  },
  {
    slug: "android-app-development-cost-india",
    category: "Project planning",
    title: "What affects Android app development cost in India?",
    summary: "The cost follows product scope, backend needs, integrations, release requirements and the amount of uncertainty left in the brief.",
    readTime: "6 min read",
    published: "2026-10-02",
    sections: [
      { heading: "Define the first useful release", paragraphs: ["An app with a few focused screens is a different engagement from a multi-role product with offline behavior, payments, dashboards and a custom backend. Write down the user journeys that must work on day one before comparing estimates.", "A clear first release helps a team price the work that matters now and separate later ideas from launch requirements."] },
      { heading: "Account for the system around the app", paragraphs: ["Authentication, APIs, data migration, notifications, analytics, admin tools and third-party services affect both development and testing. Device coverage, accessibility, security review, Play Store preparation and post-launch support should be discussed explicitly.", "Existing systems can reduce or increase effort depending on API quality, documentation and access to test environments."] },
      { heading: "Ask for a scoped estimate", paragraphs: ["A useful estimate states assumptions, exclusions, milestones, review points and what changes the price. It should distinguish confirmed requirements from questions that need discovery.", "For uncertain products, a short paid discovery can reduce delivery risk before a full build commitment. Ask what evidence the estimate is based on and how scope changes will be handled."] },
    ],
  },
  {
    slug: "2026-web-development-pricing-benchmark",
    category: "Market insights",
    title: "2026 Web Development Pricing Benchmark: India vs. US, UK, Canada & Australia",
    summary: "A practical benchmark of 2026 web-development market ranges across five major markets. Understand what a landing page, business website, e-commerce store and custom web app typically cost.",
    readTime: "8 min read",
    published: "2026-10-02",
    sections: [
      {
        heading: "Why pricing varies so widely in 2026",
        paragraphs: [
          "If you have ever received quotes for the same website from three different providers and seen numbers that differ by 10x, you are not alone. A simple business website can cost around ₹20,000 in India, £3,000 in the UK or $10,000 in the United States — and all three quotes may be entirely legitimate.",
          "The reason is not quality. It is operating economics, agency structure, scope interpretation and how much post-launch support is bundled into the initial price. This benchmark is intended as a planning reference for buyers who want to understand what they are actually paying for.",
          "These are indicative 2026 market ranges, not fixed industry tariffs. Actual scope, provider type, design depth, integrations, content and support can move a quote materially.",
        ],
      },
      {
        heading: "India market ranges (2026)",
        paragraphs: [
          "The Indian market has matured. While basic template-based websites remain inexpensive, professional custom engineering now commands a clear premium.",
          "Typical 2026 ranges: Landing page ₹8,000–₹25,000. Basic business website ₹20,000–₹60,000. Professional business website ₹50,000–₹1,50,000. E-commerce website ₹60,000–₹4,00,000+. Custom web application ₹2,00,000–₹15,00,000+.",
          "What drives the range: number of pages, custom design depth, CMS choice, integrations such as payment gateways, CRMs and WhatsApp, SEO setup, and post-launch support.",
        ],
      },
      {
        heading: "United States market ranges (2026)",
        paragraphs: [
          "US pricing reflects a mature agency market with high labour costs, compliance expectations and deep specialisation. The floor for a professional build is significantly higher than in India.",
          "Typical 2026 ranges: Small business website $3,000–$10,000. E-commerce website $5,000–$25,000+. Custom web application $25,000–$150,000+. Website maintenance $50–$500 per month.",
          "What drives the range: agency overhead, project management layers, design systems, accessibility compliance such as ADA and WCAG, and ongoing retainer expectations.",
        ],
      },
      {
        heading: "United Kingdom market ranges (2026)",
        paragraphs: [
          "UK pricing sits between India and the US. Freelancers anchor the low end, while established agencies push higher for compliance, brand depth and integrations.",
          "Typical 2026 ranges: Business website £500–£3,000. E-commerce website £3,000–£25,000+. Custom web application £15,000–£100,000+. Website maintenance £50–£300 per month.",
          "What drives the range: GDPR compliance work, UK-specific payment integrations, brand strategy and multi-language requirements.",
        ],
      },
      {
        heading: "Canada market ranges (2026)",
        paragraphs: [
          "Canada closely mirrors the US market, with a slightly narrower upper band for custom applications. Maintenance retainers are a standard expectation.",
          "Typical 2026 ranges: Business website CA$2,500–CA$10,000. E-commerce website CA$5,000–CA$25,000+. Custom web application CA$15,000–CA$40,000+. Website maintenance CA$100–CA$500 per month.",
          "What drives the range: provincial regulations, bilingual English and French requirements, and integration with Canadian payment and logistics providers.",
        ],
      },
      {
        heading: "Australia market ranges (2026)",
        paragraphs: [
          "Australia has one of the widest ranges for custom web applications, reflecting the complexity of enterprise portals and SaaS products built there.",
          "Typical 2026 ranges: Business website A$3,000–A$15,000. E-commerce website A$8,000–A$25,000+. Custom web application A$20,000–A$300,000+. Website maintenance A$100–A$500 per month.",
          "What drives the range: distance-based vendor economics, GST compliance and enterprise-grade integration requirements.",
        ],
      },
      {
        heading: "What actually drives the cost difference",
        paragraphs: [
          "If the technical work is largely the same, why does a business website cost ₹50,000 in India and $10,000 in the US? Five structural factors explain the gap.",
          "Labour economics: developer salaries differ by 5x to 10x across markets. This is the single largest input cost.",
          "Agency overhead: Western agencies carry office, sales, project management and account management layers that Indian studios often do not.",
          "Scope interpretation: a business website can mean five pages with a template, or twenty pages with custom design, CMS, SEO and analytics. Both quotes are technically correct.",
          "Compliance and standards: GDPR, WCAG, ADA and provincial regulations add real work hours.",
          "Ongoing support model: some providers bundle months of support into the initial price. Others charge separately.",
        ],
      },
      {
        heading: "What this means for buyers",
        paragraphs: [
          "Do not compare prices without comparing scope. A ₹20,000 quote and a ₹2,00,000 quote are often not the same project.",
          "Ask for a written scope document. Pages, roles, integrations, design rounds and post-launch support should all be explicit.",
          "Separate build from support. A one-time build fee is different from an ongoing maintenance retainer. Both are legitimate — just clarify which is which.",
          "Value beats cheapness. The lowest quote is rarely the lowest total cost. Rework, delays and broken integrations erase the initial savings quickly.",
          "Consider global partners. An India-based engineering studio with a modern stack such as Next.js, React, TypeScript and PostgreSQL can deliver the same technical quality as a Western agency at a fraction of the cost, provided scope and communication are handled properly.",
        ],
      },
      {
        heading: "Final thought",
        paragraphs: [
          "Pricing transparency in 2026 is still rare. Most agencies hide behind contact us for a quote, which makes it impossible for buyers to plan. This benchmark is a small contribution to fixing that — a starting point so you can walk into any conversation with realistic expectations.",
          "If you would like to discuss a specific scope and get a clear, written estimate, we are one message away.",
        ],
      },
    ],
  },
] as const;

export const resourceBySlug = (slug: string) => resources.find((resource) => resource.slug === slug);