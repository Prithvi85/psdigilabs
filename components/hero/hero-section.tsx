"use client";

import { useEffect, useRef } from "react";
import {
  PROFILE_DOWNLOAD_FILENAME,
  PROFILE_DOWNLOAD_URL,
} from "@/data/downloads";

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
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
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-[82%_center] sm:object-[80%_center] md:object-right"
          src="/videos/hero.mp4?v=2"
        />
        {/* Soft edge-masking gradient: ensures live typography stays crisp against background circuitry */}
        <div className="pointer-events-none absolute inset-0 z-10 w-full bg-gradient-to-r from-[#eaf2fd] via-[#eaf2fd]/80 to-transparent md:w-[60%]" />
      </div>

      {/* 2. Left-Aligned Typography & Live Interactive Buttons */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 py-16 md:py-24 lg:px-14">
        <div className="relative z-20 max-w-[560px] pt-4 text-left sm:pt-6">
          {/* Distinct Navy Capsule Badge with Glowing Pulsing Cyan Dot */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-blue-400/30 bg-[#0b3888] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
              <span
                className="h-2 w-2 animate-pulse rounded-full bg-[#38bdf8]"
                aria-hidden="true"
              />
              DIGITAL PRODUCT ENGINEERING &bull; INDIA
            </span>
          </div>

          {/* Headline - Aligned with commercial search intent */}
          <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Website Development &amp; App Solutions That{" "}
            <span className="font-black text-[#1769e0]">Work Harder.</span>
          </h1>

          {/* Subparagraph - Keyword-rich value proposition */}
          <p className="mb-8 max-w-lg text-sm leading-relaxed text-slate-700 sm:text-base">
            PSDigiLabs builds custom Next.js websites, native Android applications, automated software testing suites, and workflow automation solutions for businesses in India and worldwide.
          </p>

          {/* Action Buttons */}
          <div className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row">
            <a
              href="#projects"
              onClick={handleExploreWork}
              className="relative z-30 inline-flex cursor-pointer items-center justify-center rounded-full bg-[#1769e0] px-7 py-3.5 text-xs font-bold tracking-wider text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
            >
              EXPLORE OUR WORK <span className="ml-2 text-sm" aria-hidden="true">&#8594;</span>
            </a>

            <a
              href={PROFILE_DOWNLOAD_URL}
              download={PROFILE_DOWNLOAD_FILENAME}
              className="relative z-30 inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-xs font-bold tracking-wider text-slate-800 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
            >
              DOWNLOAD PROFILE <span className="ml-2 text-sm" aria-hidden="true">&#8595;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;