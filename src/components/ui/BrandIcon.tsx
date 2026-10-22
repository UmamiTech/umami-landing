import { cn } from "@/lib/utils";

/**
 * The Umami "u" on its black tile. The inverted stroke must always be white
 * (brand rule), so on a white page the mark sits on its own dark square, the
 * same way the app icon does.
 */
export default function BrandIcon({ className }: { className?: string }) {
  return (
    <span className={cn("inline-grid shrink-0 place-items-center rounded-[22%] bg-[#1a1a1a]", className)} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logos/umami-icon.svg" alt="" className="size-[78%]" />
    </span>
  );
}
