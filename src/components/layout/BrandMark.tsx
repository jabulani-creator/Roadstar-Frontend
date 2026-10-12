import { cn } from "@/lib/utils";

/**
 * Official RoadStar logo from /public/roadstar-logo.svg
 * Compact on mobile; larger from md up (desktop unchanged).
 */
export function BrandMark({
  light = false,
  onTeal = false,
  className,
}: {
  light?: boolean;
  /** Kept for call-site compatibility (header mobile bar). */
  onTeal?: boolean;
  className?: string;
}) {
  void light;
  void onTeal;

  return (
    <div className={cn("flex items-center leading-none", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/roadstar-logo.svg"
        alt="RoadStar Driving School"
        width={280}
        height={61}
        className="block h-9 w-auto max-w-[min(58vw,11.5rem)] object-left object-contain md:h-16 md:max-w-[22rem] lg:h-[4.75rem] lg:max-w-[28rem] xl:h-20 xl:max-w-[32rem]"
      />
    </div>
  );
}
