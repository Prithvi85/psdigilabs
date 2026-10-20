import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Website, App & UI/UX Design Pricing",
  description:
    "See starting price ranges for landing pages, websites, apps and standalone Figma UI/UX sprints from PSDigiLabs.",
  path: "/pricing",
});

const packages = [
  {
    number: "01",
    type: "Web development",
    name: "Landing page",
    price: "₹8,000–₹25,000",
    description:
      "A focused page for a product, service, campaign, or launch. Final scope depends on content, interactions, and integrations.",
    scope: ["Single-page website", "Responsive implementation", "Scope agreed before work starts"],
    service: "landing-page",
    featured: false,
  },
  {
    number: "02",
    type: "Web & app development",
    name: "Website or app",
    price: "₹20,000–₹60,000",
    description:
      "A multi-page website or a defined web or Android app scope. Screens, features, integrations, and release needs shape the estimate.",
    scope: ["Defined pages or app journeys", "Development scope agreed upfront", "Milestones set before build"],
    service: "business-website",
    featured: true,
  },
] as const;

const decisionGuide = [
  {
    title: "Choose a landing page",
    description:
      "You need one focused page to explain an offer, collect enquiries, or support a launch.",
  },
  {
    title: "Choose a website or app",
    description:
      "You need multiple pages, user journeys, product functionality, or an Android experience built.",
  },
  {
    title: "Choose a Figma sprint",
    description:
      "You want to review and approve the interface before development, or need design files for your own team to build.",
  },
] as const;

const milestones = [
  {
    title: "Deposit",
    description: "Confirm the scope and reserve the start of the project.",
  },
  {
    title: "Figma sign-off",
    description: "Review and approve the agreed design direction before development.",
  },
  {
    title: "Build",
    description: "Development payments follow the milestones agreed in the proposal.",
  },
  {
    title: "Handoff",
    description: "Final files, access, and agreed deliverables are handed over after the final milestone is paid.",
  },
] as const;

export default function PricingPage() {
  return (
    <main className="studio-page">
      <section className="studio-interior-hero">
        <div className="studio-container studio-interior-hero-grid">
          <div>
            <p className="studio-eyebrow">Web, app &amp; design pricing</p>
            <h1 className="studio-display">
              Start with the build.
              <br />
              <span>Know the range.</span>
            </h1>
          </div>
          <div>
            <p>
              Development is the main engagement. Add a digital brand kit where useful, or choose
              a standalone Figma sprint to approve the interface before code begins. Every project
              is scoped before work starts.
            </p>
            <Link className="studio-button studio-button-lime" href="/contact?service=website-development">
              Discuss a project <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="studio-section" aria-labelledby="pricing-packages-title">
        <div className="studio-container">
          <div className="studio-section-intro">
            <p className="studio-eyebrow">Starting price ranges</p>
            <h2 id="pricing-packages-title" className="studio-display">
              Development first. Design when you need it.
            </h2>
            <p>
              These ranges are starting points, not fixed quotes. The agreed pages, screens,
              functionality, and integrations set the final scope.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((item) => (
              <article
                key={item.number}
                className={`studio-pricing-card ${item.featured ? "border-[var(--studio-ink)] ring-1 ring-[var(--studio-ink)]" : ""}`}
              >
                <div className="studio-pricing-card-top">
                  <span>{item.number} / {item.type}</span>
                  {item.featured && <span>Web &amp; Android</span>}
                </div>
                <h2 className="studio-display">{item.name}</h2>
                <p>{item.description}</p>
                <div className="studio-price-note">
                  <span>PROJECT RANGE</span>
                  <strong>{item.price}</strong>
                </div>
                <ul>
                  {item.scope.map((point) => <li key={point}>{point}</li>)}
                </ul>
                <div className="mb-5 rounded-lg border border-[var(--studio-line)] bg-[#f5f7f1] p-3">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-[var(--studio-ink)]">
                    <span aria-hidden="true" className="grid size-4 place-items-center rounded border border-[var(--studio-lime-dark)] bg-white text-[var(--studio-lime-dark)]">✓</span>
                    Optional brand &amp; asset add-on
                  </span>
                  <p className="mb-0 mt-2 text-sm font-bold">+₹4,999–₹9,999</p>
                </div>
                <Link
                  className="studio-button studio-button-dark"
                  href={`/contact?service=${item.service}`}
                >
                  Scope this project <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}

            <article className="studio-pricing-card bg-[#f5f7f1]">
              <div className="studio-pricing-card-top">
                <span>03 / Standalone design</span>
                <span>Figma sprint</span>
              </div>
              <h2 className="studio-display">UI/UX design sprint</h2>
              <p>
                Approve key screens and journeys in Figma before you commit to development. Your
                team can build from the signed-off design.
              </p>
              <div className="studio-price-note">
                <span>DEPENDING ON SCREEN COUNT</span>
                <strong>₹12,000–₹25,000</strong>
              </div>
              <ul>
                <li>Interactive Figma prototype</li>
                <li>Two concepts and two revision rounds</li>
                <li>Figma sign-off before any optional build</li>
              </ul>
              <Link
                className="studio-button studio-button-dark"
                href="/contact?service=other&project_type=new-product"
              >
                Discuss a Figma sprint <span aria-hidden="true">↗</span>
              </Link>
            </article>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-[var(--studio-muted)]">
            Brand &amp; asset add-on covers digital use. Print production and print vendor
            coordination are not included. Development pricing does not include the standalone
            Figma sprint unless it is added to the agreed scope.
          </p>
        </div>
      </section>

      <section className="studio-section studio-section-paper" aria-labelledby="pricing-guide-title">
        <div className="studio-container">
          <div className="studio-section-intro">
            <p className="studio-eyebrow">Choose a starting point</p>
            <h2 id="pricing-guide-title" className="studio-display">
              Which one is right for me?
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {decisionGuide.map((item, index) => (
              <article
                key={item.title}
                className="rounded-xl border border-[var(--studio-line)] bg-white p-5"
              >
                <span className="text-xs font-black tracking-widest text-[var(--studio-lime-dark)]">
                  0{index + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mb-0 text-sm leading-relaxed text-[var(--studio-muted)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-section" aria-labelledby="pricing-payments-title">
        <div className="studio-container studio-quote-process">
          <div>
            <p className="studio-eyebrow">Milestone payments</p>
            <h2 id="pricing-payments-title" className="studio-display">
              Payments track approved work.
            </h2>
            <p>
              The proposal sets milestone amounts and due points before work begins. Handoff takes
              place after the final milestone is paid; payment is not deferred until after delivery.
            </p>
          </div>
          <ol>
            {milestones.map((milestone, index) => (
              <li key={milestone.title} className="items-start py-3">
                <span className="mt-1">0{index + 1}</span>
                <div>
                  <strong className="block">{milestone.title}</strong>
                  <p className="mb-0 mt-1 text-sm font-normal leading-relaxed text-[var(--studio-muted)]">
                    {milestone.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="studio-section studio-section-paper" aria-labelledby="pricing-faq-title">
        <div className="studio-container studio-faq-layout">
          <div>
            <p className="studio-eyebrow">Pricing questions</p>
            <h2 id="pricing-faq-title" className="studio-display">
              Cost, scope, and payment.
            </h2>
          </div>
          <div className="studio-faq-list">
            <details>
              <summary>
                Why does the price vary within each range?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                Page or screen count, content readiness, functionality, integrations, and delivery
                requirements change the amount of work. We confirm these in a written scope so the
                estimate reflects your project.
              </p>
            </details>
            <details>
              <summary>
                Can you match a cheaper quote?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                We do not reduce a quote by removing the work needed to meet the agreed requirements.
                If the estimate is outside your budget, we can define a smaller first milestone and
                make clear what is deferred.
              </p>
            </details>
            <details>
              <summary>
                Do I pay after the project is delivered?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                No. Payment is milestone-based: deposit, Figma sign-off, build milestones, then
                handoff after the final milestone payment. The amounts and due points are agreed
                before work starts.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="studio-bottom-cta">
        <div className="studio-container studio-bottom-cta-inner">
          <div>
            <p className="studio-eyebrow studio-eyebrow-light">Have a scope in mind?</p>
            <h2 className="studio-display">Get a price tied to the work.</h2>
            <p>
              Tell us what you need to launch or improve. We&apos;ll clarify the scope, milestones,
              and price before delivery begins.
            </p>
          </div>
          <Link className="studio-button studio-button-lime" href="/contact">
            Request a scoped quote <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
