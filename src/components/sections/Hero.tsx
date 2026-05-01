"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import GradientBg from "../ui/GradientBg";
import { peso } from "@/lib/utils";

const phoneItems = [
  { id: "p1", emoji: "☕", name: "Spanish Latte", price: 180 },
  { id: "p2", emoji: "🥐", name: "Butter Croissant", price: 110 },
  { id: "p3", emoji: "🥪", name: "Truffle Toast", price: 280 },
];

type CartItem = { id: string; name: string; emoji: string; price: number; qty: number };

export default function Hero() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const [tickets, setTickets] = useState<{ id: string; name: string; time: string }[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Auto-demo loop
  useEffect(() => {
    let cancelled = false;
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    async function loop() {
      while (!cancelled) {
        setCart([]);
        setTickets([]);
        setOrderPlaced(false);
        await wait(900);

        for (const item of phoneItems) {
          if (cancelled) return;
          setHighlighted(item.id);
          await wait(550);
          setCart((c) => {
            const existing = c.find((x) => x.id === item.id);
            if (existing)
              return c.map((x) =>
                x.id === item.id ? { ...x, qty: x.qty + 1 } : x,
              );
            return [...c, { ...item, qty: 1 }];
          });
          setHighlighted(null);
          await wait(450);
        }

        await wait(700);
        setOrderPlaced(true);
        await wait(600);
        const now = new Date();
        const time = `${String(now.getHours()).padStart(2, "0")}:${String(
          now.getMinutes(),
        ).padStart(2, "0")}`;
        for (const item of phoneItems) {
          if (cancelled) return;
          await wait(350);
          setTickets((t) => [...t, { id: item.id, name: item.name, time }]);
        }

        await wait(3500);
      }
    }
    loop();
    return () => {
      cancelled = true;
    };
  }, []);

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      <GradientBg />
      <Container className="relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left copy */}
          <div className="lg:col-span-6 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 mb-8 text-xs uppercase tracking-widest text-muted font-mono"
            >
              <span className="size-1.5 rounded-full bg-brand animate-pulse-glow" />
              Made in the Philippines
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02]"
            >
              <span className="gradient-text">Your restaurant.</span>
              <br />
              <span className="brand-text">Online. Offline.</span>
              <br />
              <span className="gradient-text">Always running.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-7 text-lg text-muted max-w-md"
            >
              The operating system for restaurants — customer ordering, kitchen,
              dining, cashier, chains. Works without WiFi.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Button href="#try">Try free →</Button>
              <Button href="#contact" variant="secondary">
                Talk to us
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-12"
            >
              <div className="text-xs uppercase tracking-widest text-muted font-mono mb-4">
                Powering
              </div>
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/romantic-baboy.svg"
                  alt="Romantic Baboy"
                  className="h-10 opacity-80 hover:opacity-100 transition-opacity"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/kalei.svg"
                  alt="Kalei Cafe Bar"
                  className="h-10 opacity-80 hover:opacity-100 transition-opacity"
                />
                <span className="font-mono text-xs text-brand">+ more</span>
              </div>
            </motion.div>
          </div>

          {/* Right live demo */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative flex items-center justify-center gap-4 lg:gap-6"
            >
              {/* Phone */}
              <div className="phone-frame w-[260px] sm:w-[290px] shrink-0">
                <div className="bg-background rounded-[32px] overflow-hidden h-[560px] flex flex-col">
                  {/* Status bar */}
                  <div className="flex justify-between items-center px-5 pt-3 pb-2 text-[10px] font-mono text-muted">
                    <span>9:41</span>
                    <span className="size-3 rounded-full bg-foreground/40" />
                    <span>100%</span>
                  </div>
                  {/* Header */}
                  <div className="px-5 pb-3 border-b border-white/5">
                    <div className="text-[10px] uppercase tracking-widest text-brand font-mono">
                      Table 12
                    </div>
                    <div className="text-base font-semibold mt-0.5">
                      Kalei Cafe Bar
                    </div>
                  </div>
                  {/* Items */}
                  <div className="flex-1 px-3 py-3 space-y-2 overflow-hidden">
                    {phoneItems.map((item) => (
                      <motion.div
                        key={item.id}
                        animate={{
                          scale: highlighted === item.id ? 0.97 : 1,
                          backgroundColor:
                            highlighted === item.id
                              ? "rgba(232,122,30,0.12)"
                              : "rgba(255,255,255,0.02)",
                        }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/5"
                      >
                        <div className="size-10 rounded-lg bg-white/5 grid place-items-center text-xl">
                          {item.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">
                            {item.name}
                          </div>
                          <div className="text-xs text-muted">
                            {peso(item.price)}
                          </div>
                        </div>
                        <motion.div
                          animate={{
                            scale: highlighted === item.id ? [1, 1.3, 1] : 1,
                          }}
                          transition={{ duration: 0.4 }}
                          className="size-7 rounded-full bg-brand grid place-items-center text-black text-base font-bold leading-none"
                        >
                          +
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                  {/* Cart bar */}
                  <AnimatePresence mode="wait">
                    {cart.length > 0 && !orderPlaced && (
                      <motion.div
                        key="cart"
                        initial={{ y: 80 }}
                        animate={{ y: 0 }}
                        exit={{ y: 80 }}
                        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                        className="m-3 rounded-2xl bg-brand text-black p-3.5 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-mono opacity-70">
                            {cart.reduce((s, c) => s + c.qty, 0)} items
                          </div>
                          <div className="text-sm font-bold">
                            {peso(subtotal)}
                          </div>
                        </div>
                        <div className="text-sm font-semibold">Place order →</div>
                      </motion.div>
                    )}
                    {orderPlaced && (
                      <motion.div
                        key="placed"
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="m-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 p-3.5 text-center text-sm font-semibold"
                      >
                        ✓ Order placed
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Connection line + kitchen ticket panel */}
              <div className="hidden md:flex flex-col gap-2 w-[220px]">
                <div className="text-[10px] uppercase tracking-widest text-muted font-mono mb-1 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Kitchen Display
                </div>
                <AnimatePresence>
                  {tickets.map((t, i) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, x: -20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.05 }}
                      className="rounded-lg border border-white/10 bg-card p-2.5 text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-brand text-[10px]">
                          T12 · {t.time}
                        </span>
                        <span className="size-1.5 rounded-full bg-amber-400" />
                      </div>
                      <div className="font-medium text-foreground/90">
                        {t.name}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {tickets.length === 0 && (
                  <div className="rounded-lg border border-dashed border-white/10 p-4 text-center text-xs text-muted">
                    Waiting for orders…
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
