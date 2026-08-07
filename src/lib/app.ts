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
