"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";

export function ProjectSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const advance = useCallback(() => {
    setIndex((current) => {
      const next = current + direction;
      if (next >= projects.length) { setDirection(-1); return Math.max(0, current - 1); }
      if (next < 0) { setDirection(1); return Math.min(projects.length - 1, current + 1); }
      return next;
    });
  }, [direction]);

  const previous = useCallback(() => { setDirection(-1); setIndex((value) => value === 0 ? projects.length - 1 : value - 1); }, []);
  const next = useCallback(() => { setDirection(1); setIndex((value) => value === projects.length - 1 ? 0 : value + 1); }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(advance, 4500);
    return () => window.clearTimeout(timer);
  }, [advance, paused]);

  return (
    <div className="slider-shell" role="region" aria-roledescription="carousel" aria-label="Featured projects" tabIndex={0}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
      onKeyDown={(event) => { if (event.key === "ArrowLeft") previous(); if (event.key === "ArrowRight") next(); }}
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const delta = touchStart.current - event.changedTouches[0].clientX; if (Math.abs(delta) > 50) { if (delta > 0) next(); else previous(); } touchStart.current = null; }}>
      <div className="slider-viewport"><div className="slider-track" style={{ transform: `translateX(-${index * 100}%)` }}>{projects.map((project, projectIndex) => <ProjectCard key={project.name} project={project} active={projectIndex === index} />)}</div></div>
      <button type="button" className="slider-control previous" aria-label="Previous project" onClick={previous}>&lsaquo;</button>
      <button type="button" className="slider-control next" aria-label="Next project" onClick={next}>&rsaquo;</button>
      <div className="slider-dots" role="tablist" aria-label="Choose project">{projects.map((project, projectIndex) => <button type="button" role="tab" aria-selected={projectIndex === index} aria-label={`Show ${project.name}`} key={project.name} className={projectIndex === index ? "active" : ""} onClick={() => { setIndex(projectIndex); setDirection(projectIndex > index ? 1 : -1); }} />)}</div>
      <p className="sr-only" aria-live="polite">{projects[index].name}, project {index + 1} of {projects.length}</p>
    </div>
  );
}
