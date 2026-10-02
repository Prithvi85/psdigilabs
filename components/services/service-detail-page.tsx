import Link from "next/link";
import { notFound } from "next/navigation";
import { deliveryProcess } from "@/data/services";
import { getServiceBySlug } from "@/lib/sanity-content";
import { Reveal } from "@/components/brand/reveal";

export async function ServiceDetailPage({ slug }: { slug: string }) {
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: { "@type": "Organization", name: "PSDigiLabs", url: "https://www.psdigilabs.in" },
        areaServed: ["India", "United States", "United Kingdom", "International"],
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return (
    <main className="studio-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <section className="studio-detail-hero">
        <div className="studio-container studio-detail-hero-grid">
          <div>
            <Link className="studio-backlink" href="/services">Services <span aria-hidden="true">/</span> {service.title}</Link>
            <p className="studio-eyebrow">Digital product engineering</p>
            <h1 className="studio-display">{service.title}, <span>built around the work.</span></h1>
            <p className="studio-detail-lede">{service.description}</p>
            <div className="studio-hero-actions">
              <Link className="studio-button studio-button-lime" href={`/contact?service=${service.slug}`}>Request a scoped quote <span aria-hidden="true">↗</span></Link>
              <p>We&apos;ll review the brief and aim to reply within one business day.</p>
            </div>
          </div>
          <div className="studio-detail-art" aria-label={`${service.title} delivery outline`}>
            <div className="studio-detail-art-top"><span>DELIVERY NOTE</span><span>PSD / 01</span></div>
            <div className="studio-detail-code"><span>01</span><b>Understand the problem</b><i /></div>
            <div className="studio-detail-code"><span>02</span><b>Choose the right scope</b><i /></div>
            <div className="studio-detail-code"><span>03</span><b>Build. Verify. Improve.</b><i /></div>
            <div className="studio-detail-art-foot"><span>DESIGNED FOR YOUR CONTEXT</span><span>INDIA / WORLDWIDE</span></div>
          </div>
        </div>
      </section>

      <section className="studio-section studio-section-paper">
        <div className="studio-container studio-problem-grid">
          <Reveal className="studio-section-intro studio-section-intro-compact">
            <p className="studio-eyebrow">The problem we solve</p>
            <h2 className="studio-display">Less friction between a good idea and useful software.</h2>
          </Reveal>
          <Reveal className="studio-problem-copy" delay={80}>
            <p>{service.problem}</p>
            <p>We start by understanding the people, systems and constraints around the work. Then we define a first useful scope, make decisions visible and keep quality in the delivery loop.</p>
          </Reveal>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-container">
          <Reveal className="studio-section-intro">
            <p className="studio-eyebrow">Capabilities</p>
            <h2 className="studio-display">A practical toolkit for the job.</h2>
          </Reveal>
          <div className="studio-capability-grid">
            {service.capabilities.map((capability, index) => (
              <Reveal key={capability} delay={index * 45}>
                <article className="studio-capability-card"><span>0{index + 1}</span><h3>{capability}</h3></article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-section studio-section-ink">
        <div className="studio-container studio-tech-grid">
          <div>
            <p className="studio-eyebrow studio-eyebrow-light">Tools, chosen with intent</p>
            <h2 className="studio-display">The stack follows the problem.</h2>
            <p>We choose tools to fit the product, the people maintaining it and the systems it needs to work with.</p>
          </div>
          <ul className="studio-tech-list">{service.technology.map((technology) => <li key={technology}>{technology}<span aria-hidden="true">+</span></li>)}</ul>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-container">
          <Reveal className="studio-section-intro">
            <p className="studio-eyebrow">How we work</p>
            <h2 className="studio-display">Clear steps. Fewer surprises.</h2>
          </Reveal>
          <ol className="studio-process-grid">
            {deliveryProcess.map((step, index) => <li key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="studio-section studio-section-paper">
        <div className="studio-container studio-faq-layout">
          <div><p className="studio-eyebrow">Good questions</p><h2 className="studio-display">Before we get started.</h2></div>
          <div className="studio-faq-list">
            {service.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="studio-bottom-cta">
        <div className="studio-container studio-bottom-cta-inner">
          <div><p className="studio-eyebrow">Your next step</p><h2 className="studio-display">Tell us what you&apos;re building.</h2><p>Share the goal, the constraints and what a good outcome looks like. We&apos;ll take it from there.</p></div>
          <div><Link className="studio-button studio-button-lime" href={`/contact?service=${service.slug}`}>Request a quote <span aria-hidden="true">↗</span></Link><small>We&apos;ll aim to respond within one business day.</small></div>
        </div>
      </section>
    </main>
  );
}
