"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { cn, peso } from "@/lib/utils";

const features = [
  { icon: "⚡", label: "Offline-first", desc: "Zero-WiFi ordering" },
  { icon: "🤖", label: "AI menu scan", desc: "Photo → digital menu" },
  { icon: "🌏", label: "6 languages", desc: "Auto-translated" },
  { icon: "🎟️", label: "Vouchers", desc: "Time + day rules" },
  { icon: "👥", label: "Pax pricing", desc: "Buffet & unlimited" },
  { icon: "🧾", label: "Bill splitting", desc: "Per item or %" },
];

export default function WhatIsUmami() {
  return (
    <Section
      id="what"
      eyebrow="What is Umami"
      title={<>Four screens. <span className="brand-text">One restaurant.</span></>}
      subtitle="Every surface a restaurant needs — built to talk to each other in real-time."
    >
      <Container>
        <div className="grid md:grid-cols-2 gap-5">
          <Reveal>
            <CustomerCard />
          </Reveal>
          <Reveal delay={0.1}>
            <KitchenCard />
          </Reveal>
          <Reveal delay={0.2}>
            <OwnerCard />
          </Reveal>
          <Reveal delay={0.3}>
            <ChainCard />
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-6 rounded-2xl border border-white/10 bg-card p-6 md:p-8">
            <div className="text-xs uppercase tracking-widest text-muted font-mono mb-5 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand animate-pulse-glow" />
              And everything that comes with it
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {features.map((f) => (
                <motion.div
                  key={f.label}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="group flex flex-col items-center gap-1.5 rounded-xl border border-white/5 bg-white/[0.02] py-5 px-3 text-center hover:border-brand/30 hover:bg-brand/[0.03] transition-colors"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {f.icon}
                  </span>
                  <span className="text-xs font-medium text-foreground">
                    {f.label}
                  </span>
                  <span className="text-[10px] text-muted">{f.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

// ─── Card shell ──────────────────────────────────────────────────────────────

function Card({
  accent,
  glow,
  badge,
  title,
  desc,
  children,
}: {
  accent: string;
  glow: string;
  badge: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative h-full rounded-2xl border border-white/10 bg-card overflow-hidden lift"
    >
      {/* Glow */}
      <div
        className="absolute -top-32 -right-20 w-72 h-72 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
        style={{ background: glow }}
      />

      {/* Visual */}
      <div className="relative h-[260px] overflow-hidden border-b border-white/5">
        {children}
      </div>

      {/* Footer */}
      <div className="relative p-6">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={cn("size-1.5 rounded-full", accent)}
            style={{ boxShadow: `0 0 12px 1px currentColor` }}
          />
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
            {badge}
          </span>
        </div>
        <h3 className="text-xl font-semibold tracking-tight mb-1.5">{title}</h3>
        <p className="text-sm text-muted leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── 1. Customer Ordering — mini phone with cart ─────────────────────────────

function CustomerCard() {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setCartCount((c) => (c >= 4 ? 0 : c + 1)),
      1400,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <Card
      accent="bg-orange-500 text-orange-500"
      glow="radial-gradient(circle, rgba(232,122,30,0.4), transparent 70%)"
      badge="For your customers"
      title="Customer Ordering"
      desc="Scan a QR, browse, order. No app to download. No staff to flag down. Works in 6 languages."
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute left-1/2 -translate-x-1/2 top-6 w-[200px]">
        <div className="phone-frame !p-2 !rounded-[24px]">
          <div className="bg-background rounded-[18px] overflow-hidden h-[230px] flex flex-col">
            <div className="px-3 py-2 border-b border-white/5">
              <div className="text-[7px] uppercase tracking-widest text-brand font-mono">
                Table 12
              </div>
              <div className="text-[10px] font-semibold mt-0.5">Menu</div>
            </div>
            <div className="flex-1 px-2 py-2 space-y-1.5 overflow-hidden">
              {[
                { e: "☕", n: "Spanish Latte", p: 180 },
                { e: "🥐", n: "Croissant", p: 110 },
                { e: "🥪", n: "Truffle Toast", p: 280 },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-1.5 py-1 rounded-md border border-white/5 bg-white/[0.02]"
                >
                  <span className="text-sm">{item.e}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[8px] font-medium truncate">
                      {item.n}
                    </div>
                    <div className="text-[7px] font-mono text-muted">
                      {peso(item.p)}
                    </div>
                  </div>
                  <div className="size-3.5 rounded-full bg-brand grid place-items-center text-black text-[8px] font-bold leading-none">
                    +
                  </div>
                </div>
              ))}
            </div>
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  className="m-1.5 rounded-lg bg-brand text-black px-2 py-1.5 flex items-center justify-between"
                >
                  <span className="text-[7px] font-mono">
                    {cartCount} {cartCount === 1 ? "item" : "items"}
                  </span>
                  <span className="text-[8px] font-bold">Order →</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── 2. Kitchen + Dining + Cashier — stacked tickets ─────────────────────────

function KitchenCard() {
  const [tickets, setTickets] = useState([
    { id: 1, table: "T08", item: "Truffle Toast", status: "READY", color: "emerald" },
    { id: 2, table: "T03", item: "Spanish Latte ×2", status: "PREPARING", color: "amber" },
    { id: 3, table: "T12", item: "Salmon Bagel", status: "NEW", color: "brand" },
  ]);
  const idRef = { current: 4 };

  useEffect(() => {
    const items = [
      { item: "Cold Brew", table: "T05" },
      { item: "Pesto Panini", table: "T11" },
      { item: "Croissant ×3", table: "T02" },
      { item: "Dirty Matcha", table: "T07" },
    ];
    const t = setInterval(() => {
      const next = items[Math.floor(Math.random() * items.length)];
      setTickets((prev) => [
        {
          id: idRef.current++,
          table: next.table,
          item: next.item,
          status: "NEW",
          color: "brand",
        },
        ...prev.slice(0, 2),
      ]);
    }, 1800);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      accent="bg-emerald-500 text-emerald-500"
      glow="radial-gradient(circle, rgba(16,185,129,0.3), transparent 70%)"
      badge="For your team"
      title="Kitchen, Dining & Cashier"
      desc="Real-time tickets. Item-level status. Bill splitting. Built for the line — not for an office."
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 p-6 flex flex-col gap-2 justify-center">
        <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 mb-1 flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Kitchen Display · Live
        </div>
        <AnimatePresence mode="popLayout">
          {tickets.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-card/80 backdrop-blur p-2.5"
            >
              <span className="font-mono text-[10px] text-brand shrink-0 w-9">
                {t.table}
              </span>
              <span className="text-sm font-medium flex-1 truncate">
                {t.item}
              </span>
              <span
                className={cn(
                  "text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full",
                  t.color === "emerald" && "bg-emerald-500/15 text-emerald-400",
                  t.color === "amber" && "bg-amber-500/15 text-amber-400",
                  t.color === "brand" && "bg-brand/15 text-brand animate-pulse",
                )}
              >
                {t.status}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
}

// ─── 3. Owner Dashboard — sales chart + KPIs ─────────────────────────────────

function OwnerCard() {
  const [revenue, setRevenue] = useState(48230);
  useEffect(() => {
    const t = setInterval(
      () => setRevenue((r) => r + Math.floor(Math.random() * 280) + 80),
      1500,
    );
    return () => clearInterval(t);
  }, []);

  // Generate a smooth wave for the chart
  const points = Array.from({ length: 24 }, (_, i) => {
    const v = 30 + Math.sin(i * 0.55) * 18 + Math.cos(i * 0.3) * 10 + i * 1.2;
    return v;
  });
  const max = Math.max(...points);
  const path = points
    .map((p, i) => {
      // Round to 3 decimal places — keeps the curve smooth while making
      // SSR and CSR produce byte-identical path strings (avoids hydration mismatch)
      const x = ((i / (points.length - 1)) * 100).toFixed(3);
      const y = (100 - (p / max) * 90).toFixed(3);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
  const area = `${path} L 100 100 L 0 100 Z`;

  return (
    <Card
      accent="bg-violet-500 text-violet-500"
      glow="radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%)"
      badge="For the owner"
      title="Owner Dashboard"
      desc="Live sales. Staff productivity. Inventory. End-of-day in real-time — not after the printout."
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-violet-400 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-violet-400 animate-pulse" />
            Today · Live
          </span>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <Kpi label="Revenue" value={peso(revenue)} highlight />
          <Kpi label="Orders" value="142" />
          <Kpi label="Avg ticket" value="₱340" />
        </div>

        {/* Chart */}
        <div className="flex-1 relative">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              d={area}
              fill="url(#areaFill)"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              d={path}
              stroke="#a78bfa"
              strokeWidth="1.5"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="absolute -bottom-1 left-0 right-0 flex justify-between text-[8px] font-mono text-muted px-1">
            <span>6am</span>
            <span>12pm</span>
            <span>6pm</span>
            <span>now</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function Kpi({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2">
      <div className="text-[8px] uppercase tracking-widest text-muted font-mono mb-0.5">
        {label}
      </div>
      <motion.div
        key={value}
        initial={{ scale: highlight ? 1.05 : 1, color: highlight ? "#a78bfa" : "#f5f5f7" }}
        animate={{ scale: 1, color: "#f5f5f7" }}
        transition={{ duration: 0.5 }}
        className={cn(
          "text-sm font-semibold tabular-nums",
          highlight && "text-foreground",
        )}
      >
        {value}
      </motion.div>
    </div>
  );
}

// ─── 4. Chain Operator — branch list with live status ────────────────────────

function ChainCard() {
  const [branches, setBranches] = useState([
    { name: "Mandaluyong Branch", revenue: 18420, status: "live", trend: "up" },
    { name: "Quezon City Branch", revenue: 12180, status: "live", trend: "up" },
    { name: "Alabang Branch", revenue: 9640, status: "live", trend: "down" },
    { name: "Makati Branch", revenue: 14230, status: "live", trend: "up" },
  ]);

  useEffect(() => {
    const t = setInterval(() => {
      setBranches((prev) =>
        prev.map((b) => ({
          ...b,
          revenue: b.revenue + Math.floor(Math.random() * 180),
        })),
      );
    }, 1600);
    return () => clearInterval(t);
  }, []);

  const total = branches.reduce((s, b) => s + b.revenue, 0);

  return (
    <Card
      accent="bg-sky-500 text-sky-500"
      glow="radial-gradient(circle, rgba(14,165,233,0.3), transparent 70%)"
      badge="For chains & franchises"
      title="Chain Operator"
      desc="Run all branches from one screen. Push menus, read live sales, manage roles. Centralized, never blind."
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 p-6 flex flex-col">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-sky-400 mb-1 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-sky-400 animate-pulse" />
              All branches · Live
            </div>
            <motion.div
              key={total}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              className="text-xl font-bold tabular-nums"
            >
              {peso(total)}
            </motion.div>
          </div>
          <div className="text-[9px] font-mono text-emerald-400">+12.4% ↑</div>
        </div>

        <div className="space-y-1.5 flex-1">
          {branches.map((b) => (
            <motion.div
              key={b.name}
              layout
              className="flex items-center gap-2 rounded-md bg-white/[0.02] border border-white/5 px-2.5 py-1.5"
            >
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-xs font-medium flex-1 truncate">
                {b.name}
              </span>
              <motion.span
                key={b.revenue}
                initial={{ color: "#7dd3fc" }}
                animate={{ color: "rgba(245, 245, 247, 0.8)" }}
                transition={{ duration: 0.6 }}
                className="text-[10px] font-mono tabular-nums text-foreground/80"
              >
                {peso(b.revenue)}
              </motion.span>
              <span
                className={cn(
                  "text-[10px]",
                  b.trend === "up" ? "text-emerald-400" : "text-amber-400",
                )}
              >
                {b.trend === "up" ? "↑" : "↓"}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}
