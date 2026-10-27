"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Container from "../ui/Container";
import Headline from "../ui/Headline";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import { QRCodeSVG } from "qrcode.react";
import FoodCheck, { type FoodCheckValue } from "../ui/FoodCheck";
import { APP_URL, DEMO_MENU_URL } from "@/lib/app";

export default function TryUmami({ showReel = true }: { showReel?: boolean }) {
  const [email, setEmail] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [check, setCheck] = useState<FoodCheckValue | null>(null);
  const [checkKey, setCheckKey] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || sending) return;

    if (!check?.challengeId || check.selected.length === 0) {
      setError("Tap the matching food below so we know you're human.");
      return;
    }

    setSending(true);
    setError(null);
    try {
      // This creates the restaurant and emails the owner their login. It is the
      // app's endpoint, not ours — this site holds no accounts. A failure here
      // means no account was created, so it must surface, never be swallowed.
      const res = await fetch(`${APP_URL}/api/auth/free-trial`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          restaurantName: restaurant,
          captchaId: check.challengeId,
          captchaSelected: check.selected,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        // The app already words these for the visitor ("that email has an
        // account, sign in at…"), so show its message rather than our own.
        throw new Error(
          data.error ||
            "We couldn't set that up. Try again, or email umamitechnologies@gmail.com and we'll do it for you.",
        );
      }

      setSubmitted(true);

      // Tell ourselves a trial started. Best-effort on purpose: the visitor
      // already has their account, so our own lead notification failing must
      // not show them an error.
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, restaurant, kind: "trial" }),
      }).catch(() => {});
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again?",
      );
      setCheckKey((k) => k + 1); // challenges are single-use
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="try" data-chapter="paper" className="chapter-paper relative scroll-mt-20 py-24 md:py-40">
      <Container>
        <Headline lines={["Try it on", "your phone."]} className="text-[40px] md:text-[72px]" />

        <div className="mt-16 grid gap-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {showReel && (
            <Reveal from="scale" className="hidden lg:col-span-3 lg:block">
              <Reel />
            </Reveal>
          )}

          <Reveal className={showReel ? "lg:col-span-4" : "lg:col-span-5"}>
            <h3 className="text-[26px] font-semibold leading-tight">Order from the demo restaurant</h3>
            <p className="mt-3 max-w-sm text-[18px] text-muted">
              A real menu at Umami Demo Kitchen, a made-up Filipino restaurant. No account, no staff to
              bother. Your ticket shows up on the kitchen screen on our homepage.
            </p>
            <a
              href={DEMO_MENU_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the demo menu"
              className="mt-8 inline-block rounded-[20px] bg-white p-5"
            >
              <QRCodeSVG value={DEMO_MENU_URL} size={184} level="M" fgColor="#121212" />
            </a>
            <p className="mt-4 text-[16px]">
              <a
                href={DEMO_MENU_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-ink underline decoration-2 underline-offset-4"
              >
                app.umami.com.ph/menu/demo
              </a>
            </p>
          </Reveal>

          <Reveal delay={0.08} className={showReel ? "lg:col-span-5" : "lg:col-span-6 lg:col-start-7"}>
            <h3 className="text-[26px] font-semibold leading-tight">Start your own restaurant, free</h3>
            <p className="mt-3 max-w-md text-[18px] text-muted">
              We set up your restaurant and email you an owner login. No card, no sales call.
            </p>

            {!submitted ? (
              <form onSubmit={submit} className="mt-8 max-w-md space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-[16px] font-medium">Restaurant name, if you have one</span>
                  <input
                    type="text"
                    placeholder="Lola's Kitchen"
                    value={restaurant}
                    onChange={(e) => setRestaurant(e.target.value)}
                    className="h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-[16px] outline-none placeholder:text-[#8a8a8a] focus:border-foreground"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[16px] font-medium">Your email</span>
                  <input
                    type="email"
                    placeholder="you@yourrestaurant.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-[16px] outline-none placeholder:text-[#8a8a8a] focus:border-foreground"
                  />
                </label>
                <FoodCheck onChange={setCheck} refreshKey={checkKey} />
                <Button type="submit" className="w-full" disabled={sending}>
                  {sending ? "Setting up your restaurant…" : "Get my free restaurant"}
                </Button>
                {error && (
                  <p role="alert" className="text-[16px] text-[#b42318]">
                    {error}
                  </p>
                )}
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 max-w-md rounded-[20px] bg-white p-6"
              >
                <p className="text-[19px] font-semibold text-[#1f7a46]">Your restaurant is ready.</p>
                {/* The explicit {" "} on BOTH sides is load-bearing: JSX strips the
                    leading whitespace of a text node that wraps onto another line. */}
                <p className="mt-2 text-[18px]">
                  We sent your owner login to{" "}
                  <strong>{email}</strong>{" "}
                  and it should land within a minute. Check spam if it doesn&rsquo;t.
                </p>
                <a
                  href={`${APP_URL}/login`}
                  className="mt-4 inline-block font-medium text-brand-ink underline decoration-2 underline-offset-4"
                >
                  Go to sign in
                </a>
              </motion.div>
            )}

            <p className="mt-8 text-[16px] text-muted">
              Already with us?{" "}
              <a href="https://app.umami.com.ph" className="font-medium text-brand-ink underline decoration-2 underline-offset-4">
                Sign in
              </a>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/**
 * The 15-second film. Muted, plays only while on screen, never on its own for
 * a visitor who has asked for less motion (they get the poster and a play
 * control). preload="none": it costs nothing until it is scrolled to.
 */
function Reel() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.controls = true;
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <figure>
      <video
        ref={ref}
        src="/reel/umami-15s.mp4"
        poster="/reel/poster.jpg"
        muted
        loop
        playsInline
        preload="none"
        aria-label="A 15-second film of Umami: a guest taps to order, the bill updates live, and orders keep going when the internet is down."
        className="aspect-[9/16] w-full rounded-[28px] bg-kitchen object-cover"
      />
      <figcaption className="mt-3 text-[14px] text-muted">Umami in 15 seconds.</figcaption>
    </figure>
  );
}
