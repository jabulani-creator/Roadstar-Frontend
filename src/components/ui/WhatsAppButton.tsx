"use client";

import { Button } from "@/components/ui/Button";
import { trackWhatsAppClick } from "@/lib/analytics";
import { buildStandardWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4 shrink-0 fill-[var(--whatsapp-mark)]", className)}
      aria-hidden
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.96.52 3.81 1.44 5.42L2 22l4.82-1.54a9.86 9.86 0 004.22.93h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.79 14.05c-.24.68-1.4 1.24-1.93 1.32-.5.07-1.13.1-1.83-.12-.42-.13-.97-.32-1.67-.62-2.94-1.27-4.85-4.23-5-4.42-.14-.19-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.41.26-.29.57-.36.76-.36h.55c.18 0 .41-.07.64.49.24.58.81 2 .88 2.14.07.15.12.32.02.51-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.61.17.29.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.15.46.12.63-.07.17-.2.74-.86.94-1.16.2-.29.4-.24.67-.15.27.1 1.72.81 2.01.96.29.15.49.22.56.34.07.12.07.7-.17 1.38z" />
    </svg>
  );
}

/**
 * Single WhatsApp CTA look + label for the whole public site.
 * Neutral button; green WhatsApp mark only.
 */
export function WhatsAppButton({
  href,
  size = "md",
  className,
  fullWidth,
  context,
}: {
  href?: string;
  size?: Size;
  className?: string;
  fullWidth?: boolean;
  /** Optional GA4 context (emmasdale | fees | class-b | course | …) */
  context?: string;
}) {
  return (
    <Button
      href={href ?? buildStandardWhatsAppUrl()}
      external
      size={size}
      variant="whatsapp"
      className={cn(fullWidth && "w-full", className)}
      onClick={() => trackWhatsAppClick(context)}
    >
      <WhatsAppIcon className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
      WhatsApp
    </Button>
  );
}
