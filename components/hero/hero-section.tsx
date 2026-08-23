import Image from "next/image";
import Link from "next/link";

import {
  PROFILE_DOWNLOAD_FILENAME,
  PROFILE_DOWNLOAD_URL,
} from "@/data/downloads";

export function HeroSection() {
  return (
    <section id="home" className="hero section-anchor">
      <div className="container hero-inner">
        <div className="hero-artwork">
          <Image
            className="hero-image"
            src="/images/hero/hero.jpeg"
            alt="PSDigiLabs — Build, Test and Automate"
            width={1279}
            height={304}
            priority
            style={{ width: "100%", height: "auto" }}
            sizes="(max-width: 767px) calc(100vw - 30px), (max-width: 1023px) calc(100vw - 40px), (max-width: 1328px) calc(100vw - 48px), 1280px"
          />
          <Link className="hero-hit-area hero-main-link" href="/#projects" aria-label="View PSDigiLabs projects" />
          <Link className="hero-hit-area hero-projects-link" href="/#projects" aria-label="Explore PSDigiLabs projects" />
          <a
            className="hero-hit-area hero-resume-link"
            href={PROFILE_DOWNLOAD_URL}
            download={PROFILE_DOWNLOAD_FILENAME}
            aria-label="Download PSDigiLabs professional profile PDF"
          />
        </div>
      </div>
    </section>
  );
}
