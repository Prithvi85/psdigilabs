import Image from "next/image";
import { Icon } from "@/components/ui/icon";

export function HeroSection() {
  return (
    <section id="home" className="hero section-anchor">
      <div className="hero-grid-pattern" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow dark-eyebrow">Hi, I&apos;m PRITHWISH SAHA</p>
          <h1>I BUILD. I TEST.<br /><span>I AUTOMATE.</span></h1>
          <p className="hero-lead">I build modern websites and Android apps, perform Manual &amp; Automation Testing, and create intelligent automation solutions that help businesses grow.</p>
          <div className="button-row">
            <a className="button button-primary" href="#projects">EXPLORE MY WORK <Icon name="arrow" /></a>
            <button className="button button-secondary" type="button" aria-label="Download resume - resume file coming soon">DOWNLOAD RESUME</button>
          </div>
        </div>
        <div className="hero-visual">
          <Image src="/images/hero/hero.png" alt="Laptop, mobile phone and PSDigiLabs cup representing digital development, testing and automation" width={1535} height={436} priority sizes="(max-width: 1023px) 100vw, 57vw" />
        </div>
      </div>
    </section>
  );
}
