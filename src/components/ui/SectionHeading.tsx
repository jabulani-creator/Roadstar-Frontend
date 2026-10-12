import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
