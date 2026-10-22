import { cn } from "@/lib/utils";
import Container from "./Container";
import Headline from "./Headline";

/**
 * A section with its heading. The heading is the claim; `lede` is the one
 * sentence of proof under it. No labels above headings, ever.
 */
export default function Section({
  id,
  children,
  className,
  title,
  lede,
  align = "left",
  tone = "white",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  title?: string[];
  lede?: React.ReactNode;
  align?: "left" | "center";
  tone?: "white" | "paper";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-20 py-24 md:py-36",
        tone === "paper" && "bg-paper",
        className,
      )}
    >
      {title && (
        <Container>
          <div className={cn("mb-12 md:mb-16 max-w-3xl", align === "center" && "mx-auto text-center")}>
            <Headline lines={title} className="text-[40px] md:text-[72px]" />
            {lede && (
              <p className={cn("mt-8 max-w-xl text-[18px] md:text-[21px] leading-[1.5] text-muted", align === "center" && "mx-auto")}>
                {lede}
              </p>
            )}
          </div>
        </Container>
      )}
      {children}
    </section>
  );
}
