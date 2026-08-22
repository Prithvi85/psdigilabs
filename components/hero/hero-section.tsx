import Image from "next/image";

export function HeroSection() {
  return (
    <section id="home" className="hero section-anchor">
      <div className="container hero-inner">
        <Image
          className="hero-image"
          src="/images/hero/hero.jpeg"
          alt="PSDigiLabs — Build, Test and Automate"
          width={1279}
          height={304}
          priority
          sizes="(max-width: 767px) calc(100vw - 30px), (max-width: 1023px) calc(100vw - 40px), (max-width: 1328px) calc(100vw - 48px), 1280px"
        />
      </div>
    </section>
  );
}
