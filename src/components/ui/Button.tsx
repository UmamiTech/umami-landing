import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-brand text-black hover:bg-[#ffa050] shadow-[0_0_40px_-10px_var(--brand-glow)]",
  secondary:
    "bg-white/5 text-foreground hover:bg-white/10 border border-white/10",
  ghost: "text-foreground hover:bg-white/5",
};

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  className,
  type = "button",
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
}) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98]",
    styles[variant],
    className,
  );

  if (href) {
    // A same-page anchor ("#try") must be a plain <a>. next/link resolves a bare
    // hash RELATIVE TO THE CURRENT URL, so once you are at "/#try" another click
    // lands on "/#try#try", then "/#try#try#try" — the link appears to stop
    // working. A plain anchor is what a hash link wants anyway: no routing, no
    // prefetch, just scroll.
    if (href.startsWith("#")) {
      return (
        <a href={href} className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
