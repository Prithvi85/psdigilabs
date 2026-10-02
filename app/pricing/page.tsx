import type { Metadata } from "next";
import Link from "next/link";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { MarketReference } from "@/components/pricing/market-reference";
import { Reveal } from "@/components/brand/reveal";

export const metadata: Metadata = {
  title: "Pricing & Engagement Models",
  description:
    "Learn how PSDigiLabs scopes website, app, QA and automation projects. Every quote is based on agreed deliverables, constraints and support needs.",
  alternates: { canonical: "/pricing" },
};

const costFactors = [
  ["Scope and journeys", "Pages, user roles, key journeys, data models and the first useful release."],
  ["Design and content", "Existing brand assets, content readiness, custom interfaces and accessibility needs."],
  ["Integrations", "APIs, authentication, payments, analytics, CRM and existing system constraints."],
  ["Quality and support", "Device coverage, automation depth, release coordination and post-launch ownership."],
] as const;

export default function PricingPage() {
  return (
    <main className="studio-page">
      <section className="studio-interior-hero">
        <div className="studio-container studio-interior-hero-grid">
          <div>
            <p className="studio-eyebrow">Pricing / engagement</p>
            <h1 className="studio-display">
              Clear scope.
              <br />
              <span>Useful estimate.</span>
            </h1>
          </div>
          <p>
            There is no one-size-fits-all price for custom engineering. We agree on the work,
            constraints and delivery checkpoints, then provide a scoped quote before build starts.
          </p>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-container">
          <div className="studio-section-intro">
            <p className="studio-eyebrow">Typical engagement shapes</p>
            <h2 className="studio-display">A starting point, not a fixed package.</h2>
            <p>
              Each engagement is shaped around the actual requirements. No commitment is made until
              scope and assumptions are clear.
            </p>
          </div>
          <PricingCards />
        </div>
      </section>

      <MarketReference />

      <section className="studio-section studio-section-paper">
        <div className="studio-container studio-quote-process">
          <div>
            <p className="studio-eyebrow">How estimates work</p>
            <h2 className="studio-display">Four steps to a grounded quote.</h2>
            <p>
              We make assumptions visible so you can decide what to do now, what to defer and what
              needs discovery.
            </p>
          </div>
          <ol>
            {[
              "Share the goal and context",
              "Clarify scope and constraints",
              "Review milestones and assumptions",
              "Approve a proposal before delivery",
            ].map((step, index) => (
              <li key={step}>
                <span>0{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-container">
          <div className="studio-section-intro">
            <p className="studio-eyebrow">What changes the estimate</p>
            <h2 className="studio-display">Cost follows the work.</h2>
          </div>
          <div className="studio-cost-grid">
            {costFactors.map(([title, text], index) => (
              <Reveal key={title} delay={index * 50}>
                <article>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-section studio-section-paper">
        <div className="studio-container studio-faq-layout">
          <div>
            <p className="studio-eyebrow">Pricing questions</p>
            <h2 className="studio-display">A few useful details.</h2>
          </div>
          <div className="studio-faq-list">
            <details>
              <summary>
                Are the engagement cards fixed-price packages?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                No. They describe common project shapes. We confirm deliverables, assumptions and
                cost in a scoped proposal before work begins.
              </p>
            </details>
            <details>
              <summary>
                Do you work with teams outside India?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                Yes. PSDigiLabs is based in India and works with teams in India and internationally.
                Time zone, communication and delivery expectations are discussed during scoping.
              </p>
            </details>
            <details>
              <summary>
                Can we begin with a small engagement?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                Where practical, we can define a focused first milestone or discovery phase before
                committing to a larger build.
              </p>
            </details>
            <details>
              <summary>
                What happens after I request a quote?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                We review your brief and aim to respond within one business day with clarifying
                questions or a next step.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="studio-bottom-cta">
        <div className="studio-container studio-bottom-cta-inner">
          <div>
            <p className="studio-eyebrow studio-eyebrow-light">Start with the brief</p>
            <h2 className="studio-display">Tell us what needs to work better.</h2>
            <p>We&apos;ll help turn the context into a useful first scope.</p>
          </div>
          <Link className="studio-button studio-button-lime" href="/contact">
            Request a scoped quote <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}