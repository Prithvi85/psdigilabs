import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className="site-header sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="header-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20">
        <Link href="/" className="brand-link flex h-full items-center" aria-label="PSDigiLabs home">
          <Image
            src="/images/branding/logo.png"
            alt="PSDigiLabs"
            width={1302}
            height={1208}
            sizes="(max-width: 767px) 210px, 280px"
            preload
            className="h-12 w-[210px] object-cover sm:h-16 sm:w-[280px]"
          />
        </Link>
        <nav className="desktop-nav flex items-center gap-8" aria-label="Main navigation">
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="button button-primary header-cta inline-flex items-center justify-center" href="/contact">LET&apos;S CONNECT</Link>
        <MobileMenu />
      </div>
    </header>
  );
}
