/**
 * Real dishes from a real Umami restaurant: Romantic Baboy, Light Mall.
 * Names, prices and photographs are taken from that store's menu on
 * app.umami.com.ph (October 2026). Photos are the restaurant's own menu
 * photographs and are credited wherever they appear.
 */
export type Dish = { id: string; name: string; price: number; photo: string };

export const DISH_SOURCE = "Romantic Baboy, Light Mall";

export const MENU_DISHES: Dish[] = [
  { id: "cheesy-samgyup-bowl", name: "Cheesy Samgyup Bowl", price: 210, photo: "/photos/cheesy-samgyup-bowl.webp" },
  { id: "bibimbap", name: "Bibimbap", price: 300, photo: "/photos/bibimbap.webp" },
  { id: "crispy-kimbap", name: "Crispy Kimbap, 16 rolls", price: 499, photo: "/photos/crispy-kimbap.webp" },
  { id: "beef-bone-soup", name: "Beef Bone Soup", price: 350, photo: "/photos/beef-bone-soup.webp" },
  { id: "bulgogi-fried-rice", name: "Bulgogi Fried Rice", price: 250, photo: "/photos/bulgogi-fried-rice.webp" },
  { id: "cheesy-chicken-poppers", name: "Cheesy Chicken Poppers", price: 179, photo: "/photos/cheesy-chicken-poppers.webp" },
  { id: "mango-frappe", name: "Mango Frappe", price: 150, photo: "/photos/mango-frappe.webp" },
  { id: "blue-lemonade", name: "Blue Lemonade, pitcher", price: 199, photo: "/photos/blue-lemonade.webp" },
];

export const dishById = (id: string) => MENU_DISHES.find((d) => d.id === id)!;

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
