"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import { cn, peso } from "@/lib/utils";
import { APP_URL } from "@/lib/app";

/**
 * Only Starter can be bought today. A payment provider IS now connected (Maya
 * card-on-file, in the app's Plan & Billing), but Growth/Pro/Chain are flagged
 * `comingSoon` in the app and its subscribe endpoint REFUSES them — so they are
 * shown here as roadmap, not as an offer. When one launches, its `comingSoon`
 * flag is cleared in the app and must be cleared here in the same change.
 *
 * Prices below are duplicated from the app's `default-plans.js`. The live
 * founding countdown is fetched (see useFoundingOffer) because it changes on
 * every signup; the rest is static and must be kept in step by hand.
 *
 * Starter's feature list is the app's free-tier module gate
 * (`FREE_TIER_MODULES` in the Umami repo), and nothing else. No count is
 * limited anywhere in the app — `resolveEntitlements` returns unlimited for
 * menu items, tables and staff — so do NOT reintroduce a "(up to N)" claim
 * here without a limit actually being enforced. Everything listed under a
 * coming-soon tier is a module that gate genuinely hides today; when one
 * launches, it moves list AND gets added to FREE_TIER_MODULES or stays paid.
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
    comingSoon: true,
    href: "#contact",
  },
  {
    name: "Pro",
    tag: "Never go down",
    price: 2999,
    suffix: "/mo per branch",
    desc: "For high-volume restaurants in areas with bad internet.",
    features: [
      "Everything in Growth",
      "Offline-first laptop deployment",
      "Keeps taking orders with the internet down",
      "Finance & BIR books with daily close",
      "Staff scheduling & clock in/out",
      "AI chat assistant for customers",
      "WhatsApp / SMS alerts",
    ],
    highlight: true,
    comingSoon: true,
    href: "#contact",
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
    comingSoon: true,
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

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const founding = useFoundingOffer();

  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title={<>Start free.<br /><span className="brand-text">Scale when you grow.</span></>}
      subtitle="Starter is live today and free forever for the first 100 restaurants. The paid plans are on the way — talk to us if you want them early."
    >
      <Container>
        <Reveal>
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-card p-1">
              <button
                onClick={() => setAnnual(false)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                  !annual ? "bg-brand text-black" : "text-muted hover:text-foreground",
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                  annual ? "bg-brand text-black" : "text-muted hover:text-foreground",
                )}
              >
                Annual
                <span
                  className={cn(
                    "text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded",
                    annual ? "bg-black/20 text-black" : "bg-brand/15 text-brand",
                  )}
                >
                  −2 mo
                </span>
              </button>
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "relative h-full rounded-2xl border p-6 flex flex-col",
                  tier.highlight && !tier.comingSoon
                    ? "border-brand/50 bg-gradient-to-b from-brand/[0.08] to-transparent shadow-[0_0_60px_-20px_var(--brand-glow)]"
                    : "border-white/10 bg-card",
                )}
              >
                {tier.comingSoon ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full border border-white/15 bg-card text-muted text-[10px] font-bold uppercase tracking-widest font-mono">
                    Coming soon
                  </div>
                ) : tier.price === 0 && founding?.open ? (
                  /* The live countdown. Only rendered once the app has answered,
                     so the number on screen is always a real one. */
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand text-black text-[10px] font-bold uppercase tracking-widest font-mono whitespace-nowrap">
                    {founding.left} of {founding.limit} left
                  </div>
                ) : (
                  tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand text-black text-[10px] font-bold uppercase tracking-widest font-mono">
                      Most popular
                    </div>
                  )
                )}
                <div className="mb-4">
                  <div className="text-xs uppercase tracking-widest text-brand font-mono mb-1.5">
                    {tier.tag}
                  </div>
                  <h3 className="text-2xl font-semibold">{tier.name}</h3>
                </div>

                <div className="mb-5">
                  {tier.price === 0 ? (
                    /* "Free forever" is the founding promise: true for the first
                       100 restaurants, and true FOREVER for each of them. Once
                       the places are gone it stops being true for new signups,
                       so the card starts quoting the real price instead. */
                    founding && !founding.open ? (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold">
                            {peso(founding.starterPrice).replace(".00", "")}
                          </span>
                          <span className="text-sm text-muted">/mo</span>
                        </div>
                        <div className="mt-1 text-xs text-muted">
                          The 100 free places have all been claimed.
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold">Free</span>
                          <span className="text-sm text-muted">forever</span>
                        </div>
                        {founding?.open && (
                          <div className="mt-1 text-xs text-muted">
                            For the first {founding.limit} restaurants — then{" "}
                            {peso(founding.starterPrice).replace(".00", "")}/mo.
                            Claim a place and yours stays free.
                          </div>
                        )}
                      </>
                    )
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">
                        {peso(annual ? Math.round(tier.price * 10) / 12 : tier.price)
                          .replace(".00", "")
                          .replace(/,(\d{3})$/, ",$1")}
                      </span>
                      <span className="text-sm text-muted">{tier.suffix}</span>
                    </div>
                  )}
                  {tier.extra && (
                    <div className="mt-1 text-xs text-muted">{tier.extra}</div>
                  )}
                </div>

                <p className="text-sm text-muted mb-5">{tier.desc}</p>

                <ul className="space-y-2.5 mb-7 flex-1">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className={cn(
                        "flex items-start gap-2.5 text-sm",
                        tier.comingSoon ? "text-foreground/55" : "text-foreground/85",
                      )}
                    >
                      <svg
                        className={cn(
                          "size-4 mt-0.5 shrink-0",
                          tier.comingSoon ? "text-muted" : "text-brand",
                        )}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {tier.comingSoon ? (
                  /* Not a link and not disabled-looking-but-clickable: there is
                     nothing to buy yet, so the only real action is to tell us
                     you want it. */
                  <a
                    href="#contact"
                    className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground hover:border-white/20"
                  >
                    Coming soon — get on the list
                  </a>
                ) : (
                  <Button
                    href={tier.href}
                    variant={tier.highlight ? "primary" : "secondary"}
                    className="w-full"
                  >
                    {tier.cta}
                  </Button>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-10 rounded-2xl border border-white/10 bg-card p-6 md:p-8 text-center">
            <div className="text-xs uppercase tracking-widest text-brand font-mono mb-2">
              Enterprise
            </div>
            <h3 className="text-2xl font-semibold mb-2">
              Running 10+ branches? Hotel group? Franchisor?
            </h3>
            <p className="text-sm text-muted mb-5 max-w-2xl mx-auto">
              Custom infra, SLA, dedicated dev, on-site training, white-label,
              API access. Starting at ₱30,000/mo.
            </p>
            <Button href="#contact">Talk to sales</Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
