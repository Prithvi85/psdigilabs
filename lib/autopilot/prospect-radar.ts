import "server-only";

import dns from "node:dns/promises";
import type { ProspectLead, ProspectRadarResult } from "./types";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

const NICHE_TAG_FILTERS: { match: string[]; filters: string[] }[] = [
  {
    match: ["clinic", "dental", "doctor", "health", "medical", "hospital", "wellness"],
    filters: ['["amenity"~"clinic|dentist|doctors|hospital|pharmacy"]', '["healthcare"]'],
  },
  {
    match: ["restaurant", "cafe", "food", "bakery", "hospitality", "hotel", "catering"],
    filters: ['["amenity"~"restaurant|cafe|bakery|fast_food"]', '["tourism"~"hotel|guest_house"]'],
  },
  {
    match: ["fashion", "boutique", "clothing", "retail", "shop", "ecommerce", "store", "jewelry"],
    filters: ['["shop"~"clothes|boutique|jewelry|shoes|department_store|electronics|furniture"]'],
  },
  {
    match: ["real estate", "property", "architect", "interior", "construction", "builder"],
    filters: ['["office"~"estate_agent|architect|construction_company|property_management"]'],
  },
  {
    match: ["education", "school", "academy", "coaching", "training", "institute"],
    filters: ['["amenity"~"school|college|training|language_school"]', '["office"="educational_institution"]'],
  },
  {
    match: ["agency", "software", "it", "tech", "consulting", "saas", "marketing", "finance", "legal"],
    filters: ['["office"~"it|company|consulting|advertising_agency|accountant|lawyer|financial"]'],
  },
];

function resolveOsmFilters(niche: string): string[] {
  const lower = niche.toLowerCase();
  for (const rule of NICHE_TAG_FILTERS) {
    if (rule.match.some((kw) => lower.includes(kw))) {
      return rule.filters;
    }
  }
  return ['["office"]', '["shop"~"clothes|electronics|furniture|beauty"]'];
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

async function geocodeCityCenter(city: string): Promise<{ lat: string; lon: string } | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5500);
  try {
    const params = new URLSearchParams({
      q: city,
      format: "jsonv2",
      limit: "1",
    });
    const res = await fetch(`${NOMINATIM_URL}?${params.toString()}`, {
      signal: controller.signal,
      headers: {
        "user-agent": "PSDigiLabs-Autopilot/1.0 (contact@psdigilabs.in)",
        accept: "application/json",
      },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Array<{ lat?: string; lon?: string }>;
    const first = data[0];
    if (!first?.lat || !first?.lon) return null;
    return { lat: first.lat, lon: first.lon };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function probeProspectWebsite(
  rawUrl: string | null
): Promise<{ status: ProspectLead["websiteStatus"]; hasMx: boolean | null; normalizedUrl: string | null }> {
  if (!rawUrl) {
    return { status: "missing", hasMx: null, normalizedUrl: null };
  }
  const withScheme = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
  let parsed: URL;
  try {
    parsed = new URL(withScheme);
  } catch {
    return { status: "missing", hasMx: null, normalizedUrl: null };
  }

  let hasMx: boolean | null = null;
  try {
    const mx = await dns.resolveMx(parsed.hostname.replace(/^www\./, ""));
    hasMx = mx.length > 0;
  } catch {
    hasMx = false;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  try {
    const res = await fetch(parsed.toString(), {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "PSDigiLabs-Autopilot/1.0" },
    });
    clearTimeout(timer);
    if (!res.ok && res.status >= 500) {
      return { status: "unreachable", hasMx, normalizedUrl: parsed.toString() };
    }
    const finalUrl = res.url || parsed.toString();
    return {
      status: finalUrl.startsWith("https://") ? "live" : "http-only",
      hasMx,
      normalizedUrl: finalUrl,
    };
  } catch {
    clearTimeout(timer);
    return { status: "unreachable", hasMx, normalizedUrl: parsed.toString() };
  }
}

interface OsmElement {
  id: number;
  tags?: Record<string, string>;
}

export async function scanLiveProspectRadar(city: string, niche: string): Promise<ProspectRadarResult> {
  const cleanCity = city.trim() || "Kolkata";
  const cleanNiche = niche.trim() || "Businesses";
  const booleanQueries = buildBooleanQueries(cleanCity, cleanNiche);

  const center = await geocodeCityCenter(cleanCity);
  if (!center) {
    return {
      source: "fallback-queries",
      city: cleanCity,
      niche: cleanNiche,
      osmCount: 0,
      note: `Live OpenStreetMap geocoding was unavailable for "${cleanCity}". Use the generated Boolean targeting queries below or try a major city name.`,
      prospects: [],
      booleanQueries,
    };
  }

  const filters = resolveOsmFilters(cleanNiche);
  const queryStatements = filters
    .map((f) => `nwr${f}(around:15000,${center.lat},${center.lon});`)
    .join("\n");

  const overpassQuery = `[out:json][timeout:12];(\n${queryStatements}\n);out tags 24;`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(OVERPASS_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "user-agent": "PSDigiLabs-Autopilot/1.0 (contact@psdigilabs.in)",
      },
      body: new URLSearchParams({ data: overpassQuery }).toString(),
    });
    clearTimeout(timer);

    if (!res.ok) {
      throw new Error(`Overpass status ${res.status}`);
    }

    const payload = (await res.json()) as { elements?: OsmElement[] };
    const rawElements = (payload.elements || []).filter((el) => el.tags?.name);

    const seenNames = new Set<string>();
    const uniqueElements: OsmElement[] = [];
    for (const el of rawElements) {
      const name = el.tags?.name?.trim();
      if (!name || seenNames.has(name.toLowerCase())) continue;
      seenNames.add(name.toLowerCase());
      uniqueElements.push(el);
      if (uniqueElements.length >= 8) break;
    }

    const prospects: ProspectLead[] = await Promise.all(
      uniqueElements.map(async (el, index) => {
        const tags = el.tags || {};
        const name = tags.name!.trim();
        const category = tags.office || tags.shop || tags.amenity || tags.healthcare || tags.tourism || cleanNiche;
        const rawWebsite = tags.website || tags["contact:website"] || tags.url || null;
        const phone = tags.phone || tags["contact:phone"] || tags["contact:mobile"] || null;
        const email = tags.email || tags["contact:email"] || null;
        const addressParts = [tags["addr:housenumber"], tags["addr:street"], tags["addr:suburb"], tags["addr:city"] || cleanCity].filter(Boolean);
        const address = addressParts.length > 0 ? addressParts.join(", ") : cleanCity;

        // Only live-probe first 5 websites to keep response fast
        const probe = index < 5 ? await probeProspectWebsite(rawWebsite) : {
          status: rawWebsite ? ("live" as const) : ("missing" as const),
          hasMx: null,
          normalizedUrl: rawWebsite,
        };

        let opportunityLevel: ProspectLead["opportunityLevel"] = "medium";
        let opportunityReason = "Website live — strong candidate for conversion funnel & workflow automation upgrade.";

        if (probe.status === "missing") {
          opportunityLevel = "high";
          opportunityReason = "No public website listed on map registry — high need for web presence & automated lead capture.";
        } else if (probe.status === "unreachable") {
          opportunityLevel = "high";
          opportunityReason = "Listed website failed fast health check — potential downtime, SSL, or speed bottleneck.";
        } else if (probe.status === "http-only") {
          opportunityLevel = "high";
          opportunityReason = "Site serves insecure HTTP — needs SSL, speed modernization, and automated funnel upgrade.";
        } else if (probe.hasMx === false) {
          opportunityLevel = "medium";
          opportunityReason = "Website live, but no domain MX email records detected — likely running manual Gmail/WhatsApp ops.";
        }

        return {
          id: `osm-${el.id}`,
          name,
          category: category.replace(/_/g, " "),
          city: cleanCity,
          address,
          website: probe.normalizedUrl,
          phone,
          email,
          opportunityLevel,
          opportunityReason,
          websiteStatus: probe.status,
          hasMxRecord: probe.hasMx,
        };
      })
    );

    return {
      source: "openstreetmap-live",
      city: cleanCity,
      niche: cleanNiche,
      osmCount: prospects.length,
      note:
        prospects.length > 0
          ? `Discovered ${prospects.length} live local records in ${cleanCity} via OpenStreetMap Overpass + real-time domain checks.`
          : `No tagged "${cleanNiche}" records returned by OpenStreetMap in ${cleanCity}. Use the Boolean search queries below or try a broader niche (e.g. clinic, agency, shop, restaurant).`,
      prospects,
      booleanQueries,
    };
  } catch {
    clearTimeout(timer);
    return {
      source: "fallback-queries",
      city: cleanCity,
      niche: cleanNiche,
      osmCount: 0,
      note: `OpenStreetMap Overpass was busy or unreachable right now. Use the generated Boolean targeting queries below to pull fresh leads.`,
      prospects: [],
      booleanQueries,
    };
  }
}
