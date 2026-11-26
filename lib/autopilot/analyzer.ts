import "server-only";

import dns from "node:dns/promises";
import net from "node:net";
import type { IndustryKey, WebsiteIntelligence } from "./types";

const MAX_HTML_BYTES = 350_000;
const FETCH_TIMEOUT_MS = 7000;

export const PSDIGILABS_CANONICAL_URL = "https://www.psdigilabs.in";
const ALLOWED_PSDIGILABS_HOSTS = new Set(["psdigilabs.in", "www.psdigilabs.in"]);

export function isAllowedPsdigilabsUrl(raw: string): boolean {
  const parsed = normalizeTargetUrl(raw);
  if (!parsed) return false;
  return ALLOWED_PSDIGILABS_HOSTS.has(parsed.hostname.toLowerCase());
}

const INDUSTRY_RULES: {
  key: IndustryKey;
  label: string;
  keywords: string[];
  defaultOffer: string;
}[] = [
  {
    key: "agency",
    label: "Digital Studio, Agency & B2B Consulting",
    keywords: [
      "agency",
      "studio",
      "consulting",
      "web development",
      "software",
      "automation",
      "marketing",
      "seo",
      "ui/ux",
      "design",
      "qa",
      "testing",
    ],
    defaultOffer: "custom digital product engineering, web platforms, and workflow automation",
  },
  {
    key: "saas",
    label: "SaaS & Cloud Software",
    keywords: [
      "saas",
      "platform",
      "dashboard",
      "api",
      "analytics",
      "workflow",
      "crm",
      "pricing",
      "free trial",
      "demo",
      "integrations",
    ],
    defaultOffer: "cloud software that streamlines team operations and accelerates revenue workflows",
  },
  {
    key: "ecommerce",
    label: "E-Commerce & D2C Retail",
    keywords: [
      "shop",
      "cart",
      "checkout",
      "store",
      "collection",
      "apparel",
      "fashion",
      "jewelry",
      "order",
      "shipping",
      "products",
    ],
    defaultOffer: "curated products with direct online ordering and fast customer delivery",
  },
  {
    key: "healthcare",
    label: "Healthcare, Clinic & Wellness",
    keywords: [
      "clinic",
      "doctor",
      "dental",
      "hospital",
      "health",
      "therapy",
      "patient",
      "appointment",
      "medical",
      "wellness",
    ],
    defaultOffer: "patient-friendly care with online appointment booking and follow-up support",
  },
  {
    key: "realestate",
    label: "Real Estate, Architecture & Interiors",
    keywords: [
      "real estate",
      "property",
      "apartments",
      "villas",
      "architect",
      "interior",
      "construction",
      "broker",
      "homes",
    ],
    defaultOffer: "property discovery, site visits, and turnkey design or construction services",
  },
  {
    key: "hospitality",
    label: "Hospitality, Food & Events",
    keywords: [
      "restaurant",
      "cafe",
      "hotel",
      "menu",
      "reservation",
      "catering",
      "photography",
      "wedding",
      "events",
    ],
    defaultOffer: "memorable hospitality and seamless table, stay, or event booking experiences",
  },
  {
    key: "education",
    label: "Education, Coaching & EdTech",
    keywords: [
      "course",
      "academy",
      "training",
      "cohort",
      "learning",
      "students",
      "certification",
      "coaching",
      "bootcamp",
    ],
    defaultOffer: "structured learning programs, cohorts, and guided student onboarding",
  },
];

function isPrivateOrBlockedIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const parts = ip.split(".").map(Number);
    const [a, b] = parts;
    if (a === 10 || a === 127 || a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 100 && b >= 64 && b <= 127) return true;
    return false;
  }
  const normalized = ip.toLowerCase();
  if (
    normalized === "::1" ||
    normalized === "::" ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    normalized.startsWith("fe80") ||
    normalized.startsWith("::ffff:127.") ||
    normalized.startsWith("::ffff:10.") ||
    normalized.startsWith("::ffff:192.168.")
  ) {
    return true;
  }
  return false;
}

export function normalizeTargetUrl(raw: string): URL | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(withScheme);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    if (!parsed.hostname || !parsed.hostname.includes(".")) return null;
    const host = parsed.hostname.toLowerCase();
    if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

async function assertSafeHost(hostname: string): Promise<void> {
  if (net.isIP(hostname)) {
    if (isPrivateOrBlockedIp(hostname)) {
      throw new Error("Private or internal IP addresses cannot be scanned.");
    }
    return;
  }
  const records = await dns.lookup(hostname, { all: true });
  if (!records.length) {
    throw new Error("Domain DNS did not resolve.");
  }
  for (const record of records) {
    if (isPrivateOrBlockedIp(record.address)) {
      throw new Error("Target resolves to a restricted network address.");
    }
  }
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(html: string): string {
  return decodeHtmlEntities(html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "));
}

function extractMetaContent(html: string, nameOrProp: string): string {
  const escaped = nameOrProp.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`<meta[^>]+(?:name|property)=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']${escaped}["'][^>]*>`, "i"),
  ];
  for (const regex of patterns) {
    const match = html.match(regex);
    if (match?.[1]) return decodeHtmlEntities(match[1]);
  }
  return "";
}

function extractFirstTag(html: string, tag: string): string {
  const match = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match?.[1] ? stripTags(match[1]) : "";
}

function detectIndustry(corpus: string, fallbackNiche?: string): { key: IndustryKey; label: string; defaultOffer: string } {
  const lower = `${corpus} ${fallbackNiche ?? ""}`.toLowerCase();
  let best = { key: "general" as IndustryKey, label: "B2B & Growth Services", defaultOffer: "high-value services and solutions for modern buyers", hits: 0 };

  for (const rule of INDUSTRY_RULES) {
    let hits = 0;
    for (const kw of rule.keywords) {
      if (lower.includes(kw)) hits += 1;
    }
    if (hits > best.hits) {
      best = { key: rule.key, label: rule.label, defaultOffer: rule.defaultOffer, hits };
    }
  }
  return { key: best.key, label: best.label, defaultOffer: best.defaultOffer };
}

function detectTechSignals(html: string, headers: Headers): string[] {
  const signals = new Set<string>();
  const lower = html.toLowerCase();
  const poweredBy = headers.get("x-powered-by") || "";
  const server = headers.get("server") || "";

  if (lower.includes("__next") || lower.includes("_next/static") || poweredBy.toLowerCase().includes("next.js")) {
    signals.add("Next.js");
  }
  if (lower.includes("wp-content") || lower.includes("wp-includes")) signals.add("WordPress");
  if (lower.includes("cdn.shopify.com") || lower.includes("shopify")) signals.add("Shopify");
  if (lower.includes("wixstatic.com")) signals.add("Wix");
  if (lower.includes("webflow")) signals.add("Webflow");
  if (lower.includes("googletagmanager.com") || lower.includes("gtag(")) signals.add("Google Analytics / GTM");
  if (lower.includes("application/ld+json")) signals.add("Schema.org JSON-LD");
  if (lower.includes("calendly.com") || lower.includes("cal.com")) signals.add("Calendar Booking");
  if (lower.includes("wa.me/") || lower.includes("api.whatsapp.com")) signals.add("WhatsApp Routing");
  if (lower.includes("hubspot") || lower.includes("hs-scripts")) signals.add("HubSpot CRM");
  if (server.toLowerCase().includes("vercel") || headers.has("x-vercel-id")) signals.add("Vercel Edge");
  if (server.toLowerCase().includes("cloudflare") || headers.has("cf-ray")) signals.add("Cloudflare");

  if (signals.size === 0) signals.add("Custom Web Stack");
  return Array.from(signals).slice(0, 7);
}

export async function analyzeWebsite(inputUrl: string, fallbackNiche?: string): Promise<WebsiteIntelligence> {
  const targetInput = inputUrl.trim() || PSDIGILABS_CANONICAL_URL;
  const parsed = normalizeTargetUrl(targetInput);
  if (!parsed || !ALLOWED_PSDIGILABS_HOSTS.has(parsed.hostname.toLowerCase())) {
    throw new Error("Restricted: PSDigiLabs Growth Autopilot only runs for www.psdigilabs.in.");
  }

  const domain = "psdigilabs.in";
  const start = Date.now();
  let html = "";
  let resolvedUrl = parsed.toString();
  let reachable = false;
  let fetchNote: string | undefined;
  let headers = new Headers();

  try {
    await assertSafeHost(parsed.hostname);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    const response = await fetch(parsed.toString(), {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "PSDigiLabs-Autopilot/1.0 (+https://www.psdigilabs.in/autopilot)",
        accept: "text/html,application/xhtml+xml",
      },
    });
    clearTimeout(timer);

    resolvedUrl = response.url || resolvedUrl;
    headers = response.headers;

    if (response.ok) {
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("text/html") || contentType.includes("xhtml") || !contentType) {
        const text = await response.text();
        html = text.slice(0, MAX_HTML_BYTES);
        reachable = true;
      } else {
        fetchNote = `URL responded with ${contentType}; generated blueprint from domain & niche.`;
      }
    } else {
      fetchNote = `Website returned HTTP ${response.status} to automated crawlers; generated blueprint from domain & niche.`;
    }
  } catch (err) {
    fetchNote =
      err instanceof Error && err.name === "AbortError"
        ? "Website timed out after 7s; generated blueprint from domain & niche."
        : "Website blocked automated fetch or could not be reached; generated blueprint from domain & niche.";
  }

  const responseTimeMs = Date.now() - start;
  const title = extractFirstTag(html, "title") || extractMetaContent(html, "og:title");
  const metaDesc = extractMetaContent(html, "description") || extractMetaContent(html, "og:description");
  const h1 = extractFirstTag(html, "h1");
  const bodySnippet = html ? stripTags(html).slice(0, 1800) : "";

  const brandName = "PSDigiLabs";
  const headline = h1 || title || "Product engineering with design built in.";
  const description =
    metaDesc ||
    "PSDigiLabs builds fast Next.js websites, custom Android apps, automated testing suites, and workflow automation.";

  const industryMatch = detectIndustry(`${title} ${metaDesc} ${h1} ${bodySnippet}`, fallbackNiche);
  const offerSummary =
    "fast Next.js websites, custom Android apps, software testing, and workflow automation";

  const lower = html.toLowerCase();
  const https = resolvedUrl.startsWith("https://");
  const hasForm = /<form[\s>]/i.test(html);
  const hasBookingLink = /calendly\.com|cal\.com|book-a-call|schedule/i.test(lower);
  const hasWhatsApp = /wa\.me\/|api\.whatsapp\.com|whatsapp/i.test(lower);
  const hasSchemaOrg = /application\/ld\+json/i.test(lower);
  const hasAnalytics = /googletagmanager\.com|gtag\(|plausible\.io|posthog/i.test(lower);
  const hasContactEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(html);
  const hasPhone = /tel:[+\d\s()-]{6,}/i.test(html);

  const techSignals = reachable ? detectTechSignals(html, headers) : ["Domain / Niche Mode"];

  const gaps: WebsiteIntelligence["gaps"] = [];
  let score = reachable ? 45 : 30;

  if (https) score += 10;
  else {
    gaps.push({
      severity: "critical",
      title: "HTTPS / SSL Not Enforced",
      detail: "Prospects clicking from cold outreach see browser security warnings before reading your offer.",
    });
  }

  if (hasForm) score += 12;
  else {
    gaps.push({
      severity: "critical",
      title: "No Automated Lead Capture Form Detected",
      detail: "Outbound traffic needs a frictionless capture form connected directly to your database or CRM.",
    });
  }

  if (hasBookingLink) score += 10;
  else {
    gaps.push({
      severity: "warning",
      title: "Missing Instant Calendar / Call Booking Link",
      detail: "Interested leads from outreach wait for manual email back-and-forth instead of booking immediately.",
    });
  }

  if (hasWhatsApp) score += 8;
  else {
    gaps.push({
      severity: "warning",
      title: "No Instant WhatsApp / Fast-Reply Routing",
      detail: "Adding automated WhatsApp routing increases response velocity for high-intent B2B and local enquiries.",
    });
  }

  if (hasSchemaOrg) score += 8;
  else {
    gaps.push({
      severity: "warning",
      title: "Missing Schema.org Structured Data",
      detail: "Search engines and AI assistants struggle to verify your exact services, location, and brand authority.",
    });
  }

  if (hasAnalytics) score += 7;
  else {
    gaps.push({
      severity: "warning",
      title: "Conversion Telemetry Not Detected",
      detail: "Without event tracking on outreach landing pages, you cannot measure which campaign converts.",
    });
  }

  if (gaps.length === 0) {
    gaps.push({
      severity: "good",
      title: "Strong Baseline Funnel Signals",
      detail: "Your site already includes HTTPS, lead capture, booking, and structured telemetry—ready to plug into automated outbound routing.",
    });
  }

  return {
    inputUrl,
    resolvedUrl,
    domain,
    reachable,
    fetchNote,
    responseTimeMs,
    brandName,
    headline,
    description,
    industry: industryMatch.key,
    industryLabel: industryMatch.label,
    offerSummary,
    techSignals,
    conversionSignals: {
      https,
      hasForm,
      hasBookingLink,
      hasWhatsApp,
      hasSchemaOrg,
      hasAnalytics,
      hasContactEmail,
      hasPhone,
    },
    readinessScore: Math.min(100, score),
    gaps,
  };
}
