/**
 * Site-wide facts used by metadata, structured data and the plain-text summary.
 *
 * POSITIONING (owner decision, 2026-09-21): Umami is a DIGITAL ORDERING SYSTEM
 * that runs alongside a restaurant's existing POS. It is not a POS and is never
 * sold as a replacement for one. Keep every public description in line with that.
 *
 * OFFLINE (owner decision, 2026-09-21): state the benefit ("keeps taking orders
 * when the internet drops"), never the mechanism. No public page describes how
 * that works — no "local laptop", no "sync", no architecture.
 */
export const SITE_URL = "https://umami.com.ph";

export const SITE_NAME = "Umami";

export const SITE_TITLE =
  "Umami — QR Ordering for Restaurants. Works With Your POS";

export const SITE_DESCRIPTION =
  "Digital ordering for Philippine restaurants: customers scan a QR code and order from their phone, straight to your kitchen. Works with your POS. Free to start.";

/** Organization + SoftwareApplication, for Google's understanding of the site. */
export const SITE_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Umami Technologies, Inc.",
    url: SITE_URL,
    logo: `${SITE_URL}/logos/umami-icon.svg`,
    email: "umamitechnologies@gmail.com",
    telephone: "+639175762744",
    address: { "@type": "PostalAddress", addressCountry: "PH" },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Restaurant digital ordering",
    operatingSystem: "Web browser (any phone, tablet or computer)",
    description: SITE_DESCRIPTION,
    areaServed: { "@type": "Country", name: "Philippines" },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "PHP",
      description: "Starter plan, free for the first 100 restaurants",
    },
  },
];

/** Render JSON-LD safely: escape "<" so a string can never close the script tag. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
