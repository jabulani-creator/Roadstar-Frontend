import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedPages, TIER_A_LINKS } from "@/components/seo/RelatedPages";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { absoluteUrl } from "@/lib/business";
import { CLASS_DETAILS } from "@/lib/licenceCopy";
import { courseOfferJsonLd, faqPageJsonLd, lowestPricedCourse } from "@/lib/seo";
import { formatZmw } from "@/lib/utils";
import { buildClassBWhatsAppUrl } from "@/lib/whatsapp";
import { courseService } from "@/lib/services/courseService";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Class B Driving School in Lusaka",
  description:
    "Class B driving training in Lusaka with Roadstar. Manual and automatic. Transparent tuition, RTSA fees shown separately. Emmasdale & Thornpark.",
  alternates: { canonical: "/licence-classes/class-b" },
  openGraph: {
    title: "Class B Driving School in Lusaka | Roadstar Driving School",
    url: absoluteUrl("/licence-classes/class-b"),
  },
};

const faqs = [
  {
    q: "What vehicles does a Class B licence cover?",
    a: "Motor vehicles with GVM of 3,500 kg or less, with a trailer under 750 kg — typical family cars, SUVs, and small vans. Manual and automatic.",
  },
  {
    q: "How old do I need to be for Class B?",
    a: "Minimum age is 18. You'll also need a valid NRC or passport and a medical certificate before RTSA testing.",
  },
  {
    q: "Do Roadstar Class B fees include RTSA costs?",
    a: "No. Our tuition covers practical instruction with Roadstar. RTSA provisional, theory/practical test, and licence card fees are paid separately to RTSA.",
  },
];

export default async function ClassBPage() {
  const detail = CLASS_DETAILS.B;
  const courses = (await courseService.listPublic().catch(() => [])).filter(
    (c) => c.licence_class === "B",
  );
  const starter = lowestPricedCourse(courses);

  const schemas: Record<string, unknown>[] = [faqPageJsonLd(faqs)];
  if (starter) schemas.push(courseOfferJsonLd(starter));

  return (
    <div className="pb-20">
      <JsonLd data={schemas} />

      <div className="border-b border-[var(--brand)]/10 bg-[var(--mist)]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Licence class · B
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            Class B driving school in Lusaka
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
            {detail.tagline} Train with patient instructors at Roadstar —{" "}
            {starter?.show_price && starter.price_amount
              ? `Class B packages from ${formatZmw(starter.price_amount)} tuition`
              : "clear Class B packages"}
            . RTSA statutory fees are always listed separately.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton href={buildClassBWhatsAppUrl()} size="lg" />
            <Button href="/courses-and-fees" size="lg">
              Compare Class B fees
            </Button>
            <Button href="/find-your-course" size="lg" variant="secondary">
              Find Your Course
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <section>
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
            What Class B covers
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] md:text-base">
            {detail.covers}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--ink)]/85 md:text-base">
            {detail.whoFor}
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {detail.vehicles.map((v) => (
              <li key={v} className="text-sm text-[var(--ink)]">
                · {v}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
            How to qualify
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--muted)] md:text-base">
            {detail.qualify.map((q) => (
              <li key={q}>· {q}</li>
            ))}
          </ul>
        </section>

        {courses.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
              Class B packages at Roadstar
            </h2>
            <ul className="mt-6 space-y-3">
              {courses.map((c) => (
                <li
                  key={c.id}
                  className="flex flex-wrap items-baseline justify-between gap-2 rounded-lg bg-[var(--panel)] px-4 py-3"
                >
                  <Link
                    href={`/courses/${c.slug}`}
                    className="font-semibold text-[var(--ink)] hover:text-[var(--brand)]"
                  >
                    {c.name}
                  </Link>
                  <span className="text-sm font-semibold text-[var(--brand)]">
                    {c.show_price && c.price_amount
                      ? formatZmw(c.price_amount)
                      : "Enquire"}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
            Frequently asked questions
          </h2>
          <div className="mt-6 space-y-5">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-semibold text-[var(--ink)]">{faq.q}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <RelatedPages
          links={[
            TIER_A_LINKS.fees,
            TIER_A_LINKS.emmasdale,
            TIER_A_LINKS.howItWorks,
            TIER_A_LINKS.contact,
          ]}
        />
      </div>
    </div>
  );
}
