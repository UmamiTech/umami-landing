/**
 * Real dishes from real Umami restaurants, chosen to read as any restaurant's
 * menu rather than one cuisine: Kalei Cafe Bar (café, pizza, pasta, Filipino
 * breakfast) and Romantic Baboy (Korean). Names, prices and photographs are
 * taken from their menus on app.umami.com.ph (October 2026); the photos are the
 * restaurants' own menu photographs and each dish is credited to its restaurant
 * wherever it appears.
 */
export type Dish = { id: string; name: string; price: number; photo: string; source: string };

export const KALEI = "Kalei Cafe Bar";
export const BABOY = "Romantic Baboy";
export const DISH_SOURCES = `${KALEI} and ${BABOY}`;

const dish = (id: string, name: string, price: number, source: string): Dish => ({
  id,
  name,
  price,
  source,
  photo: `/photos/${id}.webp`,
});

export const MENU_DISHES: Dish[] = [
  dish("classic-tapa", "Classic Tapa Special", 390, KALEI),
  dish("margherita-pizza", "Margherita Pizza", 460, KALEI),
  dish("bibimbap", "Bibimbap", 300, BABOY),
  dish("chicken-pesto", "Chicken Pesto", 410, KALEI),
  dish("clubhouse", "Clubhouse Sandwich", 270, KALEI),
  dish("cheesy-samgyup-bowl", "Cheesy Samgyup Bowl", 210, BABOY),
  dish("strawberry-waffle", "Strawberry Waffle", 240, KALEI),
  dish("mango-frappe", "Mango Frappe", 150, BABOY),
];

/** Dishes used elsewhere on the page that are not in the tap-to-order grid. */
const OTHER_DISHES: Dish[] = [
  dish("caesar-salad", "Chicken Caesar Salad", 280, KALEI),
  dish("cheesy-chicken-poppers", "Cheesy Chicken Poppers", 179, BABOY),
];

export const dishById = (id: string) => [...MENU_DISHES, ...OTHER_DISHES].find((d) => d.id === id)!;

/**
 * Bill arithmetic, the way a Philippine restaurant bill reads: menu prices
 * already include 12% VAT, and the service charge is 10% of the amount before
 * VAT. Every figure shown on the page comes from here, so the lines always add up.
 */
export function billFor(lines: { price: number; qty: number }[]) {
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const preVat = subtotal / 1.12;
  const vat = subtotal - preVat;
  const service = Math.round(preVat * 0.1 * 100) / 100;
  const total = Math.round((subtotal + service) * 100) / 100;
  return { subtotal, vat: Math.round(vat * 100) / 100, service, total };
}

export const money = (n: number, cents = false) =>
  "₱" +
  n.toLocaleString("en-PH", {
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  });
