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
    <div className="contact-page w-full bg-slate-50">
      <section className="pt-28 sm:pt-32 pb-16 w-full bg-[#071524] text-white border-b border-slate-800">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-3">START A CONVERSATION</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">LET&apos;S BUILD SOMETHING THAT WORKS</h1>
          <p className="text-slate-300 max-w-2xl text-base sm:text-lg leading-relaxed">
            Tell PSDigiLabs what you want to build and share enough detail to begin a meaningful project discussion.
          </p>
        </div>
      </section>

      <section className="w-full bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="contact-page-intro lg:col-span-5 space-y-6 pt-2">
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

          <div className="contact-form-column lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            <ContactForm
              initialService={initialService}
              initialMarket={market}
              initialBudget={initialBudget}
              initialTimeline={initialTimeline}
            />
          </div>
        </div>
      </section>
    </div>
  );
}