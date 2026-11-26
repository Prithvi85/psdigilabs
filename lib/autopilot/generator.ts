import type {
  AutopilotReport,
  IcpProfile,
  IndustryKey,
  ProspectLead,
  ProspectRadarResult,
  WebsiteIntelligence,
  WorkflowNode,
} from "./types";

const ICP_BY_INDUSTRY: Record<IndustryKey, Omit<IcpProfile, "valueAngle">> = {
  agency: {
    primaryPersona: "Founders, COOs, and Growth Leads at 5–50 person SMEs",
    decisionMakerRoles: ["Founder / Managing Director", "Head of Operations", "Marketing Lead"],
    buyingTriggers: [
      "Outdated or slow marketing website hurting credibility",
      "Manual spreadsheet / WhatsApp handoffs dropping inbound leads",
      "Upcoming product launch requiring QA and reliable delivery",
    ],
    painPoints: [
      "Agencies that disappear after launch without testing or documentation",
      "Fragmented tools that require manual copy-pasting between forms and email",
      "Unclear scoping and unpredictable timelines",
    ],
  },
  saas: {
    primaryPersona: "VP of Operations, Product Managers, and RevOps Teams",
    decisionMakerRoles: ["VP Operations", "Head of Growth", "Product Lead"],
    buyingTriggers: [
      "Rising team headcount creating repetitive manual workflows",
      "Switching from legacy spreadsheets to a unified cloud tool",
      "Need to prove ROI within 30 days of onboarding",
    ],
    painPoints: [
      "Siloed tools requiring constant manual reconciliation",
      "Long onboarding cycles with heavy engineering lift",
      "Lack of real-time visibility across team pipelines",
    ],
  },
  ecommerce: {
    primaryPersona: "D2C Brand Owners, Merchandisers, and Boutique Retailers",
    decisionMakerRoles: ["Brand Founder", "E-Commerce Manager", "Retail Director"],
    buyingTriggers: [
      "Expanding from offline/Instagram DMs to direct online checkout",
      "High cart abandonment on mobile devices",
      "Seasonal collection launches needing instant catalog updates",
    ],
    painPoints: [
      "Slow store pages losing mobile shoppers",
      "Manual order confirmations via WhatsApp without inventory sync",
      "Dependence on high-commission marketplaces",
    ],
  },
  healthcare: {
    primaryPersona: "Clinic Directors, Practice Owners, and Multi-Specialty Doctors",
    decisionMakerRoles: ["Medical Director", "Clinic Administrator", "Practice Owner"],
    buyingTriggers: [
      "Missed patient calls during peak clinic hours",
      "High no-show rate due to missing automated reminders",
      "Expanding to a second branch or launching new specialties",
    ],
    painPoints: [
      "Front-desk staff overwhelmed by manual booking confirmations",
      "Outdated web presence failing to earn patient trust",
      "Disconnected patient enquiry channels across phone, web, and WhatsApp",
    ],
  },
  realestate: {
    primaryPersona: "Developers, Boutique Builders, and Interior Design Studios",
    decisionMakerRoles: ["Managing Partner", "Sales Director", "Principal Architect"],
    buyingTriggers: [
      "New residential or commercial project launch",
      "Slow response times to portal & ad enquiries",
      "Need to qualify serious buyers before site visits",
    ],
    painPoints: [
      "Property enquiries sitting unanswered for hours",
      "Low-trust brochure sites without interactive project discovery",
      "Zero visibility on which marketing channel drives actual bookings",
    ],
  },
  hospitality: {
    primaryPersona: "Restaurant Groups, Boutique Hotels, and Event Studios",
    decisionMakerRoles: ["Owner / General Manager", "Events Coordinator", "Marketing Manager"],
    buyingTriggers: [
      "Heavy commission fees from third-party booking aggregators",
      "Upcoming wedding, festive, or corporate booking season",
      "Manual handling of table/event enquiries on social media",
    ],
    painPoints: [
      "Losing repeat guests to aggregator platforms",
      "Slow back-and-forth for custom quotes and availability checks",
      "Inconsistent mobile experience for menus and galleries",
    ],
  },
  education: {
    primaryPersona: "Training Institutes, Cohort Founders, and Academy Directors",
    decisionMakerRoles: ["Academy Founder", "Program Director", "Admissions Lead"],
    buyingTriggers: [
      "Opening admissions for a new quarterly batch or cohort",
      "Transitioning offline classrooms to hybrid/online enrollment",
      "High drop-off between enquiry form and fee payment",
    ],
    painPoints: [
      "Counselors manually chasing cold enquiries",
      "Outdated syllabus pages that fail to answer parent/student questions",
      "Disorganized student onboarding after enrollment",
    ],
  },
  general: {
    primaryPersona: "Business Owners, Operations Leads, and Growth Decision Makers",
    decisionMakerRoles: ["Founder / Owner", "Operations Manager", "Growth Lead"],
    buyingTriggers: [
      "Scaling customer acquisition beyond referrals",
      "Replacing manual workflows with dependable automation",
      "Modernizing digital presence before a major campaign",
    ],
    painPoints: [
      "Leads slipping through manual follow-up cracks",
      "Unclear digital positioning compared to faster competitors",
      "Disconnected website, email, and messaging channels",
    ],
  },
};

export function buildOutreachForTarget(
  website: WebsiteIntelligence,
  icp: IcpProfile,
  targetCity: string,
  targetNiche: string,
  prospect?: ProspectLead | null
): AutopilotReport["outreach"] {
  const companyToken = prospect ? prospect.name : "{{company_name}}";
  const cityToken = prospect ? prospect.city : targetCity;
  const observation = prospect
    ? prospect.opportunityReason
    : `many ${targetNiche} teams in ${cityToken} still lose high-intent enquiries to slow pages and manual follow-ups`;

  const emailSequence = [
    {
      step: 1,
      dayLabel: "Day 1 — Observation Hook",
      channel: "Email" as const,
      subject: `Quick idea for ${companyToken} (${cityToken})`,
      body: [
        `Hi ${companyToken} team,`,
        ``,
        `I came across ${companyToken} while researching ${targetNiche} businesses in ${cityToken}. One quick thing stood out: ${observation.charAt(0).toLowerCase() + observation.slice(1)}`,
        ``,
        `At ${website.brandName}, we help teams with ${website.offerSummary}. Specifically, we focus on ${icp.valueAngle.toLowerCase()}.`,
        ``,
        `Would you be open to a quick 2-minute breakdown tailored to ${companyToken}? No deck or pressure—just practical fixes you can use right away.`,
        ``,
        `Best,`,
        `${website.brandName} Team (${website.domain})`,
      ].join("\n"),
    },
    {
      step: 2,
      dayLabel: "Day 4 — Value & Proof",
      channel: "Email" as const,
      subject: `Re: Quick idea for ${companyToken}`,
      body: [
        `Hi ${companyToken} team,`,
        ``,
        `Following up briefly on my note earlier this week. Most ${icp.primaryPersona.toLowerCase()} we speak with run into two bottlenecks: ${icp.painPoints[0].toLowerCase()} and ${icp.painPoints[1].toLowerCase()}.`,
        ``,
        `Even a simple automated intake → instant confirmation → calendar routing flow usually pays for itself in saved hours within the first month.`,
        ``,
        `Happy to share a concrete 3-step blueprint for ${companyToken} if helpful—should I send it over?`,
        ``,
        `Best,`,
        `${website.brandName} (${website.resolvedUrl})`,
      ].join("\n"),
    },
    {
      step: 3,
      dayLabel: "Day 9 — Polite Close",
      channel: "Email" as const,
      subject: `Closing the loop — ${companyToken}`,
      body: [
        `Hi ${companyToken} team,`,
        ``,
        `I won't clutter your inbox further if ${targetNiche} growth/automation isn't a priority this quarter.`,
        ``,
        `If upgrading your customer journey or automating manual handoffs comes up later, feel free to reply here or check ${website.resolvedUrl} anytime.`,
        ``,
        `Wishing you a great month ahead in ${cityToken}!`,
        `— ${website.brandName}`,
      ].join("\n"),
    },
  ];

  const whatsappPitch = {
    step: 1,
    dayLabel: "Instant WhatsApp Opener",
    channel: "WhatsApp" as const,
    body: `Hi ${companyToken} team! Reached out from ${website.brandName} (${website.domain}). Noticed a quick growth opportunity around ${cityToken} (${observation.toLowerCase()}). We help businesses with ${website.offerSummary}. Would you like me to share a 1-page action plan tailored to ${companyToken}?`,
  };

  const linkedinDm = {
    step: 1,
    dayLabel: "LinkedIn Connection / DM",
    channel: "LinkedIn" as const,
    body: `Hi — saw what you're building at ${companyToken} in ${cityToken}. We work on ${website.offerSummary} at ${website.brandName}, helping ${icp.primaryPersona.toLowerCase()} eliminate manual bottlenecks. Happy to connect and share notes!`,
  };

  return { emailSequence, whatsappPitch, linkedinDm };
}

function buildAutomationPipeline(website: WebsiteIntelligence, targetNiche: string): AutopilotReport["automation"] {
  const missingBooking = !website.conversionSignals.hasBookingLink;
  const missingWhatsApp = !website.conversionSignals.hasWhatsApp;
  const missingForm = !website.conversionSignals.hasForm;

  const nodes: WorkflowNode[] = [
    {
      step: "01",
      title: "Smart Inbound & Outbound Capture",
      tool: missingForm ? "Next.js Interactive Form + Webhook" : "Existing Form + Webhook Listener",
      triggerOrAction: "Trigger: New Lead / Audit Run",
      description: `Captures company URL, niche, and contact details from ${website.domain} with instant validation and bot/honeypot filtering.`,
      solvesGap: missingForm ? "Replaces missing lead capture form" : "Unifies lead intake into one schema",
    },
    {
      step: "02",
      title: "Zero-Cost Domain & Readiness Enrichment",
      tool: "Node DNS + Live HTML Inspector",
      triggerOrAction: "Action: Auto-Score & Tag",
      description: "Checks SSL, MX email records, tech stack, and conversion readiness in under 3 seconds before routing.",
      solvesGap: "Eliminates manual prospect research",
    },
    {
      step: "03",
      title: "PostgreSQL Lead Ledger & Dedupe",
      tool: "Neon PostgreSQL / Sanity CRM",
      triggerOrAction: "Action: Upsert Lead Record",
      description: `Stores enriched ${targetNiche} leads with timestamped status so zero enquiries are lost in inbox threads.`,
      solvesGap: "Stops spreadsheet copy-pasting",
    },
    {
      step: "04",
      title: "Multi-Channel Instant Follow-Up",
      tool: missingWhatsApp ? "Resend Email + WhatsApp Deep-Link" : "Resend + WhatsApp + Calendar Link",
      triggerOrAction: "Action: Dispatch Personalized Reply",
      description: missingBooking
        ? "Sends personalized confirmation with a direct booking link so qualified leads schedule without email ping-pong."
        : "Routes qualified prospects to your booking calendar and notifies your team in under 5 seconds.",
      solvesGap: missingBooking ? "Fixes missing instant booking flow" : "Cuts lead response time to <10s",
    },
    {
      step: "05",
      title: "QA Alerts & Failure Monitoring",
      tool: "Activepieces / Make + Health Alert",
      triggerOrAction: "Monitor: Retry & Escalate",
      description: "Logs delivery outcomes, retries failed webhooks, and alerts your team if any integration step breaks.",
      solvesGap: "PSDigiLabs QA-in-the-loop reliability",
    },
  ];

  const blueprintJson = {
    schema: "psdigilabs.automation-blueprint.v1",
    generatedFor: website.domain,
    brandName: website.brandName,
    industry: website.industryLabel,
    pipelineName: `${website.brandName} — Lead-to-Delivery Autopilot`,
    compatibility: ["Activepieces", "Make", "Next.js Route Handlers", "Neon PostgreSQL", "Resend"],
    steps: nodes.map((n) => ({
      id: `step_${n.step}`,
      name: n.title,
      adapter: n.tool,
      event: n.triggerOrAction,
      summary: n.description,
    })),
  };

  return {
    pipelineName: `${website.brandName} Lead-to-Delivery Autopilot`,
    summary: `Tailored specifically to ${website.domain} (${website.readinessScore}/100 readiness): connects prospect discovery directly to automated capture, PostgreSQL storage, and instant booking.`,
    estimatedHoursSavedWeekly: missingForm || missingBooking ? 11 : 7,
    nodes,
    blueprintJson,
  };
}

export type ServiceFocusKey =
  | "all"
  | "website-development"
  | "workflow-automation"
  | "android-app-development"
  | "quality-engineering";

const SERVICE_FOCUS_COPY: Record<ServiceFocusKey, { label: string; offer: string }> = {
  all: {
    label: "Full Product Engineering (Web, Android, QA & Automation)",
    offer: "fast Next.js websites, native Android apps, automated QA, and workflow automation",
  },
  "website-development": {
    label: "Website Development",
    offer: "high-speed Next.js websites, CMS admin panels, and conversion-ready web platforms",
  },
  "workflow-automation": {
    label: "Workflow Automation",
    offer: "Make, Activepieces, webhook, and CRM automations that eliminate manual lead handoffs",
  },
  "android-app-development": {
    label: "Android App Development",
    offer: "native Kotlin & Jetpack Compose Android apps integrated cleanly with your backend",
  },
  "quality-engineering": {
    label: "Software Testing & QA",
    offer: "manual verification, API testing, and automated regression suites before release",
  },
};

export function generateAutopilotReport(
  website: WebsiteIntelligence,
  radar: ProspectRadarResult,
  targetCity: string,
  targetNiche: string,
  serviceFocus: ServiceFocusKey = "all"
): AutopilotReport {
  const focus = SERVICE_FOCUS_COPY[serviceFocus] || SERVICE_FOCUS_COPY.all;
  const focusedWebsite: WebsiteIntelligence = {
    ...website,
    brandName: "PSDigiLabs",
    offerSummary: focus.offer,
  };
  const baseIcp = ICP_BY_INDUSTRY[focusedWebsite.industry] || ICP_BY_INDUSTRY.agency;
  const icp: IcpProfile = {
    ...baseIcp,
    valueAngle: `Helping ${targetNiche} businesses in ${targetCity} with ${focus.offer}`,
  };

  const primaryProspect = radar.prospects[0] ?? null;
  const outreach = buildOutreachForTarget(focusedWebsite, icp, targetCity, targetNiche, primaryProspect);
  const automation = buildAutomationPipeline(focusedWebsite, targetNiche);

  return {
    generatedAt: new Date().toISOString(),
    brandName: "PSDigiLabs",
    serviceFocus: focus.label,
    targetCity,
    targetNiche,
    website: focusedWebsite,
    icp,
    radar,
    outreach,
    automation,
  };
}
