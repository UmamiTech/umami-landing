"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import Container from "../ui/Container";
import { DISH_SOURCES, MENU_DISHES, billFor, dishById, money } from "@/lib/dishes";

/**
 * "Tap a dish": the guest's side of Umami, with a real menu. Tapping a dish adds
 * it; the bill beside it is computed the way the guest's phone shows it (prices
 * include VAT, service charge on the pre-VAT amount). Nothing here talks to a
 * server: it is the page, not the app.
 */
const MAX_QTY = 9;

export default function TapToOrder() {
  const [cart, setCart] = useState<Record<string, number>>({ "classic-tapa": 1, "mango-frappe": 2 });
  const [sent, setSent] = useState(false);

  const lines = useMemo(
    () =>
      Object.entries(cart)
        .filter(([, q]) => q > 0)
        .map(([id, qty]) => ({ ...dishById(id), qty })),
    [cart],
  );
  const bill = billFor(lines);

  const add = (id: string) => {
    setSent(false);
    setCart((c) => ({ ...c, [id]: Math.min(MAX_QTY, (c[id] ?? 0) + 1) }));
  };
  const remove = (id: string) => {
    setSent(false);
    setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) - 1) }));
  };

  return (
    <section id="ordering" className="relative scroll-mt-20 py-24 md:py-36">
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-[40px] md:text-[72px]">Tap a dish. The bill keeps up.</h2>
          <p className="mt-8 max-w-xl text-[18px] leading-[1.5] text-muted md:text-[21px]">
            This is what your guests do at the table, with real dishes and prices from the{" "}
            {DISH_SOURCES} menus. No app to download, no waiting for a server.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            {MENU_DISHES.map((d, i) => {
              const qty = cart[d.id] ?? 0;
              return (
                <motion.li
                  key={d.id}
                  data-reveal
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  transition={{ duration: 0.8, delay: (i % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                    <button
                      type="button"
                      onClick={() => add(d.id)}
                      className="group block w-full text-left"
                      aria-label={`Add ${d.name}, ${money(d.price)}${qty ? `, ${qty} in the order` : ""}`}
                    >
                      <span className="relative block aspect-square">
                        <Image
                          src={d.photo}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 200px, 45vw"
                          className="dish object-contain transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04] group-active:scale-[0.98]"
                        />
                        <AnimatePresence>
                          {qty > 0 && (
                            <motion.span
                              key={qty}
                              initial={{ scale: 0.6, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.6, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute right-1 top-1 grid size-9 place-items-center rounded-full bg-brand text-[16px] font-semibold tabular-nums text-foreground"
                            >
                              {qty}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                      <span className="mt-3 block text-[16px] font-medium leading-snug">{d.name}</span>
                      <span className="block text-[14px] text-muted">{d.source}</span>
                      <span className="mt-0.5 flex items-center justify-between text-[16px] text-muted tabular-nums">
                        {money(d.price)}
                        <span className="text-[16px] font-medium text-brand-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                          Add
                        </span>
                      </span>
                    </button>
                </motion.li>
              );
            })}
          </ul>

          <div className="lg:col-span-4">
            <div data-ui className="ui-card sticky top-24 overflow-hidden">
              <div className="ui-row flex items-baseline justify-between px-5 py-4">
                <span className="text-[15px] font-semibold">Table 7 · Your order</span>
                <span className="text-[13px] text-[#6b6b6b]">{lines.reduce((s, l) => s + l.qty, 0)} items</span>
              </div>
              <ul className="min-h-[180px] px-5 py-2">
                <AnimatePresence initial={false}>
                  {lines.map((l) => (
                    <motion.li
                      key={l.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-center gap-3 py-2">
                        <span className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => remove(l.id)}
                            aria-label={`Remove one ${l.name}`}
                            className="grid size-7 place-items-center rounded-md border border-black/15 text-[16px] leading-none hover:bg-black/5"
                          >
                            −
                          </button>
                          <span className="w-6 text-center tabular-nums">{l.qty}</span>
                          <button
                            type="button"
                            onClick={() => add(l.id)}
                            aria-label={`Add one ${l.name}`}
                            className="grid size-7 place-items-center rounded-md border border-black/15 text-[16px] leading-none hover:bg-black/5"
                          >
                            +
                          </button>
                        </span>
                        <span className="flex-1 truncate">{l.name}</span>
                        <span className="tabular-nums">{money(l.price * l.qty)}</span>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
                {lines.length === 0 && (
                  <li className="py-6 text-[#6b6b6b]">Tap a dish to start the order.</li>
                )}
              </ul>
              <dl className="space-y-1.5 bg-[#f7f7f5] px-5 py-4 tabular-nums">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd>{money(bill.subtotal, true)}</dd>
                </div>
                <div className="flex justify-between text-[13px] text-[#6b6b6b]">
                  <dt>VAT included (12%)</dt>
                  <dd>{money(bill.vat, true)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Service charge (10%)</dt>
                  <dd>{money(bill.service, true)}</dd>
                </div>
                <div className="flex justify-between pt-2 text-[17px] font-semibold">
                  <dt>Total</dt>
                  <dd>{money(bill.total, true)}</dd>
                </div>
              </dl>
              <div className="p-4">
                <button
                  type="button"
                  disabled={lines.length === 0}
                  onClick={() => setSent(true)}
                  className="h-12 w-full rounded-full bg-brand font-semibold text-foreground transition-colors hover:bg-[#f08a32] disabled:opacity-50"
                >
                  {sent ? "Sent to the kitchen" : "Send to kitchen"}
                </button>
                <p className="mt-3 min-h-[2.8em] text-[13px] text-[#6b6b6b]" aria-live="polite">
                  {sent
                    ? "On a real table, the ticket is on the kitchen screen now. Scan the code at the top of the page to try it for real."
                    : "Service charge is worked out on the price before VAT, as on a Philippine receipt."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
