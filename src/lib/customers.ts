import { APP_URL } from "./app";

/**
 * Restaurants shown in the "Powering" logo row, read live from the app.
 *
 * The app decides who appears (every active restaurant with a logo, one per
 * brand — see public-showcase.service.js in UmamiTech/Umami). This site only
 * displays the list, so a new restaurant appears here within the hour with no
 * deploy of this repo.
 *
 * FAILS SOFT: any error returns [] and the hero shows its fixed logos, exactly
 * as it did before this feed existed. A logo feed must never break the homepage
 * or the build.
 */
export type Customer = { name: string; logoUrl: string; storeUrl: string | null };

export const CUSTOMERS_REVALIDATE_SECONDS = 3600;

export async function getCustomers(): Promise<Customer[]> {
  try {
    const res = await fetch(`${APP_URL}/api/billing/public/customers`, {
      next: { revalidate: CUSTOMERS_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    const list: unknown = data?.customers;
    if (!Array.isArray(list)) return [];
    return list
      .filter(
        (c): c is Customer =>
          !!c &&
          typeof c.name === "string" &&
          typeof c.logoUrl === "string" &&
          c.logoUrl.startsWith("https://"),
      )
      .slice(0, 12);
  } catch {
    return [];
  }
}
