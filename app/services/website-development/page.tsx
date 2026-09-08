import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const siteUrl = "https://www.psdigilabs.in";
const pageUrl = `${siteUrl}/services/website-development`;

export const metadata: Metadata = {
  title: "Custom Website Development Services India | Next.js & Web Apps",
  description:
    "End-to-end custom website development services in India. PSDigiLabs builds high-performance Next.js platforms, responsive business websites, and tailored web applications.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Custom Website Development Services | PSDigiLabs",
    description:
      "Modern Next.js web applications, headless CMS platforms, and scalable business websites tailored for speed, SEO, and conversion.",
    url: pageUrl,
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom Website Development Services",
  serviceType: "Website Development",
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
    "Full-lifecycle custom website development including responsive web design, Next.js engineering, headless CMS integrations, and performance optimization.",
};

const capabilities = [
  {
    title: "Custom Business Websites",
    desc: "Clean, responsive websites engineered with Next.js and Tailwind CSS for rapid load times, strong search visibility, and frictionless user journeys.",
  },
  {
    title: "Web Application Development",
    desc: "Complex dynamic interfaces, customer portals, and internal dashboards built with TypeScript, React, and dependable API integrations.",
  },
  {
    title: "Headless CMS & Admin Portals",
    desc: "Modular content architectures allowing your team to update marketing pages and manage resources without developer intervention.",
  },
  {
    title: "Performance & Technical SEO",
    desc: "Core Web Vitals compliance, server-side rendering, semantic HTML hierarchy, and clean metadata architectures built directly into the codebase.",
  },
];

const faqs = [
  {
    q: "Why does PSDigiLabs prioritize Next.js for web development?",
    a: "Next.js provides hybrid rendering (static and server-side), automatic image optimization, and lightning-fast load times, delivering significant advantages in Core Web Vitals and organic search rankings.",
  },
  {
    q: "How are website development costs determined?",
    a: "Pricing depends on complexity, page count, integrations, and custom backend requirements. We maintain clear, documented pricing benchmarks across Indian and international project scopes.",
  },
  {
    q: "Do you provide ongoing website maintenance and support?",
    a: "Yes. We offer maintenance retainers covering security updates, performance monitoring, feature enhancements, and content updates.",
  },
];

export default function WebsiteDevelopmentPage() {
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
            ENGINEERED FOR SPEED &amp; CONVERSION
          </span>
          <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl md:leading-tight">
            Custom Website Development Services <br className="hidden sm:inline" />
            in India &amp; Worldwide
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            We architect and build fast, responsive Next.js platforms, tailored business websites, and scalable web apps built to support business growth and rank on search engines.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#1769e0] px-7 py-3 text-xs font-bold tracking-wider text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
            >
              START YOUR PROJECT &rarr;
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-xs font-bold tracking-wider text-slate-800 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
            >
              VIEW PRICING BREAKDOWN
            </Link>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">CAPABILITIES</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Web Development Built Around Real Business Goals
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

        {/* Pricing Link Interlink Section */}
        <section className="mx-auto max-w-5xl px-6 py-10">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold text-slate-950">Transparent Cost Benchmarks</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
              Explore our structured comparison study evaluating typical freelance, agency, and enterprise web development costs across Indian and international markets.
            </p>
            <div className="mt-6">
              <Link
                href="/pricing"
                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#1769e0] hover:underline"
              >
                Explore Website Development Pricing &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Service FAQs */}
        <section className="mx-auto max-w-4xl px-6 py-12">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">FREQUENTLY ASKED QUESTIONS</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              Website Development Queries
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