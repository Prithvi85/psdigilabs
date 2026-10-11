"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { pricingPackages, type Market } from "@/data/pricing";
import { projectTypeOptions, serviceOptions, timelineOptions } from "@/data/leads";

type View = "home" | "website" | "pricing" | "cms" | "automation" | "qa" | "project" | "feedback";
type FeedbackState = "idle" | "submitting" | "success" | "error";

const actions: { label: string; view?: View; href?: string }[] = [
  { label: "Build a Website", view: "website" },
  { label: "See Pricing", view: "pricing" },
  { label: "CMS / Admin Dashboard", view: "cms" },
  { label: "Automation Services", view: "automation" },
  { label: "Testing / QA", view: "qa" },
  { label: "View Projects", href: "/#projects" },
  { label: "Start a Project", view: "project" },
  { label: "Share Feedback", view: "feedback" },
];

const choices = [
  ["Landing Page", "landing-page"],
  ["Business Website", "business-website"],
  ["E-commerce", "ecommerce"],
  ["CMS Website", "cms-pro"],
  ["Custom Web App", "custom-web-application"],
  ["I'm not sure", "other"],
] as const;

const AUTO_OPEN_DELAY_MS = 8000;
const AUTO_OPEN_SESSION_KEY = "psdl-chat-autoshown";

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("home");
  const [market, setMarket] = useState<Market>("india");
  const [service, setService] = useState("website-development");
  const [projectType, setProjectType] = useState("new-product");
  const [step, setStep] = useState(0);
  const [timeline, setTimeline] = useState<string>(timelineOptions[0]);

  // Feedback state
  const [rating, setRating] = useState<number | null>(null);
  const [whatWentWell, setWhatWentWell] = useState("");
  const [whatCouldBeBetter, setWhatCouldBeBetter] = useState("");
  const [publishConsent, setPublishConsent] = useState<boolean | null>(null);
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [feedbackState, setFeedbackState] = useState<FeedbackState>("idle");
  const [feedbackError, setFeedbackError] = useState("");

  const panel = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    panel.current?.focus();
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcher.current?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);

  // Auto-open on homepage after delay, once per session
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.pathname !== "/") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem(AUTO_OPEN_SESSION_KEY)) return;

    const timer = window.setTimeout(() => {
      sessionStorage.setItem(AUTO_OPEN_SESSION_KEY, "1");
      setOpen(true);
    }, AUTO_OPEN_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  const go = (next: View) => {
    setView(next);
    setStep(0);
  };

  const close = () => {
    setOpen(false);
    launcher.current?.focus();
  };

  const resetFeedback = () => {
    setRating(null);
    setWhatWentWell("");
    setWhatCouldBeBetter("");
    setPublishConsent(null);
    setFullName("");
    setRole("");
    setCompany("");
    setFeedbackState("idle");
    setFeedbackError("");
    setStep(0);
  };

  const submitFeedback = async () => {
    if (rating === null || whatWentWell.trim().length < 3 || publishConsent === null) {
      setFeedbackState("error");
      setFeedbackError("Please complete the required fields before submitting.");
      return;
    }
    setFeedbackState("submitting");
    setFeedbackError("");
    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          rating,
          whatWentWell,
          whatCouldBeBetter,
          publishConsent,
          name: fullName,
          role,
          company,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.status !== 201 || result.ok !== true) {
        throw new Error(result.message || "Unable to send your feedback right now.");
      }
      setFeedbackState("success");
    } catch (error) {
      setFeedbackState("error");
      setFeedbackError(error instanceof Error ? error.message : "Unable to send your feedback.");
    }
  };

  return (
    <div className="assistant-root">
      {open && (
        <div
          className="assistant-panel"
          ref={panel}
          role="dialog"
          aria-labelledby="assistant-title"
          tabIndex={-1}
        >
          <header>
            <div>
              <strong id="assistant-title">PSDigiLabs Assistant</strong>
              <small>GUIDED CUSTOMER ASSISTANCE</small>
            </div>
            <button onClick={close} aria-label="Minimise assistant">−</button>
          </header>

          <div className="assistant-body" aria-live="polite">
            {view !== "home" && (
              <button className="assistant-back" onClick={() => go("home")}>← Back</button>
            )}

            {view === "home" && (
              <>
                <Message title="Hi! I'm the PSDigiLabs Assistant." text="What can I help you with?" />
                <div className="quick-actions">
                  {actions.map((a) =>
                    a.href ? (
                      <Link href={a.href} onClick={close} key={a.label}>{a.label}</Link>
                    ) : (
                      <button onClick={() => go(a.view!)} key={a.label}>{a.label}</button>
                    )
                  )}
                </div>
              </>
            )}

            {view === "website" && (
              <>
                <Message title="What are you planning to build?" text="I'll point you to a suitable starting package." />
                <div className="quick-actions">
                  {choices.map(([label, id]) => (
                    <Link href={`/contact?service=${id}`} onClick={close} key={id}>
                      {label}
                      <small>{pricingPackages.find((p) => p.id === id)?.price[market] || "We can scope it together"}</small>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {view === "pricing" && (
              <>
                <Message title="Approximate starting prices" text="Final pricing depends on scope, functionality, integrations, content, complexity and delivery requirements." />
                <div className="assistant-market">
                  <button aria-pressed={market === "india"} onClick={() => setMarket("india")}>India 🇮🇳</button>
                  <button aria-pressed={market === "international"} onClick={() => setMarket("international")}>International 🌍</button>
                </div>
                <div className="chat-prices">
                  {pricingPackages.slice(0, 6).map((p) => (
                    <p key={p.id}><span>{p.title}</span><strong>{p.price[market]}</strong></p>
                  ))}
                </div>
                <Link className="assistant-cta" href="/contact" onClick={close}>GET AN EXACT QUOTE</Link>
              </>
            )}

            {view === "cms" && (
              <Info
                title="CMS & admin dashboards"
                text="Database-backed websites with content, media and structured-data management through an appropriate admin experience."
                href="/contact?service=cms-pro"
                close={close}
              />
            )}
            {view === "automation" && (
              <Info
                title="Practical workflow automation"
                text="API-connected processes, lead routing, email and CRM workflows, form automation and other agreed business processes."
                href="/contact?service=workflow-automation"
                close={close}
              />
            )}
            {view === "qa" && (
              <Info
                title="Testing & QA support"
                text="Manual, functional, UI, responsive, regression and exploratory testing with actionable bug reporting."
                href="/contact?service=manual-testing"
                close={close}
              />
            )}

            {view === "project" && (
              <>
                <Message
                  title="Let's narrow down your enquiry."
                  text={
                    step === 0
                      ? "Which service do you need?"
                      : step === 1
                      ? "What kind of project are you planning?"
                      : step === 2
                      ? "When would you like to start?"
                      : "Your choices are ready. Add company details and a short brief in the project form."
                  }
                />
                {step === 0 && (
                  <select aria-label="Services needed" value={service} onChange={(e) => setService(e.target.value)}>
                    {serviceOptions.filter(([id]) => id !== "custom").map(([id, label]) => (
                      <option value={id} key={id}>{label}</option>
                    ))}
                  </select>
                )}
                {step === 1 && (
                  <select aria-label="Project type" value={projectType} onChange={(e) => setProjectType(e.target.value)}>
                    {projectTypeOptions.map(([id, label]) => (
                      <option value={id} key={id}>{label}</option>
                    ))}
                  </select>
                )}
                {step === 2 && (
                  <select aria-label="Timeline" value={timeline} onChange={(e) => setTimeline(e.target.value)}>
                    {timelineOptions.map((value) => (
                      <option key={value}>{value}</option>
                    ))}
                  </select>
                )}
                {step < 3 ? (
                  <button className="assistant-cta" onClick={() => setStep((s) => s + 1)}>CONTINUE</button>
                ) : (
                  <Link
                    className="assistant-cta"
                    href={`/contact?service=${encodeURIComponent(service)}&project_type=${encodeURIComponent(projectType)}&timeline=${encodeURIComponent(timeline)}`}
                    onClick={close}
                  >
                    CONTINUE TO PROJECT FORM
                  </Link>
                )}
              </>
            )}

            {view === "feedback" && (
              <>
                {feedbackState === "success" ? (
                  <>
                    <Message
                      title="Thank you — feedback received."
                      text="We'll review it and may feature your experience on the site. You can close this panel now."
                    />
                    <button className="assistant-cta" onClick={() => { resetFeedback(); go("home"); }}>
                      BACK TO ASSISTANT
                    </button>
                  </>
                ) : (
                  <>
                    <Message
                      title="Share your experience with PSDigiLabs."
                      text={
                        step === 0
                          ? "How would you rate your overall experience? (1 = poor, 5 = excellent)"
                          : step === 1
                          ? "What went well?"
                          : step === 2
                          ? "What could be better? (optional)"
                          : step === 3
                          ? "May we publish this as a testimonial on our website?"
                          : "Your details are optional — help us credit you if we publish your feedback."
                      }
                    />

                    {step === 0 && (
                      <div className="assistant-market">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            aria-pressed={rating === value}
                            onClick={() => setRating(value)}
                          >
                            {value} ★
                          </button>
                        ))}
                      </div>
                    )}

                    {step === 1 && (
                      <textarea
                        aria-label="What went well"
                        value={whatWentWell}
                        onChange={(e) => setWhatWentWell(e.target.value)}
                        placeholder="Tell us what worked well on your project."
                        rows={3}
                      />
                    )}

                    {step === 2 && (
                      <textarea
                        aria-label="What could be better"
                        value={whatCouldBeBetter}
                        onChange={(e) => setWhatCouldBeBetter(e.target.value)}
                        placeholder="Optional — anything we could improve."
                        rows={3}
                      />
                    )}

                    {step === 3 && (
                      <div className="assistant-market">
                        <button
                          aria-pressed={publishConsent === true}
                          onClick={() => setPublishConsent(true)}
                        >
                          Yes, you may publish it
                        </button>
                        <button
                          aria-pressed={publishConsent === false}
                          onClick={() => setPublishConsent(false)}
                        >
                          No, keep it private
                        </button>
                      </div>
                    )}

                    {step === 4 && (
                      <>
                        <input
                          aria-label="Your name"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your name (optional)"
                          maxLength={100}
                        />
                        <input
                          aria-label="Your role"
                          type="text"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          placeholder="Role (optional)"
                          maxLength={100}
                        />
                        <input
                          aria-label="Your company"
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Company (optional)"
                          maxLength={120}
                        />
                      </>
                    )}

                    {feedbackState === "error" && (
                      <p className="studio-form-error" role="alert">{feedbackError}</p>
                    )}

                    {step < 4 ? (
                      <button
                        className="assistant-cta"
                        onClick={() => setStep((s) => s + 1)}
                        disabled={
                          (step === 0 && rating === null) ||
                          (step === 1 && whatWentWell.trim().length < 3) ||
                          (step === 3 && publishConsent === null)
                        }
                      >
                        CONTINUE
                      </button>
                    ) : (
                      <button
                        className="assistant-cta"
                        onClick={submitFeedback}
                        disabled={feedbackState === "submitting"}
                      >
                        {feedbackState === "submitting" ? "SENDING…" : "SUBMIT FEEDBACK"}
                      </button>
                    )}
                  </>
                )}
              </>
            )}
          </div>

          <footer>
            <button onClick={() => go("home")}>Restart conversation</button>
            <span>Automated assistant</span>
          </footer>
        </div>
      )}

      <button
        ref={launcher}
        className="assistant-launcher"
        aria-label={open ? "Close PSDigiLabs Assistant" : "Ask PSDigiLabs"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{open ? "×" : "?"}</span>
        <b>{open ? "CLOSE" : "ASK PSDIGILABS"}</b>
      </button>
    </div>
  );
}

function Message({ title, text }: { title: string; text: string }) {
  return (
    <div className="bot-message">
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

function Info({
  title,
  text,
  href,
  close,
}: {
  title: string;
  text: string;
  href: string;
  close: () => void;
}) {
  return (
    <>
      <Message title={title} text={text} />
      <Link className="assistant-cta" href={href} onClick={close}>DISCUSS THIS SERVICE</Link>
    </>
  );
}