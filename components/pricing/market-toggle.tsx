"use client";
import type { Market } from "@/data/pricing";

export function MarketToggle({ market, onChange }: { market: Market; onChange: (market: Market) => void }) {
  return <div className="market-toggle" role="group" aria-label="Select pricing market">
    <button type="button" aria-pressed={market === "india"} onClick={() => onChange("india")}>India <span aria-hidden="true">🇮🇳</span></button>
    <button type="button" aria-pressed={market === "international"} onClick={() => onChange("international")}>International <span aria-hidden="true">🌍</span></button>
  </div>;
}
