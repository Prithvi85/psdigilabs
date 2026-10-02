import type { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/sanity-content";
import { ServiceCard } from "@/components/services/service-card";
import { Reveal } from "@/components/brand/reveal";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore custom web development, Android apps, quality engineering and workflow automation by PSDigiLabs.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="studio-page">
      <section className="studio-interior-hero">
        <div className="studio-container">
          <p className="studio-eyebrow">Services</p>
          <h1 className="studio-display">One accountable partner.<br /><span>Four useful capabilities.</span></h1>
          <p>Bring us a product to build, a release to de-risk or a process that needs to work with less manual effort.</p>
          <Link className="studio-button studio-button-lime" href="/contact">Talk through a project <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
      <section className="studio-section">
        <div className="studio-container">
          <div className="studio-service-grid studio-service-grid-wide">
            {services.map((service, index) => <Reveal key={service.slug} delay={index * 70}><ServiceCard service={service} index={index} /></Reveal>)}
          </div>
        </div>
      </section>
      <section className="studio-section studio-section-ink">
        <div className="studio-container studio-quote-band">
          <div><p className="studio-eyebrow studio-eyebrow-light">Not sure where to start?</p><h2 className="studio-display">Start with the problem.<br />We&apos;ll help scope the work.</h2></div>
          <Link className="studio-button studio-button-lime" href="/contact">Tell us what you need <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}