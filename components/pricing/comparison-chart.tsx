"use client";

import React, { useRef } from "react";
import { pdfComparisonCategories } from "@/data/pricing";

export function ComparisonChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <section className="py-16 bg-white comparison-print-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-8 border-b border-slate-200 gap-4 no-print">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Agency vs. Freelance Benchmark
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Market Standards Comparison Matrix
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Evaluated against traditional agency overheads, freelance models, and PSDigiLabs agile delivery.
            </p>
          </div>

          <button
            onClick={handlePrintPDF}
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print / Save as PDF
          </button>
        </div>

        {/* Comparison Table / PDF Container */}
        <div
          ref={chartRef}
          className="mt-8 rounded-2xl border border-slate-200 overflow-hidden shadow-sm print:border-none print:shadow-none print:m-0"
        >
          {/* Header block for PDF print mode */}
          <div className="hidden print:block p-6 border-b border-slate-200">
            <h1 className="text-2xl font-black text-slate-900">PSDigiLabs</h1>
            <p className="text-xs text-slate-500">
              Industry Capability & Deliverables Comparison Report
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-[11px] uppercase tracking-wider">
                  <th className="py-4 px-6 font-semibold w-1/4">Deliverable Standard</th>
                  <th className="py-4 px-6 font-semibold text-slate-400 w-1/4">
                    Traditional Agencies
                  </th>
                  <th className="py-4 px-6 font-semibold text-slate-400 w-1/4">
                    Freelancer Marketplaces
                  </th>
                  <th className="py-4 px-6 font-bold text-blue-400 w-1/4 bg-slate-950">
                    PSDigiLabs Standard
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {pdfComparisonCategories.map((cat) => (
                  <React.Fragment key={cat.category}>
                    <tr className="bg-slate-50/80">
                      <td
                        colSpan={4}
                        className="py-2.5 px-6 font-bold text-slate-800 uppercase tracking-wider text-[10px]"
                      >
                        {cat.category}
                      </td>
                    </tr>
                    {cat.items.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition">
                        <td className="py-3.5 px-6 font-semibold text-slate-900">
                          {row.deliverable}
                        </td>
                        <td className="py-3.5 px-6 text-slate-500">
                          {row.traditionalAgency}
                        </td>
                        <td className="py-3.5 px-6 text-slate-500">
                          {row.freelancer}
                        </td>
                        <td className="py-3.5 px-6 font-semibold text-blue-900 bg-blue-50/30">
                          {row.psdigilabs}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 print:text-[10px]">
            * Pricing is generated on-demand based on explicit client scope parameters and feature requirements to ensure market-competitive rates.
          </div>
        </div>
      </div>
    </section>
  );
}