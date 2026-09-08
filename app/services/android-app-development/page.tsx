import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const siteUrl = "https://www.psdigilabs.in";
const pageUrl = `${siteUrl}/services/android-app-development`;

export const metadata: Metadata = {
  title: "Android App Development Company in India | Native Kotlin Apps",
  description:
    "End-to-end native Android app development services in India. PSDigiLabs builds high-performance mobile applications using Kotlin, Jetpack Compose, and clean architecture.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Android App Development Services | PSDigiLabs",
    description:
      "Native Kotlin applications, robust REST integrations, and modern Jetpack Compose interfaces engineered for performance and scalability.",
    url: pageUrl,
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Android App Development Services",
  serviceType: "Mobile Application Development",
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
    "Complete native Android application engineering, covering Kotlin development, Jetpack Compose UI, API wiring, automated testing, and Play Store publishing.",
};

const capabilities = [
  {
    title: "Native Kotlin Architecture",
    desc: "Clean MVVM and MVI code architectures designed with modern Kotlin paradigms, ensuring predictable state management and high maintainability.",
  },
  {
    title: "Jetpack Compose UI/UX",
    desc: "Declarative, fluid user interfaces adhering to Material Design 3 guidelines for consistent, responsive performance across all Android screen sizes.",
  },
  {
    title: "Secure API & Cloud Integration",
    desc: "Resilient network layers, offline-first data caching with Room, and enterprise-grade authentication via RESTful services and Firebase.",
  },
  {
    title: "Google Play Store Readiness",
    desc: "Complete bundle optimization, compliance audits, Google Play Console release management, and zero-compromise security configurations.",
  },
];

const faqs = [
  {
    q: "Why does PSDigiLabs choose native Android over cross-platform?",
    a: "Native development with Kotlin and Jetpack Compose delivers superior performance, direct hardware API access, better battery efficiency, and zero lag compared to hybrid wrappers.",
  },
  {
    q: "Do you assist with Google Play Store submission and compliance?",
    a: "Yes. We handle app signing, store asset preparation, privacy policy disclosures, and full submission compliance through the Google Play Console.",
  },
  {
    q: "Can you connect the mobile app with our existing web backend?",
    a: "Yes. We specialize in building and integrating secure RESTful or GraphQL APIs that keep data synchronized across your website and mobile applications.",
  },
];

export default function AndroidDevelopmentPage() {
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
            NATIVE PERFORMANCE &bull; MODERN KOTLIN
          </span>
          <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl md:leading-tight">
            Android App Development Company <br className="hidden sm:inline" />
            in India &amp; Kolkata
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            We build native Android applications that deliver fluid user interfaces, rock-solid stability, and dependable backend integrations tailored to your business operations.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#1769e0] px-7 py-3 text-xs font-bold tracking-wider text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
            >
              DISCUSS YOUR APP IDEA &rarr;
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-xs font-bold tracking-wider text-slate-800 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
            >
              EXPLORE COST BENCHMARKS
            </Link>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">CAPABILITIES</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Engineered for Device Stability and User Retention
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
            <h2 className="text-2xl font-bold text-slate-950">Clear, Project-Based App Pricing</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
              Review our transparent market breakdown for mobile app engineering scopes, technical audits, and maintenance plans.
            </p>
            <div className="mt-6">
              <Link
                href="/pricing"
                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#1769e0] hover:underline"
              >
                View App Development Pricing Models &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mx-auto max-w-4xl px-6 py-12">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">FREQUENTLY ASKED QUESTIONS</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              Android Development Questions
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