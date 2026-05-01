import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
