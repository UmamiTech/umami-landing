import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Pricing from "@/components/sections/Pricing";
import TryUmami from "@/components/sections/TryUmami";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Image from "next/image";
import { DISH_SOURCES, MENU_DISHES, money } from "@/lib/dishes";
import { LANDING_PAGES, PROOF_LINKS, type LandingPageContent } from "@/lib/landingPages";
import { SITE_URL, jsonLd } from "@/lib/site";
import type { Metadata } from "next";

/** Metadata for a landing page, straight from its content entry. */
export function landingMetadata(slug: string): Metadata {
  const p = LANDING_PAGES[slug];
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.description,
      url: `${SITE_URL}/${p.slug}`,
      siteName: "Umami",
      type: "website",
      locale: "en_PH",
      // A page that sets its own openGraph REPLACES the inherited one, image
      // included — so the root share image has to be named again here.
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description: p.description,
      images: ["/twitter-image"],
    },
  };
}

/** Related pages linked from the bottom of every landing page (internal links). */
const RELATED = [
  { slug: "what-is-umami", label: "What is Umami" },
  { slug: "qr-ordering", label: "QR code ordering" },
  { slug: "kitchen-display-system", label: "Kitchen display system" },
  { slug: "works-with-your-pos", label: "Works with your POS" },
  { slug: "for-samgyupsal", label: "For unlimited samgyupsal" },
  { slug: "for-cafes", label: "For cafés" },
  { slug: "how-to-set-up-a-qr-menu", label: "Guide: set up a QR menu" },
  { slug: "multi-branch", label: "Multi-branch restaurants" },
  { slug: "pricing", label: "Pricing" },
  { slug: "free-trial", label: "Free trial" },
];

export default function LandingPage({ slug }: { slug: string }) {
  const p: LandingPageContent = LANDING_PAGES[slug];

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: p.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Umami", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: p.eyebrow, item: /* taste-skill-ignore: breadcrumb data, not a label */ `${SITE_URL}/${p.slug}` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structured)} />
      <Nav />
      <main>
        {/* Hero */}
        <section data-chapter="orange" className="chapter-orange relative pt-36 pb-16 md:pt-44 md:pb-24">
          <Container>
            <div className="max-w-4xl">
              <h1 className="text-[34px] sm:text-[48px] lg:text-[64px]">{p.h1}</h1>
              <p className="mt-8 max-w-2xl text-[19px] leading-[1.5] text-muted md:text-[21px]">{p.lede}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="#try" variant="dark">Try free</Button>
                <Button href="https://app.umami.com.ph/menu/demo" className="bg-white text-foreground hover:bg-[#fff3e6]" external>
                  Order from the demo
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Body */}
        <section data-chapter="white" className="chapter-white relative py-24 md:py-32">
          <Container>
            <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
              <div className="space-y-14 lg:col-span-7">
                {p.sections.map((s) => (
                  <Reveal key={s.heading}>
                    <h2 className="text-[30px] md:text-[38px]">{s.heading}</h2>
                    {s.body?.map((para, i) => (
                      <p key={i} className="mt-5 text-[18px] leading-[1.6]">
                        {para}
                      </p>
                    ))}
                    {s.bullets && (
                      <ul className="mt-5 space-y-3">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex gap-3 text-[18px] leading-[1.55]">
                            <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Reveal>
                ))}
              </div>

              <aside className="lg:col-span-4 lg:col-start-9">
                <Reveal className="rounded-[24px] bg-paper p-7 lg:sticky lg:top-28">
                  <h2 className="font-sans text-[22px] font-semibold tracking-normal">See it running</h2>
                  <p className="mt-2 text-[17px] text-muted">These restaurants take orders on Umami every day:</p>
                  <ul className="mt-4 space-y-2">
                    {PROOF_LINKS.map((l) => (
                      <li key={l.href}>
                        <a href={l.href} className="text-[17px] font-medium text-brand-ink underline decoration-2 underline-offset-4">
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <figure className="mt-8">
                    <ul className="grid grid-cols-2 gap-4">
                      {MENU_DISHES.slice(0, 4).map((d) => (
                        <li key={d.id}>
                          <div className="relative aspect-square">
                            <Image src={d.photo} alt={d.name} fill sizes="160px" className="dish object-contain" />
                          </div>
                          <p className="mt-1 text-[14px] leading-snug">
                            {d.name}, {money(d.price)}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <figcaption className="mt-4 text-[14px] text-muted">
                      Ordered from the table on Umami at {DISH_SOURCES}.
                    </figcaption>
                  </figure>
                </Reveal>
              </aside>
            </div>
          </Container>
        </section>

        {p.showPricing && <Pricing />}

        {/* FAQ */}
        <section className="relative pb-24 md:pb-32">
          <Container>
            <div className="max-w-3xl">
              <h2 className="text-[38px] md:text-[48px]">Questions</h2>
              <div className="mt-10 space-y-3">
                {p.faqs.map((f, i) => (
                  <Reveal key={f.q} delay={Math.min(i, 4) * 0.05}>
                  <details className="group rounded-[20px] bg-paper px-6 py-5">
                    <summary className="flex cursor-pointer list-none justify-between gap-6 text-[19px] font-semibold">
                      {f.q}
                      <span className="text-[24px] leading-none text-brand-ink transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-[18px] leading-[1.6]">{f.a}</p>
                  </details>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <TryUmami />

        {/* Related pages */}
        <section className="relative py-20">
          <Container>
            <h2 className="font-sans text-[22px] font-semibold tracking-normal">Read next</h2>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              {RELATED.filter((r) => r.slug !== p.slug).map((r) => (
                <li key={r.slug}>
                  <a href={`/${r.slug}`} className="text-[18px] text-brand-ink underline decoration-2 underline-offset-4">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
