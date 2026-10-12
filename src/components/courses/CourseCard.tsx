import Link from "next/link";
import type { Course } from "@/lib/types";
import { formatZmw } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { CourseCtaGroup } from "./CourseCtaGroup";

function audienceLine(course: Course): string {
  switch (course.level) {
    case "beginner_full":
      return "For complete beginners. No experience needed.";
    case "standard":
      return "For learners with some experience who need structured training.";
    case "half":
      return "A shorter package when you need focused practical time.";
    case "refresher":
      return "For licensed drivers who need to rebuild confidence.";
    case "test_prep":
      return "One-day preparation for your test — not a guarantee that you will pass.";
    default:
      return course.summary;
  }
}

function transmissionHint(course: Course): string {
  if (course.transmission === "automatic") return "Automatic";
  if (course.transmission === "manual") return "Manual";
  return "Manual & Automatic";
}

export function CourseCard({
  course,
  showCtas = true,
}: {
  course: Course;
  showCtas?: boolean;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-[var(--card-shadow)] ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(18,118,100,0.12)]">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge tone="brand">{course.licence_class_label}</Badge>
        <Badge tone="neutral">{transmissionHint(course)}</Badge>
      </div>
      <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
        <Link href={`/courses/${course.slug}`} className="hover:text-[var(--ink)]">
          {course.name}
        </Link>
      </h3>
      <p className="mt-2 text-sm font-medium text-[var(--ink)]">{audienceLine(course)}</p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
        {course.duration_days ? `${course.duration_days} days` : "Duration TBC"}
        {course.inclusions ? ` · ${course.inclusions.split(",")[0]}` : ""}
      </p>
      {course.exclusions ? (
        <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
          Not included: {course.exclusions}
        </p>
      ) : (
        <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
          Not included: RTSA statutory fees (paid separately).
        </p>
      )}
      <div className="mt-5 flex items-end justify-between gap-4 border-t border-[var(--mist)] pt-5">
        <div>
          <p className="text-xs text-[var(--muted)]">RoadStar tuition</p>
          <p className="font-display text-3xl font-semibold text-[var(--ink)]">
            {course.show_price ? formatZmw(course.price_amount) : "Request quote"}
          </p>
        </div>
        {showCtas ? (
          <CourseCtaGroup course={course} compact />
        ) : (
          <Link
            href={`/courses/${course.slug}`}
            className="text-sm font-semibold text-[var(--ink)] underline-offset-4 hover:underline"
          >
            Details
          </Link>
        )}
      </div>
    </article>
  );
}
