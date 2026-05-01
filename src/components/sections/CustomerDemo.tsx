"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { peso, cn } from "@/lib/utils";
import { demoMenu, type DemoItem } from "@/lib/demoMenu";

type Cart = Record<string, number>;
type Screen = "menu" | "cart" | "placed";

export default function CustomerDemo() {
  const [cart, setCart] = useState<Cart>({});
  const [screen, setScreen] = useState<Screen>("menu");
  const [activeCat, setActiveCat] = useState(demoMenu[0].id);
  const [autoPlaying, setAutoPlaying] = useState(true);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const totalQty = Object.values(cart).reduce((s, q) => s + q, 0);
  const totalPrice = demoMenu
    .flatMap((c) => c.items)
    .reduce((s, item) => s + (cart[item.id] || 0) * item.price, 0);

  function add(id: string) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  }
  function remove(id: string) {
    setCart((c) => {
      const next = { ...c };
      if (!next[id]) return c;
      next[id] -= 1;
      if (next[id] <= 0) delete next[id];
      return next;
    });
  }

  // Stop autoplay on user interaction
  function userInteract() {
    if (autoPlaying) setAutoPlaying(false);
  }

  // Auto-play scripted demo on mount
  useEffect(() => {
    if (!autoPlaying) return;
    let cancelled = false;
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    async function script() {
      const sequence = [
        { itemId: "i1" }, // pork belly
        { itemId: "i1" }, // x2
        { catId: "sides" },
        { itemId: "i5" }, // tteokbokki
        { catId: "drinks" },
        { itemId: "i9" }, // americano
      ];

      await wait(1200);

      for (const step of sequence) {
        if (cancelled || !autoPlaying) return;

        if (step.catId) {
          // Click category tab
          const tabEl = document.getElementById(`tab-${step.catId}`);
          if (tabEl && scrollRef.current) {
            const tabRect = tabEl.getBoundingClientRect();
            const containerRect = scrollRef.current.getBoundingClientRect();
            setPointer({
              x: tabRect.left - containerRect.left + tabRect.width / 2,
              y: tabRect.top - containerRect.top + tabRect.height / 2,
            });
            await wait(450);
            setActiveCat(step.catId);
            // scroll to category in menu
            const sectionEl = document.getElementById(`cat-${step.catId}`);
            if (sectionEl && scrollRef.current) {
              scrollRef.current.scrollTo({
                top: sectionEl.offsetTop - 8,
                behavior: "smooth",
              });
            }
            await wait(700);
          }
        } else if (step.itemId) {
          const itemEl = itemRefs.current[step.itemId];
          if (itemEl && scrollRef.current) {
            const itemRect = itemEl.getBoundingClientRect();
            const containerRect = scrollRef.current.getBoundingClientRect();
            const btnX = itemRect.right - containerRect.left - 22;
            const btnY = itemRect.top - containerRect.top + itemRect.height / 2;
            setPointer({ x: btnX, y: btnY });
            await wait(500);
            add(step.itemId);
            await wait(550);
          }
        }
      }

      // Open cart
      await wait(700);
      const cartBtn = document.getElementById("cart-btn-demo");
      if (cartBtn && scrollRef.current) {
        const btnRect = cartBtn.getBoundingClientRect();
        const containerRect = scrollRef.current.getBoundingClientRect();
        setPointer({
          x: btnRect.left - containerRect.left + btnRect.width / 2,
          y: btnRect.top - containerRect.top + btnRect.height / 2,
        });
        await wait(450);
        if (cancelled || !autoPlaying) return;
        setScreen("cart");
        await wait(2000);
      }

      // Place order
      const placeBtn = document.getElementById("place-order-demo");
      if (placeBtn && scrollRef.current) {
        const btnRect = placeBtn.getBoundingClientRect();
        const containerRect = scrollRef.current.getBoundingClientRect();
        setPointer({
          x: btnRect.left - containerRect.left + btnRect.width / 2,
          y: btnRect.top - containerRect.top + btnRect.height / 2,
        });
        await wait(450);
        if (cancelled || !autoPlaying) return;
        setScreen("placed");
        await wait(3500);
      }

      // Reset for next loop
      if (!cancelled && autoPlaying) {
        setCart({});
        setScreen("menu");
        setActiveCat(demoMenu[0].id);
        setPointer(null);
        if (scrollRef.current) scrollRef.current.scrollTo({ top: 0 });
        await wait(800);
        // Restart loop
        if (!cancelled && autoPlaying) script();
      }
    }

    script();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlaying]);

  return (
    <Section
      id="customer-demo"
      eyebrow="Order like a customer"
      title={<>15 seconds. <span className="brand-text">No app.</span> No staff.</>}
      subtitle="Watch it order itself — then take over and try."
    >
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <Reveal className="lg:col-span-5 order-2 lg:order-1">
            <div className="space-y-7">
              <Bullet
                num="01"
                title="Scan the QR on your table"
                body="No download. No login. The menu opens straight in your browser."
              />
              <Bullet
                num="02"
                title="Browse, tap, add"
                body="Browse by category, see prices, allergens, photos. Tap to add. Photos auto-translated to your language."
              />
              <Bullet
                num="03"
                title="Place the order"
                body="Order goes straight to the kitchen. No flagging down a server."
              />
              <Bullet
                num="04"
                title="Watch your bill in real-time"
                body="Running bill on your phone. Request the bill when you're done. Pay at the cashier or in-app."
              />

              <div className="pt-4">
                <button
                  onClick={() => setAutoPlaying((v) => !v)}
                  className="text-xs font-mono text-muted hover:text-brand transition-colors flex items-center gap-2"
                >
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      autoPlaying
                        ? "bg-brand animate-pulse-glow"
                        : "bg-muted",
                    )}
                  />
                  {autoPlaying ? "Auto-demo running — click to pause" : "Paused — click to resume"}
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-7 order-1 lg:order-2">
            <div className="flex justify-center">
              <div
                className="phone-frame w-[320px] sm:w-[360px] relative"
                onMouseDown={userInteract}
                onTouchStart={userInteract}
              >
                <div
                  ref={scrollRef}
                  className="bg-background rounded-[32px] overflow-hidden h-[640px] flex flex-col relative"
                  style={{ scrollbarWidth: "none" }}
                >
                  {/* Status bar */}
                  <div className="flex justify-between items-center px-5 pt-3 pb-2 text-[10px] font-mono text-muted shrink-0">
                    <span>9:41</span>
                    <span className="size-3 rounded-full bg-foreground/40" />
                    <span>100%</span>
                  </div>

                  <AnimatePresence mode="wait">
                    {screen === "menu" && (
                      <motion.div
                        key="menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col min-h-0"
                      >
                        {/* Header */}
                        <div className="px-5 pb-3 border-b border-white/5 shrink-0">
                          <div className="text-[10px] uppercase tracking-widest text-brand font-mono">
                            Table 12 · Kalei Cafe Bar
                          </div>
                          <div className="text-lg font-semibold mt-0.5">
                            Menu
                          </div>
                        </div>

                        {/* Category tabs */}
                        <div className="flex gap-1.5 px-3 py-2.5 overflow-x-auto shrink-0 border-b border-white/5">
                          {demoMenu.map((cat) => (
                            <button
                              key={cat.id}
                              id={`tab-${cat.id}`}
                              onClick={() => {
                                userInteract();
                                setActiveCat(cat.id);
                                document
                                  .getElementById(`cat-${cat.id}`)
                                  ?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                  });
                              }}
                              className={cn(
                                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                                activeCat === cat.id
                                  ? "bg-brand text-black"
                                  : "bg-white/5 text-muted hover:text-foreground",
                              )}
                            >
                              {cat.name}
                            </button>
                          ))}
                        </div>

                        {/* Items */}
                        <div
                          ref={scrollRef}
                          className="flex-1 overflow-y-auto px-3 py-3 space-y-5 pb-24"
                          style={{ scrollbarWidth: "none" }}
                          onScroll={() => userInteract()}
                        >
                          {demoMenu.map((cat) => (
                            <div key={cat.id} id={`cat-${cat.id}`}>
                              <div className="text-[10px] uppercase tracking-widest text-muted font-mono mb-2 px-1">
                                {cat.name}
                              </div>
                              <div className="space-y-2">
                                {cat.items.map((item) => (
                                  <ItemCard
                                    key={item.id}
                                    item={item}
                                    qty={cart[item.id] || 0}
                                    onAdd={() => {
                                      userInteract();
                                      add(item.id);
                                    }}
                                    onRemove={() => {
                                      userInteract();
                                      remove(item.id);
                                    }}
                                    refCb={(el) => {
                                      itemRefs.current[item.id] = el;
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Cart bar */}
                        <AnimatePresence>
                          {totalQty > 0 && (
                            <motion.button
                              id="cart-btn-demo"
                              initial={{ y: 80 }}
                              animate={{ y: 0 }}
                              exit={{ y: 80 }}
                              transition={{
                                duration: 0.4,
                                ease: [0.2, 0.8, 0.2, 1],
                              }}
                              onClick={() => {
                                userInteract();
                                setScreen("cart");
                              }}
                              className="absolute left-3 right-3 bottom-3 rounded-2xl bg-brand text-black p-3.5 flex items-center justify-between shadow-[0_10px_40px_-10px_var(--brand-glow)]"
                            >
                              <div className="text-left">
                                <div className="text-xs font-mono opacity-70">
                                  {totalQty} {totalQty === 1 ? "item" : "items"}
                                </div>
                                <div className="text-sm font-bold">
                                  {peso(totalPrice)}
                                </div>
                              </div>
                              <div className="text-sm font-semibold flex items-center gap-1.5">
                                View cart →
                              </div>
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}

                    {screen === "cart" && (
                      <motion.div
                        key="cart"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        className="flex-1 flex flex-col min-h-0"
                      >
                        <div className="px-5 pb-3 border-b border-white/5 flex items-center gap-3 shrink-0">
                          <button
                            onClick={() => {
                              userInteract();
                              setScreen("menu");
                            }}
                            className="text-muted hover:text-foreground"
                          >
                            ←
                          </button>
                          <div>
                            <div className="text-[10px] uppercase tracking-widest text-brand font-mono">
                              Table 12
                            </div>
                            <div className="text-lg font-semibold">
                              Your order
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2.5">
                          {Object.entries(cart).map(([id, qty]) => {
                            const item = demoMenu
                              .flatMap((c) => c.items)
                              .find((i) => i.id === id);
                            if (!item) return null;
                            return (
                              <div
                                key={id}
                                className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5"
                              >
                                <div className="size-10 rounded-lg bg-white/5 grid place-items-center text-xl">
                                  {item.emoji}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium truncate">
                                    {item.name}
                                  </div>
                                  <div className="text-xs text-muted">
                                    {peso(item.price)} × {qty}
                                  </div>
                                </div>
                                <div className="text-sm font-mono">
                                  {peso(item.price * qty)}
                                </div>
                              </div>
                            );
                          })}

                          <div className="pt-3 mt-3 border-t border-white/5 space-y-1.5">
                            <Row label="Subtotal" value={peso(totalPrice)} />
                            <Row
                              label="VAT (12%, included)"
                              value={peso(totalPrice * 0.107)}
                              muted
                            />
                            <Row
                              label="Service charge (10%)"
                              value={peso(totalPrice * 0.1)}
                              muted
                            />
                            <div className="pt-2 mt-2 border-t border-white/5 flex justify-between text-base font-bold">
                              <span>Total</span>
                              <span className="brand-text">
                                {peso(totalPrice * 1.1)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 shrink-0">
                          <button
                            id="place-order-demo"
                            onClick={() => {
                              userInteract();
                              setScreen("placed");
                            }}
                            className="w-full rounded-2xl bg-brand text-black py-3.5 font-semibold text-sm shadow-[0_10px_40px_-10px_var(--brand-glow)]"
                          >
                            Place order
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {screen === "placed" && (
                      <motion.div
                        key="placed"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center px-8 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: 0.1,
                          }}
                          className="size-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 grid place-items-center mb-6 text-emerald-400"
                        >
                          <svg
                            className="size-10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <motion.path
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                              d="M5 13l4 4L19 7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.div>
                        <h3 className="text-xl font-semibold mb-2">
                          Order placed
                        </h3>
                        <p className="text-sm text-muted">
                          Kitchen is on it. We&rsquo;ll update you here.
                        </p>
                        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-mono text-muted">
                          <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
                          Preparing
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Auto-play pointer */}
                <AnimatePresence>
                  {autoPlaying && pointer && (
                    <motion.div
                      key={`${pointer.x}-${pointer.y}`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: pointer.x,
                        y: pointer.y,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 20,
                      }}
                      className="absolute top-3 left-3 size-5 rounded-full bg-white/90 mix-blend-difference pointer-events-none z-50"
                      style={{
                        boxShadow: "0 0 0 6px rgba(255,255,255,0.15)",
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function ItemCard({
  item,
  qty,
  onAdd,
  onRemove,
  refCb,
}: {
  item: DemoItem;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
  refCb: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={refCb}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/5 bg-white/[0.02]"
    >
      <div className="size-12 rounded-lg bg-white/5 grid place-items-center text-2xl shrink-0">
        {item.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <div className="text-sm font-medium truncate">{item.name}</div>
          {item.tag && (
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-brand/15 text-brand uppercase tracking-wider">
              {item.tag}
            </span>
          )}
        </div>
        <div className="text-xs text-muted truncate">{item.desc}</div>
        <div className="text-xs font-mono text-foreground/80 mt-1">
          {peso(item.price)}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {qty === 0 ? (
          <motion.button
            key="add"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            onClick={onAdd}
            className="size-8 rounded-full bg-brand text-black grid place-items-center font-bold text-base shrink-0"
          >
            +
          </motion.button>
        ) : (
          <motion.div
            key="qty"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            className="flex items-center gap-1.5 shrink-0"
          >
            <button
              onClick={onRemove}
              className="size-7 rounded-full bg-white/10 grid place-items-center text-sm"
            >
              −
            </button>
            <span className="text-sm font-bold w-5 text-center">{qty}</span>
            <button
              onClick={onAdd}
              className="size-7 rounded-full bg-brand text-black grid place-items-center text-sm font-bold"
            >
              +
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex justify-between text-xs",
        muted ? "text-muted" : "text-foreground/80",
      )}
    >
      <span>{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}

function Bullet({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="font-mono text-xs text-brand pt-1 w-8 shrink-0">{num}</div>
      <div>
        <h4 className="text-lg font-semibold mb-1">{title}</h4>
        <p className="text-sm text-muted leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
