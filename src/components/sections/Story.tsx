"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";

const beats = [
  {
    year: "2018",
    title: "Opened a restaurant",
    body: "I'm a restaurateur, not a coder. I lived the chaos before I solved it.",
  },
  {
    year: "2018-2021",
    title: "Tried every solution",
    body: "Table beepers. Tablets. POS terminals costing six figures. They all broke. We always crawled back to pen and paper.",
  },
  {
    year: "2022",
    title: "Started building Umami",
    body: "I built the operating system I needed — as a customer, as an owner, as someone who refused to accept that this is just how restaurants work.",
  },
  {
    year: "2024",
    title: "First chains went live",
    body: "Romantic Baboy. Kalei Cafe Bar. Real branches. Real volume. Real proof.",
  },
  {
    year: "2025",
    title: "Offline-first deployed",
    body: "Restaurants can now run a full night without internet. Local laptop, cloud sync, zero downtime.",
  },
  {
    year: "2026",
    title: "Scaling to every restaurant in PH",
    body: "Free tier launched. Goal: every café and restaurant in the Philippines, on Umami.",
  },
];

export default function Story() {
  return (
    <Section
      id="story"
      eyebrow="The story"
      title={<><span className="gradient-text">From a restaurant floor</span><br /><span className="brand-text">to an operating system.</span></>}
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          {/* Founder note */}
          <Reveal>
            <div className="rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/[0.06] to-transparent p-7 md:p-10 mb-16">
              <div className="text-xs uppercase tracking-widest text-brand font-mono mb-5">
                A note from the founder
              </div>
              <blockquote className="text-xl md:text-2xl leading-relaxed text-foreground/90 font-medium">
                &ldquo;In 2018, I opened a restaurant. By 2022, I built the
                software I wished existed. We&rsquo;re not digitizing restaurants
                — we&rsquo;re rewriting how they run.&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/umami-icon.svg"
                  alt="Umami"
                  className="size-10 rounded-full bg-black p-1.5"
                />
                <div>
                  <div className="text-sm font-semibold">Sean Lim</div>
                  <div className="text-xs text-muted">Founder, Umami</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Timeline */}
          <div className="relative pl-10 md:pl-14">
            <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-brand via-white/10 to-transparent" />
            {beats.map((b, i) => (
              <Reveal key={b.year} delay={i * 0.05}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="relative pb-12 last:pb-0"
                >
                  <div className="absolute -left-[34px] md:-left-[42px] top-1.5 size-3 rounded-full bg-brand shadow-[0_0_20px_4px_var(--brand-glow)]" />
                  <div className="text-xs font-mono uppercase tracking-widest text-brand mb-2">
                    {b.year}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                    {b.title}
                  </h3>
                  <p className="text-muted leading-relaxed max-w-xl">{b.body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
