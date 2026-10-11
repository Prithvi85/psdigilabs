"use client";

import { useEffect, useRef, useState } from "react";

export type Testimonial = {
  _id: string;
  name: string;
  role?: string;
  company?: string;
  quote: string;
  rating?: number;
  serviceReceived?: string;
};

const AUTOPLAY_MS = 6000;

export function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduced || paused || testimonials.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, reduced, testimonials.length]);

  if (testimonials.length === 0) return null;

  const current = testimonials[index];

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <section
      className="studio-testimonials"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      ref={containerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <header className="studio-testimonials-header">
        <p className="studio-testimonials-eyebrow">CUSTOMER FEEDBACK</p>
        <h2 className="studio-testimonials-heading">What our clients say.</h2>
      </header>

      <div
        className="studio-testimonials-viewport"
        aria-live="polite"
        aria-atomic="true"
      >
        <blockquote className="studio-testimonials-quote" key={current._id}>
          <p>“{current.quote}”</p>
          <footer>
            <cite>
              <strong>{current.name}</strong>
              {(current.role || current.company) && (
                <span>
                  {current.role}
                  {current.role && current.company ? " · " : ""}
                  {current.company}
                </span>
              )}
            </cite>
            {current.rating ? (
              <span
                className="studio-testimonials-rating"
                aria-label={`Rated ${current.rating} out of 5`}
              >
                {"★".repeat(current.rating)}
                <span aria-hidden="true">{"☆".repeat(5 - current.rating)}</span>
              </span>
            ) : null}
          </footer>
        </blockquote>
      </div>

      {testimonials.length > 1 && (
        <div className="studio-testimonials-controls">
          <button
            type="button"
            className="studio-testimonials-arrow"
            aria-label="Previous testimonial"
            onClick={prev}
          >
            ←
          </button>

          <div className="studio-testimonials-dots" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((t, i) => (
              <button
                key={t._id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial ${i + 1} of ${testimonials.length}`}
                className={`studio-testimonials-dot ${i === index ? "is-active" : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="studio-testimonials-arrow"
            aria-label="Next testimonial"
            onClick={next}
          >
            →
          </button>
        </div>
      )}
    </section>
  );
}