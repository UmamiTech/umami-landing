import Container from "../ui/Container";

const cols = [
  {
    title: "Product",
    links: [
      { label: "Customer ordering", href: "#what" },
      { label: "Kitchen + Dining", href: "#what" },
      { label: "Cashier", href: "#what" },
      { label: "Owner Dashboard", href: "#what" },
      { label: "Chain Operator", href: "#what" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Story", href: "#story" },
      { label: "Pricing", href: "#pricing" },
      { label: "Contact", href: "#contact" },
      { label: "Investors", href: "/investors" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Sign in", href: "https://app.umami.com.ph" },
      { label: "Status", href: "https://app.umami.com.ph/health" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-20">
      <Container className="py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <a href="#" className="flex items-center gap-2.5 mb-4">
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
              The operating system for restaurants. Made in the Philippines.
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
