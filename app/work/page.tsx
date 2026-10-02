import type { Metadata } from "next";
import { getCaseStudies } from "@/lib/sanity-content";
import { CaseStudyCard } from "@/components/work/case-study-card";
import { Reveal } from "@/components/brand/reveal";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Explore live website projects by PSDigiLabs, with context on the brief, delivery and what is publicly known about results.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const caseStudies = await getCaseStudies();

  return (
    <main className="studio-page">
      <section className="studio-interior-hero">
        <div className="studio-container studio-interior-hero-grid">
          <div><p className="studio-eyebrow">Selected work</p><h1 className="studio-display">Real projects.<br /><span>Clear context.</span></h1></div>
          <p>Three live websites across fashion, photography and product engineering. We share the work and its limits honestly; client performance data has not been supplied for publication.</p>
        </div>
      </section>
      <section className="studio-section">
        <div className="studio-container">
          <div className="studio-work-grid">
            {caseStudies.map((study, index) => <Reveal key={study.slug} delay={index * 70}><CaseStudyCard study={study} eager={index === 0} /></Reveal>)}
          </div>
        </div>
      </section>
      <section className="studio-section studio-section-ink">
        <div className="studio-container studio-quote-band">
          <div><p className="studio-eyebrow studio-eyebrow-light">Have a similar challenge?</p><h2 className="studio-display">Let&apos;s scope what<br />your next release needs.</h2></div>
          <a className="studio-button studio-button-lime" href="/contact">Start a project <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </main>
  );
}
