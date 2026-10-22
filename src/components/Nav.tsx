"use client";

import { useEffect, useState } from "react";
import Container from "./ui/Container";
import Button from "./ui/Button";
import BrandIcon from "./ui/BrandIcon";
import { cn } from "@/lib/utils";

const links = [
  { href: "/what-is-umami", label: "What it is" },
  { href: "/works-with-your-pos", label: "Keep your POS" },
  { href: "/qr-ordering", label: "QR ordering" },
  { href: "/multi-branch", label: "Chains" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#contact", label: "Contact" },
];

/** A plain bar: the wordmark, a few links, one action. White, never glass. */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-background transition-[box-shadow] duration-200",
        scrolled && "shadow-[0_1px_0_rgba(0,0,0,0.08)]", // taste-skill-ignore: the sticky bar is the one surface that floats
      )}
    >
      <Container className="flex h-[72px] items-center justify-between gap-6">
        <a href="/" className="flex items-center gap-2.5" aria-label="Umami home">
          <BrandIcon className="size-9" />
          <span className="text-[24px] font-semibold tracking-[-0.02em] text-brand-ink">umami</span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[16px] hover:text-brand-ink transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="https://app.umami.com.ph" className="hidden px-3 text-[16px] hover:text-brand-ink sm:inline">
            Sign in
          </a>
          <Button href="#try" className="min-h-11 px-5">
            Try free
          </Button>
        </div>
      </Container>
    </header>
  );
}
