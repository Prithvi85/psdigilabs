import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const siteUrl = "https://www.psdigilabs.in";
const pageUrl = `${siteUrl}/services/workflow-automation`;

export const metadata: Metadata = {
  title: "Workflow Automation & Business Process Integration India | PSDigiLabs",
  description:
    "Automate repetitive operations, connect SaaS applications, and streamline data flows. PSDigiLabs engineers dependable business process automation in India.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Workflow & Business Process Automation Services | PSDigiLabs",
    description:
      "Eliminate manual bottlenecks with custom webhooks, Make/Activepieces automations, and resilient system integrations.",
    url: pageUrl,
    type: "website",
  },
};

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
    <>
      <Header />
      <main className="min-h-screen bg-[#f8fafc] pt-24 pb-16 text-slate-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
          }}
        />

        {/* Hero Banner */}
        <section className="mx-auto max-w-5xl px-6 py-12 text-center md:py-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            ELIMINATE REPETITIVE TASKS
          </span>
          <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl md:leading-tight">
            Workflow &amp; Business Process <br className="hidden sm:inline" />
            Automation in India
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            We connect your apps, synchronize critical business records, and remove operational friction with reliable, automated trigger-and-action pipelines.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
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
        </section>

        {/* Core Capabilities */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">CAPABILITIES</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Engineered Integrations That Keep Operations Moving
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="rounded-xl border border-slate-200 bg-white p-7 shadow-xs"
              >
                <h3 className="text-lg font-bold text-slate-900">{cap.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{cap.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Interlink */}
        <section className="mx-auto max-w-5xl px-6 py-10">
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
        <section className="mx-auto max-w-4xl px-6 py-12">
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
      </main>
      <Footer />
    </>
  );
}