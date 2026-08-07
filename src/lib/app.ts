/**
 * The Umami app. This marketing site never hosts sign-in or sign-up state — it
 * hands the visitor (or a fetch) to the app, which owns the accounts.
 *
 * Browser calls to `${APP_URL}/api/...` are cross-origin, so this host must be
 * listed in the app server's ALLOWED_ORIGINS or the request is blocked by CORS.
 */
export const APP_URL = "https://app.umami.com.ph";
