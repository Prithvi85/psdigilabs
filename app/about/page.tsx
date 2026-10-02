import type { Metadata } from "next";
import Link from "next/link";
import { skillCategories } from "@/data/skills";
import { Reveal } from "@/components/brand/reveal";

export const metadata: Metadata = {
  title: "About the Studio",
  description: "Meet PSDigiLabs: a founder-led engineering studio connecting business analysis, product design, development and quality assurance.",
  alternates: { canonical: "/about" },
};

const values = [
  ["Understand first", "We ask what the work needs to change before choosing a framework or writing a ticket."],
  ["Make quality visible", "Testing is part of planning and delivery, not a last-minute gate before launch."],
  ["Keep it maintainable", "We favor clear systems, useful documentation and handovers your team can own."],
  ["Say what we know", "We make assumptions, trade-offs, scope and unknowns explicit so decisions stay grounded."],
] as const;

export default function AboutPage() {
  return (
    <main className="studio-page">
      <section className="studio-interior-hero">
        <div className="studio-container studio-about-hero-grid">
          <div><p className="studio-eyebrow">About the studio</p><h1 className="studio-display">Engineering is better<br />when it starts with <span>understanding.</span></h1></div>
          <p>PSDigiLabs is a founder-led digital product engineering studio in India, working with teams that need thoughtful software delivery without unnecessary layers.</p>
        </div>
      </section>
      <section className="studio-section">
        <div className="studio-container studio-founder-grid">
          <Reveal><div className="studio-founder-stamp"><span>BUSINESS</span><i /><span>PRODUCT</span><i /><span>ENGINEERING</span></div></Reveal>
          <Reveal className="studio-founder-copy" delay={90}>
            <p className="studio-eyebrow">A cross-disciplinary point of view</p>
            <h2 className="studio-display">One conversation from the brief to the build.</h2>
            <p>The founder&apos;s background spans business analysis, Scrum and Agile delivery, project coordination, UI/UX, manual and automated testing, web development, Android development and workflow automation.</p>
            <p>That mix shapes how the studio works: connect business intent to a product decision, keep the user journey visible, and build verification into delivery.</p>
            <Link href="/contact" className="studio-inline-link">Start a conversation <span aria-hidden="true">↗</span></Link>
          </Reveal>
        </div>
      </section>
      <section className="studio-section studio-section-paper">
        <div className="studio-container">
          <div className="studio-section-intro"><p className="studio-eyebrow">Why PSDigiLabs</p><h2 className="studio-display">Good engineering is a way of working.</h2><p>Clear choices and steady communication matter as much as the tools.</p></div>
          <div className="studio-values-grid">{values.map(([title, text], index) => <Reveal key={title} delay={index * 60}><article><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div>
        </div>
      </section>
      <section className="studio-section">
        <div className="studio-container">
          <div className="studio-section-intro"><p className="studio-eyebrow">Capabilities</p><h2 className="studio-display">A practical range, connected.</h2></div>
          <div className="studio-skills-grid">{skillCategories.map((category) => <section key={category.title}><h3>{category.title}</h3><ul>{category.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></section>)}</div>
        </div>
      </section>
      <section className="studio-section studio-section-ink">
        <div className="studio-container studio-quote-band"><div><p className="studio-eyebrow studio-eyebrow-light">Work with the studio</p><h2 className="studio-display">Bring the hard part.<br />We&apos;ll help make a plan.</h2></div><Link className="studio-button studio-button-lime" href="/contact">Tell us what you need <span aria-hidden="true">↗</span></Link></div>
      </section>
    </main>
  );
}
