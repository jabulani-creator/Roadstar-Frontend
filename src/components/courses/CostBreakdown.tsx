import type { Course, RTSAItem } from "@/lib/types";
import { combinedEstimate, pathwayFees } from "@/lib/cost";
import { formatZmw } from "@/lib/utils";

export function CostBreakdown({
  course,
  rtsaItems,
}: {
  course: Course;
  rtsaItems: RTSAItem[];
}) {
  const estimate = combinedEstimate(course, rtsaItems);
  const fees = pathwayFees(rtsaItems);

  if (!estimate) {
    return (
      <div className="border border-black/8 bg-[var(--mist)] p-5 text-sm text-[var(--muted)]">
        Tuition quote available on request. Additional RTSA and medical charges are listed on
        the licensing guide.
      </div>
    );
  }

  return (
    <div className="border border-black/8 bg-white p-5">
      <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
        Illustrative cost breakdown
      </h3>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Assumes all four pathway charges apply and are not included in tuition. Not a formal
        quotation — confirm current RTSA fees before paying.
      </p>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-[var(--muted)]">Roadstar tuition</dt>
          <dd className="font-semibold">{formatZmw(estimate.tuition)}</dd>
        </div>
        {fees.map((f) => (
          <div key={f.id} className="flex justify-between gap-4">
            <dt className="text-[var(--muted)]">{f.title}</dt>
            <dd>{formatZmw(f.fee_amount)}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-4 border-t border-black/10 pt-3">
          <dt className="font-medium text-[var(--ink)]">Estimated combined</dt>
          <dd className="font-display text-2xl font-semibold text-[var(--ink)]">
            {formatZmw(estimate.combined)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
