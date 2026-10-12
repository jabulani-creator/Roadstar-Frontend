import { AccentWord } from "@/components/ui/AccentWord";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/** Big mid-page invitation to the standalone Find Your Course tool. */
export function HomeFindCourseCta() {
  return (
    <section className="bg-[var(--surface)] px-4 py-10 md:px-6 md:py-12">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.5rem] bg-[var(--cream)] px-6 py-12 text-center md:px-12 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          Not sure yet?
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl lg:text-[2.75rem]">
          Find your course in <AccentWord>30 seconds</AccentWord>.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
          Answer a few simple questions about your experience and goals. We&apos;ll recommend the
          right Roadstar package — no pressure, no upselling.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/find-your-course" size="lg" variant="primary">
            Find Your Course
          </Button>
          <WhatsAppButton size="lg" />
        </div>
      </div>
    </section>
  );
}
