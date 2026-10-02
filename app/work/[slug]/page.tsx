import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies } from "@/data/case-studies";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/sanity-content";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return { title: "Project not found" };
  return {
    title: `${study.name} | Selected Work`,
    description: study.intro,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { title: `${study.name} | PSDigiLabs`, description: study.intro, images: [study.image] },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  return (
    <main className="studio-page">
      <article>
        <header className="studio-case-header">
          <div className="studio-container">
            <Link className="studio-backlink" href="/work">Selected work</Link>
            <p className="studio-eyebrow">{study.category}</p>
            <h1 className="studio-display">{study.name}</h1>
            <p>{study.intro}</p>
            <a className="studio-button studio-button-lime" href={study.website} target="_blank" rel="noopener noreferrer">Visit live project <span aria-hidden="true">↗</span></a>
          </div>
        </header>
        <div className="studio-container studio-case-image-wrap">
          <Image src={study.image} alt={study.alt} width={1920} height={1080} sizes="(max-width: 1279px) 100vw, 1280px" priority className="studio-case-image" />
        </div>
        <section className="studio-section">
          <div className="studio-container studio-case-grid">
            <div className="studio-case-label"><p className="studio-eyebrow">Project notes</p><h2 className="studio-display">What went into the work.</h2></div>
            <div className="studio-case-copy">
              <section><h3>Challenge</h3><p>{study.challenge}</p></section>
              <section><h3>Delivery</h3><p>{study.delivery}</p></section>
              <section><h3>Outcome</h3><p>{study.result}</p></section>
              <section><h3>Technology</h3><p>{study.technology}</p></section>
            </div>
          </div>
        </section>
        <section className="studio-section studio-section-ink">
          <div className="studio-container studio-quote-band"><div><p className="studio-eyebrow studio-eyebrow-light">Your project</p><h2 className="studio-display">Need something<br />built with the same care?</h2></div><Link className="studio-button studio-button-lime" href="/contact">Tell us about it <span aria-hidden="true">↗</span></Link></div>
        </section>
      </article>
    </main>
  );
}
