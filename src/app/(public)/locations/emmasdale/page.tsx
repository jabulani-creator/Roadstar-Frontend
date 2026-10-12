import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedPages, TIER_A_LINKS } from "@/components/seo/RelatedPages";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { absoluteUrl, business } from "@/lib/business";
import { drivingSchoolJsonLd } from "@/lib/seo";
import { buildEmmasdaleWhatsAppUrl } from "@/lib/whatsapp";
import { branchService } from "@/lib/services/branchService";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Driving School in Emmasdale, Lusaka",
  description:
    "Roadstar Driving School in Emmasdale, Lusaka — Plot No. 238, Vubu Road. Class B, C1 & C training. Patient instructors. Transparent fees. Book your first lesson.",
  alternates: { canonical: "/locations/emmasdale" },
  openGraph: {
    title: "Driving School in Emmasdale, Lusaka | Roadstar Driving School",
    description:
      "Train at Roadstar Emmasdale — Plot No. 238, Vubu Road. Class B manual & automatic, clear fees, WhatsApp enrolment.",
    url: absoluteUrl("/locations/emmasdale"),
  },
};

export default async function EmmasdaleLocationPage() {
  const branches = await branchService.listPublic().catch(() => []);
  const branch =
    branches.find(
      (b) => b.slug === "emmasdale" || b.name.toLowerCase().includes("emmasdale"),
    ) ?? null;

  const address = branch?.address?.trim() || business.emmasdale.fullAddress;
  const hours =
    branch?.operating_hours?.trim() ||
    `Mon–Fri ${business.openingHours.weekdays} · Sat ${business.openingHours.saturday} · Sun ${business.openingHours.sunday}`;
  const phone = branch?.primary_phone?.trim() || business.phoneDisplay;
  const landmark = branch?.landmark?.trim();
  const mapUrl = branch?.map_url?.trim();
  const classesNote =
    branch?.classes_available_note?.trim() ||
    "Class B (manual and automatic), Class C1, and Class C training available — confirm package on Courses & fees.";

  const jsonLd = drivingSchoolJsonLd({
    path: "/locations/emmasdale",
    name: "Roadstar Driving School — Emmasdale",
    streetAddress: business.emmasdale.streetAddress,
    description:
      "Driving school in Emmasdale, Lusaka. Patient, certified instructors. Transparent tuition separate from RTSA fees.",
  });

  return (
    <div className="pb-20">
      <JsonLd data={jsonLd} />

      <div className="border-b border-[var(--brand)]/10 bg-[var(--mist)]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Locations · Emmasdale
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            Driving school in Emmasdale, Lusaka
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
            Roadstar&apos;s main training base on Vubu Road. Walk in during office hours, or WhatsApp
            us to choose a package and start lessons with patient, certified instructors.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton href={buildEmmasdaleWhatsAppUrl()} size="lg" />
            <Button href="/contact#register" size="lg">
              Register online
            </Button>
            <Button href="/courses-and-fees" size="lg" variant="secondary">
              See courses & fees
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <section className="rounded-xl bg-[var(--panel)] px-5 py-6 md:px-7 md:py-8">
          <h2 className="font-display text-xl font-semibold text-[var(--ink)]">Branch details</h2>
          <dl className="mt-5 space-y-4 text-sm md:text-base">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                Address
              </dt>
              <dd className="mt-1 font-medium text-[var(--ink)]">{address}</dd>
            </div>
            {landmark ? (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                  Landmark
                </dt>
                <dd className="mt-1 text-[var(--ink)]">{landmark}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                Hours
              </dt>
              <dd className="mt-1 text-[var(--ink)]">{hours}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                Phone
              </dt>
              <dd className="mt-1">
                <a
                  href={`tel:${business.phoneTel}`}
                  className="font-semibold text-[var(--brand)] hover:underline"
                >
                  {phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                Classes available
              </dt>
              <dd className="mt-1 text-[var(--ink)]">{classesNote}</dd>
            </div>
          </dl>
          {mapUrl ? (
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
            >
              Open map →
            </a>
          ) : null}
        </section>

        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold text-[var(--ink)] md:text-2xl">
            Why train at Emmasdale
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--muted)] md:text-base">
            <li>Primary enrolment line and walk-in office for Roadstar in Lusaka.</li>
            <li>Class B packages for beginners through refresher — manual and automatic.</li>
            <li>Tuition shown separately from RTSA statutory fees — no hidden “all-in” claims.</li>
            <li>
              Next step:{" "}
              <Link href="/find-your-course" className="font-semibold text-[var(--brand)] hover:underline">
                Find Your Course
              </Link>{" "}
              or WhatsApp us from this page.
            </li>
          </ul>
        </section>

        <RelatedPages
          links={[
            TIER_A_LINKS.fees,
            TIER_A_LINKS.classB,
            TIER_A_LINKS.howItWorks,
            TIER_A_LINKS.contact,
          ]}
        />
      </div>
    </div>
  );
}
