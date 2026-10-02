"use client";

import { useEffect, useRef } from "react";
import {
  PROFILE_DOWNLOAD_FILENAME,
  PROFILE_DOWNLOAD_URL,
} from "@/data/downloads";

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    video.defaultMuted = true;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  const handleExploreWork = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.history.pushState(null, "", "#projects");
  };

  return (
    <section
      id="home"
      className="hero-composite-wrapper section-anchor relative flex min-h-[580px] w-full items-center overflow-hidden bg-[#eaf2fd] sm:min-h-[640px] lg:min-h-[700px]"
    >
      {/* 1. Full-Bleed Edge-to-Edge Background Video Canvas */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none overflow-hidden">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="h-full w-full object-cover object-[82%_center] sm:object-[80%_center] md:object-right"
          src="/videos/hero.mp4?v=2"
        />
        {/* Soft edge-masking gradient: ensures live typography stays crisp against background circuitry */}
        <div className="pointer-events-none absolute inset-0 z-10 w-full bg-gradient-to-r from-[#eaf2fd] via-[#eaf2fd]/80 to-transparent md:w-[60%]" />
      </div>

      {/* 2. Left-Aligned Typography & Live Interactive Buttons */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 py-16 md:py-24 lg:px-14">
        <div className="relative z-20 max-w-[560px] pt-4 text-left sm:pt-6">
          {/* Digital product engineering badge */}
          <div className="hero-badge-wrap">
            <span className="hero-engineering-badge">
              <span className="hero-engineering-badge-dot" aria-hidden="true" />
              <span className="hero-engineering-badge-text">
                DIGITAL PRODUCT ENGINEERING
              </span>
            </span>
          </div>

          {/* Headline - Aligned with commercial search intent */}
          <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Building Digital Products That{" "}
            <span className="font-black text-[#1769e0]">Work Harder.</span>
          </h1>

          {/* Subparagraph - Keyword-rich value proposition */}
          <p className="mb-8 max-w-lg text-sm leading-relaxed text-slate-700 sm:text-base">
            PSDigiLabs builds custom Next.js websites, native Android applications, automated software testing suites, and workflow automation solutions for businesses in India and worldwide.
          </p>

          {/* Action Buttons */}
          <div className="hero-action-row">
            <a
              href="#projects"
              onClick={handleExploreWork}
              className="hero-action hero-action-primary"
            >
              EXPLORE OUR WORK <span className="hero-action-icon" aria-hidden="true">&#8594;</span>
            </a>

            <a
              href={PROFILE_DOWNLOAD_URL}
              download={PROFILE_DOWNLOAD_FILENAME}
              className="hero-action hero-action-secondary"
            >
              DOWNLOAD PROFILE <span className="hero-action-icon" aria-hidden="true">&#8595;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;