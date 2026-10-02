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
] as const;

export const resourceBySlug = (slug: string) => resources.find((resource) => resource.slug === slug);