"use client";

import {
  PROFILE_DOWNLOAD_FILENAME,
  PROFILE_DOWNLOAD_URL,
} from "@/data/downloads";

export const HeroSection = () => {
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
      className="hero-composite-wrapper section-anchor relative w-full overflow-hidden bg-[#eaf2fd] min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center"
    >
      {/* 1. Full-Bleed Edge-to-Edge Background Video Canvas */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-[82%_center] sm:object-[80%_center] md:object-right"
          src="/videos/hero.mp4"
        />
        {/* Soft edge-masking gradient: ensures live typography stays crisp against background circuitry */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#eaf2fd] via-[#eaf2fd]/80 to-transparent w-full md:w-[60%] pointer-events-none z-10" />
      </div>

      {/* 2. Left-Aligned Typography & Live Interactive Buttons */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 lg:px-14 py-16 md:py-24">
        <div className="relative z-20 max-w-[540px] pt-4 sm:pt-6 text-left">
          
          {/* Distinct Navy Capsule Badge with Glowing Pulsing Cyan Dot */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0b3888] text-white shadow-sm border border-blue-400/30 text-[11px] font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" aria-hidden="true" />
              DIGITAL PRODUCT ENGINEERING
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-950 leading-tight mb-4">
            Building Digital Products That{" "}
            <span className="text-[#1769e0] font-black">Work Harder.</span>
          </h1>

          {/* Subparagraph */}
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-8 max-w-lg">
            PSDigiLabs builds modern websites and Android applications, strengthens software quality, and connects business workflows through practical automation.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto">
            <a
              href="#projects"
              onClick={handleExploreWork}
              className="relative z-30 inline-flex items-center justify-center py-3.5 px-7 rounded-full bg-[#1769e0] hover:bg-blue-700 text-white text-xs font-bold tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              EXPLORE OUR WORK <span className="ml-2 text-sm" aria-hidden="true">&#8594;</span>
            </a>

            <a
              href={PROFILE_DOWNLOAD_URL}
              download={PROFILE_DOWNLOAD_FILENAME}
              className="relative z-30 inline-flex items-center justify-center py-3.5 px-7 rounded-full bg-white text-slate-800 text-xs font-bold tracking-wider border border-slate-200 shadow-sm hover:bg-slate-50 transition-all active:scale-95 cursor-pointer"
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