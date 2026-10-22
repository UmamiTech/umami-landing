import { APP_URL } from "./app";

/**
 * The demo restaurant the homepage's kitchen screen listens to.
 *
 * SAFETY, read before changing anything here. The homepage opens a read-only
 * WebSocket to the app and shows the orders that arrive at ONE restaurant. That
 * restaurant must be the fictional demo store and nothing else: a real store's
 * orders must never appear on a marketing page, and the page must never be the
 * reason anyone takes a seat at a trading restaurant.
 *
 * So the target is checked twice. The app says which store is the demo
 * (`/api/demo/target`, driven by its DEMO_RESTAURANT_SLUG), AND that answer must
 * match the id and name pinned below. If the app is ever pointed at another
 * restaurant, by accident or on purpose, this returns `live: false` and the board
 * plays its sample tickets only. Updating the pin is a deliberate code change.
 *
 * The page itself never orders, never starts a session, never touches a table.
 * Ordering happens on the visitor's phone through the app's own /menu/demo
 * route, which seats them at a free table of the demo store only.
 */
export const DEMO_RESTAURANT_ID = "4d154312-19f2-4740-a5a7-a7daba1bc6ab";
export const DEMO_RESTAURANT_NAME = "Umami Demo Kitchen";
export const APP_WS_URL = "wss://app.umami.com.ph/ws";

/** The demo store's real menu, used for the sample tickets when nobody is ordering. */
const FALLBACK_DISHES = [
  "Sizzling Sisig", "Lumpiang Shanghai", "Kare-Kare", "Crispy Pata", "Pork Adobo",
  "Sinigang na Baboy", "Garlic Rice", "Pancit Canton", "Halo-Halo", "Calamansi Juice",
  "Leche Flan", "Calamares", "House Iced Tea", "Crispy Fried Chicken",
];

export type DemoInfo = { live: boolean; restaurantId: string | null; dishes: string[] };

export async function getDemoInfo(): Promise<DemoInfo> {
  const off: DemoInfo = { live: false, restaurantId: null, dishes: FALLBACK_DISHES };
  try {
    const res = await fetch(`${APP_URL}/api/demo/target`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return off;
    const t = await res.json();
    if (t?.restaurantId !== DEMO_RESTAURANT_ID || t?.restaurantName !== DEMO_RESTAURANT_NAME) {
      console.warn(
        `[demo] app demo target ${t?.restaurantId} "${t?.restaurantName}" does not match the pinned demo store; the kitchen screen stays on sample tickets.`,
      );
      return off;
    }
    let dishes = FALLBACK_DISHES;
    try {
      const m = await fetch(`${APP_URL}/api/menu/${DEMO_RESTAURANT_ID}`, {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      });
      if (m.ok) {
        const menu = await m.json();
        const names: string[] = (menu?.categories ?? [])
          .flatMap((c: { menuItems?: { name?: string; isAvailable?: boolean }[] }) => c.menuItems ?? [])
          .filter((i: { name?: string; isAvailable?: boolean }) => i?.name && i.isAvailable !== false)
          .map((i: { name: string }) => i.name);
        if (names.length >= 6) dishes = names;
      }
    } catch {
      /* the fallback names are the same menu */
    }
    return { live: true, restaurantId: DEMO_RESTAURANT_ID, dishes };
  } catch {
    return off;
  }
}
