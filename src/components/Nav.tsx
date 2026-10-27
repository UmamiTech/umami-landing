"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
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

// Critically damped: the sheet settles without overshoot. Nothing was flung, so
// nothing should bounce.
const SHEET = { type: "spring", bounce: 0, duration: 0.35 } as const;

/**
 * A plain bar: the wordmark, a few links, one action. White, never glass.
 * Below lg the links fold into a sheet that unrolls from the bar's bottom edge
 * and rolls back up into it, the same path both ways.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While open: the bar turns white with the sheet (globals.css), the page behind
  // stops scrolling, Escape closes, and widening to desktop closes.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.dataset.menu = "open";
    root.style.overflow = "hidden";
    sheet.current?.querySelector("a")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = () => wide.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      delete root.dataset.menu;
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "site-header fixed inset-x-0 top-0 z-50",
        scrolled && !open && "shadow-[0_1px_0_rgba(0,0,0,0.06)]", // taste-skill-ignore: the sticky bar is the one surface that floats
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
          <a href="https://app.umami.com.ph" className="hidden px-3 text-[16px] hover:text-brand-ink lg:inline">
            Sign in
          </a>
          <Button href="#try" className="nav-cta min-h-11 px-5">
            Try free
          </Button>
          <button
            ref={toggle}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 grid size-11 place-items-center rounded-full transition-[background-color,scale] duration-150 hover:bg-black/5 active:scale-90 active:duration-75 lg:hidden"
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {/* Dims the page: the menu is a task of its own until it closes. */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="scrim"
            className="fixed inset-x-0 bottom-0 top-[72px] bg-black/40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      {/* Clipped at the bar's edge, so the sheet comes out of the bar. Reopening
          while it rolls up picks it up from where it is. */}
      <div className="absolute inset-x-0 top-[72px] overflow-hidden lg:hidden">
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="sheet"
              ref={sheet}
              id="site-menu"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={SHEET}
              className="border-t border-black/[0.06] bg-background pb-6 text-[#121212]"
            >
              <Container>
                <nav aria-label="Main">
                  <ul className="divide-y divide-black/[0.06]">
                    {links.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          onClick={close}
                          className="flex min-h-14 items-center text-[22px] font-medium tracking-[-0.01em] transition-colors active:text-brand-ink"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <Button href="https://app.umami.com.ph" variant="secondary" className="mt-6 w-full">
                  Sign in to Umami
                </Button>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
