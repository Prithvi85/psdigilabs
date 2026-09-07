import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className="site-header !h-auto min-h-[76px] py-3 md:py-4">
      <div className="container header-inner !h-auto min-h-[64px] items-center">
        <Link href="/" className="brand !h-auto min-h-11 !w-auto min-w-11 !overflow-visible sm:min-h-12 md:min-h-14 lg:min-h-16" aria-label="PSDigiLabs home">
          <Image
            src="/images/branding/logo.png"
            alt="PSDigiLabs"
            width={260}
            height={64}
            sizes="(max-width: 767px) 48px, (max-width: 1023px) 56px, 64px"
            priority
            className="!h-11 sm:!h-12 md:!h-14 lg:!h-16 !w-auto object-contain transition-transform"
          />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="button button-primary header-cta" href="/contact">LET&apos;S CONNECT</Link>
        <MobileMenu />
      </div>
    </header>
  );
}
