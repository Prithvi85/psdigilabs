import { navigation } from "@/data/navigation";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer" aria-label="PSDigiLabs footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand-link footer-brand">
              PSDigiLabs
            </Link>
            <p className="footer-tagline">
              BUILD <span aria-hidden="true">&bull;</span> TEST <span aria-hidden="true">&bull;</span> AUTOMATE
            </p>
            <p className="footer-copy">
              Digital development, software testing and workflow automation.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="footer-links">
            <h2>QUICK LINKS</h2>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="footer-contact">
            <h2>CONTACT</h2>
            <a href="mailto:contact@psdigilabs.in">contact@psdigilabs.in</a>
            <a href="https://www.psdigilabs.in" target="_blank" rel="noopener noreferrer">
              www.psdigilabs.in
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} PSDigiLabs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
