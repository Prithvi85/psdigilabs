import { ContactForm } from "@/components/contact/contact-form";

export const metadata = {
  title: "Contact PSDigiLabs | Start a Project Conversation",
  description:
    "Share your goals, users, key functionality, and timeline to begin a technical project discussion with PSDigiLabs.",
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-hero-banner">
        <div className="contact-hero-inner">
          <p className="hero-pill">START A CONVERSATION</p>
          <h1>LET&apos;S BUILD SOMETHING THAT WORKS</h1>
          <p className="hero-desc">
            Tell PSDigiLabs what you want to build and share enough detail to begin a meaningful project discussion.
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container contact-content-grid">
          <div className="contact-page-intro">
            <p className="contact-kicker">PROJECT ENQUIRY</p>
            <h2>
              A useful first conversation starts with context.
            </h2>
            <p>
              Share your goals, users, key functionality and timeline. Starting prices are directional; the final quote depends on scope, integrations, content, complexity and delivery requirements.
            </p>
            <a className="contact-email" href="mailto:contact@psdigilabs.in">
              contact@psdigilabs.in
            </a>
          </div>

          <div className="contact-form-column">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}