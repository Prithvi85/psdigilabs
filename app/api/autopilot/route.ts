import {
  analyzeWebsite,
  isAllowedPsdigilabsUrl,
  PSDIGILABS_CANONICAL_URL,
} from "@/lib/autopilot/analyzer";
import {
  isAutopilotAuthenticated,
  isAutopilotConfigured,
  verifyPasscode,
} from "@/lib/autopilot/auth";
import { generateAutopilotReport, type ServiceFocusKey } from "@/lib/autopilot/generator";
import { scanLiveProspectRadar } from "@/lib/autopilot/prospect-radar";

export const runtime = "nodejs";

const ALLOWED_SERVICE_FOCUSES = new Set<ServiceFocusKey>([
  "all",
  "website-development",
  "workflow-automation",
  "android-app-development",
  "quality-engineering",
]);

const recentRequests = new Map<string, number>();

function cleanText(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  if (!isAutopilotConfigured()) {
    return Response.json(
      { error: "AUTOPILOT_ACCESS_KEY is not configured on the server." },
      { status: 503 }
    );
  }

  const headerKey = request.headers.get("x-autopilot-key")?.trim() || "";
  const cookieAuthed = await isAutopilotAuthenticated();
  if (!cookieAuthed && !verifyPasscode(headerKey)) {
    return Response.json(
      { error: "Unauthorized. Unlock PSDigiLabs Autopilot with your owner passcode first." },
      { status: 401 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  const requestedUrl = cleanText(body.url, 300);
  if (requestedUrl && !isAllowedPsdigilabsUrl(requestedUrl)) {
    return Response.json(
      {
        error:
          "Restricted: PSDigiLabs Growth Autopilot is locked exclusively to www.psdigilabs.in and cannot be run on third-party websites.",
      },
      { status: 403 }
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const lastRun = recentRequests.get(ip) || 0;
  if (lastRun > Date.now() - 4_000) {
    return Response.json(
      { error: "Please wait a few seconds before starting another lead scan." },
      { status: 429 }
    );
  }

  const targetCity = cleanText(body.targetCity, 80) || "Kolkata";
  const resolvedNiche = cleanText(body.targetNiche, 100) || "Clinics & Healthcare";
  const requestedFocus = cleanText(body.serviceFocus, 60) as ServiceFocusKey;
  const serviceFocus: ServiceFocusKey = ALLOWED_SERVICE_FOCUSES.has(requestedFocus)
    ? requestedFocus
    : "all";

  try {
    recentRequests.set(ip, Date.now());
    const website = await analyzeWebsite(PSDIGILABS_CANONICAL_URL, resolvedNiche);
    const radar = await scanLiveProspectRadar(targetCity, resolvedNiche);
    const report = generateAutopilotReport(
      website,
      radar,
      targetCity,
      resolvedNiche,
      serviceFocus
    );

    return Response.json({ ok: true, report }, { status: 200 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not complete automated lead scan.";
    return Response.json({ error: message }, { status: 400 });
  }
}
