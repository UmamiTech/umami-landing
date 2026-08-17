/* eslint-env serviceworker */
/**
 * Web Push for the "Chat with Umami" bubble.
 *
 * This file has to live HERE, on umami.com.ph, even though the widget script and
 * the server that sends the push both live in the Umami app: a page can only
 * register a service worker from its own origin, and a push subscription belongs
 * to the origin that created it. The app's VAPID keypair still signs the send —
 * the keys are what must match, not the host.
 *
 * DELIBERATELY PASSIVE: there is no `fetch` handler, so this service worker never
 * enters the request path of the marketing site. It exists only to receive pushes
 * and open the page when one is tapped. Do not add caching here — the site is
 * served by Vercel and does not want a second, slower cache in front of it.
 */

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  event.waitUntil((async () => {
    let data = {};
    try {
      data = event.data ? event.data.json() : {};
    } catch {
      data = { body: event.data && event.data.text ? event.data.text() : '' };
    }

    // Same rule as the app: never buzz someone who is already looking at the page
    // the notification is about. Hand it to the open tab instead, so the widget
    // can surface the reply in place.
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const watching = clients.find((c) => c.focused === true || c.visibilityState === 'visible');
    if (watching) {
      try {
        watching.postMessage({ type: 'umami-support-reply', payload: data });
      } catch { /* a page that can't take the message still shouldn't be buzzed */ }
      return;
    }

    await self.registration.showNotification(data.title || 'Umami replied', {
      body: data.body || '',
      icon: '/logos/umami-icon.svg',
      tag: data.tag || 'umami-support',
      renotify: true,
      data: { url: data.url || '/' },
    });
  })());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of all) {
      if (client.url.startsWith(self.location.origin) && 'focus' in client) {
        try { client.postMessage({ type: 'umami-open-chat' }); } catch { /* best effort */ }
        return client.focus();
      }
    }
    if (self.clients.openWindow) return self.clients.openWindow(target);
    return undefined;
  })());
});
