import Link from "next/link";
import { pricingPackages } from "@/data/pricing";

const engagementIds = ["landing-page", "business-website", "custom-web-application", "maintenance"] as const;

export function PricingCards() {
  const engagements = engagementIds.map((id) => pricingPackages.find((item) => item.id === id)).filter((item) => item !== undefined);
  return <div className="studio-pricing-grid">{engagements.map((item, index) => <article className="studio-pricing-card" key={item.id}>
    <div className="studio-pricing-card-top"><span>0{index + 1}</span><span>{item.billingType === "retainer" ? "Ongoing" : "Project"}</span></div>
    <h2 className="studio-display">{item.title}</h2>
    <p>{item.description}</p>
    <div className="studio-price-note"><span>Starting point · India / international</span><strong>{item.price.india} / {item.price.international}{item.billingType === "retainer" ? " per month" : ""}</strong></div>
    <ul>{item.features.slice(0, 4).map((feature) => <li key={feature}>{feature}</li>)}</ul>
    <Link className="studio-button studio-button-dark" href={`/contact?service=${item.id}`}>Discuss this scope <span aria-hidden="true">↗</span></Link>
  </article>)}</div>;
}
