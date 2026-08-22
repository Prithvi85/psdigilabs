import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://www.psdigilabs.in", changeFrequency: "monthly", priority: 1 }];
}
