"use client";
import { useState } from "react";
import Link from "next/link";
import { getPricingPackage, pricingPreview, type Market } from "@/data/pricing";
import { MarketToggle } from "./market-toggle";

export function PricingPreview() {
  const [market, setMarket] = useState<Market>("india");
  return <section className="content-section pricing-preview" aria-labelledby="pricing-preview-title"><div className="section-heading"><p className="eyebrow">CLEAR STARTING POINTS</p><h2 id="pricing-preview-title">PRICING THAT SCALES WITH YOUR PROJECT</h2><p>Choose a starting point, then request a scope-based quote for your functionality and delivery needs.</p></div>
    <div className="preview-toolbar"><MarketToggle market={market} onChange={setMarket} /></div><div className="preview-grid">{pricingPreview.map((entry) => { const item = getPricingPackage(entry.packageId)!; return <article key={entry.packageId}><h3>{entry.title}</h3><small>STARTING FROM</small><strong>{item.price[market]}</strong></article>; })}</div>
    <div className="section-actions"><Link href="/pricing" className="button button-primary">VIEW PRICING</Link><Link href="/contact" className="button button-secondary">REQUEST A QUOTE</Link></div>
  </section>;
}
