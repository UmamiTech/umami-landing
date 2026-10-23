"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Container from "../ui/Container";
import Headline from "../ui/Headline";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import { cn, peso } from "@/lib/utils";
import { APP_URL, PLAN_URL } from "@/lib/app";

/**
 * Every tier on this page is a real offer as of 2026-08-11.
 *
 * Starter and Growth and Pro are self-serve: the app charges a real card
 * through Maya (Plan & Billing). Chain is sold but quoted by hand — its price
 * depends on branch count and the app bills per restaurant today, so a
 * self-serve checkout would undercharge a multi-branch operator. That is why it
 * says "Talk to sales" and not "Coming soon": we will absolutely take a chain's
 * money, we just want to price it correctly.
 *
 * MIRRORS the app's `default-plans.js`. A plan that is `contactSalesOnly` or
 * `comingSoon` there must match here, and vice versa — the app's subscribe
 * endpoint REFUSES both, so advertising one as buyable produces a dead end. The
 * live founding countdown is fetched (see useFoundingOffer) because it changes
 * on every signup; prices and feature bullets are static and kept in step by hand.
 *
 * Starter's feature list is the app's free-tier module gate
 * (`FREE_TIER_MODULES` in the Umami repo), and nothing else. No count is
 * limited anywhere in the app — `resolveEntitlements` returns unlimited for
 * menu items, tables and staff — so do NOT reintroduce a "(up to N)" claim
 * here without a limit actually being enforced. Everything listed under a paid
 * tier is a module that gate genuinely hides on the free tier.
 */
const tiers = [
  {
    name: "Starter",
    tag: "Get online today",
    price: 0,
    suffix: "/mo",
    desc: "Everything a single restaurant needs to take orders. No limits on tables, menu items or staff.",
    features: [
      "Customer QR ordering",
      "Unlimited menu items & categories",
      "Unlimited tables & QR codes",
      "Kitchen, Dining, Cashier & Order Specialist screens",
      "Owner dashboard with live sales reports",
      "Add-ons, allergens & dietary tags",
      "Charges & discounts",
      "Unlimited staff accounts with custom roles",
      "AI menu scan",
      "Order log & audit trail",
      "Email support",
    ],
    cta: "Start free",
    href: "#try",
  },
  {
    name: "Growth",
    tag: "Fill more tables",
    price: 1499,
    suffix: "/mo per branch",
    desc: "For restaurants that want the front of house working harder.",
    features: [
      "Everything in Starter",
      "Vouchers & promo codes",
      "Waitlist & table reservations",
      "Takeaway and pickup ordering",
      "Public store page (Google-ready)",
      "Customer feedback & reviews",
      "Staff and product performance analytics",
      "Priority support",
    ],
    // Live: the app charges a real card for this. Goes to the app's Plan &
    // Billing, which is the only place the plan can actually be bought — the
    // trial form would have quietly created a FREE Starter account instead.
    cta: "Get Growth",
    href: PLAN_URL,
  },
  {
    name: "Pro",
    tag: "Never go down",
    price: 2999,
    suffix: "/mo per branch",
    desc: "For high-volume restaurants in areas with bad internet.",
    features: [
      "Everything in Growth",
      "Keeps taking orders with the internet down",
      "Finance & BIR books with daily close",
      "Staff scheduling & clock in/out",
      "AI chat assistant for customers",
    ],
    highlight: true,
    cta: "Get Pro",
    href: PLAN_URL,
  },
  {
    name: "Chain",
    tag: "Run your empire",
    price: 4999,
    suffix: "/mo · 3 branches",
    extra: "+ ₱1,999/mo per additional branch",
    desc: "For multi-branch operators and franchises.",
    features: [
      "Everything in Pro across all branches",
      "Chain dashboard (live across branches)",
      "Centralized menu push",
      "Chain-wide vouchers",
      "Consolidated reports",
      "Dedicated account manager",
      "Custom integrations",
    ],
    // Sold, but quoted by a human rather than self-serve: a chain's price
    // depends on branch count, and the app bills per restaurant today, so a
    // self-serve checkout would undercharge a multi-branch operator.
    contactSales: true,
    cta: "Talk to sales",
    href: "#contact",
  },
];

/**
 * Live founding-offer state, read from the app.
 *
 * Starter is free for the first 100 restaurants and ₱99/mo after that, and the
 * app is the only thing that knows how many places are left — it decrements on
 * every signup. `GET /api/billing/public/pricing` is unauthenticated and CORS-open
 * to this host precisely so this card can show the real number instead of a
 * figure that goes stale the day it is typed.
 *
 * FAILS SOFT on purpose: if the app is unreachable, the fetch is ignored and the
 * card renders exactly as it does today ("Free forever"). A marketing page must
 * never show a broken price because an API call timed out.
 */
type FoundingState = {
  left: number;
  limit: number;
  open: boolean;
  starterPrice: number;
};

function useFoundingOffer(): FoundingState | null {
  const [state, setState] = useState<FoundingState | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`${APP_URL}/api/billing/public/pricing`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d || typeof d.foundingSlotsRemaining !== "number") return;
        setState({
          left: d.foundingSlotsRemaining,
          limit: d.foundingMemberLimit ?? 100,
          open: !!d.foundingOfferOpen,
          starterPrice: d.starterMonthlyPrice ?? 99,
        });
      })
      .catch(() => {
        /* keep the static card — never break the page over this */
      });
    return () => {
      alive = false;
    };
  }, []);

  return state;
}

/** The founding figure rolls up once to its value when it comes into view. */
function RollingNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const [shown, setShown] = useState(value);
  const armed = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top > window.innerHeight) {
      armed.current = true;
      setShown(0);
    }
  }, []);
  useEffect(() => {
    if (!inView) return;
    if (!armed.current) {
      setShown(value);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);
  return (
    <span ref={ref} className="tabular-nums">
      {shown}
    </span>
  );
}

const Check = () => (
  <svg className="mt-[5px] size-4 shrink-0 text-brand-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const priceText = (n: number) => peso(n).replace(".00", "");

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  // On a phone each tier's feature list is folded away until asked for; four
  // long lists stacked one under another is most of the page's length there.
  const [openTier, setOpenTier] = useState<string | null>(null);
  const founding = useFoundingOffer();

  return (
    <section id="pricing" data-chapter="white" className="chapter-white relative scroll-mt-20 py-24 md:py-36">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Headline lines={["Start free.", "Pay as you grow."]} className="text-[40px] md:text-[72px]" />
            <p className="mt-8 max-w-xl text-[18px] leading-[1.5] text-muted md:text-[21px]">
              Start on Starter and upgrade inside the app whenever you are ready. No call, no contract,
              no card for the free plan.
            </p>
          </div>
          <div className="lg:col-span-5">
            {founding?.open ? (
              <p>
                <span className="block font-display text-[72px] leading-none tracking-[-0.03em]">
                  <RollingNumber value={founding.left} /> of {founding.limit}
                </span>
                <span className="mt-3 block max-w-sm text-[18px]">
                  founding places are still open. Those restaurants keep Starter free, for as long as
                  they stay.
                </span>
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-14 flex">
          <div role="group" aria-label="Billing period" className="inline-flex rounded-full bg-paper p-1">
            {[
              { v: false, label: "Monthly" },
              { v: true, label: "Yearly, 2 months free" },
            ].map((o) => (
              <button
                key={o.label}
                type="button"
                aria-pressed={annual === o.v}
                onClick={() => setAnnual(o.v)}
                className={cn(
                  "min-h-11 rounded-full px-5 text-[16px] font-medium transition-colors duration-200",
                  annual === o.v ? "bg-foreground text-white" : "text-foreground hover:bg-paper-2",
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.07} className="h-full">
              <div
                className={cn(
                  "flex h-full flex-col",
                  tier.highlight ? "rounded-[24px] bg-paper p-7 lg:-mt-7" : "md:py-7",
                )}
              >
                <h3 className="text-[24px] font-semibold">{tier.name}</h3>

                <div className="mt-6 min-h-[92px]">
                  {tier.price === 0 ? (
                    founding && !founding.open ? (
                      <>
                        <span className="font-display text-[48px] leading-none tracking-[-0.03em]">
                          {priceText(founding.starterPrice)}
                        </span>
                        <span className="ml-1 text-[16px] text-muted">/mo</span>
                        <p className="mt-2 text-[16px] text-muted">The 100 free places have all been claimed.</p>
                      </>
                    ) : (
                      <>
                        <span className="font-display text-[48px] leading-none tracking-[-0.03em]">Free</span>
                        <span className="ml-2 text-[16px] text-muted">forever</span>
                        {founding?.open && (
                          <p className="mt-2 text-[16px] text-muted">
                            For the first {founding.limit} restaurants, then {priceText(founding.starterPrice)}/mo.
                          </p>
                        )}
                      </>
                    )
                  ) : (
                    <>
                      <span className="font-display text-[48px] leading-none tracking-[-0.03em] tabular-nums">
                        {priceText(annual ? Math.round((tier.price * 10) / 12) : tier.price)}
                      </span>
                      <span className="ml-1 text-[16px] text-muted">{tier.suffix}</span>
                      {annual && (
                        <p className="mt-2 text-[16px] text-muted">
                          {priceText(tier.price * 10)} billed once a year.
                        </p>
                      )}
                      {tier.extra && <p className="mt-2 text-[16px] text-muted">{tier.extra.replace(/^\+ /, "Plus ")}</p>}
                    </>
                  )}
                </div>

                <p className="mt-4 text-[16px]">
                  {tier.desc}
                  {tier.highlight ? " The plan most restaurants choose." : ""}
                </p>

                <Button
                  href={tier.href}
                  variant={tier.highlight ? "primary" : "dark"}
                  className="mt-6 w-full"
                >
                  {tier.cta}
                </Button>

                <button
                  type="button"
                  aria-expanded={openTier === tier.name}
                  onClick={() => setOpenTier(openTier === tier.name ? null : tier.name)}
                  className="mt-5 self-start text-[16px] font-medium text-brand-ink underline decoration-2 underline-offset-4 md:hidden"
                >
                  {openTier === tier.name ? "Hide what's included" : "What's included"}
                </button>
                <ul className={cn("mt-5 space-y-2.5 md:mt-8 md:block", openTier === tier.name ? "block" : "hidden")}>
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[16px] leading-[1.4]">
                      <Check />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <p className="max-w-3xl text-[18px] leading-[1.5] md:text-[21px]">
            <span className="font-semibold">Ten branches or more, a hotel group, a franchise?</span>{" "}
            We set up custom infrastructure, an SLA, on-site training and API access, from ₱30,000 a
            month.{" "}
            <a href="#contact" className="font-medium text-brand-ink underline decoration-2 underline-offset-4">
              Talk to sales
            </a>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
