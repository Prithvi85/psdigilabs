import { createClient } from "next-sanity";
import { caseStudies } from "@/data/case-studies";
import { resources } from "@/data/resources";
import { services } from "@/data/services";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const readToken = process.env.SANITY_API_READ_TOKEN;

const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2025-01-01",
      useCdn: !readToken,
      ...(readToken ? { token: readToken } : {}),
    })
  : null;

async function querySanity<T>(query: string, fallback: T): Promise<T> {
  if (!client) return fallback;

  try {
    const result = await client.fetch<T>(query, {}, { next: { revalidate: 300 } });
    return result ?? fallback;
  } catch (error) {
    console.error("Sanity content query failed; using local content.", error);
    return fallback;
  }
}

export type ServiceContent = {
  icon: "web" | "mobile" | "test" | "automation";
  slug: string;
  title: string;
  description: string;
  problem: string;
  technology: readonly string[];
  faqs: readonly (readonly [string, string])[];
  capabilities: readonly string[];
};

type SanityService = Omit<ServiceContent, "faqs"> & {
  faqs?: { question: string; answer: string }[];
};

export async function getServices(): Promise<ServiceContent[]> {
  const result = await querySanity<SanityService[]>(
    `*[_type == "service"] | order(order asc) { title, "slug": slug.current, icon, description, problem, capabilities, technology, "faqs": faqs[]{question, answer} }`,
    [],
  );

  return result.length
    ? result.map((service) => ({
        ...service,
        faqs: (service.faqs ?? []).map(({ question, answer }) => [question, answer] as [string, string]),
      }))
    : [...services];
}

  export async function getServiceBySlug(slug: string): Promise<ServiceContent | undefined> {
  const local = services.find((service) => service.slug === slug);
  const result = await querySanity<SanityService | null>(
    `*[_type == "service" && slug.current == $slug][0] { title, "slug": slug.current, icon, description, problem, capabilities, technology, "faqs": faqs[]{question, answer} }`,
    null,
  );

  if (!result) return local;
  return {
    ...result,
    faqs: (result.faqs ?? []).map(({ question, answer }) => [question, answer] as [string, string]),
  };
}

export type CaseStudyContent = {
  slug: string;
  name: string;
  category: string;
  image: string;
  alt: string;
  website: string;
  intro: string;
  challenge: string;
  delivery: string;
  result: string;
  technology: string;
};

type SanityCaseStudy = Omit<CaseStudyContent, "image" | "alt"> & {
  image?: string;
  alt?: string;
};

const caseStudyQuery = `*[_type == "caseStudy"] | order(order asc) { name, "slug": slug.current, category, "image": image.asset->url, "alt": image.alt, website, intro, challenge, delivery, result, technology }`;
const caseStudyFields = `{ name, "slug": slug.current, category, "image": image.asset->url, "alt": image.alt, website, intro, challenge, delivery, result, technology }`;

export async function getCaseStudies(): Promise<CaseStudyContent[]> {
  const result = await querySanity<SanityCaseStudy[]>(caseStudyQuery, []);
  if (!result.length) return [...caseStudies];

  return result.map((study) => ({
    ...study,
    image: study.image || caseStudies.find((item) => item.slug === study.slug)?.image || "/images/projects/psdigilabs.webp",
    alt: study.alt || `${study.name} project website`,
  }));
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyContent | undefined> {
  const local = caseStudies.find((study) => study.slug === slug);
  const result = await querySanity<SanityCaseStudy | null>(
    `*[_type == "caseStudy" && slug.current == $slug][0] ${caseStudyFields}`,
    null,
  );
  if (!result) return local;

  return {
    ...result,
    image: result.image || local?.image || "/images/projects/psdigilabs.webp",
    alt: result.alt || `${result.name} project website`,
  };
}

export type ResourceContent = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  readTime: string;
  published: string;
  sections: readonly { heading: string; paragraphs: readonly string[] }[];
};

type SanityResource = ResourceContent;
const resourceQuery = `*[_type == "resource"] | order(published desc) { title, "slug": slug.current, category, summary, readTime, published, "sections": sections[]{heading, paragraphs} }`;
const resourceFields = `{ title, "slug": slug.current, category, summary, readTime, published, "sections": sections[]{heading, paragraphs} }`;

export async function getResources(): Promise<ResourceContent[]> {
  const result = await querySanity<SanityResource[]>(resourceQuery, []);
  return result.length ? result : [...resources];
}

export async function getResourceBySlug(slug: string): Promise<ResourceContent | null> {
  const local = resources.find((resource) => resource.slug === slug);
  return querySanity<SanityResource | null>(
    `*[_type == "resource" && slug.current == $slug][0] ${resourceFields}`,
    local ?? null,
  );
}