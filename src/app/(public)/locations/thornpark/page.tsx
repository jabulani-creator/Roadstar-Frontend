import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedPages, TIER_A_LINKS } from "@/components/seo/RelatedPages";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { absoluteUrl, business } from "@/lib/business";
import { drivingSchoolJsonLd } from "@/lib/seo";
import { buildLocationWhatsAppUrl } from "@/lib/whatsapp";
import { branchService } from "@/lib/services/branchService";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const branches = await branchService.listPublic().catch(() => []);
  const branch = branches.find(
    (b) => b.slug === "thornpark" || b.name.toLowerCase().includes("thornpark"),
  );
  const ready = Boolean(branch?.address?.trim() && branch?.map_url?.trim());

  if (!ready) {
    return {
      title: "Thornpark",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: "Driving School in Thornpark, Lusaka",
    description:
      "Roadstar Driving School in Thornpark, Lusaka. Class B training with patient instructors. Confirm directions and book via WhatsApp.",
    alternates: { canonical: "/locations/thornpark" },
    openGraph: {
      title: "Driving School in Thornpark, Lusaka | Roadstar Driving School",
      url: absoluteUrl("/locations/thornpark"),
    },
  };
}

export default async function ThornparkLocationPage() {
  const branches = await branchService.listPublic().catch(() => []);
  const branch = branches.find(
    (b) => b.slug === "thornpark" || b.name.toLowerCase().includes("thornpark"),
  );
  const ready = Boolean(branch?.address?.trim() && branch?.map_url?.trim());

  // Soft-unready: show a thin page that is noindex (via metadata), not a fake pin.
  // If branch row missing entirely, 404.
  if (!branch) notFound();

  const address = branch.address?.trim();
  const mapUrl = branch.map_url?.trim();

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <h1 className="font-display text-3xl font-semibold text-[var(--ink)]">
          Thornpark branch
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          Thornpark training is available — ask us for the current meeting point and hours when you
          enquire. Our main walk-in office is in Emmasdale.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <WhatsAppButton href={buildLocationWhatsAppUrl("Thornpark")} />
          <Button href="/locations/emmasdale">Emmasdale details</Button>
        </div>
      </div>
    );
  }

  const jsonLd = drivingSchoolJsonLd({
    path: "/locations/thornpark",
    name: "Roadstar Driving School — Thornpark",
    streetAddress: address,
    description: "Driving school training in Thornpark, Lusaka.",
  });

  return (
    <div className="pb-20">
      <JsonLd data={jsonLd} />
      <div className="border-b border-[var(--brand)]/10 bg-[var(--mist)]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Locations · Thornpark
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            Driving school in Thornpark, Lusaka
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
            Train with Roadstar in Thornpark. Confirm package and schedule with our team — tuition
            and RTSA fees are always shown separately.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton href={buildLocationWhatsAppUrl("Thornpark")} size="lg" />
            <Button href="/contact#register" size="lg">
              Register online
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
            {branch.landmark ? (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                  Landmark
                </dt>
                <dd className="mt-1 text-[var(--ink)]">{branch.landmark}</dd>
              </div>
            ) : null}
            {branch.operating_hours ? (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                  Hours
                </dt>
                <dd className="mt-1 text-[var(--ink)]">{branch.operating_hours}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                Phone
              </dt>
              <dd className="mt-1 font-semibold text-[var(--brand)]">
                {branch.primary_phone || business.phoneDisplay}
              </dd>
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

        <RelatedPages
          links={[
            TIER_A_LINKS.emmasdale,
            TIER_A_LINKS.fees,
            TIER_A_LINKS.howItWorks,
            TIER_A_LINKS.contact,
          ]}
        />
      </div>
    </div>
  );
}
