import { cn } from "@/lib/utils";

export default function Section({
  id,
  children,
  className,
  eyebrow,
  title,
  subtitle,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      {(eyebrow || title || subtitle) && (
        <div className="mx-auto mb-14 max-w-3xl text-center">
          {eyebrow && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-muted font-mono">
              <span className="size-1.5 rounded-full bg-brand animate-pulse-glow" />
              {eyebrow}
            </div>
          )}
          {title && (
            <h2 className="text-balance text-4xl md:text-5xl lg:text-6xl tracking-tight gradient-text">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-5 text-balance text-base md:text-lg text-muted">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
