import type { Metadata } from "next";
import { FleetCarousel } from "@/components/fleet/FleetCarousel";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { fleetService } from "@/lib/services/fleetService";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Training Fleet | Roadstar Driving School Zambia",
  description:
    "See every Roadstar training vehicle available for lessons in Lusaka — licence class, transmission, type, and branch.",
};

export default async function FleetPage() {
  const vehicles = await fleetService.vehiclesPublic().catch(() => []);

  return (
    <div className="bg-[var(--cream)] pb-20">
      <div className="mx-auto max-w-6xl px-4 pt-12 md:px-6 md:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Training fleet
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-5xl">
            Vehicles we train in
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
            Every vehicle below is on Roadstar&apos;s public fleet. Check licence class,
            transmission, and branch — then book the one that fits you.
          </p>
        </div>
      </div>

      <FleetCarousel
        vehicles={vehicles}
        variant="page"
        heading={`${vehicles.length} vehicle${vehicles.length === 1 ? "" : "s"} ready for lessons`}
        subheading="Swipe or use the arrows to browse. On phone, the fleet advances automatically so you can review each car."
      />

      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <aside className="rounded-2xl bg-white px-6 py-8 shadow-[var(--card-shadow)]">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
            Prefer a specific car or transmission?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Tell us when you register or WhatsApp. Reception confirms what&apos;s free for your
            lesson time.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/contact#register" variant="primary">
              Register to book
            </Button>
            <WhatsAppButton />
          </div>
        </aside>
      </div>
    </div>
  );
}
