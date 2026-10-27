"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Container from "../ui/Container";
import Headline from "../ui/Headline";
import Reveal from "../ui/Reveal";
import { dishById, money } from "@/lib/dishes";

/**
 * The owner's side: switch a dish off in the dashboard and it leaves every
 * guest's menu. Both panels here are true-size fragments of the real screens.
 */
const IDS = ["chicken-pesto", "clubhouse", "cheesy-chicken-poppers", "caesar-salad"];

export default function OwnerSoldOut() {
  const [on, setOn] = useState<Record<string, boolean>>({
    "chicken-pesto": true,
    "clubhouse": true,
    "cheesy-chicken-poppers": false,
    "caesar-salad": true,
  });
  const dishes = IDS.map(dishById);

  return (
    <section id="owners" data-chapter="white" className="chapter-white relative scroll-mt-20 py-24 md:py-40">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Headline lines={["Sold out?", "One tap."]} className="text-[40px] md:text-[72px]" />
            <p className="mt-8 max-w-md text-[18px] leading-[1.5] text-muted md:text-[21px]">
              Mark a dish sold out or change a price in the owner dashboard, and every guest&rsquo;s
              menu follows within seconds. At one branch or all of them.
            </p>
            <p className="mt-6 max-w-md text-[18px]">
              <span className="font-semibold">Try it:</span>{" "}switch a dish off and watch it leave the
              guest&rsquo;s menu.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            <Reveal>
              <div data-ui className="ui-card overflow-hidden">
                <div className="ui-row px-5 py-4">
                  <div className="text-[13px] text-[#6b6b6b]">Owner dashboard</div>
                  <div className="text-[17px] font-semibold">Products</div>
                </div>
                <ul className="px-5 py-1">
                  {dishes.map((d) => {
                    const checked = on[d.id];
                    return (
                      <li key={d.id} className="ui-row flex items-center gap-3 py-3 last:border-0">
                        <span className="flex-1">
                          <span className="block font-medium">{d.name}</span>
                          <span className="block text-[13px] tabular-nums text-[#6b6b6b]">
                            {checked ? money(d.price) : "Sold out"}
                          </span>
                        </span>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={checked}
                          aria-label={`${d.name} available`}
                          onClick={() => setOn((s) => ({ ...s, [d.id]: !s[d.id] }))}
                          className={`ui-switch shrink-0 ${checked ? "bg-[#1f7a46]" : "bg-[#c9c9c4]"}`}
                        >
                          <span />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div data-ui className="ui-card overflow-hidden">
                <div className="ui-row px-5 py-4">
                  <div className="text-[13px] text-[#6b6b6b]">Guest&rsquo;s phone, table 3</div>
                  <div className="text-[17px] font-semibold">Ala carte</div>
                </div>
                <ul className="min-h-[272px] px-5 py-1">
                  <AnimatePresence initial={false}>
                    {dishes
                      .filter((d) => on[d.id])
                      .map((d) => (
                        <motion.li
                          key={d.id}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex items-center gap-3 py-2">
                            <Image src={d.photo} alt="" width={52} height={52} className="dish size-[52px] object-contain" />
                            <span className="flex-1">
                              <span className="block font-medium">{d.name}</span>
                              <span className="block text-[13px] tabular-nums text-[#6b6b6b]">{money(d.price)}</span>
                            </span>
                            <span className="grid size-8 place-items-center rounded-full bg-brand text-[18px] leading-none" aria-hidden="true">
                              +
                            </span>
                          </div>
                        </motion.li>
                      ))}
                  </AnimatePresence>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
