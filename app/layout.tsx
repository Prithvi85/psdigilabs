import Script from "next/script";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import "./redesign.css";
import { Assistant } from "@/components/chatbot/assistant";
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const siteUrl = "https://www.psdigilabs.in";
const title = "PSDigiLabs \u2014 Web, Android & Software Testing";
const description =
  "PSDigiLabs builds modern websites and Android applications and provides manual testing, automation testing and workflow automation solutions.";
const socialImage = `${siteUrl}/images/branding/psdigilabs-social.jpg`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "PSDigiLabs", url: `${siteUrl}/`, logo: `${siteUrl}/images/branding/logo.png`, description },
    { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: `${siteUrl}/`, name: "PSDigiLabs", description, publisher: { "@id": `${siteUrl}/#organization` } },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "PSDigiLabs",
      url: `${siteUrl}/`,
      image: socialImage,
      description,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: ["India", "International"],
      serviceType: ["Website development", "Android application development", "Manual software testing", "Automation testing", "Workflow automation"],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title, description, url: siteUrl, siteName: "PSDigiLabs", locale: "en_IN", type: "website",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "PSDigiLabs digital product engineering" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
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
