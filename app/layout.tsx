import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import "./reference.css";
import "./rectification.css";
import { Assistant } from "@/components/chatbot/assistant";
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const siteUrl = "https://www.psdigilabs.in";
const title = "PSDigiLabs \u2014 Web, Android & Software Testing";
const description =
  "PSDigiLabs builds modern websites and Android applications and provides manual testing, automation testing and workflow automation solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: siteUrl, siteName: "PSDigiLabs", locale: "en_IN", type: "website" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={geist.variable}>
      <body>{children}<Assistant /></body>
    </html>
  );
}
