import { navigation } from "@/data/navigation";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer w-full border-t border-slate-800 bg-[#071524] text-slate-300" aria-label="PSDigiLabs footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
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

          <nav aria-label="Footer navigation" className="footer-links md:col-span-4">
            <h2>QUICK LINKS</h2>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="footer-contact md:col-span-3">
            <h2>CONTACT</h2>
            <a href="mailto:contact@psdigilabs.in">contact@psdigilabs.in</a>
            <a href="https://www.psdigilabs.in" target="_blank" rel="noopener noreferrer">
              www.psdigilabs.in
            </a>
          </div>
        </div>

        <div className="footer-bottom mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} PSDigiLabs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
