import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { pathwayFees, pathwayTotal } from "@/lib/cost";
import { formatZmw } from "@/lib/utils";
import { contentService } from "@/lib/services/contentService";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "RTSA & Medical Costs | Roadstar Driving School Zambia",
  description:
    "Additional RTSA and medical costs for learner drivers in Zambia. Separate from Roadstar tuition. Confirm current fees with RTSA.",
};

export default async function LicensingPage() {
  const items = await contentService.rtsa().catch(() => []);
  const pathway = pathwayFees(items);
  const total = pathwayTotal(items);
  const other = items.filter((i) => !pathway.some((p) => p.id === i.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <SectionHeading
        eyebrow="RTSA costs"
        title="Additional RTSA and medical costs"
        subtitle="These are not Roadstar tuition. Figures follow the RTSA Driver Licencing schedule as frozen for go-live — re-confirm with RTSA before you pay."
      />
      <div className="mt-6">
        <Button href="/licence-classes" variant="secondary" size="sm">
          Plain-language licence classes guide
        </Button>
      </div>

      <section className="mt-10 border border-black/8 bg-white p-5 md:p-6">
        <h2 className="font-display text-2xl font-semibold">Learner pathway charges</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Combined estimate if all four apply:{" "}
          <span className="font-semibold text-[var(--brand)]">{formatZmw(total)}</span>
        </p>
        <ul className="mt-6 divide-y divide-black/5">
          {pathway.map((item) => (
            <li key={item.id} className="flex flex-wrap items-start justify-between gap-3 py-4">
              <div className="max-w-xl">
                <p className="font-semibold text-[var(--ink)]">{item.title}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{item.body}</p>
                {item.last_reviewed_at ? (
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    Last reviewed: {item.last_reviewed_at}
                  </p>
                ) : null}
              </div>
              <p className="font-display text-xl font-semibold text-[var(--brand)]">
                {formatZmw(item.fee_amount)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {other.length ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">Other RTSA processes</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Specialist pathways (renewals, conversions, PSV, etc.). Roadstar may not deliver every
            service listed — ask if unsure.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {other.map((item) => (
              <article key={item.id} className="border border-black/8 bg-white p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{item.body}</p>
                {item.fee_amount ? (
                  <p className="mt-3 font-semibold text-[var(--brand)]">
                    {formatZmw(item.fee_amount)}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
