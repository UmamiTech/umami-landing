/**
 * The Umami app. This marketing site never hosts sign-in or sign-up state — it
 * hands the visitor (or a fetch) to the app, which owns the accounts.
 *
 * Browser calls to `${APP_URL}/api/...` are cross-origin, so this host must be
 * listed in the app server's ALLOWED_ORIGINS or the request is blocked by CORS.
 */
export const APP_URL = "https://app.umami.com.ph";

/**
 * The public demo menu. `/menu/demo` is a real route in the app: it resolves
 * the demo restaurant and a free table server-side and redirects, so this stays
 * short enough to print under a QR code and keeps working if the demo moves to
 * a different restaurant. Do not replace it with a restaurant/table URL — those
 * ids would be frozen into every QR ever scanned from this page.
 */
export const DEMO_MENU_URL = `${APP_URL}/menu/demo`;

/**
 * Where a paid pricing card sends the visitor. `/plan` resolves the signed-in
 * owner's restaurant and opens Plan & Billing, which is the only place a plan
 * can actually be bought; a signed-out visitor gets the login screen.
 *
 * Deliberately NOT the trial form: that creates a FREE Starter account, so
 * "Get Pro" would have silently signed someone up to the wrong plan.
 */
export const PLAN_URL = `${APP_URL}/plan`;
