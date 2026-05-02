"use client";

import { useEffect, useState } from "react";
import Container from "./ui/Container";
import Button from "./ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#what", label: "What" },
  { href: "#pain", label: "Why" },
  { href: "#story", label: "Story" },
  { href: "#customer-demo", label: "Order" },
  { href: "#owner-demo", label: "Manage" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/umami-icon.svg"
            alt="Umami"
            className="h-10 w-10"
          />
          <span className="font-semibold tracking-tight text-2xl text-brand">
            umami
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            href="https://app.umami.com.ph"
            variant="ghost"
            className="hidden sm:inline-flex"
          >
            Sign in
          </Button>
          <Button href="#try">Try free</Button>
        </div>
      </Container>
    </header>
  );
}
