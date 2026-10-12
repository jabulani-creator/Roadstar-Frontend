import Link from "next/link";
import type { Course } from "@/lib/types";
import { formatZmw } from "@/lib/utils";

export function CoursePriceTable({
  title,
  subtitle,
  courses,
}: {
  title: string;
  subtitle?: string;
  courses: Course[];
}) {
  const sorted = [...courses].sort(
    (a, b) => (b.duration_days ?? 0) - (a.duration_days ?? 0),
  );

  return (
    <section className="overflow-hidden border border-black/8 bg-white">
      <div className="border-b border-black/8 bg-[var(--mist)] px-5 py-4">
        <h3 className="font-display text-2xl font-semibold text-[var(--ink)]">{title}</h3>
        {subtitle ? <p className="mt-1 text-sm text-[var(--muted)]">{subtitle}</p> : null}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white text-xs uppercase tracking-wide text-[var(--muted)]">
            <tr>
              <th className="px-5 py-3 font-medium">Package</th>
              <th className="px-5 py-3 font-medium">Days</th>
              <th className="px-5 py-3 font-medium">Tuition</th>
              <th className="px-5 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => (
              <tr key={c.id} className="border-t border-black/5">
                <td className="px-5 py-3 font-medium text-[var(--ink)]">{c.level_label}</td>
                <td className="px-5 py-3 text-[var(--muted)]">{c.duration_days ?? "—"}</td>
                <td className="px-5 py-3 font-semibold text-[var(--ink)]">
                  {c.show_price ? formatZmw(c.price_amount) : "Quote"}
                </td>
                <td className="px-5 py-3 text-right">
                  <Link
                    href={`/courses/${c.slug}`}
                    className="font-semibold text-[var(--ink)] underline-offset-4 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
