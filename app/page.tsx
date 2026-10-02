import { AboutSection } from "@/components/about/about-section";
import { ContactSection } from "@/components/contact/contact-section";
import { HeroSection } from "@/components/hero/hero-section";
import { ProjectsSection } from "@/components/projects/projects-section";
import { ServicesSection } from "@/components/services/services-section";
import { SkillsSection } from "@/components/skills/skills-section";
import { StatsSection } from "@/components/stats/stats-section";
import { PricingPreview } from "@/components/pricing/pricing-preview";
import { ProcessSection } from "@/components/process/process-section";

export default function Home() {
  return <><HeroSection /><StatsSection /><ServicesSection /><ProjectsSection /><ProcessSection /><SkillsSection /><PricingPreview /><AboutSection /><ContactSection /></>;
}