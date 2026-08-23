"use client";
import { useState } from "react";
import Link from "next/link";
import { pricingPackages, type Market } from "@/data/pricing";
import { MarketToggle } from "./market-toggle";

export function PricingCards() {
  const [market, setMarket] = useState<Market>("india");
  return <>
    <div className="pricing-toolbar"><MarketToggle market={market} onChange={setMarket} /><p>Prices are separate market starting points, not currency conversions.</p></div>
    <div className="pricing-grid">{pricingPackages.map((item) => <article className={`pricing-card${item.recommended ? " recommended" : ""}`} key={item.id}>
      {item.recommended && <span className="popular-badge">MOST POPULAR</span>}<h2>{item.title}</h2><p>{item.description}</p><small>STARTING FROM</small><strong>{item.price[market]}</strong>
      <ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><Link className="button button-primary" href={`/contact?service=${item.id}`}>GET STARTED</Link>
    </article>)}</div>
  </>;
}
