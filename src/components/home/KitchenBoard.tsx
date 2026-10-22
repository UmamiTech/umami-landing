"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { APP_WS_URL, DEMO_RESTAURANT_ID } from "@/lib/demo";

/**
 * The demo restaurant's kitchen screen, on the homepage.
 *
 * Two sources of tickets:
 *  - LIVE: a read-only, anonymous WebSocket to the app, subscribed to the demo
 *    store only (`DEMO_RESTAURANT_ID`, double-checked server-side in lib/demo.ts
 *    and again on every message here). A visitor who scans the hero QR and orders
 *    sees their ticket arrive within a second or two.
 *  - SAMPLE: when nobody is ordering, tickets built from the demo store's real
 *    menu come and go, labelled as samples so nobody mistakes them for traffic.
 *
 * Only the table number, dish names and quantities are shown. Never notes,
 * names or prices: other visitors' orders appear here too.
 */

type Status = "new" | "cooking" | "ready";
type Ticket = {
  key: string;
  orderId?: string;
  table: string;
  items: { name: string; qty: number }[];
  status: Status;
  age: number; // seconds since it arrived
  step: number; // sample tickets only: service ticks since arrival
  live: boolean;
};

const STATUS_LABEL: Record<Status, string> = { new: "New", cooking: "Cooking", ready: "Ready" };
const MAX_TICKETS = 4;

function pick<T>(arr: T[], n: number, seed: number): T[] {
  const out: T[] = [];
  for (let i = 0; i < n; i++) out.push(arr[(seed * 7 + i * 5) % arr.length]);
  return [...new Set(out)];
}

function initialTickets(dishes: string[]): Ticket[] {
  // Deterministic, so the server render and the first client render agree.
  return [
    { key: "s1", table: "12", items: pick(dishes, 2, 1).map((n, i) => ({ name: n, qty: i ? 1 : 2 })), status: "new", age: 40, step: 0, live: false },
    { key: "s2", table: "4", items: pick(dishes, 3, 3).map((n) => ({ name: n, qty: 1 })), status: "cooking", age: 260, step: 1, live: false },
    { key: "s3", table: "9", items: pick(dishes, 1, 6).map((n) => ({ name: n, qty: 3 })), status: "ready", age: 610, step: 3, live: false },
  ];
}

function ageLabel(s: number) {
  if (s < 45) return "just now";
  const m = Math.round(s / 60);
  return `${Math.max(1, m)} min`;
}

type WsOrder = {
  id?: string;
  restaurantId?: string;
  status?: string;
  table?: { number?: string | number } | null;
  tableNumber?: string | number;
  orderType?: string;
  items?: { name?: string; quantity?: number; status?: string }[];
};

function statusFromOrder(s?: string): Status | "gone" {
  switch (s) {
    case "PREPARING":
      return "cooking";
    case "READY":
      return "ready";
    case "SERVED":
    case "COMPLETED":
    case "CANCELLED":
      return "gone";
    default:
      return "new";
  }
}

export default function KitchenBoard({ live, dishes }: { live: boolean; dishes: string[] }) {
  const [tickets, setTickets] = useState<Ticket[]>(() => initialTickets(dishes));
  const [connected, setConnected] = useState(false);
  const [lastLiveTable, setLastLiveTable] = useState<string | null>(null);
  const liveUntil = useRef(0); // while > now, sample tickets pause
  const seq = useRef(10);

  // Clock: ages tick, sample tickets advance through the line.
  useEffect(() => {
    const t = setInterval(() => {
      setTickets((prev) =>
        prev
          .map((x) => ({ ...x, age: x.age + 1 }))
          // A real ticket nobody moved along leaves after 15 minutes.
          .filter((x) => !x.live || x.age < 900),
      );
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // Sample service: every few seconds the oldest sample moves along and a new
  // one arrives. Paused for a minute after a real order so it gets the stage.
  useEffect(() => {
    const t = setInterval(() => {
      if (document.hidden || Date.now() < liveUntil.current) return;
      setTickets((prev) => {
        const next = prev
          .map((x): Ticket | null => {
            if (x.live) return x;
            const step = x.step + 1;
            if (step >= 4) return null;
            return { ...x, step, status: step === 3 ? "ready" : "cooking" };
          })
          .filter((x): x is Ticket => !!x);
        const n = ++seq.current;
        const count = 1 + (n % 3);
        const ticket: Ticket = {
          key: `s${n}`,
          table: String(((n * 11) % 28) + 1),
          items: pick(dishes, count, n).map((name, i) => ({ name, qty: i === 0 && n % 4 === 0 ? 2 : 1 })),
          status: "new",
          age: 0,
          step: 0,
          live: false,
        };
        return [ticket, ...next].slice(0, MAX_TICKETS);
      });
    }, 6500);
    return () => clearInterval(t);
  }, [dishes]);

  // Live: one anonymous, read-only subscription to the demo store.
  useEffect(() => {
    if (!live) return;
    let ws: WebSocket | null = null;
    let retry: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;
    let stopped = false;

    const onOrder = (eventType: string, order: WsOrder) => {
      if (order?.restaurantId !== DEMO_RESTAURANT_ID) return;
      const id = order?.id;
      if (!id) return;
      const items = (order.items ?? [])
        .filter((i) => i?.name && i.status !== "CANCELLED")
        .map((i) => ({ name: String(i.name), qty: Number(i.quantity) || 1 }));
      if (eventType === "created") {
        if (!items.length) return;
        const table = String(order.table?.number ?? order.tableNumber ?? (order.orderType === "TAKEAWAY" ? "Pickup" : "—"));
        liveUntil.current = Date.now() + 60_000;
        setLastLiveTable(table);
        setTickets((prev) => {
          if (prev.some((x) => x.orderId === id)) return prev;
          const ticket: Ticket = { key: `l-${id}`, orderId: id, table, items, status: "new", age: 0, step: 0, live: true };
          return [ticket, ...prev.filter((x) => x.live || prev.indexOf(x) < MAX_TICKETS - 1)].slice(0, MAX_TICKETS);
        });
      } else {
        const st = statusFromOrder(order.status);
        setTickets((prev) =>
          st === "gone" || (order.items && !items.length)
            ? prev.filter((x) => x.orderId !== id)
            : prev.map((x) => (x.orderId === id ? { ...x, status: st, items: order.items ? items : x.items } : x)),
        );
      }
    };

    const connect = () => {
      if (stopped || document.hidden) return;
      let sock: WebSocket;
      try {
        sock = new WebSocket(APP_WS_URL);
      } catch {
        return;
      }
      ws = sock;
      sock.onopen = () => {
        attempts = 0;
        sock.send(JSON.stringify({ type: "register", restaurantId: DEMO_RESTAURANT_ID, role: "CUSTOMER", userId: "anonymous" }));
      };
      sock.onmessage = (e) => {
        if (ws !== sock) return;
        try {
          const msg = JSON.parse(String(e.data));
          if (msg.type === "registered") setConnected(msg.restaurantId === DEMO_RESTAURANT_ID);
          if (msg.type === "order_update" && msg.order) onOrder(msg.eventType, msg.order);
        } catch {
          /* ignore anything that is not ours */
        }
      };
      sock.onclose = () => {
        if (ws !== sock) return; // replaced or shut down on purpose
        ws = null;
        setConnected(false);
        if (stopped || document.hidden) return;
        attempts += 1;
        retry = setTimeout(connect, Math.min(30_000, 1500 * 2 ** attempts));
      };
      sock.onerror = () => sock.close();
    };

    // A hidden tab holds no connection; it reconnects when the visitor returns.
    const onVisibility = () => {
      if (document.hidden) {
        clearTimeout(retry);
        const old = ws;
        ws = null;
        old?.close();
        setConnected(false);
      } else if (!ws || ws.readyState > 1) {
        attempts = 0;
        connect();
      }
    };

    connect();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stopped = true;
      clearTimeout(retry);
      document.removeEventListener("visibilitychange", onVisibility);
      const old = ws;
      ws = null;
      old?.close();
    };
  }, [live]);

  const hasLive = tickets.some((t) => t.live);

  return (
    <div data-ui className="ui-dark flex h-full flex-col rounded-[20px] bg-kitchen text-kitchen-ink">
      <div className="ui-row flex items-center justify-between gap-4 px-5 py-4">
        <div>
          <div className="text-[15px] font-semibold">Kitchen</div>
          <div className="text-[13px] text-white/60">Umami Demo Kitchen</div>
        </div>
        <div className="flex items-center gap-2 text-[13px] text-white/75" aria-live="polite">
          {connected ? <span className="live-dot" aria-hidden="true" /> : null}
          {connected ? "Connected" : "Sample tickets"}
        </div>
      </div>

      <ul className="flex-1 space-y-3 overflow-hidden p-4" aria-live="polite" aria-relevant="additions">
        <AnimatePresence initial={false}>
          {tickets.map((t) => (
            <motion.li
              key={t.key}
              layout
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={`ui-ticket px-4 py-3 ${t.live ? "outline outline-2 outline-brand" : ""}`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <div className="text-[15px] font-semibold">
                  {t.table === "Pickup" ? "Pickup" : `Table ${t.table}`}
                  {t.live ? (
                    <span className="ml-2 font-medium text-brand">real order</span>
                  ) : (
                    <span className="ml-2 font-normal text-white/50">sample</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-[13px] tabular-nums">
                  <span className="text-white/55">{ageLabel(t.age)}</span>
                  <span
                    className={
                      t.status === "ready"
                        ? "rounded-md bg-[#1f7a46] px-2 py-0.5 font-medium text-white"
                        : t.status === "cooking"
                          ? "rounded-md bg-white/12 px-2 py-0.5 font-medium text-white"
                          : "rounded-md bg-brand px-2 py-0.5 font-medium text-[#121212]"
                    }
                  >
                    {STATUS_LABEL[t.status]}
                  </span>
                </div>
              </div>
              <ul className="mt-2 space-y-0.5 text-[14px] text-white/85">
                {t.items.slice(0, 4).map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="w-6 shrink-0 tabular-nums text-white/55">{it.qty}×</span>
                    <span className="truncate">{it.name}</span>
                  </li>
                ))}
                {t.items.length > 4 && <li className="pl-8 text-white/55">and {t.items.length - 4} more</li>}
              </ul>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="px-5 py-4 text-[14px] text-white/70" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        {hasLive && lastLiveTable
          ? `A real order just came in from table ${lastLiveTable}. Yours?`
          : connected
            ? "Connected. Samples play until someone orders; scan the code and yours lands here."
            : "These are samples from the demo menu."}
      </div>
    </div>
  );
}
