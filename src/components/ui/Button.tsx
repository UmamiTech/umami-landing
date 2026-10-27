import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-brand text-foreground hover:bg-[#f08a32]",
  dark: "bg-foreground text-white hover:bg-[#2b2b2b]",
  secondary: "bg-paper text-foreground hover:bg-paper-2",
  ghost: "text-foreground hover:bg-paper",
};

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  className,
  type = "button",
  disabled,
  external,
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
}) {
  const cls = cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[16px] font-medium",
    // Feedback lands on the press, not the release: a quick, small scale-down that
    // never bounces. Colour fades on hover; nothing lifts.
    "transition-[background-color,color,scale] duration-150 ease-out active:scale-[0.97] active:duration-75 disabled:opacity-60 disabled:active:scale-100",
    styles[variant],
    className,
  );

  if (href) {
    // A same-page anchor ("#try") must be a plain <a>. next/link resolves a bare
    // hash RELATIVE TO THE CURRENT URL, so once you are at "/#try" another click
    // lands on "/#try#try". A plain anchor is what a hash link wants anyway.
    if (href.startsWith("#") || external) {
      return (
        <a
          href={href}
          className={cls}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
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
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}
