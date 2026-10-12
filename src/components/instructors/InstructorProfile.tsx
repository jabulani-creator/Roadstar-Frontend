import type { Instructor } from "@/lib/types";
import { enrichInstructor } from "@/lib/instructorCopy";
import { instructorPhoto, instructorPhotoFocusClass } from "@/lib/fleetMedia";
import { buildInstructorWhatsAppUrl } from "@/lib/whatsapp";
import { InstructorPlaceholder } from "@/components/ui/PlaceholderIcons";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0 text-[var(--brand)]"
      aria-hidden
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.78-9.72a.75.75 0 00-1.06-1.06L9 11.94 7.28 10.22a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.25-4.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Profile-card design (placeholder → name → bio → metrics → CTA).
 * Dimensions follow the fleet column proportion — not a tall narrow portrait.
 */
export function InstructorProfile({ instructor }: { instructor: Instructor }) {
  const copy = enrichInstructor(instructor);
  const firstName = instructor.display_name.split(/\s+/)[0] ?? instructor.display_name;
  const bookWa = buildInstructorWhatsAppUrl({
    instructorName: instructor.display_name,
    branch: instructor.branch_name ?? undefined,
  });

  const classesLabel = instructor.licence_classes
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean)
    .join(" · ");

  const transmissionShort =
    instructor.transmission === "both"
      ? "Manual + Auto"
      : instructor.transmission_label || "—";

  const metrics = [
    { value: classesLabel || "B", label: "Classes" },
    { value: transmissionShort, label: "Transmission" },
    { value: instructor.branch_name || "Lusaka", label: "Branch" },
  ];

  const photo = instructorPhoto(instructor);
  const focusClass = instructorPhotoFocusClass(instructor.photo_focus);

  return (
    <article className="mx-auto flex h-full w-full max-w-md flex-col overflow-hidden rounded-lg bg-[var(--panel)]">
      {/* Portrait frame — better for headshots than a wide 4:3 crop */}
      <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-[var(--cream)]">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={instructor.display_name}
            className={`h-full w-full object-cover ${focusClass}`}
          />
        ) : (
          <div className="flex h-full items-end justify-center">
            <InstructorPlaceholder name={instructor.display_name} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 py-4 md:px-5 md:py-5">
        <div className="flex items-center gap-1.5">
          <h3 className="font-display text-xl font-semibold tracking-tight text-[var(--ink)] md:text-2xl">
            {instructor.display_name}
          </h3>
          <span className="sr-only">RTSA certified</span>
          <CheckIcon />
        </div>

        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          {copy.title}. Specialty: {copy.specialty}.
        </p>

        <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/80">
          “{instructor.public_bio || copy.style}”
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2 border-y border-black/10 py-3.5">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`min-w-0 px-1 text-center ${i > 0 ? "border-l border-black/10" : ""}`}
            >
              <p className="truncate text-sm font-semibold text-[var(--ink)]" title={m.value}>
                {m.value}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        <a
          href={bookWa}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[var(--brand)] text-sm font-semibold text-white transition hover:bg-[var(--brand-strong)]"
        >
          Book with {firstName}
        </a>
      </div>
    </article>
  );
}
