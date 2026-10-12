import type { Testimonial } from "@/lib/types";
import { AccentWord } from "@/components/ui/AccentWord";

/** Approved + consent-backed quotes only. Omit entirely when empty. */
export function HomeTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;

  return (
    <section className="border-t border-black/8 bg-[var(--surface)] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            What learners say after they <AccentWord>train</AccentWord> with us
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
            Real quotes from people who consented to share their experience.
          </p>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li
              key={t.id}
              className="flex flex-col rounded-xl bg-[var(--panel)] px-5 py-6 shadow-[var(--card-shadow)]"
            >
              <blockquote className="flex-1 text-base leading-relaxed text-[var(--ink)]">
                “{t.quote}”
              </blockquote>
              <p className="mt-5 text-sm font-semibold text-[var(--ink)]">{t.author_name}</p>
              {t.author_role ? (
                <p className="mt-1 text-sm text-[var(--muted)]">{t.author_role}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
