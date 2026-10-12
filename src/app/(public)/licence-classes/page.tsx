import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import {
  CLASS_COMPARISON,
  CLASS_DETAILS,
  LICENCE_FAQS,
  PROGRESSION_STEPS,
  RTSA_CLASS_STEPS,
  RTSA_STATUTORY_SLUGS,
} from "@/lib/licenceCopy";
import { formatZmw } from "@/lib/utils";
import { buildLicenceClassWhatsAppUrl } from "@/lib/whatsapp";
import { contentService } from "@/lib/services/contentService";
import { courseService } from "@/lib/services/courseService";
import type { Course, RTSAItem } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "Driving Licence Classes in Zambia | Class B, C1 & C Explained | Roadstar Driving School",
  description:
    "Understand Zambia's driving licence classes. Class B, C1 & C explained with eligibility, vehicle types, and RTSA requirements. Train with Roadstar in Lusaka.",
};

function coursesForClass(courses: Course[], code: string) {
  return courses
    .filter((c) => c.licence_class === code)
    .sort((a, b) => {
      const order = [
        "beginner_full",
        "standard",
        "half",
        "refresher",
        "test_prep",
        "professional",
        "other",
      ];
      return order.indexOf(a.level) - order.indexOf(b.level);
    });
}

function ClassSection({
  code,
  courses,
  reverse,
}: {
  code: "B" | "C1" | "C";
  courses: Course[];
  reverse?: boolean;
}) {
  const detail = CLASS_DETAILS[code];
  const wa = buildLicenceClassWhatsAppUrl(`Class ${code}`);
  const matched = coursesForClass(courses, code);

  return (
    <section
      id={`class-${code.toLowerCase()}`}
      className="scroll-mt-24 border-b border-[var(--brand)]/10 py-14 md:py-20"
    >
      <div
        className={`mx-auto grid max-w-6xl items-start gap-10 px-4 md:px-6 lg:grid-cols-2 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Class {code}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--ink)]">
            {detail.title}
          </h2>
          <p className="mt-2 text-sm italic text-[var(--muted)]">{detail.tagline}</p>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
            What it covers
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/85">{detail.covers}</p>

          {detail.update ? (
            <aside className="mt-5 rounded-2xl border border-black/25 bg-[var(--mist)] p-4 text-sm text-[var(--ink)]/85">
              <p className="font-semibold text-[var(--muted)]">Important update</p>
              <p className="mt-1">{detail.update}</p>
            </aside>
          ) : null}

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
            Vehicles you can drive
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--ink)]/85">
            {detail.vehicles.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
            Who is this for?
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/85">{detail.whoFor}</p>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
            What you need to qualify
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--ink)]/85">
            {detail.qualify.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
            Roadstar course path
          </h3>
          <ul className="mt-2 space-y-2 text-sm text-[var(--ink)]/85">
            {matched.length ? (
              matched.map((c) => (
                <li key={c.id}>
                  {c.licence_class_label} — {c.level_label}
                  {c.duration_days ? ` (${c.duration_days} days)` : ""}
                  {c.show_price && c.price_amount ? ` — ${formatZmw(c.price_amount)}` : ""}
                </li>
              ))
            ) : (
              <li>Ask us which package fits your experience and goals.</li>
            )}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`/courses-and-fees${code === "B" ? "" : "#professional"}`} variant="primary">
              View Class {code} Courses
            </Button>
            <WhatsAppButton href={wa} />
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-[var(--mist)] ring-1 ring-black/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={code === "B" ? "/brand/roadstar-vehicle.jpg" : "/brand/roadstar-flyer.jpg"}
            alt={`Class ${code} training with Roadstar`}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function statutoryFees(items: RTSAItem[]) {
  const bySlug = new Map(items.map((i) => [i.slug, i]));
  return RTSA_STATUTORY_SLUGS.map((s) => bySlug.get(s)).filter(Boolean) as RTSAItem[];
}

export default async function LicenceClassesPage() {
  const [courses, rtsa] = await Promise.all([
    courseService.listPublic().catch(() => []),
    contentService.rtsa().catch(() => []),
  ]);
  const statutory = statutoryFees(rtsa);
  const statutoryTotal = statutory.reduce((sum, i) => sum + Number(i.fee_amount ?? 0), 0);
  const lastReviewed =
    statutory.find((p) => p.last_reviewed_at)?.last_reviewed_at ?? "pending confirmation";
  return (
    <div className="pb-20">
      <div className="border-b border-[var(--brand)]/10 bg-[var(--mist)]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <SectionHeading
            eyebrow="Licence classes"
            title="Which licence class do you need?"
            subtitle="Not all driving licences are the same. In Zambia, your licence class determines what you're legally allowed to drive. Here's a plain-language guide to Class B, C1, and C — what each one covers, who it's for, and how to get started."
          />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">
            RTSA-Aligned Information · Dated & Reviewed · Plain Language · No Jargon
          </p>
          <p className="mt-4 text-sm text-[var(--muted)]">
            Looking for training specifically?{" "}
            <a href="/licence-classes/class-b" className="font-semibold text-[var(--brand)] hover:underline">
              Class B driving school in Lusaka
            </a>
            {" · "}
            <a href="/licence-classes/class-c1-c" className="font-semibold text-[var(--brand)] hover:underline">
              Class C1 & C
            </a>
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <SectionHeading
          eyebrow="At a glance"
          title="Zambia's licence classes at a glance."
          subtitle="RTSA has realigned Zambia's driving licence classes to align with regional standards. Here's what that means for you."
        />
        <aside className="mt-8 rounded-2xl border border-black/25 bg-white p-5 shadow-[var(--card-shadow)]">
          <p className="font-semibold text-[var(--ink)]">Important context</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            Zambia recently adopted the Tripartite Transport and Transit Facilitation Programme
            (TTTFP) driving licence format, which realigns licence classes to align with COMESA,
            SADC, and EAC standards. This means some class definitions have changed. The information
            below reflects the current RTSA-aligned classes.
          </p>
        </aside>

        <div className="mt-8 overflow-x-auto rounded-2xl bg-white ring-1 ring-black/5">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[var(--ink)] text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Class</th>
                <th className="px-4 py-3 font-semibold">What You Can Drive</th>
                <th className="px-4 py-3 font-semibold">Vehicle Examples</th>
                <th className="px-4 py-3 font-semibold">Typical Use</th>
              </tr>
            </thead>
            <tbody>
              {CLASS_COMPARISON.map((row) => (
                <tr key={row.code} className="border-t border-black/5">
                  <td className="px-4 py-3 font-semibold text-[var(--brand)]">Class {row.code}</td>
                  <td className="px-4 py-3 text-[var(--ink)]/85">{row.what}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{row.examples}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-[var(--muted)]">
          Source: RTSA TTTFP Driving Licence Public Notice. Last reviewed: {lastReviewed}.
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          This table covers the most common classes for Roadstar students. Other classes (A, A1, BE,
          C1E, CE, D, D1) exist for motorcycles, articulated vehicles, and passenger buses. Contact
          us if you&apos;re unsure which class applies to you.
        </p>
      </section>

      <ClassSection code="B" courses={courses} />
      <ClassSection code="C1" courses={courses} reverse />
      <ClassSection code="C" courses={courses} />

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <SectionHeading
          eyebrow="Progression"
          title="How you progress from one class to the next."
          subtitle="You don't jump straight to Class C. Here's the natural progression."
        />
        <ol className="mt-10 space-y-0">
          {PROGRESSION_STEPS.map((step, i) => (
            <li key={step.title} className="relative pl-8">
              <span className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
                {i + 1}
              </span>
              {i < PROGRESSION_STEPS.length - 1 ? (
                <span className="absolute left-[9px] top-7 h-[calc(100%-0.5rem)] w-0.5 bg-[var(--ink)]/20" />
              ) : null}
              <div className="pb-8">
                <h3 className="font-semibold text-[var(--ink)]">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <aside className="rounded-2xl border border-[var(--brand)]/15 bg-[var(--mist)] p-5">
          <p className="font-semibold text-[var(--brand)]">
            Can I skip Class B and go straight to C1 or C?
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/85">
            No. You must hold a valid Class B licence before you can train for C1 or C. This is an
            RTSA requirement, and it makes sense — you need to master the basics before operating a
            larger, heavier vehicle.
          </p>
        </aside>
      </section>

      <section className="border-y border-[var(--brand)]/10 bg-[var(--mist)]">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <SectionHeading
            eyebrow="RTSA process"
            title="How to get your licence — step by step."
            subtitle="The process is the same regardless of which class you choose. Only the training and test content differ."
          />
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {RTSA_CLASS_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="rounded-2xl bg-white p-5 shadow-[var(--card-shadow)] ring-1 ring-black/5"
              >
                <p className="font-display text-3xl font-semibold text-[var(--muted)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-semibold text-[var(--ink)]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{step.body}</p>
              </li>
            ))}
          </ol>

          <aside className="mt-10 rounded-3xl bg-white p-6 shadow-[var(--card-shadow)] ring-1 ring-black/5 md:p-8">
            <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
              RTSA Fees (Paid Directly to RTSA)
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              These are government fees, not Roadstar fees. They are paid directly to RTSA. Medical
              examination fees are separate — see the full licensing guide.
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="py-2 font-semibold">Item</th>
                    <th className="py-2 font-semibold">Cost (ZMW)</th>
                  </tr>
                </thead>
                <tbody>
                  {statutory.map((item) => (
                    <tr key={item.id} className="border-b border-black/5">
                      <td className="py-2">{item.title}</td>
                      <td className="py-2 font-semibold text-[var(--brand)]">
                        {formatZmw(item.fee_amount)}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-3 font-semibold">Typical total</td>
                    <td className="py-3 font-display text-lg font-semibold text-[var(--brand)]">
                      {formatZmw(statutoryTotal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-[var(--muted)]">
              Source: RTSA fee schedule. Last reviewed: {lastReviewed}. These fees are set by RTSA
              and may change. Always confirm current fees with RTSA directly.
            </p>
            <div className="mt-4">
              <Button href="/licensing" variant="secondary" size="sm">
                Full RTSA cost guide
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
        <SectionHeading eyebrow="FAQs" title="Questions about licence classes" />
        <div className="mt-8 space-y-3">
          {LICENCE_FAQS.map((item) => (
            <details
              key={item.q}
              className="rounded-2xl bg-white p-4 shadow-[var(--card-shadow)] ring-1 ring-black/5"
            >
              <summary className="cursor-pointer font-semibold text-[var(--ink)]">{item.q}</summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 md:px-6">
        <div className="rounded-3xl bg-[var(--ink)] px-6 py-12 text-white md:px-10">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            Not sure which class you need?
          </h2>
          <p className="mt-3 max-w-2xl text-base text-white/85">
            Tell us what you want to drive, and we&apos;ll tell you which licence class you need. No
            jargon. No pressure.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton size="lg" />
            <Button href="tel:+260975072617" variant="secondary" size="lg">
              Call +260 975 072617
            </Button>
          </div>
          <p className="mt-6 text-sm text-white/70">
            Emmasdale: Plot No. 238, Vubu Road, Lusaka · Thornpark: ask us for directions
          </p>
        </div>
      </section>
    </div>
  );
}
