import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import type { Customer } from "@/lib/customers";

/**
 * Restaurants taking orders on Umami right now, read live from the app (see
 * lib/customers.ts). The app decides who appears; this only displays the list.
 * If the feed is down, the strip still names the restaurants we know are live.
 */
const FALLBACK = ["Kalei Cafe Bar", "Romantic Baboy", "Drunken Tiger Pub", "Nami Garden", "Seocho 1978"];

/**
 * Kalei Cafe Bar takes orders on Umami inside Romantic Baboy, Ayala Malls The
 * 30th, so the app's feed (one entry per restaurant) never lists it. It is named
 * here so the strip shows the café alongside the grill.
 */
const KALEI_ENTRY = { name: "Kalei Cafe Bar" };

export default function Customers({ customers }: { customers: Customer[] }) {
  return (
    <section className="bg-paper py-14 md:py-16" aria-labelledby="customers-title">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <h2 id="customers-title" className="text-[36px] lg:col-span-4">
            In these kitchens tonight.
          </h2>
          <Reveal className="lg:col-span-8">
            {customers.length > 0 ? (
              <ul className="flex flex-wrap items-center gap-x-10 gap-y-6">
                <li>
                  <span className="flex items-center gap-3">
                    <span className="grid size-14 place-items-center rounded-[14px] bg-foreground font-display text-[24px] text-white" aria-hidden="true">
                      K
                    </span>
                    <span className="text-[16px] font-medium">{KALEI_ENTRY.name}</span>
                  </span>
                </li>
                {customers.map((c) => {
                  const body = (
                    <span className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.logoUrl}
                        alt=""
                        loading="lazy"
                        className="size-14 rounded-[14px] bg-white object-cover"
                      />
                      <span className="text-[16px] font-medium">{c.name}</span>
                    </span>
                  );
                  return (
                    <li key={c.name}>
                      {c.storeUrl ? (
                        <a href={c.storeUrl} className="hover:text-brand-ink transition-colors">
                          {body}
                        </a>
                      ) : (
                        body
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-[18px]">{FALLBACK.join(" · ")}</p>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
