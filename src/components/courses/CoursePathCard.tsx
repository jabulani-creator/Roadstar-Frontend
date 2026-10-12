import type { Course } from "@/lib/types";
import { courseNarrative } from "@/lib/courseCopy";
import { formatZmw } from "@/lib/utils";
import { buildCourseEnquiryWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/** Level-based marks so Class B packages don’t all look identical. */
function PathIcon({ level }: { level: string }) {
  const common = "h-12 w-12 text-[var(--brand)] md:h-14 md:w-14";

  if (level === "beginner_full") {
    return (
      <svg viewBox="0 0 48 48" className={common} fill="none" aria-hidden>
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M24 14v10l7 4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (level === "standard") {
    return (
      <svg viewBox="0 0 48 48" className={common} fill="none" aria-hidden>
        <path
          d="M10 30h6l3-8h10l4 8h5v6H10v-6z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <circle cx="17" cy="38" r="3" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="33" cy="38" r="3" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    );
  }

  if (level === "half") {
    return (
      <svg viewBox="0 0 48 48" className={common} fill="none" aria-hidden>
        <path
          d="M14 34h20M18 34V18h12v16"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M22 24h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    );
  }

  if (level === "refresher") {
    return (
      <svg viewBox="0 0 48 48" className={common} fill="none" aria-hidden>
        <path
          d="M14 24a10 10 0 0116.5-7.5M34 24a10 10 0 01-16.5 7.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M30 14h4v4M18 34h-4v-4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (level === "test_prep") {
    return (
      <svg viewBox="0 0 48 48" className={common} fill="none" aria-hidden>
        <rect
          x="12"
          y="12"
          width="24"
          height="28"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M18 20h12M18 26h12M18 32h8"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className={common} fill="none" aria-hidden>
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M24 16v8l6 3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CoursePathCard({
  course,
  popular = false,
}: {
  course: Course;
  popular?: boolean;
}) {
  const narrative = courseNarrative(course);
  const bestFor = narrative.audience || course.summary;
  const duration = course.duration_days != null ? `${course.duration_days} days` : null;
  const transmission = course.transmission_label || null;
  const whatsappHref = buildCourseEnquiryWhatsAppUrl(course);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg bg-[var(--panel)]">
      <div className="relative flex h-28 items-center justify-center border-b border-black/10 md:h-32">
        {popular ? (
          <span className="absolute left-3 top-3 rounded-md bg-[var(--accent)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
            Most Popular
          </span>
        ) : null}
        <PathIcon level={course.level} />
      </div>

      <div className="flex flex-1 flex-col px-4 py-5 md:px-5 md:py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
          {course.licence_class_label}
          {course.level_label ? ` · ${course.level_label}` : ""}
        </p>

        <h3 className="mt-1.5 font-display text-xl font-semibold tracking-tight text-[var(--ink)] md:text-2xl">
          {course.name}
        </h3>

        <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--ink)]">
          <span className="text-[var(--muted)]">Best for:</span> {bestFor}
        </p>

        <p className="mt-4 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
          {course.show_price && course.price_amount ? formatZmw(course.price_amount) : "Ask us"}
        </p>

        <p className="mt-2 text-sm font-semibold text-[var(--brand)]">
          {[duration, transmission].filter(Boolean).join(" · ") || "Details on request"}
        </p>

        <div className="mt-auto flex flex-col gap-3 pt-5">
          <Button href={`/courses/${course.slug}`} variant="primary" className="w-full rounded-md">
            View Details
          </Button>
          <WhatsAppButton href={whatsappHref} fullWidth />
        </div>
      </div>
    </article>
  );
}
