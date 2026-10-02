import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { resources } from "@/data/resources";
import { getResourceBySlug } from "@/lib/sanity-content";

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) return { title: "Resource not found" };
  return {
    title: resource.title,
    description: resource.summary,
    alternates: { canonical: `/resources/${resource.slug}` },
    openGraph: { title: `${resource.title} | PSDigiLabs`, description: resource.summary, type: "article" },
  };
}

export default async function ResourcePage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) notFound();
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: resource.title, description: resource.summary, datePublished: resource.published, author: { "@type": "Organization", name: "PSDigiLabs" }, publisher: { "@type": "Organization", name: "PSDigiLabs" } };

  return (
    <main className="studio-page">
      <article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        <header className="studio-article-header"><div className="studio-container studio-article-container"><Link className="studio-backlink" href="/resources">Resources</Link><p className="studio-eyebrow">{resource.category} <span aria-hidden="true">/</span> {resource.readTime}</p><h1 className="studio-display">{resource.title}</h1><p>{resource.summary}</p></div></header>
        <div className="studio-container studio-article-layout"><aside><p className="studio-eyebrow">In this article</p><ol>{resource.sections.map((section, index) => <li key={section.heading}><a href={`#section-${index + 1}`}>{section.heading}</a></li>)}</ol></aside><div className="studio-article-body">{resource.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.heading}><h2 className="studio-display">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<p className="studio-article-disclaimer">This guide is general information. Project fit depends on your product, team and constraints.</p></div></div>
        <section className="studio-section studio-section-ink"><div className="studio-container studio-quote-band"><div><p className="studio-eyebrow studio-eyebrow-light">Apply this to your project</p><h2 className="studio-display">Get a second pair<br />of engineering eyes.</h2></div><Link className="studio-button studio-button-lime" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link></div></section>
      </article>
    </main>
  );
}
