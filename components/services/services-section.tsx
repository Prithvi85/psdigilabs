import Link from "next/link";
import { services } from "@/data/services";
import { AutomationBanner } from "./automation-banner";
import { ServiceCard } from "./service-card";

export function ServicesSection() {
  const testing = services.find((service) => service.title === "Software Testing")!;

  return (
    <section id="services" className="content-section section-anchor">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">WHAT WE BUILD</p>
          <h2>
            FULL-CYCLE DIGITAL SERVICES,<br />FROM BUILD TO QUALITY.
          </h2>
          <p>
            Custom website development, native Android apps, manual and automated software testing, and business process automation engineered for reliable performance.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        <div className="quality-block">
          <div>
            <p className="eyebrow">QUALITY ENGINEERING &amp; TESTING</p>
            <h3>
              Quality is part of the build,<br />not a final checkpoint.
            </h3>
            <p>{testing.description}</p>
            <div className="mt-4">
              <Link
                href="/pricing"
                className="text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 transition-colors"
              >
                View Transparent Pricing &rarr;
              </Link>
            </div>
          </div>

          <ul>
            {testing.capabilities.map((item) => (
              <li key={item}>
                <span aria-hidden="true">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <AutomationBanner />
      </div>
    </section>
  );
}