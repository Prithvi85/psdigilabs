import type { Metadata } from "next";
import Link from "next/link";
import { getResources } from "@/lib/sanity-content";
import { Reveal } from "@/components/brand/reveal";

export const metadata: Metadata = {
  title: "Resources",
  description: "Practical notes on web platforms, software testing, Android app planning and dependable product delivery.",
  alternates: { canonical: "/resources" },
};

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <main className="studio-page">
      <section className="studio-interior-hero">
        <div className="studio-container studio-interior-hero-grid"><div><p className="studio-eyebrow">Resources</p><h1 className="studio-display">Useful answers.<br /><span>No theatre.</span></h1></div><p>Short, practical guides for making better decisions about building, testing and maintaining digital products.</p></div>
      </section>
      <section className="studio-section">
        <div className="studio-container studio-resource-grid">
          {resources.map((resource, index) => <Reveal key={resource.slug} delay={index * 60}><article className="studio-resource-card"><div className="studio-resource-meta"><span>{resource.category}</span><span>{resource.readTime}</span></div><h2 className="studio-display"><Link href={`/resources/${resource.slug}`}>{resource.title}</Link></h2><p>{resource.summary}</p><Link className="studio-card-link" href={`/resources/${resource.slug}`}>Read article <span aria-hidden="true">↗</span></Link></article></Reveal>)}
        </div>
      </section>
      <section className="studio-section studio-section-paper"><div className="studio-container studio-resource-note"><p className="studio-eyebrow">Have a question?</p><h2 className="studio-display">Start with your specific context.</h2><Link className="studio-inline-link" href="/contact">Talk through a project <span aria-hidden="true">↗</span></Link></div></section>
    </main>
  );
}
