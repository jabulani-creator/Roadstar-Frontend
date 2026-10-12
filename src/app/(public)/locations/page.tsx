import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { business } from "@/lib/business";
import { branchService } from "@/lib/services/branchService";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Locations in Lusaka",
  description:
    "Roadstar Driving School locations in Lusaka — Emmasdale (Plot No. 238, Vubu Road) and Thornpark. Hours, map, and how to enrol.",
  alternates: { canonical: "/locations" },
};

export default async function LocationsPage() {
  const branches = await branchService.listPublic().catch(() => []);
  const thorn = branches.find(
    (b) => b.slug === "thornpark" || b.name.toLowerCase().includes("thornpark"),
  );
  const thornReady = Boolean(thorn?.address?.trim() && thorn?.map_url?.trim());

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <SectionHeading
        eyebrow="Locations"
        title="Where Roadstar trains"
        subtitle="Two Lusaka areas. Emmasdale is our main walk-in base. Choose a branch page for address, hours, and how to enrol."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <article className="rounded-xl bg-[var(--panel)] p-5 md:p-6">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">Emmasdale</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">{business.emmasdale.fullAddress}</p>
          <p className="mt-3 text-sm text-[var(--ink)]">
            Mon–Fri {business.openingHours.weekdays} · Sat {business.openingHours.saturday}
          </p>
          <p className="mt-1 text-sm font-semibold text-[var(--brand)]">{business.phoneDisplay}</p>
          <Link
            href="/locations/emmasdale"
            className="mt-4 inline-block text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
          >
            Emmasdale details →
          </Link>
        </article>

        <article className="rounded-xl bg-[var(--panel)] p-5 md:p-6">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">Thornpark</h2>
          {thornReady && thorn ? (
            <>
              <p className="mt-2 text-sm text-[var(--muted)]">{thorn.address}</p>
              {thorn.operating_hours ? (
                <p className="mt-3 text-sm text-[var(--ink)]">{thorn.operating_hours}</p>
              ) : null}
              <Link
                href="/locations/thornpark"
                className="mt-4 inline-block text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
              >
                Thornpark details →
              </Link>
            </>
          ) : (
            <>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Training available in Thornpark — ask us for the current meeting point when you
                enquire. Full address and map go live once confirmed.
              </p>
              <Link
                href="/locations/thornpark"
                className="mt-4 inline-block text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
              >
                Ask about Thornpark →
              </Link>
            </>
          )}
        </article>
      </div>

      <div className="mt-8">
        <WhatsAppButton />
      </div>
    </div>
  );
}
