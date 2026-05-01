"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { peso, cn } from "@/lib/utils";

type MenuItem = {
  id: string;
  name: string;
  price: number;
  emoji: string;
  available: boolean;
};

const initial: MenuItem[] = [
  { id: "m1", name: "Iced Spanish Latte", price: 180, emoji: "☕", available: true },
  { id: "m2", name: "Butter Croissant", price: 110, emoji: "🥐", available: true },
  { id: "m3", name: "Iced Matcha", price: 165, emoji: "🍵", available: false },
];

const newItemPresets = [
  { name: "Dirty Matcha", price: 195, emoji: "🍵" },
  { name: "Pistachio Cookie", price: 95, emoji: "🍪" },
  { name: "Cold Brew", price: 160, emoji: "🧊" },
  { name: "Salmon Bagel", price: 320, emoji: "🥯" },
];

export default function OwnerDemo() {
  const [items, setItems] = useState<MenuItem[]>(initial);
  const [autoPlaying, setAutoPlaying] = useState(true);
  const [draftName, setDraftName] = useState("");
  const [draftPrice, setDraftPrice] = useState("");
  const [draftEmoji, setDraftEmoji] = useState("☕");
  const [pulseId, setPulseId] = useState<string | null>(null);
  const presetIdx = useRef(0);

  function addItem() {
    if (!draftName.trim() || !draftPrice) return;
    const newItem: MenuItem = {
      id: `m${Date.now()}`,
      name: draftName.trim(),
      price: parseFloat(draftPrice) || 0,
      emoji: draftEmoji,
      available: true,
    };
    setItems((it) => [...it, newItem]);
    setPulseId(newItem.id);
    setTimeout(() => setPulseId(null), 1200);
    setDraftName("");
    setDraftPrice("");
  }

  function removeItem(id: string) {
    setItems((it) => it.filter((i) => i.id !== id));
  }

  function toggleAvailable(id: string) {
    setItems((it) =>
      it.map((i) => (i.id === id ? { ...i, available: !i.available } : i)),
    );
  }

  function userInteract() {
    if (autoPlaying) setAutoPlaying(false);
  }

  // Auto demo
  useEffect(() => {
    if (!autoPlaying) return;
    let cancelled = false;
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    async function script() {
      while (!cancelled && autoPlaying) {
        // Reset
        setItems(initial);
        await wait(1500);

        // Add a new item — type the name
        const preset = newItemPresets[presetIdx.current % newItemPresets.length];
        presetIdx.current++;
        setDraftEmoji(preset.emoji);

        for (let i = 1; i <= preset.name.length; i++) {
          if (cancelled || !autoPlaying) return;
          setDraftName(preset.name.slice(0, i));
          await wait(60);
        }
        await wait(300);
        for (let i = 1; i <= String(preset.price).length; i++) {
          if (cancelled || !autoPlaying) return;
          setDraftPrice(String(preset.price).slice(0, i));
          await wait(80);
        }
        await wait(500);

        // Click add
        const newItem: MenuItem = {
          id: `m${Date.now()}`,
          name: preset.name,
          price: preset.price,
          emoji: preset.emoji,
          available: true,
        };
        setItems((it) => [...it, newItem]);
        setPulseId(newItem.id);
        setDraftName("");
        setDraftPrice("");
        await wait(1200);
        setPulseId(null);

        // Toggle Iced Matcha availability on
        await wait(800);
        setItems((it) =>
          it.map((i) =>
            i.id === "m3" ? { ...i, available: !i.available } : i,
          ),
        );
        await wait(1500);

        // Update price of Spanish Latte
        setItems((it) =>
          it.map((i) => (i.id === "m1" ? { ...i, price: 195 } : i)),
        );
        setPulseId("m1");
        await wait(1200);
        setPulseId(null);

        await wait(2500);
      }
    }
    script();
    return () => {
      cancelled = true;
    };
  }, [autoPlaying]);

  return (
    <Section
      id="owner-demo"
      eyebrow="Manage like an owner"
      title={<>Update your menu in <span className="brand-text">5 seconds.</span></>}
      subtitle="Your customers see the change instantly. No reprints. No downtime."
    >
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <Reveal className="lg:col-span-7">
            <div
              className="laptop-frame mx-auto max-w-[700px]"
              onMouseDown={userInteract}
              onTouchStart={userInteract}
            >
              <div className="bg-background rounded-md overflow-hidden h-[460px] flex">
                {/* Sidebar */}
                <div className="w-[150px] border-r border-white/5 bg-card/50 p-3 hidden sm:block">
                  <div className="text-[10px] uppercase tracking-widest text-brand font-mono mb-3 px-2">
                    Owner
                  </div>
                  <SideItem label="Overview" />
                  <SideItem label="Menu" active />
                  <SideItem label="Tables" />
                  <SideItem label="Reports" />
                  <SideItem label="Staff" />
                  <SideItem label="Settings" />
                </div>

                {/* Main */}
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="px-5 py-3.5 border-b border-white/5 flex items-center justify-between shrink-0">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-muted font-mono">
                        Menu Management
                      </div>
                      <div className="text-base font-semibold mt-0.5">
                        Kalei Cafe Bar
                      </div>
                    </div>
                    <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live · synced
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: -10, scale: 0.98 }}
                          animate={{
                            opacity: item.available ? 1 : 0.5,
                            y: 0,
                            scale: pulseId === item.id ? 1.02 : 1,
                            backgroundColor:
                              pulseId === item.id
                                ? "rgba(232,122,30,0.08)"
                                : "rgba(255,255,255,0.02)",
                          }}
                          exit={{ opacity: 0, x: -20, scale: 0.95 }}
                          transition={{ duration: 0.35 }}
                          className="flex items-center gap-3 p-2.5 rounded-lg border border-white/5"
                        >
                          <div className="size-9 rounded-md bg-white/5 grid place-items-center text-lg shrink-0">
                            {item.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {item.name}
                            </div>
                            <motion.div
                              key={item.price}
                              initial={{ scale: 1.1, color: "#e87a1e" }}
                              animate={{ scale: 1, color: "" }}
                              transition={{ duration: 0.5 }}
                              className="text-xs font-mono text-muted"
                            >
                              {peso(item.price)}
                            </motion.div>
                          </div>
                          <button
                            onClick={() => {
                              userInteract();
                              toggleAvailable(item.id);
                            }}
                            className={cn(
                              "relative w-9 h-5 rounded-full transition-colors shrink-0",
                              item.available
                                ? "bg-emerald-500"
                                : "bg-white/10",
                            )}
                          >
                            <motion.div
                              animate={{ x: item.available ? 16 : 2 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                              className="absolute top-0.5 size-4 rounded-full bg-white"
                            />
                          </button>
                          <button
                            onClick={() => {
                              userInteract();
                              removeItem(item.id);
                            }}
                            className="size-7 rounded-md hover:bg-red-500/15 text-muted hover:text-red-400 grid place-items-center text-sm shrink-0 transition-colors"
                            aria-label="Delete"
                          >
                            <svg
                              className="size-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Add new */}
                  <div className="p-3 border-t border-white/5 shrink-0 bg-card/40">
                    <div className="flex gap-2">
                      <select
                        value={draftEmoji}
                        onChange={(e) => {
                          userInteract();
                          setDraftEmoji(e.target.value);
                        }}
                        className="text-lg bg-white/5 border border-white/10 rounded-md px-2 outline-none focus:border-brand/40"
                      >
                        {["☕", "🍔", "🥗", "🍕", "🍝", "🍤", "🥭", "🍖"].map(
                          (e) => (
                            <option key={e} value={e}>
                              {e}
                            </option>
                          ),
                        )}
                      </select>
                      <input
                        value={draftName}
                        onChange={(e) => {
                          userInteract();
                          setDraftName(e.target.value);
                        }}
                        placeholder="Item name"
                        className="flex-1 bg-white/5 border border-white/10 rounded-md px-3 py-1.5 text-sm outline-none focus:border-brand/40 placeholder:text-muted"
                      />
                      <input
                        value={draftPrice}
                        onChange={(e) => {
                          userInteract();
                          setDraftPrice(e.target.value);
                        }}
                        placeholder="₱"
                        type="number"
                        className="w-20 bg-white/5 border border-white/10 rounded-md px-3 py-1.5 text-sm outline-none focus:border-brand/40 placeholder:text-muted font-mono"
                      />
                      <button
                        onClick={() => {
                          userInteract();
                          addItem();
                        }}
                        disabled={!draftName.trim() || !draftPrice}
                        className="px-3 py-1.5 rounded-md bg-brand text-black text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => setAutoPlaying((v) => !v)}
                className="text-xs font-mono text-muted hover:text-brand transition-colors inline-flex items-center gap-2"
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    autoPlaying
                      ? "bg-brand animate-pulse-glow"
                      : "bg-muted",
                  )}
                />
                {autoPlaying
                  ? "Auto-demo running — click the dashboard to take over"
                  : "Click play to restart auto-demo"}
              </button>
            </div>
          </Reveal>

          {/* Customer phone mirror */}
          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="text-center lg:text-left mb-4">
              <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-2 inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                What your customer sees
              </div>
              <p className="text-sm text-muted">
                Same menu. Live. No reload, no reprint, no waiting.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="phone-frame w-[260px]">
                <div className="bg-background rounded-[32px] overflow-hidden h-[460px] flex flex-col">
                  <div className="px-5 pt-3 pb-2 text-[10px] font-mono text-muted flex justify-between">
                    <span>9:41</span>
                    <span>100%</span>
                  </div>
                  <div className="px-4 pb-3 border-b border-white/5">
                    <div className="text-[10px] uppercase tracking-widest text-brand font-mono">
                      Table 12
                    </div>
                    <div className="text-sm font-semibold mt-0.5">Menu</div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
                    <AnimatePresence>
                      {items
                        .filter((i) => i.available)
                        .map((item) => (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-2 p-2 rounded-lg border border-white/5 bg-white/[0.02]"
                          >
                            <div className="size-8 rounded bg-white/5 grid place-items-center text-base">
                              {item.emoji}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-medium truncate">
                                {item.name}
                              </div>
                              <motion.div
                                key={item.price}
                                initial={{ color: "#e87a1e" }}
                                animate={{ color: "" }}
                                transition={{ duration: 0.6 }}
                                className="text-[10px] font-mono text-muted"
                              >
                                {peso(item.price)}
                              </motion.div>
                            </div>
                            <div className="size-5 rounded-full bg-brand text-black grid place-items-center text-xs font-bold">
                              +
                            </div>
                          </motion.div>
                        ))}
                    </AnimatePresence>
                    {items.filter((i) => i.available).length === 0 && (
                      <div className="text-center text-xs text-muted py-12">
                        No items available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function SideItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      className={cn(
        "px-3 py-1.5 rounded-md text-xs font-medium mb-0.5",
        active
          ? "bg-brand/15 text-brand"
          : "text-muted hover:text-foreground hover:bg-white/5 cursor-pointer",
      )}
    >
      {label}
    </div>
  );
}
