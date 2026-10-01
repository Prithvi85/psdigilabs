"use client";

import React, { useState } from "react";
import { SERVICE_CONFIGS, calculateCustomEstimate } from "@/lib/pricing-calculator";

export default function PrintablePricingSheet() {
  const [selectedCurrency, setSelectedCurrency] = useState<"INR" | "USD">("INR");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-10 p-6 sm:p-10 bg-white rounded-2xl border border-slate-200 shadow-sm print:m-0 print:p-0 print:border-none print:shadow-none">
      {/* Action Header (Hidden during PDF print) */}
      <div className="no-print flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Service & Timeline Pricing Matrix</h2>
          <p className="text-sm text-slate-500">Official rate card calibrated by sprint velocity and delivery timeline.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-lg border border-slate-200 p-1 bg-slate-50">
            <button
              onClick={() => setSelectedCurrency("INR")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                selectedCurrency === "INR" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              INR (₹)
            </button>
            <button
              onClick={() => setSelectedCurrency("USD")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                selectedCurrency === "USD" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              USD ($)
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* PDF Header Block */}
      <div className="flex justify-between items-start mb-8 pb-6 border-b border-slate-200">
        <div>
          <span className="text-2xl font-black tracking-tight text-blue-600">PS<span className="text-slate-900">DIGILABS</span></span>
          <p className="text-xs text-slate-500 mt-1">Digital Product Engineering & Technical Architecture</p>
          <p className="text-xs text-slate-500">psdigilabs.in • contact@psdigilabs.in</p>
        </div>
        <div className="text-right">
          <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 rounded-md">
            Rate Card & Timeline Index
          </span>
          <p className="text-xs text-slate-400 mt-1">Effective: Q4 2026 / 2027</p>
        </div>
      </div>

      {/* Service & Sprint Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">Service Scope</th>
              <th className="py-3 px-4">Standard Sprint</th>
              <th className="py-3 px-4">Expedited Window</th>
              <th className="py-3 px-4 text-right">Standard Rate</th>
              <th className="py-3 px-4 text-right">Expedited Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {Object.entries(SERVICE_CONFIGS).map(([key, config]) => {
              const standard = calculateCustomEstimate(key, config.baseTimelineDays, selectedCurrency);
              const rush = calculateCustomEstimate(key, config.minTimelineDays, selectedCurrency);

              return (
                <tr key={key} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">{config.name}</td>
                  <td className="py-3.5 px-4 text-slate-600">{config.baseTimelineDays} Business Days</td>
                  <td className="py-3.5 px-4 text-amber-600 font-medium">{config.minTimelineDays} Days (Rush)</td>
                  <td className="py-3.5 px-4 text-right font-semibold text-slate-900">{standard.displayPrice}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-blue-600">{rush.displayPrice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pricing Policy Terms */}
      <div className="mt-8 pt-6 border-t border-slate-200 text-xs text-slate-500 space-y-2">
        <p className="font-semibold text-slate-700">Scope & Timeline Notes:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Final pricing is locked upon review of functional requirements, API integrations, and asset availability.</li>
          <li>Standard sprints include full responsive layouts, technical SEO foundations, CI/CD deployment, and 30 days post-launch warranty.</li>
          <li>Expedited sprints deploy dedicated daily engineering cycles to hit accelerated release windows without cutting testing suites.</li>
        </ul>
      </div>
    </div>
  );
}