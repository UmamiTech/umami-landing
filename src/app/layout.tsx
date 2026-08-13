import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// Display: Fraunces — variable serif with character (weight 400–700, italic)
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Body: Inter Tight — modern sans, slightly condensed, more character than Inter
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Mono: JetBrains Mono — eyebrows, labels, technical accents
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Umami — The operating system for restaurants",
  description:
    "Customer ordering, kitchen, dining, cashier, chains. Works without WiFi. Built in the Philippines for the world.",
  metadataBase: new URL("https://umami.com.ph"),
  openGraph: {
    title: "Umami — The operating system for restaurants",
    description:
      "Customer ordering, kitchen, dining, cashier, chains. Works without WiFi.",
    url: "https://umami.com.ph",
    siteName: "Umami",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umami — The operating system for restaurants",
    description:
      "Customer ordering, kitchen, dining, cashier, chains. Works without WiFi.",
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
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SmoothScroll />
        {children}
        {/*
          Support chat bubble. Deliberately a one-line include of a script SERVED BY
          THE APP rather than a component in this repo: the widget and the endpoints
          it talks to live together in UmamiTech/Umami, so they can never drift out
          of step, and improving it never needs a redeploy here.

          It self-mounts into a shadow root, so it cannot inherit or leak any of this
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
