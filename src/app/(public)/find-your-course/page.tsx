import type { Metadata } from "next";
import { FindYourCourseForm } from "@/components/courses/FindYourCourseForm";
import { RelatedPages, TIER_A_LINKS } from "@/components/seo/RelatedPages";
import { AccentWord } from "@/components/ui/AccentWord";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { absoluteUrl } from "@/lib/business";
import { courseService } from "@/lib/services/courseService";
import { buildStandardWhatsAppUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Find Your Course | Lusaka",
  description:
    "Answer a few questions and get a Roadstar course recommendation for Class B, C1, or C in Lusaka — no pressure, no automatic booking.",
  alternates: { canonical: "/find-your-course" },
  openGraph: {
    title: "Find Your Course | Roadstar Driving School",
    url: absoluteUrl("/find-your-course"),
  },
};

const shell = "mx-auto w-full max-w-[90rem] px-4 md:px-12 lg:px-16 xl:px-20";

export default async function FindYourCoursePage() {
  const courses = await courseService.listPublic().catch(() => []);

  return (
    <div className="bg-[var(--surface)]">
      {/* Intro */}
      <section className="bg-[var(--cream)] py-16 md:py-24">
        <div className={`${shell} mx-auto max-w-3xl text-center`}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Find your course
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl lg:text-[2.75rem]">
            Find the right <AccentWord>starting</AccentWord> point
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
            No pressure. No upselling. Answer a few questions and we&apos;ll recommend a package —
            or chat with an advisor first.
          </p>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--brand)] md:text-xs">
            Real packages · Honest fit · Advisor available
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="#selector" size="lg">
              Start the quiz
            </Button>
            <WhatsAppButton
              href={buildStandardWhatsAppUrl(["I'd like help choosing the right course."])}
              size="lg"
            />
          </div>
        </div>
      </section>

      {/* Selector */}
      <section id="selector" className="scroll-mt-28 bg-[var(--surface)] py-16 md:py-24">
        <div className={shell}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
              A few questions, then a <AccentWord>recommendation</AccentWord>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
              This is guidance — not a booking. You can always WhatsApp us before you decide.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-5xl">
            <FindYourCourseForm courses={courses} />
          </div>
        </div>
      </section>

      <section className={`${shell} bg-[var(--cream)] py-16 md:py-20`}>
        <RelatedPages
          links={[
            TIER_A_LINKS.fees,
            TIER_A_LINKS.classB,
            TIER_A_LINKS.howItWorks,
            TIER_A_LINKS.contact,
          ]}
        />
      </section>

      {/* Soft close */}
      <section className="border-t border-black/8 bg-[var(--cream)] py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--ink)] md:text-3xl">
            Prefer to talk it <AccentWord>through</AccentWord>?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--muted)] md:text-lg">
            Tell us your experience and goals — we&apos;ll recommend a course without the quiz.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppButton
              href={buildStandardWhatsAppUrl(["I'd like help choosing the right course."])}
              size="lg"
            />
            <Button href="/courses-and-fees" size="lg" variant="secondary">
              Browse all courses
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
