import { services } from "@/data/services";
import { AutomationBanner } from "./automation-banner";
import { ServiceCard } from "./service-card";

export function ServicesSection() {
  const testing = services.find((service) => service.title === "Software Testing")!;
  return <section id="services" className="content-section section-anchor"><div className="container"><div className="section-heading"><p className="eyebrow">WHAT WE BUILD</p><h2>PRODUCT ENGINEERING,<br />FROM BUILD TO QUALITY.</h2><p>Web, Android, quality engineering and automation capabilities brought together in one practical delivery approach.</p></div><div className="services-grid">{services.map((service,index)=><ServiceCard key={service.title} service={service} index={index} />)}</div><div className="quality-block"><div><p className="eyebrow">QUALITY ENGINEERING</p><h3>Quality is part of the build,<br />not a final checkpoint.</h3><p>{testing.description}</p></div><ul>{testing.capabilities.map((item)=><li key={item}><span aria-hidden="true">&#10003;</span>{item}</li>)}</ul></div><AutomationBanner /></div></section>;
}