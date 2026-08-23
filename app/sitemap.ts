import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://www.psdigilabs.in", changeFrequency: "monthly", priority: 1 }, { url: "https://www.psdigilabs.in/pricing", changeFrequency: "monthly", priority: 0.8 }, { url: "https://www.psdigilabs.in/contact", changeFrequency: "yearly", priority: 0.8 }];
}
