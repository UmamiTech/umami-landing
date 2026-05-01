"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";

const channels = [
  {
    label: "Book a demo",
    desc: "30 minutes. Show you everything. No pitch.",
    value: "cal.com/umami/demo",
    href: "https://cal.com/umami/demo",
    icon: "📅",
  },
  {
    label: "WhatsApp",
    desc: "Quickest way to reach us.",
    value: "+63 917 576 2744",
    href: "https://wa.me/639175762744",
    icon: "💬",
  },
  {
    label: "Email",
    desc: "For longer conversations or proposals.",
    value: "umamitechnologies@gmail.com",
    href: "mailto:umamitechnologies@gmail.com",
    icon: "✉️",
  },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !msg.trim() || sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: msg, kind: "contact" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send");
      }
      setSent(true);
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
      id="contact"
      eyebrow="Talk to us"
      title={<>Real humans. <span className="brand-text">Real fast.</span></>}
      subtitle="Pick the channel you like. We answer within the hour during PH business hours."
    >
      <Container>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Channels */}
          <Reveal>
            <div className="space-y-3">
              {channels.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-card p-5 lift"
                >
                  <div className="size-12 rounded-xl bg-white/5 grid place-items-center text-2xl shrink-0">
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-semibold mb-0.5">
                      {c.label}
                    </div>
                    <div className="text-xs text-muted">{c.desc}</div>
                    <div className="text-xs font-mono text-brand mt-1.5">
                      {c.value}
                    </div>
                  </div>
                  <div className="text-muted group-hover:text-brand transition-colors">
                    →
                  </div>
                </motion.a>
              ))}
            </div>
          </Reveal>

          {/* Form + founder */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-card p-7">
              <div className="flex items-center gap-3 mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/umami-icon.svg"
                  alt="Umami"
                  className="size-12 rounded-full bg-black p-2"
                />
                <div>
                  <div className="text-sm font-semibold">Sean Lim</div>
                  <div className="text-xs text-muted">Founder · Available now</div>
                </div>
              </div>

              {!sent ? (
                <form onSubmit={submit} className="space-y-3">
                  <input
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand/40 placeholder:text-muted"
                  />
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand/40 placeholder:text-muted"
                  />
                  <textarea
                    placeholder="What can we help with?"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand/40 placeholder:text-muted resize-none"
                  />
                  <Button type="submit" className="w-full">
                    {sending ? "Sending…" : "Send →"}
                  </Button>
                  {error && (
                    <div className="text-xs text-red-400 mt-1">{error}</div>
                  )}
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5"
                >
                  <div className="flex items-center gap-2.5 text-emerald-400 mb-2">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-widest">
                      Sent
                    </span>
                  </div>
                  <p className="text-sm text-foreground/90">
                    Thanks {name || "friend"}. We&rsquo;ll reply within an hour.
                  </p>
                </motion.div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
