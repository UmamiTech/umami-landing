"use client";

import { QRCodeSVG } from "qrcode.react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Headline from "../ui/Headline";
import KitchenBoard from "./KitchenBoard";
import { DEMO_MENU_URL } from "@/lib/app";

export default function Hero({ live, dishes }: { live: boolean; dishes: string[] }) {
  return (
    <section data-chapter="orange" className="chapter-orange relative pt-28 pb-20 md:pt-36 md:pb-28">
      <Container>
        <div className="grid items-stretch gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col lg:col-span-6 lg:pr-6">
            <Headline
              as="h1"
              onLoad
              lines={["Scan. Order.", "It's cooking."]}
              className="text-[52px] sm:text-[72px] lg:text-[96px]"
            />
            <p
              style={{ animationDelay: "0.3s" }}
              className="rise-in mt-8 max-w-[34rem] text-[18px] leading-[1.5] text-muted md:text-[21px]"
            >
              Umami is QR ordering for restaurants. Guests order from their own phone, the kitchen
              gets the ticket, and your POS stays exactly where it is.
            </p>
            <div style={{ animationDelay: "0.4s" }} className="rise-in mt-10 flex flex-wrap gap-3">
              <Button href="#try" variant="dark">Try free</Button>
              <Button href="#pricing" className="bg-white text-foreground hover:bg-[#fff3e6]">
                See pricing
              </Button>
            </div>

            {/* Desktop: scan with your phone. */}
            <div style={{ animationDelay: "0.55s" }} className="rise-in mt-auto hidden items-center gap-6 pt-14 lg:flex">
              <a
                href={DEMO_MENU_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open the demo menu"
                className="shrink-0 rounded-[14px] bg-white p-3"
              >
                <QRCodeSVG value={DEMO_MENU_URL} size={112} level="M" bgColor="#ffffff" fgColor="#121212" />
              </a>
              <p className="max-w-[19rem] text-[16px] leading-[1.45]">
                <span className="font-semibold">Try it now.</span> Scan with your phone, order from the
                demo menu, and watch your ticket land on the kitchen screen.
              </p>
            </div>

            {/* Phones: the visitor is already holding one. */}
            <div className="mt-8 lg:hidden">
              <a
                href={DEMO_MENU_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[18px] font-medium text-brand-ink underline decoration-2 underline-offset-4"
              >
                Order from the demo menu
              </a>
              <p className="mt-2 max-w-sm text-[16px] text-muted">
                It opens in a new tab. Order something, then come back: your ticket appears on the
                kitchen screen below.
              </p>
            </div>
          </div>

          <div style={{ animationDelay: "0.2s" }} className="rise-in h-[540px] lg:col-span-6 lg:h-[580px]">
            <KitchenBoard live={live} dishes={dishes} />
          </div>
        </div>
      </Container>
    </section>
  );
}
