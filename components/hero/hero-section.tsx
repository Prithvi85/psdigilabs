import Link from "next/link";

import {
  PROFILE_DOWNLOAD_FILENAME,
  PROFILE_DOWNLOAD_URL,
} from "@/data/downloads";

export function HeroSection() {
  return (
    <section id="home" className="hero section-anchor">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow"><span aria-hidden="true" />DIGITAL PRODUCT ENGINEERING</p>
          <h1>
            Building Digital<br />
            Products That<br />
            <span>Work Harder.</span>
          </h1>
          <p className="hero-description">
            PSDigiLabs builds modern websites and Android applications,{" "}<br className="hero-copy-break" />
            strengthens software quality, and connects business workflows{" "}<br className="hero-copy-break" />
            through practical automation.
          </p>
          <div className="hero-mobile-artwork" aria-hidden="true" />
          <div className="hero-actions">
            <Link className="button button-primary" href="/#projects">
              EXPLORE OUR WORK <span aria-hidden="true">&#8594;</span>
            </Link>
            <a
              className="button button-secondary"
              href={PROFILE_DOWNLOAD_URL}
              download={PROFILE_DOWNLOAD_FILENAME}
            >
              DOWNLOAD PROFILE <span aria-hidden="true">&#8595;</span>
            </a>
          </div>
          <p className="hero-signature">
            BUILD <span>&bull;</span> TEST <span>&bull;</span> AUTOMATE
          </p>
        </div>
      </div>
    </section>
  );
}
