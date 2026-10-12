import { cn } from "@/lib/utils";

/** Soft instructor avatar — initials + person mark until real photos exist. */
export function InstructorPlaceholder({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center gap-3 bg-[var(--teal-soft)]",
        className,
      )}
      role="img"
      aria-label={`${name}, Roadstar instructor`}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/80 text-[var(--brand)] shadow-sm ring-1 ring-[var(--brand)]/15 md:h-24 md:w-24">
        <svg
          viewBox="0 0 48 48"
          className="h-12 w-12 md:h-14 md:w-14"
          fill="none"
          aria-hidden
        >
          <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2.25" />
          <path
            d="M10 38c2.5-8 8-12 14-12s11.5 4 14 12"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {initials ? (
        <p className="font-display text-lg font-semibold tracking-wide text-[var(--brand)] md:text-xl">
          {initials}
        </p>
      ) : null}
    </div>
  );
}

type VehicleKind = "car" | "van" | "truck" | "other";

function vehicleKind(licenceClass: string, vehicleType?: string): VehicleKind {
  const c = licenceClass.toUpperCase();
  const t = (vehicleType ?? "").toLowerCase();
  if (c.startsWith("C") || t.includes("heavy") || t.includes("commercial")) {
    return c === "C1" || t.includes("light") ? "van" : "truck";
  }
  if (c.startsWith("B") || t.includes("passenger")) return "car";
  return "other";
}

function CarGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} fill="none" aria-hidden>
      <path
        d="M12 26h40l-3.5-10.5A6 6 0 0043 11H21a6 6 0 00-5.5 4.5L12 26z"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      <path
        d="M8 26h48v4.5a3 3 0 01-3 3H11a3 3 0 01-3-3V26z"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="33.5" r="3.5" stroke="currentColor" strokeWidth="2.25" />
      <circle cx="46" cy="33.5" r="3.5" stroke="currentColor" strokeWidth="2.25" />
      <path
        d="M22 17h8M34 17h8"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function VanGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} fill="none" aria-hidden>
      <path
        d="M8 28V14a4 4 0 014-4h28l12 10v8H8z"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      <path d="M40 10v10h16" stroke="currentColor" strokeWidth="2.25" strokeLinejoin="round" />
      <circle cx="18" cy="31" r="3.5" stroke="currentColor" strokeWidth="2.25" />
      <circle cx="48" cy="31" r="3.5" stroke="currentColor" strokeWidth="2.25" />
      <path d="M8 28h48" stroke="currentColor" strokeWidth="2.25" />
    </svg>
  );
}

function TruckGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} fill="none" aria-hidden>
      <rect
        x="6"
        y="12"
        width="28"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="2.25"
      />
      <path
        d="M34 20h14l6 6v4H34V20z"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="32" r="3.5" stroke="currentColor" strokeWidth="2.25" />
      <circle cx="46" cy="32" r="3.5" stroke="currentColor" strokeWidth="2.25" />
      <path d="M6 28h52" stroke="currentColor" strokeWidth="2.25" />
    </svg>
  );
}

/** Soft vehicle mark until per-vehicle photos are uploaded. */
export function VehiclePlaceholder({
  name,
  licenceClass,
  vehicleType,
  className,
}: {
  name: string;
  licenceClass: string;
  vehicleType?: string;
  className?: string;
}) {
  const kind = vehicleKind(licenceClass, vehicleType);
  const Glyph = kind === "truck" ? TruckGlyph : kind === "van" ? VanGlyph : CarGlyph;

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-end text-[var(--brand)]",
        className,
      )}
      role="img"
      aria-label={name}
    >
      {/* Icon only — no box/shadow; matches floating cutout treatment for real photos */}
      <Glyph className="h-20 w-auto opacity-90 md:h-24" />
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--brand)]/65">
        Class {licenceClass || "—"}
      </p>
    </div>
  );
}
