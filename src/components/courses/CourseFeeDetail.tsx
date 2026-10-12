import type { Course } from "@/lib/types";
import { courseAnchorId, courseNarrative } from "@/lib/courseCopy";
import { formatZmw } from "@/lib/utils";
import { buildCourseEnquiryWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

function splitLines(text: string): string[] {
  return text
    .split(/\n|·|;/)
    .map((s) => s.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean);
}

/** Soft panel course block — matches homepage / fleet demarcation (no white card). */
export function CourseFeeDetail({ course }: { course: Course }) {
  const narrative = courseNarrative(course);
  const inclusions = splitLines(course.inclusions);
  const exclusions = splitLines(course.exclusions);
  const chatWa = buildCourseEnquiryWhatsAppUrl(course);

  return (
    <article id={courseAnchorId(course)} className="scroll-mt-28">
      <div className="overflow-hidden rounded-lg bg-[var(--panel)]">
        <div className="border-b border-black/10 px-5 py-5 md:px-7 md:py-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">
            {course.licence_class_label}
            <span className="text-[var(--muted)]"> · </span>
            <span className="text-[var(--accent)]">{course.level_label}</span>
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[var(--ink)] md:text-3xl">
            {course.name}
          </h2>
          <p className="mt-2 text-base text-[var(--muted)]">{narrative.audience}</p>
        </div>

        <ul className="grid border-b border-black/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Duration", value: `${course.duration_days ?? "—"} days` },
            { label: "Transmission", value: course.transmission_label },
            {
              label: "Location",
              value:
                course.branch_details?.map((b) => b.name).join(" & ") ||
                "Ask when you enquire",
            },
            {
              label: "Tuition",
              value: course.show_price ? formatZmw(course.price_amount) : "Quote",
              emphasize: true,
            },
          ].map((spec, i) => (
            <li
              key={spec.label}
              className={`border-black/10 px-5 py-4 ${
                i < 3 ? "border-b lg:border-b-0" : ""
              } ${i % 2 === 1 ? "sm:border-l" : ""} ${i >= 2 ? "lg:border-l" : ""}`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                {spec.label}
              </p>
              <p
                className={
                  spec.emphasize
                    ? "mt-1 font-display text-2xl font-semibold text-[var(--brand)]"
                    : "mt-1 text-sm font-semibold text-[var(--ink)]"
                }
              >
                {spec.value}
              </p>
            </li>
          ))}
        </ul>

        <div className="grid gap-0 border-t border-black/10 md:grid-cols-2">
          <div className="border-b border-black/10 px-5 py-5 md:border-b-0 md:border-r md:px-7 md:py-6">
            <h3 className="text-sm font-semibold text-[var(--ink)]">What&apos;s included</h3>
            <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
              {(inclusions.length
                ? inclusions
                : ["Practical lessons with a certified instructor"]
              ).map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-[var(--brand)]" aria-hidden>
                    ✓
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-5 py-5 md:px-7 md:py-6">
            <h3 className="text-sm font-semibold text-[var(--ink)]">What&apos;s not included</h3>
            <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
              {(exclusions.length
                ? exclusions
                : ["RTSA statutory fees (paid directly to RTSA)"]
              ).map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-[var(--muted)]" aria-hidden>
                    –
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {course.level === "test_prep" ? (
          <p className="border-t border-black/10 bg-[var(--teal-soft)] px-5 py-4 text-sm text-[var(--ink)] md:px-7">
            <strong>Important:</strong> This course does not guarantee a pass. It prepares you for
            the test. RTSA administers and decides the outcome.
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3 border-t border-black/10 px-5 py-5 md:px-7">
          <Button href="/contact#register" variant="primary">
            Register for This Course
          </Button>
          <WhatsAppButton href={chatWa} />
          <Button href={`/courses/${course.slug}`} variant="secondary">
            Full detail page
          </Button>
        </div>

        <details className="border-t border-black/10 px-5 py-4 md:px-7">
          <summary className="cursor-pointer text-sm font-semibold text-[var(--ink)]">
            Who is this course for?
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{narrative.whoFor}</p>
          {narrative.learn?.length ? (
            <>
              <p className="mt-4 text-sm font-semibold text-[var(--ink)]">What you&apos;ll learn</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                {narrative.learn.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}
        </details>
      </div>
    </article>
  );
}
