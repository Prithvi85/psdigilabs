import {
  PROFILE_DOWNLOAD_FILENAME,
  PROFILE_DOWNLOAD_URL,
} from "@/data/downloads";

export function AboutSection() {
  return (
    <section id="about" className="sidebar-section section-anchor"><p className="eyebrow light-eyebrow">PROFILE</p><h2>ABOUT ME</h2><p>My background spans business analysis, Scrum/Agile, project coordination, UI/UX, manual and automation testing, web development, Android development and workflow automation.</p><a className="button sidebar-resume" href={PROFILE_DOWNLOAD_URL} download={PROFILE_DOWNLOAD_FILENAME} aria-label="Download PSDigiLabs professional profile PDF">DOWNLOAD RESUME <span aria-hidden="true">&#8595;</span></a></section>
  );
}
