import type { Metadata } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";
import "./globals.css";
import MotionRoot from "@/components/MotionRoot";
import ChapterInk from "@/components/ChapterInk";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";

// Display: Fraunces. Headlines only, one weight, no italic.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

// Text: Inter Tight.
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});


export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  // Meta Business verification — proves Umami Technologies Inc. owns umami.com.ph.
  // Keep it: Meta can re-check the domain, and removing this can un-verify it.
  other: {
    "facebook-domain-verification": "5ai92fwc5pdtoy6zwvhlx4a7a03pwe",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Umami",
    type: "website",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        {/* Without script, entrance animations would leave content at their start
            state; show everything in place instead. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <ChapterInk />
        <MotionRoot>{children}</MotionRoot>
        {/*
          Support chat bubble. Deliberately a one-line include of a script SERVED BY
          THE APP rather than a component in this repo: the widget and the endpoints
          it talks to live together in UmamiTech/Umami, so they can never drift out
          of step, and improving it never needs a redeploy here.

          It self-mounts in an isolated DOM tree, so it cannot inherit or leak any of this
          site's styling. If the app has no Telegram bridge configured, the script is
          served as a harmless no-op instead of 404ing.

          Plain <script> rather than next/script on purpose — no framework API, so
          nothing here to break on a Next upgrade.
        */}
        <script async src="https://app.umami.com.ph/api/support/public/widget.js" />
      </body>
    </html>
  );
}
