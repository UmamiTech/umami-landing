import Container from "../ui/Container";
import { APP_URL } from "@/lib/app";

/**
 * Every href here must resolve. The routes that exist are "/", the keyword pages
 * in src/lib/landingPages.ts, and the /store/* rewrite — anything else is a 404.
 * Privacy points at the real policy the app serves; Investors and Terms stay out
 * until there is something to link to. "#try" works on every page because each
 * page renders the TryUmami section.
 */
const cols = [
  {
    title: "Product",
    links: [
      { label: "What is Umami", href: "/what-is-umami" },
      { label: "QR code ordering", href: "/qr-ordering" },
      { label: "Works with your POS", href: "/works-with-your-pos" },
      { label: "For unlimited samgyupsal", href: "/for-samgyupsal" },
      { label: "Multi-branch", href: "/multi-branch" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Story", href: "/#story" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Sign in", href: APP_URL },
      { label: "Try the demo", href: `${APP_URL}/menu/demo` },
      { label: "Start free", href: "/free-trial" },
      { label: "Privacy", href: `${APP_URL}/privacy` },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-20">
      <Container className="py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <a href="/" className="flex items-center gap-2.5 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/umami-icon.svg"
                alt="Umami"
                className="h-7 w-7"
              />
              <span className="font-semibold tracking-tight text-base text-brand">
                umami
              </span>
            </a>
            <p className="text-sm text-muted max-w-xs">
              Digital ordering for restaurants. Works with your POS. Made in the Philippines.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <div className="text-xs uppercase tracking-widest text-muted font-mono mb-4">
                {col.title}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-foreground/80 hover:text-brand transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-7 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-xs text-muted font-mono">
            © {new Date().getFullYear()} Umami Technologies, Inc.
          </div>
          <div className="text-xs text-muted">
            Built with the restaurants we love.
          </div>
        </div>
      </Container>
    </footer>
  );
}
