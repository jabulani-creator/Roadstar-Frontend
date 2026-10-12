import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { stripDemoPrefix } from "@/lib/utils";
import { contentService } from "@/lib/services/contentService";
import type { FAQ } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Roadstar Driving School Zambia",
  description:
    "Answers to common questions about driving courses, fees, RTSA process, lessons, scheduling, and payments at Roadstar Driving School in Lusaka.",
};

const CATEGORY_ORDER = [
  { key: "enrolment", title: "Getting started" },
  { key: "courses", title: "Fees & payment" },
  { key: "lessons", title: "Lessons & scheduling" },
  { key: "rtsa", title: "RTSA & testing" },
  { key: "general", title: "Locations, trust & contact" },
];

function groupFaqs(faqs: FAQ[]) {
  return CATEGORY_ORDER.map((cat) => ({
    ...cat,
    items: faqs
      .filter((f) => f.category === cat.key)
      .sort((a, b) => a.display_order - b.display_order),
  })).filter((g) => g.items.length);
}

export default async function FaqsPage() {
  const faqs = await contentService.faqs().catch(() => []);
  const groups = groupFaqs(faqs);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <SectionHeading
        eyebrow="FAQs"
        title="Questions people ask before they call."
        subtitle="We've answered the most common questions below. If yours isn't here, WhatsApp us — we're happy to help."
      />

      <div className="mt-12 space-y-10">
        {groups.map((group) => (
          <section key={group.key}>
            <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
              {group.title}
            </h2>
            <div className="mt-4 space-y-3">
              {group.items.map((f) => (
                <details
                  key={f.id}
                  className="rounded-2xl bg-white p-4 shadow-[var(--card-shadow)] ring-1 ring-black/5"
                >
                  <summary className="cursor-pointer font-semibold text-[var(--ink)]">
                    {stripDemoPrefix(f.question)}
                  </summary>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[var(--muted)]">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-14 rounded-3xl bg-[var(--ink)] px-6 py-10 text-white">
        <h2 className="font-display text-2xl font-semibold">Didn’t find your answer?</h2>
        <p className="mt-2 text-white/80">
          WhatsApp us and we’ll respond as quickly as we can. No question is too small.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <WhatsAppButton size="lg" />
        </div>
        <p className="mt-4 text-sm text-white/70">Or call +260 975 072617.</p>
      </section>
    </div>
  );
}
