import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { indiaBudgets, internationalBudgets, serviceOptions, timelineOptions } from "@/data/leads";

export const metadata: Metadata = { title: "Start a Project | PSDigiLabs", description: "Tell PSDigiLabs what you want to build and start a practical project discussion.", alternates: { canonical: "/contact" } };
const first = (value: string | string[] | undefined) => typeof value === "string" ? value : "";
export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const query = await searchParams;
  const rawService = first(query.service); const initialService = serviceOptions.some(([id]) => id === rawService) ? (rawService === "custom" ? "other" : rawService) : "";
  const initialMarket = first(query.market) === "international" ? "international" : "india";
  const rawBudget = first(query.budget); const initialBudget = [...internationalBudgets, ...indiaBudgets].includes(rawBudget as never) ? rawBudget : "";
  const rawTimeline = first(query.timeline); const initialTimeline = timelineOptions.includes(rawTimeline as never) ? rawTimeline : "";
  return <><Header /><main className="inner-main"><section className="page-hero"><div className="container"><p className="eyebrow">START A CONVERSATION</p><h1>LET&apos;S BUILD SOMETHING THAT WORKS</h1><p>Tell PSDigiLabs what you want to build and share enough detail to begin a meaningful project discussion.</p></div></section><section className="container contact-page-grid"><aside><p className="eyebrow">PROJECT ENQUIRY</p><h2>A useful first conversation starts with context.</h2><p>Share your goals, users, key functionality and timeline. Starting prices are directional; the final quote depends on scope, integrations, content, complexity and delivery requirements.</p><a href="mailto:psdigilabs@gmail.com">psdigilabs@gmail.com</a></aside><ContactForm initialService={initialService} initialMarket={initialMarket} initialBudget={initialBudget} initialTimeline={initialTimeline} /></section></main><Footer /></>;
}
