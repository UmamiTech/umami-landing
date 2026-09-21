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
import { getCustomers } from "@/lib/customers";

// Re-render at most hourly so new restaurants' logos appear without a deploy.
// Must be a literal: Next reads route segment config statically.
export const revalidate = 3600;

export default async function Home() {
  const customers = await getCustomers();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(SITE_JSON_LD)} />
      <Nav />
      <main className="relative">
        <Hero customers={customers} />
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
