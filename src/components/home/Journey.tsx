"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import Container from "../ui/Container";
import Headline from "../ui/Headline";
import Reveal from "../ui/Reveal";
import { billFor, dishById, money } from "@/lib/dishes";

/**
 * One order, four screens: the same Table 7 order seen by the guest, the
 * kitchen, the floor and the cashier. On a large screen the stage holds while
 * the steps scroll through it; on a phone the steps simply stack.
 */
const ORDER = [
  { ...dishById("margherita-pizza"), qty: 1 },
  { ...dishById("bibimbap"), qty: 1 },
  { ...dishById("mango-frappe"), qty: 2 },
];
const BILL = billFor(ORDER);

const STEPS = [
  {
    who: "The guest orders.",
    body: "Table 7 scans the code on the table and orders from their own phone. They can add more all night.",
  },
  {
    who: "The kitchen cooks.",
    body: "The ticket appears on the kitchen screen the moment it is sent. Cooks mark each dish as they go.",
  },
  {
    who: "The floor serves.",
    body: "Servers see what is ready and for which table, so nothing sits under the heat lamp.",
  },
  {
    who: "The cashier closes.",
    body: "The bill is already built from the order. Take payment, the table is free for the next guests.",
  },
];

function GuestScreen() {
  return (
    <div data-ui className="ui-card w-full max-w-[380px] overflow-hidden">
      <div className="ui-row px-5 py-4">
        <div className="text-[13px] text-[#6b6b6b]">Table 7</div>
        <div className="text-[17px] font-semibold">Your order</div>
      </div>
      <ul className="px-5 py-2">
        {ORDER.map((l) => (
          <li key={l.id} className="ui-row flex items-center gap-3 py-2.5 last:border-0">
            <Image src={l.photo} alt="" width={44} height={44} className="dish size-11 object-contain" />
            <span className="flex-1">{l.name}</span>
            <span className="tabular-nums text-[#6b6b6b]">{l.qty}×</span>
            <span className="w-16 text-right tabular-nums">{money(l.price * l.qty)}</span>
          </li>
        ))}
      </ul>
      <div className="p-4">
        <div className="flex h-12 items-center justify-center rounded-full bg-[#1f7a46] font-semibold text-white">
          Order sent to the kitchen
        </div>
      </div>
    </div>
  );
}

function KitchenScreen() {
  return (
    <div data-ui className="ui-dark w-full max-w-[380px] rounded-[16px] bg-kitchen p-4 text-kitchen-ink">
      <div className="mb-3 flex justify-between text-[13px] text-white/60">
        <span>Kitchen</span>
        <span>8:14 pm</span>
      </div>
      <div className="ui-ticket p-4">
        <div className="flex items-center justify-between">
          <span className="text-[17px] font-semibold">Table 7</span>
          <span className="rounded-md bg-white/12 px-2 py-0.5 text-[13px] font-medium">Cooking</span>
        </div>
        <ul className="mt-3 space-y-2 text-[15px]">
          <li className="flex items-center justify-between"><span>1× Margherita Pizza</span><span className="text-[13px] text-[#7fd3a0]">Ready</span></li>
          <li className="flex items-center justify-between"><span>1× Bibimbap</span><span className="text-[13px] text-white/60">Cooking</span></li>
          <li className="flex items-center justify-between"><span>2× Mango Frappe</span><span className="text-[13px] text-[#7fd3a0]">Ready</span></li>
        </ul>
      </div>
    </div>
  );
}

function FloorScreen() {
  return (
    <div data-ui className="ui-card w-full max-w-[380px] overflow-hidden">
      <div className="ui-row flex items-baseline justify-between px-5 py-4">
        <span className="text-[17px] font-semibold">Ready to serve</span>
        <span className="text-[13px] text-[#6b6b6b]">Dining</span>
      </div>
      <ul className="px-5 py-2">
        {ORDER.map((l, i) => (
          <li key={l.id} className="ui-row flex items-center gap-3 py-3 last:border-0">
            <span
              className={`grid size-6 place-items-center rounded-md text-[13px] ${i < 2 ? "bg-[#1f7a46] text-white" : "border border-black/20"}`}
              aria-hidden="true"
            >
              {i < 2 ? (
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : null}
            </span>
            <span className="flex-1">{l.qty}× {l.name}</span>
            <span className="text-[13px] text-[#6b6b6b]">Table 7</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CashierScreen() {
  return (
    <div data-ui className="ui-card w-full max-w-[380px] overflow-hidden">
      <div className="ui-row flex items-baseline justify-between px-5 py-4">
        <span className="text-[17px] font-semibold">Table 7 · Bill</span>
        <span className="text-[13px] text-[#6b6b6b]">Cashier</span>
      </div>
      <dl className="space-y-1.5 px-5 py-4 tabular-nums">
        {ORDER.map((l) => (
          <div key={l.id} className="flex justify-between">
            <dt>{l.qty}× {l.name}</dt>
            <dd>{money(l.price * l.qty, true)}</dd>
          </div>
        ))}
        <div className="flex justify-between pt-2 text-[13px] text-[#6b6b6b]">
          <dt>VAT included (12%)</dt>
          <dd>{money(BILL.vat, true)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Service charge (10%)</dt>
          <dd>{money(BILL.service, true)}</dd>
        </div>
        <div className="flex justify-between pt-2 text-[18px] font-semibold">
          <dt>Total</dt>
          <dd>{money(BILL.total, true)}</dd>
        </div>
      </dl>
      <div className="flex items-center justify-between bg-[#f7f7f5] px-5 py-4">
        <span className="font-semibold text-[#1f7a46]">Paid by GCash</span>
        <span className="text-[13px] text-[#6b6b6b]">Table 7 is free</span>
      </div>
    </div>
  );
}

const SCREENS = [GuestScreen, KitchenScreen, FloorScreen, CashierScreen];

export default function Journey() {
  const stage = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStep(Math.min(3, Math.max(0, Math.floor(v * 4))));
  });
  const Screen = SCREENS[step];

  return (
    <section id="how" data-chapter="paper" className="chapter-paper relative scroll-mt-20 pt-24 md:pt-36">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Headline lines={["One order.", "Four screens."]} className="text-[40px] md:text-[72px] lg:col-span-7" />
          <p className="max-w-xl text-[18px] leading-[1.5] text-muted md:text-[21px] lg:col-span-5">
            Umami gives every part of the restaurant its own screen, and they all see the same order
            at the same time. Follow one table through the night.
          </p>
        </div>
      </Container>

      {/* Large screens: a held stage, about one screen of scroll per step. */}
      <div ref={stage} className="relative hidden h-[230vh] lg:block">
        <div className="sticky top-0 flex h-svh items-center">
          <Container>
            <div className="grid grid-cols-12 items-center gap-10">
              <ol className="col-span-6 space-y-8">
                {STEPS.map((s, i) => (
                  <li
                    key={s.who}
                    className="transition-opacity duration-300"
                    style={{ opacity: i === step ? 1 : 0.4 }}
                    aria-current={i === step ? "step" : undefined}
                  >
                    <h3 className="font-display text-[36px] leading-[1.05] tracking-[-0.02em]">{s.who}</h3>
                    <p className="mt-2 max-w-md text-[18px] text-muted">{s.body}</p>
                  </li>
                ))}
              </ol>
              <div className="col-span-6 flex min-h-[460px] flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex w-full justify-center"
                  >
                    <Screen />
                  </motion.div>
                </AnimatePresence>
                <p className="mt-6 text-[16px] text-muted tabular-nums">{step + 1} of 4</p>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Phones and tablets: the same four steps, stacked. */}
      <Container className="pb-24 pt-14 md:pb-36 lg:hidden">
        <ol className="space-y-20">
          {STEPS.map((s, i) => {
            const S = SCREENS[i];
            return (
              <li key={s.who}>
                <Reveal>
                  <h3 className="font-display text-[28px] leading-[1.05] tracking-[-0.02em]">{s.who}</h3>
                  <p className="mt-2 max-w-md text-[18px] text-muted">{s.body}</p>
                </Reveal>
                <Reveal delay={0.08} className="mt-6 flex">
                  <S />
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
