import Link from "next/link";
import { AccentWord } from "@/components/ui/AccentWord";

const items = [
  {
    q: "How much is the full cost?",
    a: (
      <>
        Course fees range from K800 to K3,500. RTSA statutory fees are separate and paid directly
        to RTSA.{" "}
                <Link href="/courses-and-fees" className="font-semibold text-[var(--ink)] hover:underline">
          See full fee breakdown →
        </Link>
      </>
    ),
  },
  {
    q: "Are there any hidden fees?",
    a: "No. Every course page shows exactly what's included and what's not. RTSA fees are always shown separately.",
  },
  {
    q: "Can I pay in instalments?",
    a: "Yes. We offer a deposit + instalment plan. Contact us to discuss a plan that works for you.",
  },
  {
    q: "Do you accept mobile money?",
    a: "Yes. MTN, Airtel, and Zamtel. We also accept bank transfer and cash at our Emmasdale office.",
  },
];

export function HomeFaq() {
  return (
    <section className="bg-[var(--cream)] py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
          Questions people ask before they <AccentWord>message</AccentWord> us.
        </h2>

        <div className="mt-10 space-y-3">
          {items.map((item, i) => (
            <details
              key={item.q}
              open={i === 0}
              className="rounded-xl bg-white p-5 shadow-[var(--card-shadow)]"
            >
              <summary className="cursor-pointer list-none font-semibold text-[var(--ink)] marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.q}
                  <span className="text-lg text-[var(--muted)]" aria-hidden>
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] md:text-base">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <p className="mt-8 text-center">
          <Link
            href="/faqs"
            className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            See all FAQs →
          </Link>
        </p>
      </div>
    </section>
  );
}
