"use client";
import { useState } from "react";
import Link from "next/link";
import { pricingPackages, type Market } from "@/data/pricing";
import { MarketToggle } from "./market-toggle";

export function PricingCards() {
  const [market, setMarket] = useState<Market>("india");
  return <>
    <div className="pricing-toolbar"><MarketToggle market={market} onChange={setMarket} /><p>Prices are separate market starting points, not currency conversions.</p></div>
    <div className="pricing-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{pricingPackages.map((item) => <article className={`pricing-card h-full flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm${item.recommended ? " recommended" : ""}`} key={item.id}>
      <div className="flex flex-col">
        {item.recommended && <span className="popular-badge">MOST POPULAR</span>}<h2>{item.title}</h2><p>{item.description}</p><small>STARTING FROM</small><strong>{item.price[market]}</strong>
        <ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
      </div>
      <div className="mt-auto pt-6"><Link className="button button-primary inline-flex w-full items-center justify-center" href={`/contact?source=pricing&service=${item.id}`}>GET QUOTE</Link></div>
    </article>)}</div>
  </>;
}
