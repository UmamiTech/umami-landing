"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import { cn, peso } from "@/lib/utils";

const tiers = [
  {
    name: "Starter",
    tag: "Get online today",
    price: 0,
    suffix: "/mo",
    desc: "For single cafés, food carts, small eateries (1–10 tables).",
    features: [
      "Customer QR ordering",
      "Digital menu (up to 50 items)",
      "1 staff dashboard",
      "Basic reports",
      "Cloud-only",
      "Email support",
    ],
    cta: "Start free",
    href: "#try",
  },
  {
    name: "Growth",
    tag: "Run your restaurant",
    price: 1499,
    suffix: "/mo per branch",
    desc: "For mid-size restaurants (10–30 tables, full-service).",
    features: [
      "Everything in Starter",
      "Unlimited menu items",
      "All 4 staff dashboards",
      "Vouchers & discounts",
      "AI menu scan",
      "6 languages",
      "Full analytics",
      "Priority support",
    ],
    cta: "Get Growth",
    href: "#try",
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
      "Pax-based pricing (buffet)",
      "Bill splitting",
      "Custom roles",
      "Table linking",
      "WhatsApp / SMS alerts",
    ],
    cta: "Get Pro",
    highlight: true,
    href: "#try",
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
    cta: "Get Chain",
    href: "#contact",
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title={<>Start free.<br /><span className="brand-text">Scale when you grow.</span></>}
      subtitle="No transaction fees. Ever. Cancel any time."
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
                  tier.highlight
                    ? "border-brand/50 bg-gradient-to-b from-brand/[0.08] to-transparent shadow-[0_0_60px_-20px_var(--brand-glow)]"
                    : "border-white/10 bg-card",
                )}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand text-black text-[10px] font-bold uppercase tracking-widest font-mono">
                    Most popular
                  </div>
                )}
                <div className="mb-4">
                  <div className="text-xs uppercase tracking-widest text-brand font-mono mb-1.5">
                    {tier.tag}
                  </div>
                  <h3 className="text-2xl font-semibold">{tier.name}</h3>
                </div>

                <div className="mb-5">
                  {tier.price === 0 ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">Free</span>
                      <span className="text-sm text-muted">forever</span>
                    </div>
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
                      className="flex items-start gap-2.5 text-sm text-foreground/85"
                    >
                      <svg
                        className="size-4 text-brand mt-0.5 shrink-0"
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

                <Button
                  href={tier.href}
                  variant={tier.highlight ? "primary" : "secondary"}
                  className="w-full"
                >
                  {tier.cta}
                </Button>
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
