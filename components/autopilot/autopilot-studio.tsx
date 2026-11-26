"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buildOutreachForTarget, type ServiceFocusKey } from "@/lib/autopilot/generator";
import type { AutopilotReport, OutreachLogEntry, ProspectLead } from "@/lib/autopilot/types";

type ActiveTab = "radar" | "outreach" | "overview" | "pipeline";

const PIPELINE_STEPS = [
  "Syncing live PSDigiLabs positioning & conversion signals",
  "Discovering real local businesses via Photon + OpenStreetMap",
  "Crawling prospect websites for emails, MX & funnel gaps",
  "Preparing personalized PSDigiLabs outreach & workflow blueprint",
];

const CITY_OPTIONS = [
  "Kolkata",
  "Bengaluru",
  "Mumbai",
  "Delhi NCR",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Ahmedabad",
  "Jaipur",
  "London",
  "New York",
  "Dubai",
  "Singapore",
] as const;

const NICHE_OPTIONS = [
  "Clinics & Healthcare",
  "Dental Clinics",
  "Boutiques & Fashion Retail",
  "Restaurants & Cafes",
  "Hotels & Hospitality",
  "Real Estate & Architects",
  "Coaching & Training Institutes",
  "IT, Agencies & Consulting",
  "Jewelry & Electronics Shops",
] as const;

const SERVICE_FOCUS_OPTIONS: { value: ServiceFocusKey; label: string }[] = [
  { value: "all", label: "All PSDigiLabs Services" },
  { value: "website-development", label: "Website Development" },
  { value: "workflow-automation", label: "Workflow Automation" },
  { value: "android-app-development", label: "Android App Development" },
  { value: "quality-engineering", label: "Software Testing & QA" },
];

const PRESETS: { label: string; city: string; niche: string; serviceFocus: ServiceFocusKey }[] = [
  { label: "Kolkata Clinics", city: "Kolkata", niche: "Clinics & Healthcare", serviceFocus: "website-development" },
  { label: "Kolkata Boutiques", city: "Kolkata", niche: "Boutiques & Fashion Retail", serviceFocus: "workflow-automation" },
  { label: "Bengaluru Cafes", city: "Bengaluru", niche: "Restaurants & Cafes", serviceFocus: "all" },
];

function triggerDownload(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function escapeCsv(value: string | null | undefined): string {
  const str = (value ?? "").replace(/"/g, '""');
  return `"${str}"`;
}

export function AutopilotStudio({
  emailSendingConfigured = false,
  initialLogs = [],
}: {
  emailSendingConfigured?: boolean;
  initialLogs?: OutreachLogEntry[];
}) {
  const router = useRouter();
  const [targetCity, setTargetCity] = useState("Kolkata");
  const [customCityMode, setCustomCityMode] = useState(false);
  const [targetNiche, setTargetNiche] = useState("Clinics & Healthcare");
  const [customNicheMode, setCustomNicheMode] = useState(false);
  const [serviceFocus, setServiceFocus] = useState<ServiceFocusKey>("all");
  const [loading, setLoading] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [error, setError] = useState("");
  const [report, setReport] = useState<AutopilotReport | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("radar");
  const [selectedProspect, setSelectedProspect] = useState<ProspectLead | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Autonomous email dispatch state
  const [outreachLogs, setOutreachLogs] = useState<OutreachLogEntry[]>(initialLogs);
  const [sending, setSending] = useState(false);
  const [sendBanner, setSendBanner] = useState("");
  const [draftOverrides, setDraftOverrides] = useState<{
    key: string;
    toEmail?: string;
    subject?: string;
    body?: string;
  }>({ key: "default" });

  useEffect(() => {
    if (!loading) return;
    const interval = window.setInterval(() => {
      setProgressStep((prev) => (prev < PIPELINE_STEPS.length - 1 ? prev + 1 : prev));
    }, 950);
    return () => window.clearInterval(interval);
  }, [loading]);

  const activeOutreach = useMemo(() => {
    if (!report) return null;
    if (!selectedProspect) return report.outreach;
    return buildOutreachForTarget(
      report.website,
      report.icp,
      report.targetCity,
      report.targetNiche,
      selectedProspect
    );
  }, [report, selectedProspect]);

  const draftTargetKey = `${report?.generatedAt || "none"}:${selectedProspect?.id || "general"}`;
  const firstEmailDraft = activeOutreach?.emailSequence[0];
  const composerToEmail =
    draftOverrides.key === draftTargetKey && draftOverrides.toEmail !== undefined
      ? draftOverrides.toEmail
      : selectedProspect?.email || "";
  const composerSubject =
    draftOverrides.key === draftTargetKey && draftOverrides.subject !== undefined
      ? draftOverrides.subject
      : firstEmailDraft?.subject || "";
  const composerBody =
    draftOverrides.key === draftTargetKey && draftOverrides.body !== undefined
      ? draftOverrides.body
      : firstEmailDraft?.body || "";

  const emailReadyProspects = useMemo(() => {
    if (!report) return [];
    const sentSet = new Set(
      outreachLogs.filter((l) => l.status === "sent").map((l) => l.recipientEmail.toLowerCase())
    );
    return report.radar.prospects.filter(
      (p) => p.email && !sentSet.has(p.email.toLowerCase())
    );
  }, [report, outreachLogs]);

  async function runAutopilot(override?: {
    city: string;
    niche: string;
    serviceFocus: ServiceFocusKey;
  }) {
    const runCity = (override?.city ?? targetCity).trim() || "Kolkata";
    const runNiche = (override?.niche ?? targetNiche).trim() || "Clinics & Healthcare";
    const runFocus = override?.serviceFocus ?? serviceFocus;

    if (override) {
      setCustomCityMode(!CITY_OPTIONS.includes(override.city as (typeof CITY_OPTIONS)[number]));
      setTargetCity(override.city);
      setCustomNicheMode(!NICHE_OPTIONS.includes(override.niche as (typeof NICHE_OPTIONS)[number]));
      setTargetNiche(override.niche);
      setServiceFocus(override.serviceFocus);
    }

    setProgressStep(0);
    setLoading(true);
    setError("");
    setSendBanner("");
    setSelectedProspect(null);

    try {
      const response = await fetch("/api/autopilot", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          url: "https://www.psdigilabs.in",
          targetCity: runCity,
          targetNiche: runNiche,
          serviceFocus: runFocus,
        }),
      });
      if (response.status === 401) {
        router.refresh();
        return;
      }
      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        report?: AutopilotReport;
      };
      if (!response.ok || !data.ok || !data.report) {
        throw new Error(data.error || "Autopilot could not finish this lead scan.");
      }
      setReport(data.report);
      setActiveTab("radar");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not run PSDigiLabs Lead Autopilot.");
    } finally {
      setLoading(false);
    }
  }

  async function dispatchEmails(
    items: Array<{
      prospectName: string;
      recipientEmail: string;
      city: string;
      niche: string;
      subject: string;
      body: string;
    }>
  ) {
    setSending(true);
    setSendBanner("");
    setError("");

    try {
      const response = await fetch("/api/autopilot/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ items }),
      });
      if (response.status === 401) {
        router.refresh();
        return;
      }
      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        results?: Array<{ recipientEmail: string; status: string; reason?: string }>;
        logs?: OutreachLogEntry[];
      };
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Could not send outreach email.");
      }
      if (data.logs) setOutreachLogs(data.logs);
      const sentCount = data.results?.filter((r) => r.status === "sent").length || 0;
      const skippedCount = data.results?.filter((r) => r.status === "skipped").length || 0;
      const failed = data.results?.filter((r) => r.status === "failed") || [];
      const summary = [
        sentCount > 0 ? `Sent ${sentCount} email(s)` : null,
        skippedCount > 0 ? `Skipped ${skippedCount} (already contacted or invalid)` : null,
        failed.length > 0 ? `Failed ${failed.length} (${failed[0]?.reason || "error"})` : null,
      ]
        .filter(Boolean)
        .join(" • ");
      setSendBanner(summary || "Outreach dispatch finished.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to dispatch outreach email.");
    } finally {
      setSending(false);
    }
  }

  function handleAutoSendProspect(prospect: ProspectLead) {
    if (!report || !prospect.email) return;
    const personalized = buildOutreachForTarget(
      report.website,
      report.icp,
      report.targetCity,
      report.targetNiche,
      prospect
    );
    const first = personalized.emailSequence[0];
    void dispatchEmails([
      {
        prospectName: prospect.name,
        recipientEmail: prospect.email,
        city: prospect.city,
        niche: report.targetNiche,
        subject: first.subject || `Quick idea for ${prospect.name}`,
        body: first.body,
      },
    ]);
  }

  function handleBatchAutoSend() {
    if (!report || emailReadyProspects.length === 0) return;
    const batch = emailReadyProspects.slice(0, 5).map((prospect) => {
      const personalized = buildOutreachForTarget(
        report.website,
        report.icp,
        report.targetCity,
        report.targetNiche,
        prospect
      );
      const first = personalized.emailSequence[0];
      return {
        prospectName: prospect.name,
        recipientEmail: prospect.email!,
        city: prospect.city,
        niche: report.targetNiche,
        subject: first.subject || `Quick idea for ${prospect.name}`,
        body: first.body,
      };
    });
    void dispatchEmails(batch);
  }

  async function lockConsole() {
    await fetch("/api/autopilot/auth", { method: "DELETE" });
    setReport(null);
    router.refresh();
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    void runAutopilot();
  }

  async function copyText(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId((curr) => (curr === id ? null : curr)), 1800);
    } catch {
      // Ignore clipboard denial
    }
  }

  function exportProspectsCsv() {
    if (!report || report.radar.prospects.length === 0) return;
    const header = [
      "Name",
      "Category",
      "City",
      "Address",
      "Website",
      "Website Status",
      "MX Email Ready",
      "Phone",
      "Email",
      "Opportunity Level",
      "Opportunity Reason",
    ];
    const rows = report.radar.prospects.map((p) =>
      [
        escapeCsv(p.name),
        escapeCsv(p.category),
        escapeCsv(p.city),
        escapeCsv(p.address),
        escapeCsv(p.website),
        escapeCsv(p.websiteStatus),
        escapeCsv(p.hasMxRecord === null ? "Unknown" : p.hasMxRecord ? "Yes" : "No"),
        escapeCsv(p.phone),
        escapeCsv(p.email),
        escapeCsv(p.opportunityLevel.toUpperCase()),
        escapeCsv(p.opportunityReason),
      ].join(",")
    );
    triggerDownload(
      `psdigilabs-prospects-${report.targetCity.toLowerCase().replace(/\s+/g, "-")}.csv`,
      [header.join(","), ...rows].join("\n"),
      "text/csv;charset=utf-8"
    );
  }

  function exportPlaybookMarkdown() {
    if (!report || !activeOutreach) return;
    const targetLabel = selectedProspect
      ? selectedProspect.name
      : `${report.targetNiche} in ${report.targetCity}`;
    const md = [
      `# PSDigiLabs Lead Playbook — ${targetLabel}`,
      ``,
      `- **Brand:** PSDigiLabs (${report.website.resolvedUrl})`,
      `- **Service Pitch:** ${report.serviceFocus}`,
      `- **Target Market:** ${targetLabel}`,
      ``,
      `## Ideal Customer Profile (ICP)`,
      `- **Primary Persona:** ${report.icp.primaryPersona}`,
      `- **Decision Makers:** ${report.icp.decisionMakerRoles.join(", ")}`,
      `- **Value Angle:** ${report.icp.valueAngle}`,
      ``,
      `## Email Sequence`,
      ...activeOutreach.emailSequence.flatMap((step) => [
        `### ${step.dayLabel}`,
        `**Subject:** ${step.subject}`,
        ``,
        step.body,
        ``,
      ]),
      `## WhatsApp Opener`,
      activeOutreach.whatsappPitch.body,
      ``,
      `## LinkedIn DM`,
      activeOutreach.linkedinDm.body,
    ].join("\n");

    triggerDownload(`psdigilabs-lead-playbook.md`, md, "text/markdown;charset=utf-8");
  }

  function exportWorkflowJson() {
    if (!report) return;
    triggerDownload(
      `psdigilabs-lead-workflow.json`,
      JSON.stringify(report.automation.blueprintJson, null, 2),
      "application/json"
    );
  }

  const contactBuildHref = report
    ? `/contact?service=${encodeURIComponent(
        serviceFocus === "all" ? "workflow-automation" : serviceFocus
      )}&project_type=automation-system&company_name=PSDigiLabs&timeline=${encodeURIComponent(
        "2–4 weeks"
      )}`
    : "/contact";

  return (
    <div className="studio-autopilot-wrap">
      <div className="studio-autopilot-console">
        <div className="studio-autopilot-console-head">
          <div>
            <span className="studio-autopilot-badge">
              LOCKED TO PSDIGILABS ONLY • WWW.PSDIGILABS.IN
            </span>
            <h2>PSDigiLabs Autonomous Lead &amp; Outreach Agent</h2>
          </div>
          <div className="studio-autopilot-presets" aria-label="Quick lead scan presets">
            <span>Quick scan:</span>
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                className="studio-autopilot-preset-btn"
                disabled={loading}
                onClick={() => void runAutopilot(preset)}
              >
                {preset.label}
              </button>
            ))}
            <button
              type="button"
              className="studio-autopilot-preset-btn studio-autopilot-lock-btn"
              onClick={() => void lockConsole()}
            >
              Lock Console
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="studio-autopilot-form">
          <label>
            <span>Target City / Market</span>
            {customCityMode ? (
              <div className="studio-autopilot-custom-field">
                <input
                  type="text"
                  value={targetCity}
                  onChange={(e) => setTargetCity(e.target.value)}
                  placeholder="Enter any city..."
                />
                <button
                  type="button"
                  className="studio-autopilot-field-reset"
                  onClick={() => {
                    setCustomCityMode(false);
                    setTargetCity("Kolkata");
                  }}
                >
                  List
                </button>
              </div>
            ) : (
              <select
                value={targetCity}
                onChange={(e) => {
                  if (e.target.value === "__custom__") {
                    setCustomCityMode(true);
                    setTargetCity("");
                  } else {
                    setTargetCity(e.target.value);
                  }
                }}
              >
                {CITY_OPTIONS.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
                <option value="__custom__">Other / Custom city...</option>
              </select>
            )}
          </label>

          <label>
            <span>Target Customer Niche</span>
            {customNicheMode ? (
              <div className="studio-autopilot-custom-field">
                <input
                  type="text"
                  value={targetNiche}
                  onChange={(e) => setTargetNiche(e.target.value)}
                  placeholder="Enter custom niche..."
                />
                <button
                  type="button"
                  className="studio-autopilot-field-reset"
                  onClick={() => {
                    setCustomNicheMode(false);
                    setTargetNiche("Clinics & Healthcare");
                  }}
                >
                  List
                </button>
              </div>
            ) : (
              <select
                value={targetNiche}
                onChange={(e) => {
                  if (e.target.value === "__custom__") {
                    setCustomNicheMode(true);
                    setTargetNiche("");
                  } else {
                    setTargetNiche(e.target.value);
                  }
                }}
              >
                {NICHE_OPTIONS.map((niche) => (
                  <option key={niche} value={niche}>
                    {niche}
                  </option>
                ))}
                <option value="__custom__">Other / Custom niche...</option>
              </select>
            )}
          </label>

          <label>
            <span>PSDigiLabs Service Pitch</span>
            <select
              value={serviceFocus}
              onChange={(e) => setServiceFocus(e.target.value as ServiceFocusKey)}
            >
              {SERVICE_FOCUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" disabled={loading} className="studio-button studio-button-lime">
            {loading ? "Finding Leads..." : "Find PSDigiLabs Leads ↗"}
          </button>
        </form>

        {loading && (
          <div className="studio-autopilot-progress" role="status" aria-live="polite">
            {PIPELINE_STEPS.map((label, idx) => {
              const state = idx < progressStep ? "done" : idx === progressStep ? "active" : "pending";
              return (
                <div key={label} className={`studio-autopilot-step is-${state}`}>
                  <span>0{idx + 1}</span>
                  <p>{label}</p>
                </div>
              );
            })}
          </div>
        )}

        {error && (
          <p className="studio-autopilot-error" role="alert">
            {error}
          </p>
        )}
      </div>

      {!report && !loading && (
        <div className="studio-autopilot-summary-bar">
          <div>
            <small>CONSOLE UNLOCKED • AUTONOMOUS AGENT READY</small>
            <strong>Pick a city, niche &amp; service pitch above</strong>
            <p>
              Click <strong>Find PSDigiLabs Leads ↗</strong> to automatically discover live businesses, extract emails &amp; conversion gaps, and dispatch personalized outreach.
            </p>
          </div>
          <button
            type="button"
            className="studio-button studio-button-dark"
            onClick={() => void runAutopilot(PRESETS[0])}
          >
            Run Kolkata Clinics Scan ↗
          </button>
        </div>
      )}

      {report && (
        <div className="studio-autopilot-workspace">
          <div className="studio-autopilot-summary-bar">
            <div>
              <small>PSDIGILABS LEAD GENERATION TARGET</small>
              <strong>
                {report.brandName} <span>(www.psdigilabs.in)</span>
              </strong>
              <p>
                Pitching: {report.serviceFocus} • Market: {report.targetNiche} in {report.targetCity}
              </p>
            </div>
            <div className="studio-autopilot-kpis">
              <div>
                <span>LIVE PROSPECTS</span>
                <strong>{report.radar.prospects.length}</strong>
              </div>
              <div>
                <span>EMAILS FOUND</span>
                <strong>{report.radar.prospects.filter((p) => p.email).length}</strong>
              </div>
              <div>
                <span>SENT LOGGED</span>
                <strong>{outreachLogs.filter((l) => l.status === "sent").length}</strong>
              </div>
            </div>
          </div>

          {sendBanner && (
            <div className="studio-autopilot-notice" role="status">
              <strong>Auto-Send status:</strong> {sendBanner}
            </div>
          )}

          <div className="studio-autopilot-tabs" role="tablist" aria-label="Autopilot workspace sections">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "radar"}
              className={activeTab === "radar" ? "is-active" : ""}
              onClick={() => setActiveTab("radar")}
            >
              01 / Live Prospect Radar ({report.radar.prospects.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "outreach"}
              className={activeTab === "outreach" ? "is-active" : ""}
              onClick={() => setActiveTab("outreach")}
            >
              02 / Autonomous Outreach ({outreachLogs.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "overview"}
              className={activeTab === "overview" ? "is-active" : ""}
              onClick={() => setActiveTab("overview")}
            >
              03 / Positioning &amp; ICP Matrix
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "pipeline"}
              className={activeTab === "pipeline" ? "is-active" : ""}
              onClick={() => setActiveTab("pipeline")}
            >
              04 / Lead Automation Blueprint
            </button>
          </div>

          {activeTab === "radar" && (
            <div className="studio-autopilot-card">
              <div className="studio-autopilot-card-top">
                <div>
                  <p className="studio-eyebrow">Photon + OpenStreetMap 0.6 + Live Website &amp; Email Scraper</p>
                  <h3>
                    PSDigiLabs Prospects: {report.targetNiche} in {report.targetCity}
                  </h3>
                  <p className="studio-autopilot-muted">{report.radar.note}</p>
                </div>
                <div className="studio-autopilot-message-actions">
                  {emailSendingConfigured && emailReadyProspects.length > 0 && (
                    <button
                      type="button"
                      className="studio-button studio-button-lime"
                      disabled={sending}
                      onClick={handleBatchAutoSend}
                    >
                      {sending
                        ? "Sending..."
                        : `Auto-Send to ${Math.min(5, emailReadyProspects.length)} Ready Leads ↗`}
                    </button>
                  )}
                  {report.radar.prospects.length > 0 && (
                    <button
                      type="button"
                      className="studio-button studio-button-dark"
                      onClick={exportProspectsCsv}
                    >
                      Export CSV ↗
                    </button>
                  )}
                </div>
              </div>

              {!emailSendingConfigured && (
                <div className="studio-autopilot-notice" style={{ marginBottom: "1rem" }}>
                  <strong>Optional 1-Click Auto-Send:</strong> Add <code>RESEND_API_KEY</code> and{" "}
                  <code>LEAD_NOTIFICATION_FROM</code> in Vercel Environment Variables to dispatch cold emails directly from PSDigiLabs.
                </div>
              )}

              {report.radar.prospects.length > 0 ? (
                <div className="studio-autopilot-table-wrap">
                  <table className="studio-autopilot-table">
                    <thead>
                      <tr>
                        <th>Business &amp; Contact</th>
                        <th>Digital Signal</th>
                        <th>Automated Diagnosis</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.radar.prospects.map((prospect) => (
                        <tr key={prospect.id}>
                          <td>
                            <strong>{prospect.name}</strong>
                            <small>
                              {prospect.category} • {prospect.address}
                            </small>
                            {prospect.website && (
                              <a href={prospect.website} target="_blank" rel="noopener noreferrer">
                                {prospect.website} ↗
                              </a>
                            )}
                            {prospect.email && (
                              <small style={{ color: "var(--studio-lime-dark)", fontWeight: 700 }}>
                                Email: {prospect.email}
                              </small>
                            )}
                            {prospect.phone && <small>Tel: {prospect.phone}</small>}
                          </td>
                          <td>
                            <span className={`studio-opp-badge is-${prospect.opportunityLevel}`}>
                              {prospect.opportunityLevel.toUpperCase()} OPPORTUNITY
                            </span>
                            <small>Site: {prospect.websiteStatus}</small>
                            {prospect.hasMxRecord !== null && (
                              <small>
                                Domain MX: {prospect.hasMxRecord ? "Configured" : "Not detected"}
                              </small>
                            )}
                          </td>
                          <td>
                            {prospect.opportunityReason}
                            <div className="studio-chip-list" style={{ marginTop: "0.45rem" }}>
                              {prospect.detectedGaps.slice(0, 3).map((g) => (
                                <span key={g}>{g}</span>
                              ))}
                            </div>
                          </td>
                          <td>
                            <div className="studio-autopilot-row-actions">
                              <button
                                type="button"
                                className="studio-autopilot-mini-btn"
                                onClick={() => {
                                  setSelectedProspect(prospect);
                                  setActiveTab("outreach");
                                }}
                              >
                                Review &amp; Pitch →
                              </button>
                              {emailSendingConfigured && prospect.email && (
                                <button
                                  type="button"
                                  className="studio-autopilot-mini-btn is-lime"
                                  disabled={sending}
                                  onClick={() => handleAutoSendProspect(prospect)}
                                >
                                  Auto-Send ↗
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="studio-autopilot-queries">
                  <p className="studio-eyebrow">Backup Search Queries</p>
                  <div className="studio-autopilot-query-grid">
                    {report.radar.booleanQueries.map((item) => (
                      <div key={item.label} className="studio-autopilot-query-box">
                        <div className="studio-autopilot-query-head">
                          <strong>{item.label}</strong>
                          <button
                            type="button"
                            onClick={() => void copyText(`q-${item.label}`, item.query)}
                          >
                            {copiedId === `q-${item.label}` ? "Copied ✓" : "Copy"}
                          </button>
                        </div>
                        <code>{item.query}</code>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "outreach" && activeOutreach && (
            <div className="studio-autopilot-stack">
              <div className="studio-autopilot-card">
                <div className="studio-autopilot-card-top">
                  <div>
                    <p className="studio-eyebrow">Autonomous Outreach Composer</p>
                    <h3>
                      {selectedProspect
                        ? `Pitching ${selectedProspect.name}`
                        : `Sequence for ${report.targetNiche} (${report.targetCity})`}
                    </h3>
                    {selectedProspect && (
                      <div className="studio-autopilot-target-pill">
                        <span>Target: {selectedProspect.name}</span>
                        <button type="button" onClick={() => setSelectedProspect(null)}>
                          Reset to general template
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="studio-button studio-button-dark"
                    onClick={exportPlaybookMarkdown}
                  >
                    Download Lead Playbook (.md) ↗
                  </button>
                </div>

                <div className="studio-autopilot-composer">
                  <div className="studio-autopilot-composer-row">
                    <label>
                      <span>Recipient Email</span>
                      <input
                        type="email"
                        value={composerToEmail}
                        onChange={(e) =>
                          setDraftOverrides((prev) => ({
                            ...(prev.key === draftTargetKey ? prev : { key: draftTargetKey }),
                            key: draftTargetKey,
                            toEmail: e.target.value,
                          }))
                        }
                        placeholder="founder@business.com"
                      />
                    </label>
                    <label>
                      <span>Email Subject</span>
                      <input
                        type="text"
                        value={composerSubject}
                        onChange={(e) =>
                          setDraftOverrides((prev) => ({
                            ...(prev.key === draftTargetKey ? prev : { key: draftTargetKey }),
                            key: draftTargetKey,
                            subject: e.target.value,
                          }))
                        }
                      />
                    </label>
                  </div>
                  <label>
                    <span>Personalized Pitch Body</span>
                    <textarea
                      rows={6}
                      value={composerBody}
                      onChange={(e) =>
                        setDraftOverrides((prev) => ({
                          ...(prev.key === draftTargetKey ? prev : { key: draftTargetKey }),
                          key: draftTargetKey,
                          body: e.target.value,
                        }))
                      }
                    />
                  </label>
                  <div className="studio-autopilot-message-actions">
                    <button
                      type="button"
                      className="studio-button studio-button-lime"
                      disabled={sending || !emailSendingConfigured || !composerToEmail.trim()}
                      onClick={() =>
                        void dispatchEmails([
                          {
                            prospectName: selectedProspect?.name || "Prospect",
                            recipientEmail: composerToEmail,
                            city: selectedProspect?.city || report.targetCity,
                            niche: report.targetNiche,
                            subject: composerSubject,
                            body: composerBody,
                          },
                        ])
                      }
                    >
                      {sending
                        ? "Sending..."
                        : emailSendingConfigured
                          ? "Send Email via PSDigiLabs ↗"
                          : "Auto-Send Needs RESEND_API_KEY"}
                    </button>
                    <a
                      className="studio-button studio-button-dark"
                      href={`mailto:${encodeURIComponent(composerToEmail)}?subject=${encodeURIComponent(
                        composerSubject
                      )}&body=${encodeURIComponent(composerBody)}`}
                    >
                      Open in Mail App ↗
                    </a>
                  </div>
                </div>

                <div className="studio-autopilot-sequence-grid" style={{ marginTop: "1.25rem" }}>
                  {activeOutreach.emailSequence.map((step) => (
                    <article key={step.step} className="studio-autopilot-message-card">
                      <div className="studio-autopilot-message-head">
                        <span>{step.dayLabel}</span>
                        <div className="studio-autopilot-message-actions">
                          <button
                            type="button"
                            onClick={() =>
                              void copyText(
                                `email-${step.step}`,
                                `Subject: ${step.subject}\n\n${step.body}`
                              )
                            }
                          >
                            {copiedId === `email-${step.step}` ? "Copied ✓" : "Copy"}
                          </button>
                        </div>
                      </div>
                      <p className="studio-autopilot-subject">
                        <strong>Subject:</strong> {step.subject}
                      </p>
                      <pre>{step.body}</pre>
                    </article>
                  ))}
                </div>

                <div className="studio-autopilot-panel-grid" style={{ marginTop: "1.25rem" }}>
                  <article className="studio-autopilot-message-card">
                    <div className="studio-autopilot-message-head">
                      <span>{activeOutreach.whatsappPitch.dayLabel}</span>
                      <div className="studio-autopilot-message-actions">
                        <button
                          type="button"
                          onClick={() => void copyText("wa-pitch", activeOutreach.whatsappPitch.body)}
                        >
                          {copiedId === "wa-pitch" ? "Copied ✓" : "Copy"}
                        </button>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(
                            activeOutreach.whatsappPitch.body
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open WhatsApp ↗
                        </a>
                      </div>
                    </div>
                    <pre>{activeOutreach.whatsappPitch.body}</pre>
                  </article>

                  <article className="studio-autopilot-message-card">
                    <div className="studio-autopilot-message-head">
                      <span>{activeOutreach.linkedinDm.dayLabel}</span>
                      <div className="studio-autopilot-message-actions">
                        <button
                          type="button"
                          onClick={() => void copyText("li-pitch", activeOutreach.linkedinDm.body)}
                        >
                          {copiedId === "li-pitch" ? "Copied ✓" : "Copy"}
                        </button>
                      </div>
                    </div>
                    <pre>{activeOutreach.linkedinDm.body}</pre>
                  </article>
                </div>
              </div>

              {outreachLogs.length > 0 && (
                <div className="studio-autopilot-card">
                  <p className="studio-eyebrow">Neon PostgreSQL Outreach Ledger</p>
                  <h3>Recently Contacted Prospects</h3>
                  <div className="studio-autopilot-table-wrap">
                    <table className="studio-autopilot-table">
                      <thead>
                        <tr>
                          <th>Prospect</th>
                          <th>Email</th>
                          <th>Market</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {outreachLogs.map((log) => (
                          <tr key={log.id}>
                            <td>
                              <strong>{log.prospectName}</strong>
                              <small>{log.subject}</small>
                            </td>
                            <td>{log.recipientEmail}</td>
                            <td>
                              {log.niche} • {log.city}
                            </td>
                            <td>
                              <span
                                className={`studio-opp-badge ${
                                  log.status === "sent" ? "is-high" : "is-medium"
                                }`}
                              >
                                {log.status.toUpperCase()}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "overview" && (
            <div className="studio-autopilot-panel-grid">
              <div className="studio-autopilot-card">
                <p className="studio-eyebrow">PSDigiLabs Positioning &amp; Signals</p>
                <h3>{report.website.headline}</h3>
                <p className="studio-autopilot-muted">{report.website.description}</p>
                <div className="studio-chip-list" style={{ marginBottom: "1.25rem" }}>
                  {report.website.techSignals.map((sig) => (
                    <span key={sig}>{sig}</span>
                  ))}
                </div>
                <p className="studio-eyebrow">PSDigiLabs Site Funnel Checks</p>
                <ul className="studio-autopilot-gap-list">
                  {report.website.gaps.map((gap) => (
                    <li key={gap.title} className={`is-${gap.severity}`}>
                      <strong>{gap.title}</strong>
                      <span>{gap.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="studio-autopilot-card">
                <p className="studio-eyebrow">Target Buyer ICP for {report.targetNiche}</p>
                <h3>{report.icp.primaryPersona}</h3>
                <p className="studio-autopilot-muted">{report.icp.valueAngle}</p>
                <div className="studio-autopilot-icp-block">
                  <strong>Decision Makers</strong>
                  <div className="studio-chip-list">
                    {report.icp.decisionMakerRoles.map((role) => (
                      <span key={role}>{role}</span>
                    ))}
                  </div>
                </div>
                <div className="studio-autopilot-icp-block">
                  <strong>High-Intent Buying Triggers</strong>
                  <ul>
                    {report.icp.buyingTriggers.map((trigger) => (
                      <li key={trigger}>{trigger}</li>
                    ))}
                  </ul>
                </div>
                <div className="studio-autopilot-icp-block">
                  <strong>Core Pain Points Your Outreach Hits</strong>
                  <ul>
                    {report.icp.painPoints.map((pain) => (
                      <li key={pain}>{pain}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "pipeline" && (
            <div className="studio-autopilot-card">
              <div className="studio-autopilot-card-top">
                <div>
                  <p className="studio-eyebrow">PSDigiLabs Lead-to-Delivery Architecture</p>
                  <h3>{report.automation.pipelineName}</h3>
                  <p className="studio-autopilot-muted">{report.automation.summary}</p>
                </div>
                <div className="studio-autopilot-message-actions">
                  <button
                    type="button"
                    className="studio-button studio-button-dark"
                    onClick={exportWorkflowJson}
                  >
                    Download Workflow JSON ↗
                  </button>
                  <Link href={contactBuildHref} className="studio-button studio-button-lime">
                    Open Lead Intake Form ↗
                  </Link>
                </div>
              </div>

              <ol className="studio-autopilot-pipeline">
                {report.automation.nodes.map((node) => (
                  <li key={node.step}>
                    <div className="studio-autopilot-node-top">
                      <span>STEP {node.step}</span>
                      <small>{node.triggerOrAction}</small>
                    </div>
                    <h4>{node.title}</h4>
                    <p>{node.description}</p>
                    <div className="studio-autopilot-node-foot">
                      <strong>{node.tool}</strong>
                      <span>Fixes: {node.solvesGap}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
