"use client";

import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/navigation";
import Link from "next/link";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    firstLink.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div className="mobile-menu-wrap">
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation menu" : "Open navigation menu"} onClick={() => setOpen((value) => !value)}>
        <span className={open ? "menu-lines menu-lines-open" : "menu-lines"} aria-hidden="true"><i /><i /><i /></span>
      </button>
      {open && (
        <div id="mobile-navigation" className="mobile-panel">
          <nav aria-label="Mobile navigation">
            {navigation.map((item, index) => <Link ref={index === 0 ? firstLink : undefined} key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
            <Link className="button button-primary" href="/contact" onClick={() => setOpen(false)}>LET&apos;S CONNECT</Link>
          </nav>
        </div>
      )}
    </div>
  );
}
