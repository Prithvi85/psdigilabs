import Script from "next/script";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./redesign.css";
import { Assistant } from "@/components/chatbot/assistant";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-heading", display: "swap" });

const siteUrl = "https://www.psdigilabs.in";
const defaultTitle = "Website Development Company in India | PSDigiLabs";
const defaultDescription =
  "PSDigiLabs is a web development company in India building fast Next.js websites, custom Android apps, automated testing suites, and workflow automation.";
const socialImage = `${siteUrl}/images/branding/psdigilabs-social.jpg`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "PSDigiLabs",
      url: `${siteUrl}/`,
      logo: `${siteUrl}/images/branding/logo.png`,
      description: defaultDescription,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "PSDigiLabs",
      description: defaultDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "PSDigiLabs",
      url: `${siteUrl}/`,
      image: socialImage,
      description: defaultDescription,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: [
        { "@type": "City", name: "Kolkata" },
        { "@type": "Country", name: "India" },
        "International",
      ],
      serviceType: [
        "Website development",
        "Next.js development",
        "Android application development",
        "Manual software testing",
        "Automation testing",
        "Workflow automation",
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | PSDigiLabs",
  },
  description: defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName: "PSDigiLabs",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "PSDigiLabs digital product engineering and website development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [socialImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Assistant />

        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}