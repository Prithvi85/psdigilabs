"use client";

import { useEffect, useRef, useState } from "react";
import {
  PROFILE_DOWNLOAD_FILENAME,
  PROFILE_DOWNLOAD_URL,
} from "@/data/downloads";

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const muteVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = true;
    setIsMuted(true);
  };

  const handleSoundToggle = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);

    if (!video.muted) {
      try {
        await video.play();
      } catch {
        video.muted = true;
        setIsMuted(true);
      }
    }
  };

  const handleExploreWork = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.history.pushState(null, "", "#projects");
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => undefined);

    const enableAudioAfterInteraction = () => {
      const activeVideo = videoRef.current;
      if (!activeVideo) return;

      activeVideo.muted = false;
      setIsMuted(false);

      activeVideo.play().catch(() => {
        activeVideo.muted = true;
        setIsMuted(true);
      });
    };

    const handleNavigationClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const href = target.closest("a")?.getAttribute("href");

      if (
        href === "#pricing" ||
        href === "#contact" ||
        href === "/pricing" ||
        href === "/contact"
      ) {
        muteVideo();
      }
    };

    window.addEventListener("pointerdown", enableAudioAfterInteraction, {
      once: true,
    });
    window.addEventListener("keydown", enableAudioAfterInteraction, {
      once: true,
    });
    document.addEventListener("click", handleNavigationClick);

    return () => {
      window.removeEventListener("pointerdown", enableAudioAfterInteraction);
      window.removeEventListener("keydown", enableAudioAfterInteraction);
      document.removeEventListener("click", handleNavigationClick);
    };
  }, []);

  return (
    <section
      id="home"
      className="hero-composite-wrapper section-anchor relative w-full overflow-hidden bg-[#eaf2fd] min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center"
    >
      {/* 1. Full-Bleed Edge-to-Edge Background Video Canvas */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-[75%_center] lg:object-right"
          src="/videos/hero.mp4"
        />
        {/* Soft edge-masking gradient: ensures live typography stays crisp against background circuitry */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#eaf2fd] via-[#eaf2fd]/85 sm:via-[#eaf2fd]/70 to-transparent w-full md:w-[62%] lg:w-[52%]" />
      </div>

      {/* 2. Floating Audio Button */}
      <button
        type="button"
        aria-label={isMuted ? "Turn sound on" : "Turn sound off"}
        aria-pressed={!isMuted}
        onClick={handleSoundToggle}
        className="absolute top-5 right-6 z-40 inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-blue-400/30 bg-[#0c3882] text-white shadow-lg transition-colors hover:bg-[#1769e0] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:ring-offset-2 focus:ring-offset-[#eaf2fd] active:scale-95 cursor-pointer"
      >
        {isMuted ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
          >
            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
            <path d="m23 9-6 6M17 9l6 6" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
          >
            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        )}
      </button>

      {/* 3. Left-Aligned Typography & Live Interactive Buttons */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 lg:px-14 py-16 md:py-24">
        <div className="max-w-[540px] text-left">
          
          {/* Distinct Navy Capsule Badge with Glowing Pulsing Cyan Dot */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0c3882] text-white shadow-sm border border-blue-400/30 text-[11px] font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" aria-hidden="true" />
              DIGITAL PRODUCT ENGINEERING
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black tracking-tight text-slate-900 leading-[1.12] mb-4">
            Building Digital Products That{" "}
            <span className="text-[#1769e0]">Work Harder.</span>
          </h1>

          {/* Subparagraph */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 max-w-lg font-normal">
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