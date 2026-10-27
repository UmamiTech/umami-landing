import { APP_URL } from "./app";

/**
 * Restaurants shown in the "Powering" logo row, read live from the app.
 *
 * The app decides who appears (every active restaurant with a logo, one per
 * brand — see public-showcase.service.js in UmamiTech/Umami). This site only
 * displays the list, so a new restaurant appears here within the hour with no
 * deploy of this repo.
 *
 * The same answer carries the platform's order totals (real restaurants only,
 * no demo stores, no cancelled orders), which the strip prints as its proof line.
 *
 * FAILS SOFT: any error returns no customers and no totals, and the strip shows
 * its fixed names, exactly as it did before this feed existed. A logo feed must
 * never break the homepage or the build.
 */
export type Customer = { name: string; logoUrl: string; storeUrl: string | null };
export type OrderTotals = { last30Days: number; allTime: number };
export type CustomerFeed = { customers: Customer[]; orders: OrderTotals | null };

export const CUSTOMERS_REVALIDATE_SECONDS = 3600;

export async function getCustomers(): Promise<CustomerFeed> {
  const none: CustomerFeed = { customers: [], orders: null };
  try {
    const res = await fetch(`${APP_URL}/api/billing/public/customers`, {
      next: { revalidate: CUSTOMERS_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return none;
    const data = await res.json();
    const o = data?.orders;
    const orders: OrderTotals | null =
      Number.isInteger(o?.last30Days) && Number.isInteger(o?.allTime)
        ? { last30Days: o.last30Days, allTime: o.allTime }
        : null;
    const list: unknown = data?.customers;
    if (!Array.isArray(list)) return { customers: [], orders };
    const customers = list
      .filter(
        (c): c is Customer =>
          !!c &&
          typeof c.name === "string" &&
          typeof c.logoUrl === "string" &&
          c.logoUrl.startsWith("https://"),
      )
      .slice(0, 12);
    return { customers, orders };
  } catch {
    return none;
  }
}
