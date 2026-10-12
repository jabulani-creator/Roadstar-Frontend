import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedPages, TIER_A_LINKS } from "@/components/seo/RelatedPages";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { absoluteUrl } from "@/lib/business";
import { CLASS_DETAILS } from "@/lib/licenceCopy";
import { faqPageJsonLd } from "@/lib/seo";
import { formatZmw } from "@/lib/utils";
import { buildLicenceClassWhatsAppUrl } from "@/lib/whatsapp";
import { courseService } from "@/lib/services/courseService";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const courses = await courseService.listPublic().catch(() => []);
  const has = courses.some((c) => c.licence_class === "C1" || c.licence_class === "C");
  if (!has) {
    return { title: "Class C1 & C", robots: { index: false, follow: false } };
  }
  return {
    title: "Class C1 & C Training in Lusaka",
    description:
      "Professional Class C1 and Class C driver training in Lusaka with Roadstar. Light and heavy goods vehicles. Transparent fees.",
    alternates: { canonical: "/licence-classes/class-c1-c" },
    openGraph: {
      title: "Class C1 & C Training in Lusaka | Roadstar Driving School",
      url: absoluteUrl("/licence-classes/class-c1-c"),
    },
  };
}

const faqs = [
  {
    q: "Do I need Class B before C1 or C?",
    a: "Yes. Professional C1 and C pathways typically require a valid Class B licence first, plus medical fitness and RTSA theory/practical for the higher class.",
  },
  {
    q: "Are professional course fees separate from RTSA?",
    a: "Yes. Roadstar tuition is separate from RTSA government fees. We show both clearly before you enrol.",
  },
];

export default async function ClassC1CPage() {
  const courses = (await courseService.listPublic().catch(() => [])).filter(
    (c) => c.licence_class === "C1" || c.licence_class === "C",
  );
  if (!courses.length) notFound();

  return (
    <div className="pb-20">
      <JsonLd data={faqPageJsonLd(faqs)} />

      <div className="border-b border-[var(--brand)]/10 bg-[var(--mist)]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Licence class · C1 & C
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            Class C1 & C training in Lusaka
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
            Professional light and heavy goods pathways with Roadstar. Confirm eligibility, package,
            and RTSA steps with our team before you enrol.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton href={buildLicenceClassWhatsAppUrl("Class C1 / C")} size="lg" />
            <Button href="/professional-fleet" size="lg">
              Professional & fleet
            </Button>
            <Button href="/courses-and-fees#professional" size="lg" variant="secondary">
              See fees
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-14 md:px-6 md:py-20">
        {(["C1", "C"] as const).map((code) => {
          const detail = CLASS_DETAILS[code];
          const matched = courses.filter((c) => c.licence_class === code);
          if (!matched.length) return null;
          return (
            <section key={code}>
              <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                {detail.title}
              </h2>
              <p className="mt-2 text-sm italic text-[var(--muted)]">{detail.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{detail.covers}</p>
              <ul className="mt-6 space-y-2">
                {matched.map((c) => (
                  <li
                    key={c.id}
                    className="flex flex-wrap justify-between gap-2 rounded-lg bg-[var(--panel)] px-4 py-3"
                  >
                    <Link href={`/courses/${c.slug}`} className="font-semibold hover:text-[var(--brand)]">
                      {c.name}
                    </Link>
                    <span className="text-sm font-semibold text-[var(--brand)]">
                      {c.show_price && c.price_amount ? formatZmw(c.price_amount) : "Enquire"}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <section>
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">FAQs</h2>
          <div className="mt-6 space-y-5">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-semibold text-[var(--ink)]">{faq.q}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <RelatedPages
          links={[
            TIER_A_LINKS.fees,
            TIER_A_LINKS.classB,
            TIER_A_LINKS.emmasdale,
            TIER_A_LINKS.contact,
          ]}
        />
      </div>
    </div>
  );
}
