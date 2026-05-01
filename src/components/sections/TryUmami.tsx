"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";

export default function TryUmami() {
  const [email, setEmail] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, restaurant, kind: "trial" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send");
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again?",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <Section
      id="try"
      eyebrow="Try Umami"
      title={<>Two ways. <span className="brand-text">Both free.</span></>}
      subtitle="See it on your own phone, or spin up a free trial restaurant in 60 seconds."
    >
      <Container>
        <div className="grid md:grid-cols-2 gap-6">
          {/* QR side */}
          <Reveal>
            <div className="relative h-full rounded-2xl border border-white/10 bg-card p-8 md:p-10 overflow-hidden">
              <div className="absolute -top-20 -right-20 size-72 rounded-full bg-brand/10 blur-3xl" />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest text-brand font-mono mb-3">
                  Option 1
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                  Scan and order on your real phone
                </h3>
                <p className="text-sm text-muted mb-7 max-w-sm">
                  Demo restaurant. Live menu. Real flow. No staff to bother, no
                  account to create.
                </p>

                <div className="bg-white p-5 rounded-2xl inline-block shadow-2xl">
                  <QRCode value="https://app.umami.com.ph/menu/demo" />
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs font-mono text-muted">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  app.umami.com.ph/menu/demo
                </div>
              </div>
            </div>
          </Reveal>

          {/* Trial form side */}
          <Reveal delay={0.1}>
            <div className="relative h-full rounded-2xl border border-white/10 bg-card p-8 md:p-10 overflow-hidden">
              <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-violet-500/10 blur-3xl" />
              <div className="relative h-full flex flex-col">
                <div className="text-xs uppercase tracking-widest text-brand font-mono mb-3">
                  Option 2
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                  Start your own free trial
                </h3>
                <p className="text-sm text-muted mb-7 max-w-sm">
                  We&rsquo;ll create your restaurant, send you a login, and walk
                  you through it. 14 days, no credit card.
                </p>

                {!submitted ? (
                  <form onSubmit={submit} className="space-y-3 max-w-sm">
                    <input
                      type="text"
                      placeholder="Restaurant name"
                      value={restaurant}
                      onChange={(e) => setRestaurant(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand/40 placeholder:text-muted"
                    />
                    <input
                      type="email"
                      placeholder="you@yourrestaurant.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand/40 placeholder:text-muted"
                    />
                    <Button type="submit" className="w-full">
                      {sending ? "Sending…" : "Get my free trial →"}
                    </Button>
                    {error && (
                      <div className="text-xs text-red-400">{error}</div>
                    )}
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 max-w-sm"
                  >
                    <div className="flex items-center gap-2.5 text-emerald-400 mb-2">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono uppercase tracking-widest">
                        On its way
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90">
                      Check <strong>{email}</strong> in the next minute. We&rsquo;ll
                      get back to you within 24 hours.
                    </p>
                  </motion.div>
                )}

                <div className="mt-auto pt-7 text-xs text-muted">
                  Already a customer?{" "}
                  <a
                    href="https://app.umami.com.ph"
                    className="text-brand hover:underline"
                  >
                    Sign in →
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

// Simple decorative QR code — visual only, not a real scannable code
function QRCode({ value }: { value: string }) {
  // Pseudo-random pattern based on string
  const grid = 21;
  const cells: boolean[] = [];
  let seed = value.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
  for (let i = 0; i < grid * grid; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    cells.push(seed / 233280 > 0.5);
  }
  // Force 3 corner finder patterns
  function isFinder(r: number, c: number) {
    const inTL = r < 7 && c < 7;
    const inTR = r < 7 && c >= grid - 7;
    const inBL = r >= grid - 7 && c < 7;
    if (!(inTL || inTR || inBL)) return null;
    const lr = inTL ? r : inTR ? r : r - (grid - 7);
    const lc = inTL ? c : inTR ? c - (grid - 7) : c;
    if (lr === 0 || lr === 6 || lc === 0 || lc === 6) return true;
    if (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4) return true;
    return false;
  }

  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${grid}, 1fr)`, width: 196, height: 196 }}
    >
      {cells.map((on, i) => {
        const r = Math.floor(i / grid);
        const c = i % grid;
        const finder = isFinder(r, c);
        const filled = finder !== null ? finder : on;
        return (
          <div
            key={i}
            style={{
              backgroundColor: filled ? "#08080b" : "transparent",
            }}
          />
        );
      })}
    </div>
  );
}
