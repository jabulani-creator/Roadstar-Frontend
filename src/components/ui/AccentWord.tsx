import { cn } from "@/lib/utils";

type AccentWordProps = {
  children: React.ReactNode;
  /** Teal text — softer teal on dark/hero. Underline is always orange. */
  tone?: "brand" | "soft";
  underline?: boolean;
  className?: string;
};

/** Accent word: company teal text + orange curve underline. */
export function AccentWord({
  children,
  tone = "brand",
  underline = true,
  className,
}: AccentWordProps) {
  const textColor =
    tone === "soft" ? "text-[var(--brand-soft)]" : "text-[var(--brand)]";

  return (
    <span
      className={cn(
        "relative inline-block pb-[0.22em]",
        textColor,
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      {underline ? (
        <svg
          className="pointer-events-none absolute left-0 top-[calc(100%-0.08em)] h-[0.28em] w-full text-[var(--accent)]"
          viewBox="0 0 120 10"
          fill="none"
          aria-hidden
          preserveAspectRatio="none"
        >
          <path
            d="M2 6.5c28-3.5 58-4.5 116-1.5"
            stroke="currentColor"
            strokeWidth="2.75"
            strokeLinecap="round"
          />
        </svg>
      ) : null}
    </span>
  );
}
