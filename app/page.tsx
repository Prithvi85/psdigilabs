import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";

export const metadata: Metadata = {
  title: "Digital Product Engineering Studio",
  description: "PSDigiLabs builds custom websites, native Android apps, quality engineering and workflow automation for teams in India and worldwide.",
  alternates: { canonical: "/" },
};

export default function Home() { return <HomePage />; }