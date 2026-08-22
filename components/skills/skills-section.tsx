import { skillCategories } from "@/data/skills";

export function SkillsSection() {
  return (
    <section id="skills" className="sidebar-section section-anchor"><p className="eyebrow light-eyebrow">TOOLS &amp; TECHNOLOGIES</p><h2>TECH STACK</h2><div className="skills-grid">{skillCategories.flatMap((category) => category.skills).filter((skill, index, list) => list.indexOf(skill) === index).map((skill) => <span key={skill}>{skill}</span>)}</div></section>
  );
}
