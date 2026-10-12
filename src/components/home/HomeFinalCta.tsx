import { AccentWord } from "@/components/ui/AccentWord";
import { Button } from "@/components/ui/Button";
import { TelLink } from "@/components/ui/TelLink";
import { business } from "@/lib/business";

/** Soft close — directions when available; never “pin pending”. */
export function HomeFinalCta({
  emmasdaleAddress,
  emmasdaleMapUrl,
  thornparkNote,
}: {
  emmasdaleAddress?: string;
  emmasdaleMapUrl?: string;
  thornparkNote?: string;
}) {
  const mapUrl = emmasdaleMapUrl?.trim();
  const directionsHref = mapUrl || "/locations/emmasdale";
  const directionsExternal = Boolean(mapUrl);

  return (
    <section className="border-t border-black/8 bg-[var(--cream)] py-14 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--ink)] md:text-3xl">
          Come see us in <AccentWord>Lusaka</AccentWord>
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--muted)] md:text-lg">
          Walk in during office hours, or call if you&apos;d rather talk first. We&apos;ll help you
          choose the right path — no pressure.
        </p>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-[var(--ink)]">
          <p>
            <span className="font-semibold">Emmasdale</span>
            <br />
            <span className="text-[var(--muted)]">
              {emmasdaleAddress ?? business.emmasdale.fullAddress}
            </span>
          </p>
          <p>
            <span className="font-semibold">Thornpark</span>
            <br />
            <span className="text-[var(--muted)]">
              {thornparkNote ?? "Ask us for directions when you enquire"}
            </span>
          </p>
          <p>
            <TelLink
              context="home_final"
              className="font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
            />
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={directionsHref} external={directionsExternal} size="lg">
            {mapUrl ? "Get directions" : "Emmasdale details"}
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Contact & register
          </Button>
        </div>
      </div>
    </section>
  );
}
