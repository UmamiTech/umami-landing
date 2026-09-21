import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import WhatIsUmami from "@/components/sections/WhatIsUmami";
import PainPoints from "@/components/sections/PainPoints";
import Story from "@/components/sections/Story";
import CustomerDemo from "@/components/sections/CustomerDemo";
import OwnerDemo from "@/components/sections/OwnerDemo";
import Pricing from "@/components/sections/Pricing";
import TryUmami from "@/components/sections/TryUmami";
import Contact from "@/components/sections/Contact";
import BrandMark from "@/components/sections/BrandMark";
import Footer from "@/components/sections/Footer";
import { SITE_JSON_LD, jsonLd } from "@/lib/site";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(SITE_JSON_LD)} />
      <Nav />
      <main className="relative">
        <Hero />
        <WhatIsUmami />
        <PainPoints />
        <Story />
        <CustomerDemo />
        <OwnerDemo />
        <Pricing />
        <TryUmami />
        <Contact />
        <BrandMark />
      </main>
      <Footer />
    </>
  );
}
