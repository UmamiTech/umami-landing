import Container from "../ui/Container";
import BrandIcon from "../ui/BrandIcon";
import { APP_URL } from "@/lib/app";

/**
 * Every href here must resolve. The routes that exist are "/", the keyword pages
 * in src/lib/landingPages.ts, and the /store/* rewrite; anything else is a 404.
 * Privacy points at the real policy the app serves. "#try" works on every page
 * because each page renders the TryUmami section.
 */
const cols = [
  {
    title: "Product",
    links: [
      { label: "What is Umami", href: "/what-is-umami" },
      { label: "QR code ordering", href: "/qr-ordering" },
      { label: "Works with your POS", href: "/works-with-your-pos" },
      { label: "For unlimited samgyupsal", href: "/for-samgyupsal" },
      { label: "For cafés", href: "/for-cafes" },
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
      { label: "How to set up a QR menu", href: "/how-to-set-up-a-qr-menu" },
      { label: "Start free", href: "/free-trial" },
      { label: "Privacy", href: `${APP_URL}/privacy` },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-background">
      <Container className="pt-20 pb-10 md:pt-28">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <p className="max-w-xs text-[18px]">
              QR ordering for restaurants. Works with your POS. Made in the Philippines.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h2 className="font-sans text-[16px] font-semibold tracking-normal">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[16px] text-muted transition-colors hover:text-brand-ink">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <a href="/" aria-label="Umami home" className="mt-20 flex items-center gap-[2vw] md:mt-28">
          <BrandIcon className="size-[18vw] max-w-[180px] max-h-[180px]" />
          <span className="text-[22vw] font-semibold leading-[0.8] tracking-[-0.05em] text-[#c75f0d] lg:text-[230px]">
            umami
          </span>
        </a>

        <div className="mt-10 flex flex-col justify-between gap-2 text-[16px] text-muted md:flex-row">
          <span>© {new Date().getFullYear()} Umami Technologies, Inc.</span>
          <span>Built with the restaurants we serve.</span>
        </div>
      </Container>
    </footer>
  );
}
