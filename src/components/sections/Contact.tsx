"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Container from "../ui/Container";
import Headline from "../ui/Headline";
import Button from "../ui/Button";

const channels = [
  { label: "Book a 30-minute demo", value: "cal.com/umamitech", href: "https://cal.com/umamitech" },
  { label: "Message us on WhatsApp", value: "+63 917 576 2744", href: "https://wa.me/639175762744" },
  { label: "Email", value: "umamitechnologies@gmail.com", href: "mailto:umamitechnologies@gmail.com" },
];

const field =
  "w-full rounded-xl border border-black/15 bg-white px-4 text-[16px] outline-none placeholder:text-[#8a8a8a] focus:border-foreground";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
        body: JSON.stringify({ name, email, phone, message: msg, kind: "contact" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error ||
            "Your message didn't send. Try again, or email umamitechnologies@gmail.com directly.",
        );
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again?");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" data-chapter="black" className="chapter-black relative scroll-mt-20 py-24 md:py-40">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Headline lines={["Talk to a person."]} className="text-[40px] md:text-[72px]" />
            <p className="mt-8 max-w-md text-[18px] leading-[1.5] text-muted md:text-[21px]">
              We answer within the hour during Philippine business hours. Pick whichever is easiest.
            </p>
            <ul className="mt-12 space-y-8">
              {channels.map((c, i) => (
                <li key={c.label}>
                  <div>
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="group block">
                      <span className="block text-[18px] text-muted">{c.label}</span>
                      <span className="mt-1 block text-[21px] font-semibold [overflow-wrap:anywhere] sm:text-[26px] tracking-[-0.01em] transition-colors group-hover:text-brand-ink">
                        {c.value}
                      </span>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="rounded-[24px] bg-white p-7 text-[#121212] md:p-9 [--foreground:#121212] [--muted:#4a4a4a]">
              <h3 className="text-[26px] font-semibold">Or leave a message</h3>
              <p className="mt-1 text-[16px] text-muted">Sean, the founder, reads every one.</p>
              {!sent ? (
                <form onSubmit={submit} className="mt-7 space-y-4">
                  <label className="block">
                    <span className="mb-1.5 block text-[16px] font-medium">Name</span>
                    <input value={name} onChange={(e) => setName(e.target.value)} className={`h-12 ${field}`} autoComplete="name" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[16px] font-medium">Email</span>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`h-12 ${field}`} autoComplete="email" />
                  </label>
                  {/* Optional: a phone number is often the faster way to answer a
                      question, but demanding one costs enquiries. */}
                  <label className="block">
                    <span className="mb-1.5 block text-[16px] font-medium">Mobile number, optional</span>
                    <input type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={`h-12 ${field}`} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[16px] font-medium">What can we help with?</span>
                    <textarea required rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} className={`resize-none py-3 ${field}`} />
                  </label>
                  <Button type="submit" variant="dark" className="w-full" disabled={sending}>
                    {sending ? "Sending…" : "Send message"}
                  </Button>
                  {error && (
                    <p role="alert" className="text-[16px] text-[#b42318]">
                      {error}
                    </p>
                  )}
                </form>
              ) : (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-7 text-[19px] text-[#1f7a46]"
                >
                  Thanks{name ? `, ${name}` : ""}. We will reply within the hour.
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
