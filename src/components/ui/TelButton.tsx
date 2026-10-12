"use client";

import { Button } from "@/components/ui/Button";
import { trackTelClick } from "@/lib/analytics";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/contactCopy";

type Size = "sm" | "md" | "lg";
type Variant = "primary" | "secondary" | "accent" | "whatsapp" | "ghost" | "danger";

export function TelButton({
  href = `tel:${CONTACT_PHONE_TEL}`,
  children = "Call now",
  size = "md",
  variant = "primary",
  className,
  context,
  displayNumber = false,
}: {
  href?: string;
  children?: React.ReactNode;
  size?: Size;
  variant?: Variant;
  className?: string;
  context?: string;
  /** When true, default label is the phone number */
  displayNumber?: boolean;
}) {
  return (
    <Button
      href={href}
      size={size}
      variant={variant}
      className={className}
      onClick={() => trackTelClick(context)}
    >
      {displayNumber ? CONTACT_PHONE_DISPLAY : children}
    </Button>
  );
}
