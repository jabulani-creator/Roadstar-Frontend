import Link from "next/link";
import { AccentWord } from "@/components/ui/AccentWord";

const steps = [
  {
    title: "Enquire",
    body: "Tell us your experience. We'll recommend the right course.",
    icon: "enquire" as const,
  },
  {
    title: "Register",
    body: "Create your account. Pay for your package. Get instant access to lesson credits.",
    icon: "pay" as const,
  },
  {
    title: "Train",
    body: "Book lessons at your convenience. Train with patient instructors.",
    icon: "train" as const,
  },
  {
    title: "Ready",
    body: "We prepare you. You book and pass your test with RTSA.",
    icon: "ready" as const,
  },
];

function StepIcon({ name }: { name: (typeof steps)[number]["icon"] }) {
  const common = "h-6 w-6 text-[var(--ink)]";

  if (name === "enquire") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden>
        <path
          d="M5 7.5A2.5 2.5 0 017.5 5h9A2.5 2.5 0 0119 7.5v6a2.5 2.5 0 01-2.5 2.5H10l-3.5 3v-3H7.5A2.5 2.5 0 015 13.5v-6z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "pay") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden>
        <rect
          x="3.5"
          y="6"
          width="17"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M7 14.5h3"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "train") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden>
        <circle cx="12" cy="12" r="7.25" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="12" cy="12" r="2.25" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M12 4.75v2.5M12 16.75v2.5M4.75 12h2.5M16.75 12h2.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden>
      <circle cx="12" cy="12" r="7.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M8.5 12.2l2.3 2.3 4.7-4.8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeJourney() {
  return (
    <section className="bg-[var(--cream)] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            Your journey from first enquiry to{" "}
            <AccentWord>licence readiness</AccentWord>.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
            We&apos;ll walk you through every step. And we&apos;ll be honest about what we do — and
            what RTSA does.
          </p>
        </div>

        {/* Desktop: horizontal timeline · Mobile: vertical checklist */}
        <ol className="relative mt-14 md:mt-16">
          {/* Desktop connecting line */}
          <div
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 bg-[var(--brand)]/20 md:block"
            aria-hidden
          />

          {/* Mobile connecting line */}
          <div
            className="pointer-events-none absolute bottom-4 left-7 top-4 w-0.5 bg-[var(--brand)]/20 md:hidden"
            aria-hidden
          />

          <div className="grid gap-10 md:grid-cols-4 md:gap-6">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="relative z-10 flex gap-5 md:flex-col md:items-center md:text-center"
              >
                <div className="relative shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--ink)] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                    <StepIcon name={step.icon} />
                  </div>
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>

                <div className="min-w-0 flex-1 pt-1 md:pt-0">
                  <h3 className="text-lg font-semibold tracking-tight text-[var(--ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[14rem] text-base leading-relaxed text-[var(--muted)] md:mx-auto">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </div>
        </ol>

        {/* Soft brand callout — reassuring note, not a disclaimer slab */}
        <aside className="mt-14 rounded-xl border-l-4 border-[var(--brand)] bg-[var(--teal-soft)] px-5 py-6 md:mt-16 md:px-7 md:py-7">
          <div className="flex gap-3">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[var(--brand)] text-xs font-bold text-[var(--brand)]"
              aria-hidden
            >
              i
            </span>
            <div>
              <p className="font-semibold text-[var(--ink)]">A note on RTSA</p>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
                Roadstar provides training. RTSA administers the test and issues the licence.
                We&apos;ll guide you through the process, but we cannot and do not guarantee a
                pass. What we guarantee is that you&apos;ll be well-prepared.
              </p>
              <Link
                href="/how-it-works"
                className="mt-4 inline-block text-sm font-semibold text-[var(--ink)] underline-offset-4 hover:underline"
              >
                Learn more about the RTSA process →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
