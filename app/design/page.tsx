import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "UI/UX Design Sprint & Digital Brand Kit",
  description:
    "Approve your Figma design before development. PSDigiLabs offers a standalone UI/UX sprint, digital brand add-on, and optional development.",
  path: "/design",
});

const audiences = [
  {
    title: "Founders shaping an MVP",
    description: "You need a clear, reviewable product flow before committing to a build.",
  },
  {
    title: "Teams improving a product",
    description: "You have a website or Android app that needs a better interface before the next release.",
  },
  {
    title: "Clients planning development",
    description: "You want Figma screens approved before handing the work to an engineering team.",
  },
] as const;

const offers = [
  {
    title: "Digital Brand Kit",
    description:
      "A practical visual direction for digital products: logo direction, colour palette, typography, and reusable interface elements.",
  },
  {
    title: "UI/UX Interactive Sprint",
    description:
      "A focused design sprint for key screens and user journeys, with two concepts, two revision rounds, and a clickable Figma prototype.",
  },
  {
    title: "Dev Add-On Bundle",
    description:
      "Continue from approved Figma into responsive frontend development, implementation checks, and a clear handoff.",
  },
] as const;

const process = [
  {
    title: "Two concepts",
    description: "Review two distinct design directions against the agreed brief.",
  },
  {
    title: "Two revision rounds",
    description: "Refine the selected direction in two focused rounds of feedback.",
  },
  {
    title: "Figma sign-off",
    description: "Approve the screens and prototype before implementation begins.",
  },
  {
    title: "Code",
    description: "Start the optional development add-on from the signed-off design.",
  },
] as const;

export default function DesignPage() {
  return (
    <main className="studio-page">
      <section className="studio-interior-hero">
        <div className="studio-container studio-interior-hero-grid">
          <div>
            <p className="studio-eyebrow">UI/UX &amp; digital brand design</p>
            <h1 className="studio-display">
              Approve the design
              <br />
              <span>before development starts.</span>
            </h1>
          </div>
          <div>
            <p>
              Get your key screens and user flows into Figma, review the direction, and sign off
              before code begins. Book the design sprint on its own or add development when
              you&apos;re ready.
            </p>
            <Link className="studio-button studio-button-lime" href="/contact#project-enquiry">
              Discuss a design sprint <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="studio-section studio-section-paper" aria-labelledby="design-audience-title">
        <div className="studio-container">
          <div className="studio-section-intro">
            <p className="studio-eyebrow">Who this is for</p>
            <h2 id="design-audience-title" className="studio-display">
              Make the design decision before the build decision.
            </h2>
          </div>
          <ul className="studio-cost-grid grid grid-cols-1 md:grid-cols-3">
            {audiences.map((audience, index) => (
              <li key={audience.title} className="list-none">
                <article>
                  <span>0{index + 1}</span>
                  <h3>{audience.title}</h3>
                  <p>{audience.description}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="studio-section" aria-labelledby="design-included-title">
        <div className="studio-container">
          <div className="studio-section-intro">
            <p className="studio-eyebrow">What&apos;s included</p>
            <h2 id="design-included-title" className="studio-display">
              A defined design scope. Development is optional.
            </h2>
          </div>
          <div className="studio-cost-grid grid grid-cols-1 md:grid-cols-3">
            {offers.map((offer, index) => (
              <article key={offer.title}>
                <span>0{index + 1}</span>
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-section studio-section-paper" aria-labelledby="design-process-title">
        <div className="studio-container">
          <div className="studio-section-intro">
            <p className="studio-eyebrow">How it works</p>
            <h2 id="design-process-title" className="studio-display">
              Review the design before it becomes code.
            </h2>
          </div>
          <ol className="studio-process-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <li key={step.title}>
                <span>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="studio-section" aria-labelledby="design-pricing-title">
        <div className="studio-container studio-quote-process">
          <div>
            <p className="studio-eyebrow">Pricing anchor</p>
            <h2 id="design-pricing-title" className="studio-display">
              Start with a standalone Figma sprint.
            </h2>
            <p>
              Choose design without committing to development. Add a digital brand kit if the
              project needs a visual direction too.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-xl border border-[var(--studio-line)] bg-white p-6">
              <p className="studio-eyebrow">Standalone design</p>
              <h3 className="m-0 text-2xl font-bold">From ₹12,000</h3>
              <p className="mb-0 mt-3 text-sm leading-relaxed text-[var(--studio-muted)]">
                UI/UX Figma sprint with two concepts, two revision rounds, and sign-off.
              </p>
            </article>
            <article className="rounded-xl border border-[var(--studio-line)] bg-white p-6">
              <p className="studio-eyebrow">Brand add-on</p>
              <h3 className="m-0 text-2xl font-bold">+₹4,999–₹9,999</h3>
              <p className="mb-0 mt-3 text-sm leading-relaxed text-[var(--studio-muted)]">
                Add a digital brand kit to the design sprint.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="studio-section studio-section-paper" aria-labelledby="design-boundaries-title">
        <div className="studio-container studio-faq-layout">
          <div>
            <p className="studio-eyebrow">Scope and boundaries</p>
            <h2 id="design-boundaries-title" className="studio-display">
              Clear limits keep the work focused.
            </h2>
          </div>
          <div className="studio-faq-list">
            <div className="border-b border-[var(--studio-line)] py-5">
              <h3 className="m-0 text-base font-bold">No print vendor coordination</h3>
              <p className="mb-0 mt-2 text-sm leading-relaxed text-[var(--studio-muted)]">
                The brand kit is for digital use. Print production and print vendor management are
                not included.
              </p>
            </div>
            <div className="border-b border-[var(--studio-line)] py-5">
              <h3 className="m-0 text-base font-bold">No open-ended revisions</h3>
              <p className="mb-0 mt-2 text-sm leading-relaxed text-[var(--studio-muted)]">
                The sprint includes two revision rounds on the selected concept. Additional
                requests need a separately agreed scope.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="studio-section" aria-labelledby="design-faq-title">
        <div className="studio-container studio-faq-layout">
          <div>
            <p className="studio-eyebrow">Design sprint FAQ</p>
            <h2 id="design-faq-title" className="studio-display">
              Before you start.
            </h2>
          </div>
          <div className="studio-faq-list">
            <details>
              <summary>
                Why not a cheaper template?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                A template gives you a starting layout. This sprint is scoped around your product,
                users, and key journeys, with a Figma review and sign-off before development.
              </p>
            </details>
            <details>
              <summary>
                Can you just do a logo?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                Yes. A logo-focused scope can be discussed on its own or as a digital brand add-on.
                It does not include print production or vendor coordination.
              </p>
            </details>
            <details>
              <summary>
                What if I need changes after sign-off?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                Changes requested after Figma sign-off are scoped separately before work continues.
                If development is included, the signed-off design is the implementation reference.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="studio-bottom-cta">
        <div className="studio-container studio-bottom-cta-inner">
          <div>
            <p className="studio-eyebrow studio-eyebrow-light">Design first. Code after approval.</p>
            <h2 className="studio-display">Get the Figma direction clear before the build.</h2>
            <p>
              Share what you&apos;re planning, what already exists, and what needs approval. We&apos;ll
              discuss a focused design scope.
            </p>
          </div>
          <Link className="studio-button studio-button-lime" href="/contact#project-enquiry">
            Start with a design conversation <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
