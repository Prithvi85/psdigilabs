import Link from "next/link";
import { services } from "@/data/services";
import { AutomationBanner } from "./automation-banner";
import { ServiceCard } from "./service-card";
import { Reveal } from "@/components/brand/reveal";

export function ServicesSection() {
  return (
    <section className="studio-section" aria-labelledby="services-heading">
      <div className="studio-container">
        <Reveal className="studio-section-intro">
          <p className="studio-eyebrow">What we do</p>
          <h2 id="services-heading" className="studio-display">Good products need more than good code.</h2>
          <p>Build the right thing, make it dependable, and keep the busywork out of the way.</p>
        </Reveal>
        <div className="studio-service-grid">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 70}>
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}