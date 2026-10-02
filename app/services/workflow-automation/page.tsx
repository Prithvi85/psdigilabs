import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

const siteUrl = "https://www.psdigilabs.in";
const pageUrl = `${siteUrl}/services/workflow-automation`;

export const metadata = createPageMetadata({
  title: "Workflow Automation Services in India",
  description:
    "Automate repetitive operations, connect SaaS applications, and streamline data flows. PSDigiLabs engineers dependable business process automation in India.",
  path: pageUrl,
});

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Business Workflow Automation Services",
  serviceType: "Business Process Automation",
  provider: {
    "@type": "Organization",
    name: "PSDigiLabs",
    url: siteUrl,
  },
  areaServed: [
    { "@type": "City", name: "Kolkata" },
    { "@type": "Country", name: "India" },
    "International",
  ],
  description:
    "Design and implementation of business process automation, webhook pipelines, custom API connectors, and automated data operations.",
};

const capabilities = [
  {
    title: "Business Process Automation",
    desc: "Mapping manual tasks and converting them into trigger-based workflows that execute automatically across your software stack.",
  },
  {
    title: "Make & Activepieces Integrations",
    desc: "Architecting visual automation scenarios with proper error fallback branches, rate-limit safeguards, and execution monitoring.",
  },
  {
    title: "Custom API & Webhook Pipelines",
    desc: "Connecting disparate CRM, billing, email, and database systems with secure webhook receivers and serverless data transformers.",
  },
  {
    title: "Data Sync & Notification Systems",
    desc: "Real-time updates delivered across Slack, WhatsApp, and internal dashboards whenever key commercial events or transactions occur.",
  },
];

const faqs = [
  {
    q: "What platforms do you use for workflow automation?",
    a: "We work with Make (Integromat), Activepieces, custom Node.js/Python serverless webhooks, and REST/GraphQL APIs depending on data privacy and volume requirements.",
  },
  {
    q: "How do you handle automation failures or rate limits?",
    a: "Every automation scenario includes error routers, retry mechanisms, logging webhooks, and alerting pipelines to ensure zero data drops during downtime.",
  },
  {
    q: "Can automation be applied to existing legacy databases?",
    a: "Yes. We design intermediary API wrappers or scheduled sync pipelines that pull and sanitize records without altering your legacy infrastructure.",
  },
];

export default function WorkflowAutomationPage() {
  return (
      <div className="w-full bg-slate-50 text-slate-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
          }}
        />

        {/* Hero Banner */}
        <section className="pt-28 sm:pt-32 pb-16 w-full bg-[#071524] text-white border-b border-slate-800">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-3">
            ELIMINATE REPETITIVE TASKS
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Workflow &amp; Business Process <br className="hidden sm:inline" />
            Automation in India
          </h1>
          <p className="text-slate-300 max-w-2xl text-base sm:text-lg leading-relaxed">
            We connect your apps, synchronize critical business records, and remove operational friction with reliable, automated trigger-and-action pipelines.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#1769e0] px-7 py-3 text-xs font-bold tracking-wider text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
            >
              AUTOMATE A WORKFLOW &rarr;
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-xs font-bold tracking-wider text-slate-800 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
            >
              EXPLORE COST MODELS
            </Link>
          </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">CAPABILITIES</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Engineered Integrations That Keep Operations Moving
            </h2>
          </div>

          <div className="service-capability-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="h-full flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-7 shadow-xs"
              >
                <h3 className="text-lg font-bold text-slate-900">{cap.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{cap.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Interlink */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold text-slate-950">Simple, Predictable Implementation Scopes</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
              Discover how structured automation builds yield rapid ROI by eliminating repetitive manual administration hours.
            </p>
            <div className="mt-6">
              <Link
                href="/pricing"
                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#1769e0] hover:underline"
              >
                View Automation Pricing &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">FREQUENTLY ASKED QUESTIONS</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              Automation Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-lg border border-slate-200 bg-white p-6 shadow-2xs">
                <h3 className="text-base font-bold text-slate-900">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
  );
}