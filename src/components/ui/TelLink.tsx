"use client";

import { trackTelClick } from "@/lib/analytics";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/contactCopy";
import { cn } from "@/lib/utils";

/** Inline tel: link with GA4 tracking. */
export function TelLink({
  className,
  context,
  children = CONTACT_PHONE_DISPLAY,
}: {
  className?: string;
  context?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={`tel:${CONTACT_PHONE_TEL}`}
      className={cn(className)}
      onClick={() => trackTelClick(context)}
    >
      {children}
    </a>
  );
}
