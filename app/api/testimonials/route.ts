import { createClient } from "next-sanity";

export const runtime = "nodejs";

type Body = {
  rating?: unknown;
  whatWentWell?: unknown;
  whatCouldBeBetter?: unknown;
  publishConsent?: unknown;
  name?: unknown;
  role?: unknown;
  company?: unknown;
};

const recent = new Map<string, number>();
const str = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if ((recent.get(ip) || 0) > Date.now() - 30_000) {
    return Response.json(
      { message: "Please wait a moment before submitting again." },
      { status: 429 }
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }

  const rating = Number(body.rating);
  const whatWentWell = str(body.whatWentWell, 4000);
  const whatCouldBeBetter = str(body.whatCouldBeBetter, 4000);
  const publishConsent = body.publishConsent === true;
  const name = str(body.name, 100);
  const role = str(body.role, 100);
  const company = str(body.company, 120);

  if (
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5 ||
    whatWentWell.length < 3 ||
    typeof body.publishConsent !== "boolean"
  ) {
    return Response.json(
      { message: "Please check the required fields and try again." },
      { status: 400 }
    );
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const writeToken = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId || !writeToken) {
    console.error("Testimonial API is not configured (missing project ID or write token)");
    return Response.json({ message: "Service unavailable." }, { status: 503 });
  }

  try {
    const client = createClient({
      projectId,
      dataset,
      apiVersion: "2025-01-01",
      token: writeToken,
      useCdn: false,
    });

    const doc = await client.create({
      _type: "testimonial",
      name: name || "Anonymous",
      role: role || undefined,
      company: company || undefined,
      quote: whatWentWell,
      whatCouldBeBetter: whatCouldBeBetter || undefined,
      rating,
      consentGiven: publishConsent,
      published: false,
      date: new Date().toISOString(),
    });

    recent.set(ip, Date.now());
    return Response.json({ ok: true, id: doc._id }, { status: 201 });
  } catch (error) {
    console.error("Testimonial persistence failed", {
      error: error instanceof Error ? error.message : "Unknown Sanity error",
    });
    return Response.json(
      { message: "We could not save your feedback right now. Please try again." },
      { status: 503 }
    );
  }
}