import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warn" | "brand";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium",
        tone === "neutral" && "bg-black/5 text-[var(--muted)]",
        tone === "success" && "bg-emerald-50 text-emerald-800",
        tone === "warn" && "bg-amber-50 text-amber-900",
        tone === "brand" && "bg-[var(--brand)]/10 text-[var(--brand)]",
      )}
    >
      {children}
    </span>
  );
}
