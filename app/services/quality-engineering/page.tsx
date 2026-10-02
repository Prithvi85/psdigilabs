import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

const siteUrl = "https://www.psdigilabs.in";
const pageUrl = `${siteUrl}/services/quality-engineering`;

export const metadata = createPageMetadata({
  title: "Software Testing Services in India",
  description:
    "Manual testing, automation suites, API verification, and regression audits. PSDigiLabs provides structured quality assurance services for software and web apps in India.",
  path: pageUrl,
});

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Software Testing & Quality Engineering Services",
  serviceType: "Quality Assurance & Software Testing",
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
    "Comprehensive quality engineering services covering functional manual testing, automated regression testing, API validation, and usability audits.",
};

const capabilities = [
  {
    title: "Manual & Functional Testing",
    desc: "Rigorous test case execution covering complex business workflows, edge cases, cross-device responsiveness, and end-user behavior.",
  },
  {
    title: "Automation Testing Frameworks",
    desc: "Maintainable end-to-end test automation suites for web and mobile platforms that shorten release cycles and catch regression bugs early.",
  },
  {
    title: "API & Integration Validation",
    desc: "Thorough verification of RESTful endpoints, payload structures, auth tokens, status codes, and database synchronizations.",
  },
  {
    title: "Detailed Bug Reports & QA Documentation",
    desc: "Clear, reproducible defect logs with environment data, network logs, screenshots, and severity ratings that developers can act on immediately.",
  },
];

const faqs = [
  {
    q: "Do you offer manual testing as a standalone service?",
    a: "Yes. We conduct complete manual functional, exploratory, and usability audits for web and mobile applications at any stage of development.",
  },
  {
    q: "When should automated testing be introduced?",
    a: "Automated regression testing is most valuable once core product features stabilize, ensuring new updates do not break existing critical paths.",
  },
  {
    q: "How do your QA engineers report defects to our development team?",
    a: "We integrate directly with your issue tracker (Jira, GitHub Issues, Trello, Linear) providing structured steps to reproduce, expected vs actual behavior, and logs.",
  },
];

export default function QualityEngineeringPage() {
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
            STRUCTURED QUALITY ASSURANCE
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Software Testing &amp; Quality Engineering <br className="hidden sm:inline" />
            Services in India
          </h1>
          <p className="text-slate-300 max-w-2xl text-base sm:text-lg leading-relaxed">
            We identify critical defects, validate user journeys, and protect production releases through meticulous manual verification and dependable automated test suites.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#1769e0] px-7 py-3 text-xs font-bold tracking-wider text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
            >
              REQUEST A QA AUDIT &rarr;
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-xs font-bold tracking-wider text-slate-800 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
            >
              VIEW TESTING PRICING
            </Link>
          </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">CAPABILITIES</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Engineered Quality Across Every Release Layer
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
            <h2 className="text-2xl font-bold text-slate-950">Flexible QA Retainers &amp; Project Audits</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
              Check our transparent cost breakdown for one-off pre-launch test cycles, monthly QA retainers, and automation setup.
            </p>
            <div className="mt-6">
              <Link
                href="/pricing"
                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#1769e0] hover:underline"
              >
                Explore Testing Pricing Options &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">FREQUENTLY ASKED QUESTIONS</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              Testing &amp; QA Questions
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