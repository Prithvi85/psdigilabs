import { ContactForm } from "@/components/contact/contact-form";
import { indiaBudgets, internationalBudgets, serviceOptions, timelineOptions } from "@/data/leads";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Start a Project Conversation",
  description:
    "Share your goals, users, key functionality, and timeline to begin a technical project discussion with PSDigiLabs.",
  path: "/contact",
});

type ContactSearchParams = {
  service?: string | string[];
  market?: string | string[];
  budget?: string | string[];
  timeline?: string | string[];
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<ContactSearchParams>;
}) {
  const query = await searchParams;
  const serviceValue = typeof query.service === "string" ? query.service : "";
  const market = query.market === "international" ? "international" : "india";
  const budgetValue = typeof query.budget === "string" ? query.budget : "";
  const timelineValue = typeof query.timeline === "string" ? query.timeline : "";
  const budgetOptions = market === "india" ? indiaBudgets : internationalBudgets;
  const initialService = serviceOptions.some(([value]) => value === serviceValue)
    ? serviceValue
    : "";
  const initialBudget = budgetOptions.find((value) => value === budgetValue) ?? "";
  const initialTimeline = timelineOptions.find((value) => value === timelineValue) ?? "";

  return (
    <main className="contact-page">
      <section className="contact-hero-banner">
        <div className="contact-hero-inner">
          <p className="hero-pill">START A CONVERSATION</p>
          <h1>LET&apos;S BUILD SOMETHING THAT WORKS</h1>
          <p className="hero-desc">
            Tell PSDigiLabs what you want to build and share enough detail to begin a meaningful project discussion.
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container contact-content-grid">
          <div className="contact-page-intro">
            <p className="contact-kicker">PROJECT ENQUIRY</p>
            <h2>
              A useful first conversation starts with context.
            </h2>
            <p>
              Share your goals, users, key functionality and timeline. Starting prices are directional; the final quote depends on scope, integrations, content, complexity and delivery requirements.
            </p>
            <a className="contact-email" href="mailto:contact@psdigilabs.in">
              contact@psdigilabs.in
            </a>
          </div>

          <div className="contact-form-column">
            <ContactForm
              initialService={initialService}
              initialMarket={market}
              initialBudget={initialBudget}
              initialTimeline={initialTimeline}
            />
          </div>
        </div>
      </section>
    </main>
  );
}