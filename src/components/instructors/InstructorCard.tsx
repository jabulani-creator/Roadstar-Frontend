import type { Instructor } from "@/lib/types";
import { instructorPhoto, instructorPhotoFocusClass } from "@/lib/fleetMedia";
import { InstructorPlaceholder } from "@/components/ui/PlaceholderIcons";

/** Compact CMS preview — matches public card crop. */
export function InstructorCard({ instructor }: { instructor: Instructor }) {
  const photo = instructorPhoto(instructor);
  const focusClass = instructorPhotoFocusClass(instructor.photo_focus);

  return (
    <article className="overflow-hidden rounded-lg bg-[var(--panel)]">
      <div className="aspect-[3/4] max-h-72 overflow-hidden bg-[var(--cream)]">
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
      <div className="px-5 py-4">
        <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
          {instructor.display_name}
        </h3>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Classes {instructor.licence_classes} · {instructor.transmission_label}
          {instructor.branch_name ? ` · ${instructor.branch_name}` : ""}
        </p>
        {instructor.public_bio ? (
          <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/80">
            “{instructor.public_bio}”
          </p>
        ) : null}
      </div>
    </article>
  );
}
