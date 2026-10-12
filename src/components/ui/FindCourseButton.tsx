"use client";

import { Button } from "@/components/ui/Button";
import { trackFindCourseClick } from "@/lib/analytics";

type Size = "sm" | "md" | "lg";
type Variant = "primary" | "secondary" | "accent" | "whatsapp" | "ghost" | "danger";

/** Primary Find Your Course CTA with GA4 tracking. */
export function FindCourseButton({
  href = "/find-your-course",
  children = "Find Your Course",
  size = "md",
  variant = "accent",
  className,
  context = "cta",
}: {
  href?: string;
  children?: React.ReactNode;
  size?: Size;
  variant?: Variant;
  className?: string;
  context?: string;
}) {
  return (
    <Button
      href={href}
      size={size}
      variant={variant}
      className={className}
      onClick={() => trackFindCourseClick(context)}
    >
      {children}
    </Button>
  );
}
