import type { Metadata } from "next";
import { CourseFeeDetail } from "@/components/courses/CourseFeeDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedPages, TIER_A_LINKS } from "@/components/seo/RelatedPages";
import { AccentWord } from "@/components/ui/AccentWord";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { absoluteUrl, business } from "@/lib/business";
import { courseAnchorId } from "@/lib/courseCopy";
import { pathwayFees, pathwayTotal } from "@/lib/cost";
import { courseOfferJsonLd, faqPageJsonLd, lowestPricedCourse } from "@/lib/seo";
import { formatZmw } from "@/lib/utils";
import { buildFeesWhatsAppUrl } from "@/lib/whatsapp";
import { contentService } from "@/lib/services/contentService";
import { courseService } from "@/lib/services/courseService";
import type { Course } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Driving School Fees & Packages in Lusaka",
  description:
    "Transparent driving course fees in Lusaka. Class B, C1 & C tuition with Roadstar. RTSA statutory costs shown separately. Compare packages and enquire on WhatsApp.",
  alternates: { canonical: "/courses-and-fees" },
  openGraph: {
    title: "Driving School Fees & Packages in Lusaka | Roadstar Driving School",
    description:
      "Clear Roadstar tuition packages. RTSA fees are separate government charges — never bundled as a hidden “all-in” price.",
    url: absoluteUrl("/courses-and-fees"),
  },
};

const FEES_FAQS = [
  {
    q: "Do course fees include RTSA licensing costs?",
    a: "No. Roadstar tuition covers practical instruction with our instructors and vehicles. Official RTSA fees for provisional licence, tests, and licence card are paid separately to RTSA.",
  },
  {
    q: "Can I pay in instalments?",
    a: "Yes. We offer a deposit + instalment plan. Ask when you enquire and we’ll set a plan that works for you.",
  },
  {
    q: "Where can I train?",
    a: "Our main walk-in base is Emmasdale (Plot No. 238, Vubu Road). Ask about Thornpark when you enquire.",
  },
];

const shell =
  "mx-auto w-full max-w-[90rem] px-4 md:px-12 lg:px-16 xl:px-20";

function sortCourses(courses: Course[]) {
  const levelOrder = [
    "beginner_full",
    "standard",
    "half",
    "refresher",
    "test_prep",
    "professional",
    "other",
  ];
  const classOrder = ["B", "C1", "C"];
  return [...courses].sort((a, b) => {
    const c = classOrder.indexOf(a.licence_class) - classOrder.indexOf(b.licence_class);
    if (c !== 0) return c;
    return levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level);
  });
}

function bestFor(course: Course): string {
  switch (course.level) {
    case "beginner_full":
      return course.licence_class === "B" ? "Complete beginners" : "Professional starters";
    case "standard":
      return "Some experience";
    case "half":
      return "Targeted practice";
    case "refresher":
      return "Licensed, need confidence";
    case "test_prep":
      return "Ready for the test";
    default:
      return course.level_label;
  }
}

export default async function CoursesAndFeesPage() {
  const [coursesRaw, rtsa] = await Promise.all([
    courseService.listPublic().catch(() => []),
    contentService.rtsa().catch(() => []),
  ]);
  const courses = sortCourses(coursesRaw);
  const classB = courses.filter((c) => c.licence_class === "B");
  const professional = courses.filter((c) => c.licence_class !== "B");
  const pathway = pathwayFees(rtsa);
  const extras = pathwayTotal(rtsa);
  const lastUpdated =
    courses.find((c) => c.price_updated_at)?.price_updated_at?.slice(0, 10) ??
    pathway.find((p) => p.last_reviewed_at)?.last_reviewed_at ??
    "pending confirmation";

  const starter = lowestPricedCourse(classB.length ? classB : courses);
  const schemas: Record<string, unknown>[] = [faqPageJsonLd(FEES_FAQS)];
  if (starter) schemas.push(courseOfferJsonLd(starter));

  return (
    <div className="bg-[var(--surface)]">
      <JsonLd data={schemas} />

      {/* Intro — homepage cream rhythm */}
      <section className="bg-[var(--cream)] py-16 md:py-24">
        <div className={`${shell} mx-auto max-w-3xl text-center`}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Courses & fees
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl lg:text-[2.75rem]">
            Driving school fees & packages in <AccentWord>Lusaka</AccentWord>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
            Every package shows Roadstar tuition, what&apos;s included, what&apos;s not, and the
            separate RTSA costs you pay directly to RTSA. Prices last updated: {lastUpdated}.
          </p>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--brand)] md:text-xs">
            All prices in ZMW · RTSA fees separate · No hidden charges · Payment plans available
          </p>
          <p className="mx-auto mt-6 max-w-xl border-l-4 border-[var(--brand)] bg-[var(--teal-soft)] px-4 py-3 text-left text-sm text-[var(--ink)]">
            Draft prices for management review before public launch. Enquire anytime and we&apos;ll
            confirm the current package for you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/find-your-course" size="lg">
              Find Your Course
            </Button>
            <WhatsAppButton href={buildFeesWhatsAppUrl()} size="lg" />
          </div>
        </div>
      </section>

      {/* Jump nav — soft bar, not white SaaS chrome */}
      <nav className="sticky top-[var(--site-header-height)] z-30 border-y border-black/8 bg-[var(--cream)]/95 backdrop-blur">
        <div
          className={`${shell} flex gap-5 overflow-x-auto py-3.5 text-sm font-medium uppercase tracking-[0.1em] whitespace-nowrap`}
        >
          {classB.map((c) => (
            <a
              key={c.id}
              href={`#${courseAnchorId(c)}`}
              className="text-[var(--ink)]/70 transition hover:text-[var(--brand)]"
            >
              {c.level_label}
            </a>
          ))}
          {professional.length ? (
            <a
              href="#professional"
              className="text-[var(--ink)]/70 transition hover:text-[var(--brand)]"
            >
              Class C1 / C
            </a>
          ) : null}
          <a
            href="#rtsa-costs"
            className="text-[var(--ink)]/70 transition hover:text-[var(--brand)]"
          >
            RTSA Costs
          </a>
          <a
            href="#payment-options"
            className="text-[var(--ink)]/70 transition hover:text-[var(--brand)]"
          >
            Payment
          </a>
          <a
            href="#compare"
            className="text-[var(--ink)]/70 transition hover:text-[var(--brand)]"
          >
            Compare
          </a>
        </div>
      </nav>

      {/* Class B packages */}
      <section className="bg-[var(--cream)] py-16 md:py-24">
        <div className={`${shell} space-y-10`}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
              Class B <AccentWord>packages</AccentWord>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
              From first lesson to test prep — choose the path that fits your experience.
            </p>
          </div>
          {classB.map((course) => (
            <CourseFeeDetail key={course.id} course={course} />
          ))}
        </div>
      </section>

      {professional.length ? (
        <section id="professional" className="scroll-mt-28 bg-[var(--surface)] py-16 md:py-24">
          <div className={`${shell} space-y-10`}>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
                Class C1 / C — professional <AccentWord>training</AccentWord>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
                For a career on the road. Confirm eligibility before you enrol — you typically need
                a Class B licence first.
              </p>
            </div>
            {professional.map((course) => (
              <CourseFeeDetail key={course.id} course={course} />
            ))}
          </div>
        </section>
      ) : null}

      {/* RTSA costs */}
      <section id="rtsa-costs" className="scroll-mt-28 bg-[var(--cream)] py-16 md:py-24">
        <div className={shell}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
              RTSA statutory <AccentWord>costs</AccentWord>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
              Government / medical fees paid by you directly to RTSA or a clinic — not Roadstar
              tuition.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-lg bg-[var(--panel)]">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-black/10 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                  <th className="px-5 py-3.5 font-semibold">Item</th>
                  <th className="px-5 py-3.5 font-semibold">Cost (ZMW)</th>
                  <th className="px-5 py-3.5 font-semibold">Paid to</th>
                </tr>
              </thead>
              <tbody>
                {pathway.map((item) => (
                  <tr key={item.id} className="border-b border-black/10 last:border-b-0">
                    <td className="px-5 py-3.5 font-medium text-[var(--ink)]">{item.title}</td>
                    <td className="px-5 py-3.5 font-semibold text-[var(--ink)]">
                      {formatZmw(item.fee_amount)}
                    </td>
                    <td className="px-5 py-3.5 text-[var(--muted)]">
                      {item.slug.includes("medical") ? "Clinic / medical provider" : "RTSA"}
                    </td>
                  </tr>
                ))}
                <tr className="bg-[var(--teal-soft)]">
                  <td className="px-5 py-4 font-semibold text-[var(--ink)]">Typical total</td>
                  <td className="px-5 py-4 font-display text-xl font-semibold text-[var(--brand)]">
                    {formatZmw(extras)}
                  </td>
                  <td className="px-5 py-4 text-[var(--muted)]">(if all four apply)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-4 max-w-3xl text-xs text-[var(--muted)]">
            Source: RTSA / Roadstar-reviewed figures. Fees may change — confirm with RTSA before you
            pay.
          </p>

          <aside className="mx-auto mt-8 max-w-3xl rounded-lg border-l-4 border-[var(--brand)] bg-[var(--teal-soft)] px-5 py-6">
            <p className="font-semibold text-[var(--brand)]">
              What does Roadstar do vs what does RTSA do?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/85">
              <strong>Roadstar:</strong> Teaches you to drive. Provides the vehicle, the instructor,
              and the structured lessons. Prepares you for the test.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/85">
              <strong>RTSA:</strong> Registers you as a learner. Administers the theory and
              practical tests. Issues the licence.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              We guide you through the RTSA process. The licence is RTSA&apos;s decision, not ours.
            </p>
          </aside>
        </div>
      </section>

      {/* Payment */}
      <section id="payment-options" className="scroll-mt-28 bg-[var(--surface)] py-16 md:py-24">
        <div className={shell}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
              Flexible <AccentWord>payment</AccentWord> options
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
              Choose the option that works for you — then start when you&apos;re ready.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
            {[
              {
                title: "Pay in full",
                body: "Pay the full course fee upfront. You’ll receive lesson credits and can start arranging lessons right away.",
              },
              {
                title: "Deposit + instalments",
                body: "Pay a deposit to start, then the balance in instalments before your test. We’ll set a plan with you.",
              },
              {
                title: "Ask about individual lessons",
                body: "Not ready for a full course? Ask about individual sessions if you want to try before committing.",
              },
            ].map((opt) => (
              <div key={opt.title} className="rounded-lg bg-[var(--panel)] px-5 py-6">
                <h3 className="font-display text-lg font-semibold text-[var(--ink)]">{opt.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{opt.body}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-[var(--muted)]">
            <span className="font-semibold text-[var(--ink)]">Payment methods:</span> Mobile Money
            (MTN, Airtel, Zamtel) · Bank transfer · Cash at Emmasdale · Card / online link (coming
            soon)
          </p>
        </div>
      </section>

      {/* Compare */}
      <section id="compare" className="scroll-mt-28 bg-[var(--cream)] py-16 md:py-24">
        <div className={shell}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
              Compare all courses at a <AccentWord>glance</AccentWord>
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-lg bg-[var(--panel)]">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-black/10 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                    <th className="px-5 py-3.5">Course</th>
                    <th className="px-5 py-3.5">Duration</th>
                    <th className="px-5 py-3.5">Transmission</th>
                    <th className="px-5 py-3.5">Price</th>
                    <th className="px-5 py-3.5">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c) => (
                    <tr key={c.id} className="border-b border-black/10 last:border-b-0">
                      <td className="px-5 py-3.5 font-medium">
                        <a
                          href={`#${courseAnchorId(c)}`}
                          className="text-[var(--brand)] hover:underline"
                        >
                          {c.name}
                        </a>
                      </td>
                      <td className="px-5 py-3.5 text-[var(--ink)]">
                        {c.duration_days ?? "—"} days
                      </td>
                      <td className="px-5 py-3.5 text-[var(--ink)]">{c.transmission_label}</td>
                      <td className="px-5 py-3.5 font-semibold text-[var(--brand)]">
                        {c.show_price ? formatZmw(c.price_amount) : "Quote"}
                      </td>
                      <td className="px-5 py-3.5 text-[var(--muted)]">{bestFor(c)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/find-your-course" size="lg">
              Find Your Course
            </Button>
            <WhatsAppButton href={buildFeesWhatsAppUrl()} size="lg" />
          </div>
        </div>
      </section>

      {/* FAQs — home FAQ rhythm */}
      <section className="bg-[var(--surface)] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            Questions people ask about <AccentWord>fees</AccentWord>
          </h2>
          <div className="mt-10 space-y-3">
            {FEES_FAQS.map((faq) => (
              <details
                key={faq.q}
                className="rounded-lg bg-[var(--panel)] px-5 py-4"
              >
                <summary className="cursor-pointer list-none font-semibold text-[var(--ink)] marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.q}
                    <span className="text-lg text-[var(--muted)]" aria-hidden>
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={`${shell} bg-[var(--cream)] py-16 md:py-20`}>
        <RelatedPages
          links={[
            TIER_A_LINKS.emmasdale,
            TIER_A_LINKS.classB,
            TIER_A_LINKS.howItWorks,
            TIER_A_LINKS.contact,
          ]}
        />
      </section>

      {/* Soft close — like home final CTA */}
      <section className="border-t border-black/8 bg-[var(--cream)] py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--ink)] md:text-3xl">
            Ready to <AccentWord>start</AccentWord>?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--muted)] md:text-lg">
            Chat on WhatsApp if you have questions first — or find your course and tell us which
            package you want.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/find-your-course" size="lg">
              Find Your Course
            </Button>
            <WhatsAppButton href={buildFeesWhatsAppUrl()} size="lg" />
          </div>
          <p className="mt-8 text-sm text-[var(--muted)]">
            {business.emmasdale.fullAddress}
            <br />
            Thornpark: ask when you enquire · {business.phoneDisplay}
          </p>
        </div>
      </section>
    </div>
  );
}
