import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedPages, TIER_A_LINKS } from "@/components/seo/RelatedPages";
import { AccentWord } from "@/components/ui/AccentWord";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { absoluteUrl, business } from "@/lib/business";
import {
  BIG_PICTURE_STEPS,
  DOCUMENT_CHECKLIST,
  ENROLMENT_FAQS,
  REGISTRATION_STEPS,
  RTSA_JOURNEY,
} from "@/lib/enrolmentCopy";
import { pathwayFees, pathwayTotal } from "@/lib/cost";
import { faqPageJsonLd } from "@/lib/seo";
import { formatZmw } from "@/lib/utils";
import { contentService } from "@/lib/services/contentService";
import type { RTSAItem } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "How to Get Your Driving Licence in Zambia",
  description:
    "Step-by-step guide to getting your driving licence in Zambia with Roadstar in Lusaka — documents, RTSA provisional, theory, practical training, and test day.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How to Get Your Driving Licence in Zambia | Roadstar Driving School",
    url: absoluteUrl("/how-it-works"),
  },
};

const shell = "mx-auto w-full max-w-[90rem] px-4 md:px-12 lg:px-16 xl:px-20";

function feeForSlug(items: RTSAItem[], slug: string | null | "included") {
  if (slug === "included") return "Included in your course fee";
  if (!slug) return "Confirm current fee with RTSA";
  const item = items.find((i) => i.slug === slug);
  if (!item?.fee_amount) return "Confirm current fee with RTSA";
  return `${formatZmw(item.fee_amount)} (paid directly to ${slug.includes("medical") ? "clinic" : "RTSA"})`;
}

export default async function HowItWorksPage() {
  const rtsa = await contentService.rtsa().catch(() => []);
  const pathway = pathwayFees(rtsa);
  const total = pathwayTotal(rtsa);
  const medical = rtsa.find((i) => i.slug === "demo-medical-certificate");
  const lastReviewed =
    pathway.find((p) => p.last_reviewed_at)?.last_reviewed_at ?? "pending confirmation";

  const faqSchema = faqPageJsonLd(
    ENROLMENT_FAQS.slice(0, 6).map((f) => ({ q: f.q, a: f.a })),
  );

  return (
    <div className="bg-[var(--surface)]">
      <JsonLd data={faqSchema} />

      {/* Intro */}
      <section className="bg-[var(--cream)] py-16 md:py-24">
        <div className={`${shell} mx-auto max-w-3xl text-center`}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            How it works
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl lg:text-[2.75rem]">
            How to get your driving licence in <AccentWord>Zambia</AccentWord>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
            Plain-language steps from first enquiry to RTSA test readiness — Roadstar guides your
            training; RTSA handles official tests and licensing.
          </p>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--brand)] md:text-xs">
            Clear steps · Document checklist · RTSA guidance · No hidden costs
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact#register" size="lg">
              Start registration
            </Button>
            <WhatsAppButton size="lg" />
          </div>
        </div>
      </section>

      {/* Big picture — journey style */}
      <section className="bg-[var(--surface)] py-16 md:py-24">
        <div className={shell}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
              Your journey to licence <AccentWord>readiness</AccentWord>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
              Four steps from enquiry to RTSA. Detail for each stage is below.
            </p>
          </div>

          <ol className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div
              className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 bg-[var(--brand)]/20 lg:block"
              aria-hidden
            />
            {BIG_PICTURE_STEPS.map((step, i) => (
              <li key={step.title} className="relative flex flex-col text-center lg:text-left">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--brand)] bg-[var(--cream)] font-display text-lg font-semibold text-[var(--brand)] lg:mx-0">
                  {String(i + 1).padStart(2, "0")}
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] text-[11px] font-bold text-white lg:hidden">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-[var(--ink)]">
                  {step.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">{step.body}</p>
                <Link
                  href={step.href}
                  className="mt-4 text-sm font-semibold text-[var(--brand)] hover:underline"
                >
                  {step.cta} →
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Documents */}
      <section className="bg-[var(--cream)] py-16 md:py-24">
        <div className={shell}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
              What you need before you <AccentWord>register</AccentWord>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
              Have these ready and registration takes about 10 minutes.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-lg bg-[var(--panel)]">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-black/10 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                  <th className="px-5 py-3.5">Item</th>
                  <th className="px-5 py-3.5">Details</th>
                  <th className="px-5 py-3.5">Required?</th>
                </tr>
              </thead>
              <tbody>
                {DOCUMENT_CHECKLIST.map((row) => (
                  <tr key={row.item} className="border-b border-black/10 last:border-b-0">
                    <td className="px-5 py-3.5 font-semibold text-[var(--ink)]">{row.item}</td>
                    <td className="px-5 py-3.5 text-[var(--muted)]">{row.details}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      {row.required ? (
                        <span className="font-semibold text-[var(--brand)]">Yes</span>
                      ) : (
                        <span className="text-[var(--muted)]">Optional</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="mx-auto mt-8 max-w-4xl rounded-lg border-l-4 border-[var(--brand)] bg-[var(--teal-soft)] px-5 py-6">
            <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
              Don&apos;t have everything yet?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              That&apos;s okay. Start registration and submit documents later. We&apos;ll guide you
              through what&apos;s needed at each step.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/contact" variant="primary">
                Start registration
              </Button>
              <WhatsAppButton />
            </div>
          </aside>
        </div>
      </section>

      {/* Registration steps */}
      <section className="bg-[var(--surface)] py-16 md:py-24">
        <div className={shell}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
              What happens when you <AccentWord>register</AccentWord>
            </h2>
          </div>

          <ol className="mx-auto mt-12 max-w-3xl space-y-4">
            {REGISTRATION_STEPS.map((step, i) => (
              <li key={step.title} className="overflow-hidden rounded-lg bg-[var(--panel)]">
                <div className="flex flex-wrap items-baseline gap-3 border-b border-black/10 px-5 py-4 md:px-6">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-[var(--ink)] md:text-xl">
                    {step.title}
                  </h3>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">
                    {step.time}
                  </span>
                </div>
                <div className="grid gap-0 md:grid-cols-2">
                  <div className="border-b border-black/10 px-5 py-4 md:border-b-0 md:border-r md:px-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                      What you do
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/85">{step.do}</p>
                  </div>
                  <div className="px-5 py-4 md:px-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                      What happens next
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{step.next}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <aside className="mx-auto mt-10 max-w-3xl rounded-lg border-l-4 border-[var(--accent)] bg-[var(--teal-soft)] px-5 py-6">
            <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
              Registration complete
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Once you&apos;ve paid and booked your first lesson, you&apos;re a Roadstar student.
              Welcome.
            </p>
          </aside>
        </div>
      </section>

      {/* RTSA */}
      <section className="bg-[var(--cream)] py-16 md:py-24">
        <div className={shell}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
              After registration: the <AccentWord>RTSA</AccentWord> process
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
              Roadstar handles your training. RTSA handles your licence.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-[var(--panel)] px-5 py-6">
              <h3 className="font-display text-lg font-semibold text-[var(--brand)]">
                Roadstar does
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-[var(--ink)]/85">
                <li>· Teaches you to drive</li>
                <li>· Provides vehicle and instructor</li>
                <li>· Prepares you for the test</li>
                <li>· Guides you through the process</li>
              </ul>
            </div>
            <div className="rounded-lg bg-[var(--panel)] px-5 py-6">
              <h3 className="font-display text-lg font-semibold text-[var(--ink)]">RTSA does</h3>
              <ul className="mt-3 space-y-2 text-sm text-[var(--ink)]/85">
                <li>· Registers you as a learner</li>
                <li>· Administers the theory test</li>
                <li>· Administers the practical test</li>
                <li>· Issues the licence</li>
              </ul>
            </div>
          </div>
          <p className="mx-auto mt-4 max-w-4xl text-center text-sm text-[var(--muted)]">
            We help every step of the way. The licence is RTSA&apos;s decision, not ours.
          </p>

          <h3 className="mx-auto mt-14 max-w-3xl text-center font-display text-2xl font-semibold text-[var(--ink)]">
            The RTSA journey
          </h3>
          <ol className="mx-auto mt-8 max-w-3xl space-y-4">
            {RTSA_JOURNEY.map((step, i) => (
              <li key={step.title} className="overflow-hidden rounded-lg bg-[var(--panel)]">
                <div className="flex items-baseline gap-3 border-b border-black/10 px-5 py-4 md:px-6">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <h4 className="font-display text-lg font-semibold text-[var(--ink)] md:text-xl">
                    {step.title}
                  </h4>
                </div>
                <p className="border-b border-black/10 px-5 py-4 text-sm leading-relaxed text-[var(--ink)]/85 md:px-6">
                  {step.happens}
                </p>
                <div className="grid md:grid-cols-2">
                  <div className="border-b border-black/10 px-5 py-4 md:border-b-0 md:border-r md:px-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                      What you need
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-[var(--muted)]">
                      {step.need.map((n) => (
                        <li key={n}>· {n}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-5 py-4 md:px-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                      Roadstar&apos;s role
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{step.roadstar}</p>
                    <p className="mt-3 text-sm font-semibold text-[var(--brand)]">
                      {feeForSlug(rtsa, step.feeSlug)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-lg bg-[var(--panel)]">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-black/10 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                  <th className="px-5 py-3.5">Step</th>
                  <th className="px-5 py-3.5">Fee</th>
                  <th className="px-5 py-3.5">Paid to</th>
                </tr>
              </thead>
              <tbody>
                {pathway.map((item) => (
                  <tr key={item.id} className="border-b border-black/10 last:border-b-0">
                    <td className="px-5 py-3.5 text-[var(--ink)]">{item.title}</td>
                    <td className="px-5 py-3.5 font-semibold text-[var(--brand)]">
                      {formatZmw(item.fee_amount)}
                    </td>
                    <td className="px-5 py-3.5 text-[var(--muted)]">
                      {item.slug.includes("medical") ? "Clinic" : "RTSA"}
                    </td>
                  </tr>
                ))}
                <tr className="bg-[var(--teal-soft)]">
                  <td className="px-5 py-4 font-semibold text-[var(--ink)]">Typical total</td>
                  <td className="px-5 py-4 font-display text-lg font-semibold text-[var(--brand)]">
                    {formatZmw(total)}
                  </td>
                  <td className="px-5 py-4 text-[var(--muted)]">(varies)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-4 max-w-3xl text-xs text-[var(--muted)]">
            Source: RTSA / Roadstar draft pathway. Last reviewed: {lastReviewed}. Confirm current
            fees with RTSA directly.
            {medical?.fee_amount ? ` Medical figure shown: ${formatZmw(medical.fee_amount)}.` : ""}
          </p>
          <div className="mt-6 flex justify-center">
            <Button href="/licensing" variant="secondary">
              Full RTSA cost guide
            </Button>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-[var(--surface)] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            Questions about <AccentWord>enrolment</AccentWord>
          </h2>
          <div className="mt-10 space-y-3">
            {ENROLMENT_FAQS.map((item) => (
              <details key={item.q} className="rounded-lg bg-[var(--panel)] px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-[var(--ink)] marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {item.q}
                    <span className="text-lg text-[var(--muted)]" aria-hidden>
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={`${shell} bg-[var(--cream)] py-16 md:py-20`}>
        <RelatedPages
          links={[
            TIER_A_LINKS.fees,
            TIER_A_LINKS.emmasdale,
            TIER_A_LINKS.contact,
            TIER_A_LINKS.faqs,
          ]}
        />
      </section>

      {/* Soft close */}
      <section className="border-t border-black/8 bg-[var(--cream)] py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--ink)] md:text-3xl">
            Need help with <AccentWord>enrolment</AccentWord>?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--muted)] md:text-lg">
            We&apos;re here to answer your questions. No question is too small.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppButton size="lg" />
            <Button href={`tel:${business.phoneTel}`} size="lg" variant="secondary">
              Call {business.phoneDisplay}
            </Button>
          </div>
          <p className="mt-8 text-sm text-[var(--muted)]">
            {business.emmasdale.fullAddress}
            <br />
            Thornpark: ask us for directions · Office hours confirmed when you enquire
          </p>
        </div>
      </section>
    </div>
  );
}
