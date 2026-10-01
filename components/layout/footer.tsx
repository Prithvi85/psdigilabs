import { navigation } from "@/data/navigation";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#071524] py-16 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[2fr_1fr_1fr] md:gap-12">
          <div>
            <Link href="/" className="inline-flex text-lg font-extrabold text-white">
              PSDigiLabs
            </Link>
            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-300">
              BUILD <span aria-hidden="true">&bull;</span> TEST <span aria-hidden="true">&bull;</span> AUTOMATE
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              Digital development, software testing and workflow automation.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
              QUICK LINKS
            </h2>
            <div className="flex flex-col space-y-2.5 text-sm">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
              CONTACT
            </h2>
            <div className="flex flex-col space-y-2 text-sm">
              <a
                href="mailto:contact@psdigilabs.in"
                className="text-slate-400 transition-colors hover:text-white"
              >
                contact@psdigilabs.in
              </a>
              <a
                href="https://www.psdigilabs.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-white"
              >
                www.psdigilabs.in
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/60 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} PSDigiLabs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
