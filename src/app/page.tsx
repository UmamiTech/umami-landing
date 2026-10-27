import Nav from "@/components/Nav";
import Hero from "@/components/home/Hero";
import Customers from "@/components/home/Customers";
import TapToOrder from "@/components/home/TapToOrder";
import Journey from "@/components/home/Journey";
import OwnerSoldOut from "@/components/home/OwnerSoldOut";
import Fights from "@/components/home/Fights";
import Pricing from "@/components/sections/Pricing";
import TryUmami from "@/components/sections/TryUmami";
import Story from "@/components/sections/Story";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { SITE_JSON_LD, jsonLd } from "@/lib/site";
import { getCustomers } from "@/lib/customers";
import { getDemoInfo } from "@/lib/demo";

// Re-render at most hourly so new restaurants' logos (and any change to the
// demo store) appear without a deploy. Must be a literal: Next reads route
// segment config statically.
export const revalidate = 3600;

export default async function Home() {
  const [feed, demo] = await Promise.all([getCustomers(), getDemoInfo()]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(SITE_JSON_LD)} />
      <Nav />
      <main>
        <Hero live={demo.live} dishes={demo.dishes} />
        <Customers customers={feed.customers} orders={feed.orders} />
        <TapToOrder />
        <Journey />
        <OwnerSoldOut />
        <Fights />
        <Pricing />
        <TryUmami />
        <Story />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
