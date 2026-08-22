import { services } from "@/data/services";
import { AutomationBanner } from "./automation-banner";
import { ServiceCard } from "./service-card";

export function ServicesSection() {
  return (
    <section id="services" className="content-section section-anchor">
      <div className="section-heading"><p className="eyebrow">CAPABILITIES</p><h2>WHAT I DO</h2><p>Development, quality assurance and automation brought together in one practical delivery approach.</p></div><div className="services-grid">{services.map((service) => <ServiceCard key={service.title} service={service} />)}</div><AutomationBanner />
    </section>
  );
}
