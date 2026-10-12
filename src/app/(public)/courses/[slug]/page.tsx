import { notFound } from "next/navigation";
import { CostBreakdown } from "@/components/courses/CostBreakdown";
import { CourseCtaGroup } from "@/components/courses/CourseCtaGroup";
import { Badge } from "@/components/ui/Badge";
import { formatZmw } from "@/lib/utils";
import { contentService } from "@/lib/services/contentService";
import { courseService } from "@/lib/services/courseService";

export const dynamic = "force-dynamic";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let course;
  try {
    course = await courseService.getPublic(slug);
  } catch {
    notFound();
  }
  const rtsa = await contentService.rtsa().catch(() => []);

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_0.8fr] md:px-6 md:py-16">
      <div>
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge tone="brand">{course.licence_class_label}</Badge>
          <Badge>{course.level_label}</Badge>
          <Badge>{course.transmission_label}</Badge>
        </div>
        <h1 className="font-display text-4xl font-semibold text-[var(--ink)]">{course.name}</h1>
        <p className="mt-3 text-lg text-[var(--muted)]">{course.summary}</p>
        <p className="mt-6 text-sm leading-relaxed text-[var(--ink)]/85">{course.description}</p>
        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="border border-black/8 bg-white p-4">
            <dt className="text-xs uppercase tracking-wide text-[var(--muted)]">Duration</dt>
            <dd className="mt-1 font-semibold">{course.duration_days ?? "—"} days</dd>
          </div>
          <div className="border border-black/8 bg-white p-4">
            <dt className="text-xs uppercase tracking-wide text-[var(--muted)]">Tuition</dt>
            <dd className="mt-1 font-display text-2xl font-semibold text-[var(--brand)]">
              {course.show_price ? formatZmw(course.price_amount) : "Quote"}
            </dd>
          </div>
          <div className="border border-black/8 bg-white p-4">
            <dt className="text-xs uppercase tracking-wide text-[var(--muted)]">Min age / GVM</dt>
            <dd className="mt-1 font-semibold">
              {course.min_age ?? "—"}
              {course.max_gvm_kg ? ` / ${course.max_gvm_kg.toLocaleString()} kg` : ""}
            </dd>
          </div>
        </dl>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="font-semibold text-[var(--ink)]">Included</h2>
            <p className="mt-2 whitespace-pre-line text-sm text-[var(--muted)]">
              {course.inclusions || "See reception for inclusions."}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-[var(--ink)]">Not included</h2>
            <p className="mt-2 whitespace-pre-line text-sm text-[var(--muted)]">
              {course.exclusions || "RTSA and medical fees are separate."}
            </p>
          </div>
        </div>
        {course.level === "test_prep" ? (
          <p className="mt-6 border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
            Test preparation is practice for the exam — not a guarantee that you will pass.
          </p>
        ) : null}
        <div className="mt-8">
          <CourseCtaGroup course={course} />
        </div>
      </div>
      <CostBreakdown course={course} rtsaItems={rtsa} />
    </div>
  );
}
