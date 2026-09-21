import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Pricing from "@/components/sections/Pricing";
import TryUmami from "@/components/sections/TryUmami";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
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
  { slug: "works-with-your-pos", label: "Works with your POS" },
  { slug: "for-samgyupsal", label: "For unlimited samgyupsal" },
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
        { "@type": "ListItem", position: 2, name: p.eyebrow, item: `${SITE_URL}/${p.slug}` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structured)} />
      <Nav />
      <main className="relative">
        {/* Hero */}
        <section className="relative pt-36 pb-16 md:pt-44 md:pb-20">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-muted font-mono">
                <span className="size-1.5 rounded-full bg-brand animate-pulse-glow" />
                {p.eyebrow}
              </div>
              <h1 className="text-balance text-4xl md:text-6xl tracking-tight leading-[1.05] gradient-text">
                {p.h1}
              </h1>
              <p className="mt-6 text-balance text-lg md:text-xl text-muted">{p.lede}</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Button href="#try">Try free →</Button>
                <Button href="https://app.umami.com.ph/menu/demo" variant="secondary">
                  Order from the demo
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Body */}
        <section className="relative pb-20">
          <Container>
            <div className="mx-auto max-w-3xl space-y-12">
              {p.sections.map((s) => (
                <div key={s.heading}>
                  <h2 className="text-2xl md:text-3xl tracking-tight text-foreground">
                    {s.heading}
                  </h2>
                  {s.body?.map((para, i) => (
                    <p key={i} className="mt-4 text-base md:text-lg leading-relaxed text-foreground/80">
                      {para}
                    </p>
                  ))}
                  {s.bullets && (
                    <ul className="mt-5 space-y-3">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-base md:text-lg text-foreground/80">
                          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              <div className="rounded-2xl border border-white/10 bg-card p-6 md:p-8">
                <div className="text-xs uppercase tracking-widest text-muted font-mono mb-3">
                  See it live
                </div>
                <p className="text-foreground/80">
                  These restaurants take orders on Umami every day:
                </p>
                <ul className="mt-3 space-y-1.5">
                  {PROOF_LINKS.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="text-brand hover:underline">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {p.showPricing && <Pricing />}

        {/* FAQ */}
        <section className="relative pb-8">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl md:text-3xl tracking-tight text-foreground mb-6">
                Questions
              </h2>
              <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-card">
                {p.faqs.map((f) => (
                  <details key={f.q} className="group p-5 md:p-6">
                    <summary className="cursor-pointer list-none flex justify-between gap-4 font-medium text-foreground">
                      {f.q}
                      <span className="text-brand transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-foreground/75 leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <TryUmami />

        {/* Related pages */}
        <section className="relative pb-10">
          <Container>
            <div className="mx-auto max-w-3xl flex flex-wrap gap-2 justify-center">
              {RELATED.filter((r) => r.slug !== p.slug).map((r) => (
                <a
                  key={r.slug}
                  href={`/${r.slug}`}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted hover:text-foreground hover:border-brand/40 transition-colors"
                >
                  {r.label}
                </a>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
