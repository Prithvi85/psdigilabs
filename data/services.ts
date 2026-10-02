export const services = [
  {
    icon: "web",
    slug: "website-development",
    title: "Website Development",
    description:
      "Custom business websites, web applications, and fast Next.js platforms built for organic discovery, speed, and conversion.",
    problem: "Slow, hard-to-update websites make it harder for a good product to earn trust and turn attention into enquiries.",
    technology: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    faqs: [
      ["Can you work with our existing website or CMS?", "Yes. We can review the current platform first and recommend a rebuild, integration or focused improvement based on the goals and constraints."],
      ["Will our team be able to update content?", "We can plan an editor-friendly CMS when the content workflow calls for it. The CMS choice and ongoing costs are agreed during scoping."],
      ["How do you estimate a website project?", "We review pages, journeys, integrations, content needs and launch requirements, then share a scoped estimate with assumptions and milestones."],
    ],
    capabilities: [
      "Custom Web Development",
      "Next.js & React Applications",
      "Modern Responsive Websites",
      "TypeScript & Tailwind CSS",
      "CMS & Headless Admin Panels",
      "REST & GraphQL API Integrations",
      "Performance & SEO Optimization",
      "AI-Assisted Web Solutions",
    ],
  },
  {
    icon: "mobile",
    slug: "android-app-development",
    title: "Android App Development",
    description:
      "Native Android applications engineered with responsive UI/UX, robust architectures, and dependable backend integrations.",
    problem: "A mobile experience should remove friction from a real user task, not simply recreate a website on a smaller screen.",
    technology: ["Kotlin", "Jetpack Compose", "Android", "REST APIs", "PostgreSQL"],
    faqs: [
      ["Can you build a native Android app from an existing idea?", "Yes. We start by clarifying users, the main journeys, integrations and the smallest useful release before estimating delivery."],
      ["Do you help with app testing and release preparation?", "Testing and release needs can be included in the scope, including device coverage, key user journeys and Play Store preparation."],
      ["Can the app connect to our existing backend?", "We can assess available APIs and systems during discovery, then agree on integration work and any backend changes needed."],
    ],
    capabilities: [
      "Native Android Development",
      "Modern Kotlin Architecture",
      "Jetpack Compose UI",
      "Secure API Integration",
      "Clean Mobile UI/UX",
      "Rigorous Device Testing",
      "Google Play Store Deployment",
    ],
  },
  {
    icon: "test",
    slug: "quality-engineering",
    title: "Software Testing",
    description:
      "Comprehensive quality engineering covering manual verification, API validations, and automated test suites before release.",
    problem: "Late defect discovery slows releases and forces teams to repeat checks that should be reliable and visible.",
    technology: ["Selenium", "Postman", "API Testing", "Regression Suites", "Git"],
    faqs: [
      ["Can you test a product before a release?", "Yes. We can scope a focused release audit around critical workflows, supported browsers or devices, and the risks your team wants to reduce."],
      ["Do you provide automated testing?", "We can add or improve automation for stable, repeatable checks and keep exploratory testing in the plan for behavior scripts cannot judge."],
      ["What do you need to start a QA engagement?", "Access to the test environment, user roles, expected behavior and known release risks help us create a practical test plan."],
    ],
    capabilities: [
      "Manual Software Testing",
      "Functional & Regression Testing",
      "Automation Testing Suites",
      "API Testing & Verification",
      "Structured Test Case Design",
      "Actionable Bug Tracking",
      "Exploratory Testing",
      "QA Documentation & Audits",
    ],
  },
  {
    icon: "automation",
    slug: "workflow-automation",
    title: "Workflow Automation",
    description:
      "Connected systems and process automation solutions that reduce repetitive manual tasks and eliminate operational bottlenecks.",
    problem: "Repeated manual handoffs create avoidable delays, inconsistent records, and work that pulls people away from higher-value tasks.",
    technology: ["Make", "Activepieces", "REST APIs", "Webhooks", "PostgreSQL"],
    faqs: [
      ["Which tasks are a good fit for automation?", "Look for frequent, rule-based handoffs between tools where the expected result is clear and the work is currently being repeated by people."],
      ["Can you connect our existing business tools?", "We can assess the available APIs, webhooks and integration limits, then recommend a maintainable workflow for the systems you already use."],
      ["How do you keep automated workflows dependable?", "We plan for clear ownership, failure alerts, retry behavior and logging so a workflow can be understood and maintained after launch."],
    ],
    capabilities: [
      "Business Process Automation",
      "Make & Activepieces Integrations",
      "Workflow & Trigger Systems",
      "Custom API Integrations",
      "Data Synchronization Pipelines",
      "Operational Dashboard Wiring",
      "Task Automation Solutions",
    ],
  },
] as const;

export const deliveryProcess = [
  { title: "Understand", text: "We map the goal, users, constraints and existing systems before suggesting a solution." },
  { title: "Scope", text: "We agree on the first useful release, milestones, responsibilities and acceptance checks." },
  { title: "Build and verify", text: "We share working increments and test the important paths as the product takes shape." },
  { title: "Launch and improve", text: "We plan the handover, deploy carefully and leave a clear path for follow-up work." },
] as const;

export const serviceBySlug = (slug: string) => services.find((service) => service.slug === slug);