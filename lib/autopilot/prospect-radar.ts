import "server-only";

import dns from "node:dns/promises";
import net from "node:net";
import type { ProspectLead, ProspectRadarResult } from "./types";

const PHOTON_URL = "https://photon.komoot.io/api";
const OSM_API_BASE = "https://api.openstreetmap.org/api/0.6";

const CITY_COORDS: Record<string, { lat: number; lon: number }> = {
  kolkata: { lat: 22.5726, lon: 88.3639 },
  bengaluru: { lat: 12.9716, lon: 77.5946 },
  bangalore: { lat: 12.9716, lon: 77.5946 },
  mumbai: { lat: 19.076, lon: 72.8777 },
  "delhi ncr": { lat: 28.6139, lon: 77.209 },
  delhi: { lat: 28.6139, lon: 77.209 },
  hyderabad: { lat: 17.385, lon: 78.4867 },
  pune: { lat: 18.5204, lon: 73.8567 },
  chennai: { lat: 13.0827, lon: 80.2707 },
  ahmedabad: { lat: 23.0225, lon: 72.5714 },
  jaipur: { lat: 26.9124, lon: 75.7873 },
  london: { lat: 51.5072, lon: -0.1276 },
  "new york": { lat: 40.7128, lon: -74.006 },
  dubai: { lat: 25.2048, lon: 55.2708 },
  singapore: { lat: 1.3521, lon: 103.8198 },
};

const NICHE_SEARCH_TERMS: { match: string[]; terms: string[] }[] = [
  { match: ["dental"], terms: ["dental clinic", "dentist"] },
  { match: ["clinic", "health", "medical", "doctor"], terms: ["clinic", "hospital", "medical center"] },
  { match: ["boutique", "fashion", "clothing", "apparel"], terms: ["boutique", "fashion", "clothing store"] },
  { match: ["restaurant", "cafe", "food", "bakery"], terms: ["restaurant", "cafe", "bakery"] },
  { match: ["hotel", "hospitality", "resort"], terms: ["hotel", "guest house"] },
  { match: ["real estate", "property", "architect", "interior"], terms: ["real estate", "architect", "interior"] },
  { match: ["coaching", "training", "academy", "education", "school"], terms: ["academy", "coaching", "institute"] },
  { match: ["it", "agenc", "consulting", "software", "tech"], terms: ["software", "consulting", "agency"] },
  { match: ["jewelry", "jewellery", "electronics", "shop", "retail"], terms: ["jewellery", "electronics", "showroom"] },
];

function resolveSearchTerms(niche: string): string[] {
  const lower = niche.toLowerCase();
  for (const rule of NICHE_SEARCH_TERMS) {
    if (rule.match.some((kw) => lower.includes(kw))) {
      return rule.terms;
    }
  }
  return [niche.trim() || "business"];
}

function buildBooleanQueries(city: string, niche: string): { label: string; query: string }[] {
  const cleanCity = city.trim() || "Kolkata";
  const cleanNiche = niche.trim() || "B2B services";
  return [
    {
      label: "Google Maps / Local Decision Makers",
      query: `"${cleanNiche}" "${cleanCity}" ("contact" OR "book" OR "whatsapp")`,
    },
    {
      label: "LinkedIn Founder & Ops Search",
      query: `site:linkedin.com/in ("Founder" OR "Director" OR "Head of Operations") "${cleanNiche}" "${cleanCity}"`,
    },
    {
      label: "High-Intent Outdated Website Finder",
      query: `"${cleanNiche}" "${cleanCity}" -inurl:https ("powered by" OR "copyright 2021" OR "copyright 2022")`,
    },
  ];
}

function isBlockedIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    return (
      a === 10 ||
      a === 127 ||
      a === 0 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 100 && b >= 64 && b <= 127)
    );
  }
  const lower = ip.toLowerCase();
  return lower === "::1" || lower === "::" || lower.startsWith("fc") || lower.startsWith("fd") || lower.startsWith("fe80");
}

async function resolveCityCoords(city: string): Promise<{ lat: number; lon: number } | null> {
  const preset = CITY_COORDS[city.trim().toLowerCase()];
  if (preset) return preset;

  try {
    const params = new URLSearchParams({ q: city.trim(), limit: "1" });
    const res = await fetch(`${PHOTON_URL}?${params.toString()}`, {
      signal: AbortSignal.timeout(4000),
      headers: { "user-agent": "PSDigiLabs-Autopilot/1.0" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      features?: Array<{ geometry?: { coordinates?: [number, number] } }>;
    };
    const coords = data.features?.[0]?.geometry?.coordinates;
    if (!coords || coords.length < 2) return null;
    return { lon: coords[0], lat: coords[1] };
  } catch {
    return null;
  }
}

interface PhotonFeature {
  properties?: {
    osm_type?: "N" | "W" | "R";
    osm_id?: number;
    osm_key?: string;
    osm_value?: string;
    name?: string;
    street?: string;
    housenumber?: string;
    locality?: string;
    district?: string;
    city?: string;
    state?: string;
    country?: string;
  };
}

async function searchPhotonPlaces(
  term: string,
  city: string,
  coords: { lat: number; lon: number } | null
): Promise<PhotonFeature[]> {
  try {
    const params = new URLSearchParams({
      q: `${term} ${city}`,
      limit: "10",
    });
    if (coords) {
      params.set("lat", String(coords.lat));
      params.set("lon", String(coords.lon));
      params.set("zoom", "12");
      params.set("location_bias_scale", "0.75");
    }
    const res = await fetch(`${PHOTON_URL}?${params.toString()}`, {
      signal: AbortSignal.timeout(5000),
      headers: { "user-agent": "PSDigiLabs-Autopilot/1.0" },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { features?: PhotonFeature[] };
    return data.features || [];
  } catch {
    return [];
  }
}

async function fetchOsmTags(
  osmType?: "N" | "W" | "R",
  osmId?: number
): Promise<Record<string, string>> {
  if (!osmType || !osmId) return {};
  const kind = osmType === "N" ? "node" : osmType === "W" ? "way" : "relation";
  try {
    const res = await fetch(`${OSM_API_BASE}/${kind}/${osmId}.json`, {
      signal: AbortSignal.timeout(3500),
      headers: { "user-agent": "PSDigiLabs-Autopilot/1.0 (contact@psdigilabs.in)" },
    });
    if (!res.ok) return {};
    const data = (await res.json()) as {
      elements?: Array<{ tags?: Record<string, string> }>;
    };
    return data.elements?.[0]?.tags || {};
  } catch {
    return {};
  }
}

function extractBestEmail(html: string): string | null {
  const mailtoMatches = Array.from(
    html.matchAll(/mailto:([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/gi)
  ).map((m) => m[1].toLowerCase());

  const plainMatches = Array.from(
    html.matchAll(/\b([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10})\b/gi)
  ).map((m) => m[1].toLowerCase());

  const candidates = [...mailtoMatches, ...plainMatches].filter((email) => {
    if (email.length > 80) return false;
    if (/\.(png|jpg|jpeg|webp|svg|gif|css|js)$/i.test(email)) return false;
    if (/example\.com|sentry\.io|wixpress\.com|schema\.org/i.test(email)) return false;
    return true;
  });

  return candidates[0] || null;
}

async function inspectProspectWebsite(rawUrl: string | null): Promise<{
  status: ProspectLead["websiteStatus"];
  hasMx: boolean | null;
  normalizedUrl: string | null;
  scrapedEmail: string | null;
  scrapedPhone: string | null;
  detectedGaps: string[];
}> {
  if (!rawUrl) {
    return {
      status: "missing",
      hasMx: null,
      normalizedUrl: null,
      scrapedEmail: null,
      scrapedPhone: null,
      detectedGaps: ["No public website listed"],
    };
  }

  const withScheme = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
  let parsed: URL;
  try {
    parsed = new URL(withScheme);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error("Invalid protocol");
    }
  } catch {
    return {
      status: "missing",
      hasMx: null,
      normalizedUrl: null,
      scrapedEmail: null,
      scrapedPhone: null,
      detectedGaps: ["Invalid website URL listed"],
    };
  }

  const domain = parsed.hostname.replace(/^www\./, "").toLowerCase();
  let hasMx: boolean | null = null;
  try {
    const mx = await dns.resolveMx(domain);
    hasMx = mx.length > 0;
  } catch {
    hasMx = false;
  }

  try {
    const records = await dns.lookup(parsed.hostname, { all: true });
    if (!records.length || records.some((r) => isBlockedIp(r.address))) {
      return {
        status: "unreachable",
        hasMx,
        normalizedUrl: parsed.toString(),
        scrapedEmail: null,
        scrapedPhone: null,
        detectedGaps: ["Website host could not be verified"],
      };
    }

    const res = await fetch(parsed.toString(), {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(3500),
      headers: {
        "user-agent": "PSDigiLabs-Autopilot/1.0 (+https://www.psdigilabs.in)",
        accept: "text/html,application/xhtml+xml",
      },
    });

    const finalUrl = res.url || parsed.toString();
    if (!res.ok) {
      return {
        status: "unreachable",
        hasMx,
        normalizedUrl: finalUrl,
        scrapedEmail: null,
        scrapedPhone: null,
        detectedGaps: [`Website returned HTTP ${res.status}`],
      };
    }

    const html = (await res.text()).slice(0, 140_000);
    const lower = html.toLowerCase();
    const gaps: string[] = [];

    if (!finalUrl.startsWith("https://")) gaps.push("Missing HTTPS/SSL");
    if (!/<form[\s>]/i.test(html)) gaps.push("No lead capture form");
    if (!/calendly\.com|cal\.com|book|appointment|schedule/i.test(lower)) {
      gaps.push("No instant booking flow");
    }
    if (!/wa\.me\/|api\.whatsapp\.com|whatsapp/i.test(lower)) {
      gaps.push("No WhatsApp quick reply");
    }

    const telMatch = html.match(/tel:([+\d\s()-]{7,20})/i);

    return {
      status: finalUrl.startsWith("https://") ? "live" : "http-only",
      hasMx,
      normalizedUrl: finalUrl,
      scrapedEmail: extractBestEmail(html),
      scrapedPhone: telMatch?.[1]?.trim() || null,
      detectedGaps: gaps.length > 0 ? gaps : ["Ready for workflow automation upgrade"],
    };
  } catch {
    return {
      status: "unreachable",
      hasMx,
      normalizedUrl: parsed.toString(),
      scrapedEmail: null,
      scrapedPhone: null,
      detectedGaps: ["Website timed out or blocked automated check"],
    };
  }
}

export async function scanLiveProspectRadar(
  city: string,
  niche: string
): Promise<ProspectRadarResult> {
  const cleanCity = city.trim() || "Kolkata";
  const cleanNiche = niche.trim() || "Clinics & Healthcare";
  const booleanQueries = buildBooleanQueries(cleanCity, cleanNiche);

  const coords = await resolveCityCoords(cleanCity);
  const terms = resolveSearchTerms(cleanNiche).slice(0, 2);

  const featureBatches = await Promise.all(
    terms.map((term) => searchPhotonPlaces(term, cleanCity, coords))
  );
  const allFeatures = featureBatches.flat();

  const seenNames = new Set<string>();
  const candidates: PhotonFeature[] = [];

  for (const feat of allFeatures) {
    const p = feat.properties;
    const name = p?.name?.trim();
    if (!name || !p?.osm_id || !p?.osm_type) continue;
    // Skip generic administrative city/boundary nodes
    if (p.osm_key === "place" || p.osm_key === "boundary") continue;
    const key = name.toLowerCase();
    if (seenNames.has(key)) continue;
    seenNames.add(key);
    candidates.push(feat);
    if (candidates.length >= 10) break;
  }

  if (candidates.length === 0) {
    return {
      source: "fallback-queries",
      city: cleanCity,
      niche: cleanNiche,
      osmCount: 0,
      note: `No matching "${cleanNiche}" places were returned in ${cleanCity} right now. Try a broader niche or another city.`,
      prospects: [],
      booleanQueries,
    };
  }

  const prospects: ProspectLead[] = await Promise.all(
    candidates.map(async (feat, index) => {
      const p = feat.properties!;
      const tags = await fetchOsmTags(p.osm_type, p.osm_id);

      const name = p.name!.trim();
      const category = (
        tags.healthcare ||
        tags.amenity ||
        tags.shop ||
        tags.office ||
        p.osm_value ||
        cleanNiche
      ).replace(/_/g, " ");

      const rawWebsite =
        tags.website || tags["contact:website"] || tags["website:official"] || tags.url || null;
      const osmPhone = tags.phone || tags["contact:phone"] || tags["contact:mobile"] || null;
      const osmEmail = tags.email || tags["contact:email"] || null;

      const addressParts = [
        tags["addr:full"] || tags["addr:housenumber"],
        p.street,
        p.locality || p.district,
        p.city || cleanCity,
      ].filter(Boolean);
      const address =
        Array.from(new Set(addressParts)).join(", ") || cleanCity;

      // Inspect up to 8 websites live for contact emails + conversion gaps
      const inspection =
        index < 8
          ? await inspectProspectWebsite(rawWebsite)
          : {
              status: rawWebsite ? ("live" as const) : ("missing" as const),
              hasMx: null,
              normalizedUrl: rawWebsite,
              scrapedEmail: null,
              scrapedPhone: null,
              detectedGaps: rawWebsite ? ["Website listed"] : ["No public website listed"],
            };

      const finalEmail = osmEmail || inspection.scrapedEmail;
      const finalPhone = osmPhone || inspection.scrapedPhone;

      let opportunityLevel: ProspectLead["opportunityLevel"] = "medium";
      let opportunityReason = `Website live (${inspection.detectedGaps.slice(0, 2).join(", ")}) — strong fit for PSDigiLabs web & automation upgrade.`;

      if (inspection.status === "missing") {
        opportunityLevel = "high";
        opportunityReason =
          "No public website listed in OpenStreetMap — high need for a modern website & automated lead capture.";
      } else if (inspection.status === "unreachable") {
        opportunityLevel = "high";
        opportunityReason =
          "Listed website failed live health check — potential downtime, SSL, or performance issue.";
      } else if (inspection.status === "http-only") {
        opportunityLevel = "high";
        opportunityReason =
          "Site serves insecure HTTP — needs SSL, speed modernization, and automated booking.";
      } else if (inspection.detectedGaps.length >= 2) {
        opportunityLevel = "high";
        opportunityReason = `Live site missing key conversion workflows: ${inspection.detectedGaps.slice(0, 3).join(", ")}.`;
      }

      return {
        id: `osm-${p.osm_type}-${p.osm_id}`,
        name,
        category,
        city: p.city || cleanCity,
        address,
        website: inspection.normalizedUrl,
        phone: finalPhone,
        email: finalEmail,
        opportunityLevel,
        opportunityReason,
        websiteStatus: inspection.status,
        hasMxRecord: inspection.hasMx,
        detectedGaps: inspection.detectedGaps,
      };
    })
  );

  // Rank prospects with emails or high opportunities near the top
  prospects.sort((a, b) => {
    const score = (lead: ProspectLead) =>
      (lead.email ? 3 : 0) + (lead.opportunityLevel === "high" ? 2 : 1) + (lead.website ? 1 : 0);
    return score(b) - score(a);
  });

  return {
    source: "photon-osm-live",
    city: cleanCity,
    niche: cleanNiche,
    osmCount: prospects.length,
    note: `Discovered ${prospects.length} real businesses in ${cleanCity} via Photon + OpenStreetMap 0.6 and automatically inspected their websites for emails & conversion gaps.`,
    prospects,
    booleanQueries,
  };
}
