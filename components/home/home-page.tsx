import Link from "next/link";
import { Reveal } from "@/components/brand/reveal";
import { CaseStudyCard } from "@/components/work/case-study-card";
import { ServiceCard } from "@/components/services/service-card";
import { deliveryProcess } from "@/data/services";
import { getCaseStudies, getServices } from "@/lib/sanity-content";

export async function HomePage() {
  const [caseStudies, services] = await Promise.all([getCaseStudies(), getServices()]);

  return (
    <main className="studio-page">
      <section className="studio-home-hero">
        <div className="studio-container studio-home-hero-grid">
          <div className="studio-home-copy">
            <p className="studio-eyebrow studio-eyebrow-light"><span className="studio-status-dot" /> Independent product engineering studio</p>
            <h1 className="studio-display">We build Next.js websites and Android apps that <span>work harder.</span></h1>
            <p className="studio-home-lede">From Next.js websites to Android apps, quality engineering and automated workflows. Clear scope, careful delivery, useful software.</p>
            <div className="studio-hero-actions">
              <Link href="/contact" className="studio-button studio-button-lime">Tell us what you&apos;re building <span aria-hidden="true">↗</span></Link>
              <Link href="/work" className="studio-text-link">See selected work <span aria-hidden="true">↗</span></Link>
            </div>
            <p className="studio-response-note">We&apos;ll review your brief and aim to reply within one business day.</p>
          </div>
          <div className="studio-home-visual">
            <div className="studio-visual-chrome"><span><i /><i /><i /></span><small>PSDIGILABS / PRODUCT ENGINEERING</small><span>LIVE SYSTEM</span></div>
            <div className="studio-visual-screen">
              <div className="studio-build-window">
                <div className="studio-build-heading"><span>DELIVERY FLOW</span><span>PROJECT / 01</span></div>
                <p>Make the complex<br /><strong>work as one.</strong></p>
                <ol>
                  <li><span>01</span><b>Understand</b><small>BRIEF MAPPED</small><i>✓</i></li>
                  <li><span>02</span><b>Scope</b><small>PLAN AGREED</small><i>✓</i></li>
                  <li><span>03</span><b>Build &amp; verify</b><small>QUALITY IN LOOP</small><i className="studio-build-current" /></li>
                  <li><span>04</span><b>Launch</b><small>READY WHEN IT IS</small><i /></li>
                </ol>
                <div className="studio-build-footer"><span>ENGINEERING NOTE</span><strong>Clear scope. Useful software.</strong></div>
              </div>
            </div>
            <div className="studio-visual-index"><span>01</span><div><small>THE STUDIO</small><strong>Build / Test / Automate</strong></div><span aria-hidden="true">↗</span></div>
          </div>
        </div>
        <div className="studio-home-hero-footer"><div className="studio-container"><span>FROM FIRST BRIEF</span><i /><span>TO A PRODUCT PEOPLE CAN USE</span><span className="studio-home-location">KOLKATA / WORKING WORLDWIDE</span></div></div>
      </section>

      <section className="studio-proof-strip" aria-label="Selected clients and studio capabilities">
        <div className="studio-container studio-proof-grid">
          <span className="studio-proof-label"><strong>3</strong><small>live websites</small></span>
          <span className="studio-proof-client"><strong>Ritika Jaiswal Fashion</strong><small>Fashion website + CMS</small></span>
          <span className="studio-proof-client"><strong>CreativeMonks</strong><small>Photography website + CMS</small></span>
          <span className="studio-proof-client"><strong>PSDigiLabs</strong><small>Product engineering platform</small></span>
        </div>
      </section>

      <section className="studio-section" aria-labelledby="home-services-title">
        <div className="studio-container">
          <Reveal className="studio-section-intro studio-section-intro-row">
            <div><p className="studio-eyebrow">What we do</p><h2 id="home-services-title" className="studio-display">A small team for the hard parts.</h2></div>
            <p>Bring in the capability you need, or connect the whole path from product idea to dependable release.</p>
          </Reveal>
          <div className="studio-service-grid">
            {services.map((service, index) => <Reveal key={service.slug} delay={index * 70}><ServiceCard service={service} index={index} /></Reveal>)}
          </div>
          <div className="studio-section-footer"><Link className="studio-inline-link" href="/services">Explore all services <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>

      <section className="studio-section studio-section-paper" aria-labelledby="home-work-title">
        <div className="studio-container">
          <Reveal className="studio-section-intro studio-section-intro-row">
            <div><p className="studio-eyebrow">Selected work</p><h2 id="home-work-title" className="studio-display">Made for real businesses.</h2></div>
            <p>Live websites across fashion, photography and product engineering. Project outcomes are shared only where they are verified.</p>
          </Reveal>
          <div className="studio-work-grid">
            {caseStudies.map((study, index) => <Reveal key={study.slug} delay={index * 70}><CaseStudyCard study={study} /></Reveal>)}
          </div>
          <div className="studio-section-footer"><Link className="studio-inline-link" href="/work">More about the work <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>

      <section className="studio-section" aria-labelledby="home-process-title">
        <div className="studio-container">
          <Reveal className="studio-section-intro studio-section-intro-row">
            <div><p className="studio-eyebrow">How we work</p><h2 id="home-process-title" className="studio-display">Clarity before velocity.</h2></div>
            <p>A visible process keeps the brief, delivery decisions and quality checks connected from the first conversation.</p>
          </Reveal>
          <ol className="studio-process-grid">
            {deliveryProcess.map((step, index) => <li key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="studio-section studio-section-paper" aria-labelledby="home-why-title">
        <div className="studio-container studio-section-intro studio-section-intro-row">
          <div><p className="studio-eyebrow">Why PSDigiLabs?</p><h2 id="home-why-title" className="studio-display">One perspective from business intent to software quality.</h2></div>
          <div><p>The founder&apos;s experience spans business analysis, Scrum and Agile delivery, UI/UX, testing, web and Android development. That range keeps user needs, engineering decisions and release quality connected.</p><Link className="studio-inline-link" href="/about">Meet the studio <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>

      <section className="studio-stack-band">
        <div className="studio-container studio-stack-inner"><div><p className="studio-eyebrow">Engineering, not theatre</p><h2 className="studio-display">Quality is part of the build.</h2></div><div className="studio-stack-tags"><span>Next.js</span><span>React</span><span>Kotlin</span><span>Selenium</span><span>Postman</span><span>Make</span><span>Activepieces</span><span>PostgreSQL</span></div></div>
      </section>

      <section className="studio-home-cta">
        <div className="studio-container studio-home-cta-inner"><div><p className="studio-eyebrow studio-eyebrow-light">Have a product in mind?</p><h2 className="studio-display">Let&apos;s make the next step clear.</h2><p>Tell us what is changing, what is getting in the way and what success should look like.</p></div><div><Link className="studio-button studio-button-lime" href="/contact">Start a project conversation <span aria-hidden="true">↗</span></Link><small>We&apos;ll aim to reply within one business day.</small></div></div>
      </section>
    </main>
  );
}
