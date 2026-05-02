"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";

const pains = [
  {
    bad: "Internet dies. Orders die.",
    good: "Offline-first. Keep ordering with zero WiFi.",
    detail:
      "Local laptop deployment means a power outage at the ISP doesn't take your night down.",
  },
  {
    bad: "Menus change. Print shop again.",
    good: "Edit a menu. Customers see it in 5 seconds.",
    detail: "Stickers on menus aren't a strategy. Live menus are.",
  },
  {
    bad: "5 branches. 5 spreadsheets.",
    good: "One dashboard. Every branch. Live.",
    detail:
      "Real-time sales, inventory, and staff metrics — without waiting for end-of-day printouts.",
  },
  {
    bad: "Where's table 12's bill?",
    good: "Customer sees the running bill. So do you.",
    detail: "Real-time sync from POS to phone to kitchen. No more guessing.",
  },
  {
    bad: "Tourists can't read the menu.",
    good: "Six languages, auto-translated by AI.",
    detail: "English, Chinese, Japanese, Korean, Vietnamese, Thai — out of the box.",
  },
  {
    bad: "Tech costs ₱200K to set up.",
    good: "Start free. Scale when you grow.",
    detail: "No tablets to buy. No screens to break. Just the device you already own.",
  },
];

export default function PainPoints() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Section
      id="pain"
      eyebrow="Why Umami exists"
      title={<>Every restaurant&apos;s daily fight.<br /><span className="brand-text">Solved.</span></>}
      subtitle="We were customers first. We were owners second. We built what we needed."
    >
      <Container>
        <div ref={ref} className="space-y-3">
          {pains.map((p, i) => (
            <PainRow key={i} {...p} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function PainRow({
  bad,
  good,
  detail,
  index,
}: {
  bad: string;
  good: string;
  detail: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"],
  });
  const swap = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 1]);
  const goodOpacity = useTransform(swap, [0, 1], [0, 1]);
  const badOpacity = useTransform(swap, [0, 1], [1, 0.15]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="relative grid md:grid-cols-2 gap-2 md:gap-6 rounded-2xl border border-white/10 bg-card overflow-hidden"
    >
      <div className="relative p-7 md:p-9 border-b md:border-b-0 md:border-r border-white/5">
        <div className="absolute top-6 left-7 text-xs font-mono text-red-400/70 uppercase tracking-widest flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-red-400" />
          Before
        </div>
        <motion.div style={{ opacity: badOpacity }} className="mt-8">
          <div className="text-2xl md:text-3xl font-semibold leading-snug text-foreground/80 line-through decoration-red-500/40 decoration-2">
            {bad}
          </div>
        </motion.div>
      </div>
      <div className="relative p-7 md:p-9">
        <div className="absolute top-6 left-7 text-xs font-mono text-emerald-400/80 uppercase tracking-widest flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          With Umami
        </div>
        <motion.div style={{ opacity: goodOpacity }} className="mt-8">
          <div className="text-2xl md:text-3xl font-semibold leading-snug brand-text">
            {good}
          </div>
          <p className="mt-3 text-sm text-muted max-w-md">{detail}</p>
        </motion.div>
      </div>
      <div className="hidden">{index}</div>
    </motion.div>
  );
}
