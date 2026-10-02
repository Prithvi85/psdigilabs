import type { Metadata } from "next";

export const SITE_URL = "https://www.psdigilabs.in";
export const SOCIAL_IMAGE = `${SITE_URL}/images/branding/psdigilabs-social.jpg`;

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const brandedTitle = `${title} | PSDigiLabs`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: brandedTitle,
      description,
      url,
      siteName: "PSDigiLabs",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: SOCIAL_IMAGE,
          width: 1200,
          height: 630,
          alt: "PSDigiLabs digital product engineering and website development",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: [SOCIAL_IMAGE],
    },
  };
}
