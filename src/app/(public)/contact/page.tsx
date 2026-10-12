import type { Metadata } from "next";
import Link from "next/link";
import { RegistrationForm } from "@/components/contact/RegistrationForm";
import { RelatedPages, TIER_A_LINKS } from "@/components/seo/RelatedPages";
import { AccentWord } from "@/components/ui/AccentWord";
import { Button } from "@/components/ui/Button";
import { TelButton } from "@/components/ui/TelButton";
import { TelLink } from "@/components/ui/TelLink";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { business } from "@/lib/business";
import {
  AFTER_SUBMIT_STEPS,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  FACEBOOK_URL,
  OFFICE_HOURS,
  REGISTER_FAQS,
} from "@/lib/contactCopy";
import { buildContactWhatsAppUrl } from "@/lib/whatsapp";
import { branchService } from "@/lib/services/branchService";
import { courseService } from "@/lib/services/courseService";
import type { Branch } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact & Register | Lusaka",
  alternates: { canonical: "/contact" },
  description:
    "Register for driving lessons at Roadstar Driving School in Lusaka. Emmasdale & Thornpark. Class B, C1 & C. Chat on WhatsApp or register online in minutes.",
};

const shell = "mx-auto w-full max-w-[90rem] px-4 md:px-12 lg:px-16 xl:px-20";

function branchBySlug(branches: Branch[], needle: string) {
  return branches.find((b) => b.slug.toLowerCase().includes(needle));
}

export default async function ContactPage() {
  const [branches, courses] = await Promise.all([
    branchService.listPublic().catch(() => []),
    courseService.listPublic().catch(() => []),
  ]);
  const emmasdale = branchBySlug(branches, "emmasdale");
  const thornpark = branchBySlug(branches, "thornpark");

  return (
    <div className="bg-[var(--surface)]">
      {/* Intro */}
      <section className="bg-[var(--cream)] py-16 md:py-24">
        <div className={`${shell} mx-auto max-w-3xl text-center`}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Contact & register
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl lg:text-[2.75rem]">
            Let&apos;s get you <AccentWord>started</AccentWord>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
            Ready to register or just have questions — we&apos;re here. No pressure. No obligation.
            Honest help choosing the right path.
          </p>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--brand)] md:text-xs">
            WhatsApp · Call · Visit · Register online
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppButton href={buildContactWhatsAppUrl()} size="lg" />
            <Button href="#register" size="lg">
              Register online
            </Button>
          </div>
        </div>
      </section>

      {/* Three ways */}
      <section className="bg-[var(--surface)] py-16 md:py-24">
        <div className={shell}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
              Three ways to <AccentWord>reach</AccentWord> us
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
              Pick what feels easiest.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <article className="flex flex-col rounded-lg bg-[var(--panel)] px-5 py-6 md:px-6">
              <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
                Chat on WhatsApp
              </h3>
              <p className="mt-1 text-sm italic text-[var(--muted)]">
                Best for quick questions and course advice.
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--ink)]/85">
                Tell us your experience and what you&apos;re looking for — we&apos;ll recommend the
                right course.
              </p>
              <p className="mt-4 font-semibold text-[var(--brand)]">{CONTACT_PHONE_DISPLAY}</p>
              <div className="mt-5">
                <WhatsAppButton href={buildContactWhatsAppUrl()} />
              </div>
            </article>

            <article className="flex flex-col rounded-lg bg-[var(--panel)] px-5 py-6 md:px-6">
              <h3 className="font-display text-xl font-semibold text-[var(--ink)]">Call us</h3>
              <p className="mt-1 text-sm italic text-[var(--muted)]">
                Best for immediate questions during office hours.
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--ink)]/85">
                Speak to our enrolment team. We&apos;ll help you choose the right course.
              </p>
              <p className="mt-4 font-semibold text-[var(--brand)]">{CONTACT_PHONE_DISPLAY}</p>
              <ul className="mt-3 space-y-1 text-sm text-[var(--muted)]">
                {OFFICE_HOURS.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-[var(--muted)]">
                If we miss your call, we&apos;ll call back — or WhatsApp us for a faster reply.
              </p>
              <div className="mt-5">
                <TelButton context="contact_call_card">Call now</TelButton>
              </div>
            </article>

            <article className="flex flex-col rounded-lg bg-[var(--panel)] px-5 py-6 md:px-6">
              <h3 className="font-display text-xl font-semibold text-[var(--ink)]">Visit us</h3>
              <p className="mt-1 text-sm italic text-[var(--muted)]">
                Best for meeting the team and seeing the vehicles.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--ink)]/85">
                Walk in during office hours. We&apos;ll show you around and answer questions in
                person.
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-[var(--ink)]">Emmasdale</p>
                  <p className="text-[var(--muted)]">
                    {emmasdale?.address ?? business.emmasdale.fullAddress}
                  </p>
                  {emmasdale?.landmark ? (
                    <p className="mt-1 text-xs text-[var(--muted)]">Landmark: {emmasdale.landmark}</p>
                  ) : null}
                </div>
                <div>
                  <p className="font-semibold text-[var(--ink)]">Thornpark</p>
                  <p className="text-[var(--muted)]">
                    {thornpark?.address ?? "Ask us for directions when you enquire"}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {emmasdale?.map_url ? (
                  <Button href={emmasdale.map_url} external variant="secondary">
                    Get directions
                  </Button>
                ) : (
                  <Button href="/locations/emmasdale" variant="secondary">
                    Emmasdale details
                  </Button>
                )}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Register */}
      <section id="register" className="scroll-mt-28 bg-[var(--cream)] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Register online
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
              Ready to <AccentWord>register</AccentWord>?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
              About 10 minutes. We&apos;ll create your student account, confirm your course, and send
              payment instructions. No commitment until you pay.
            </p>
          </div>

          <aside className="mt-8 rounded-lg border-l-4 border-[var(--brand)] bg-[var(--teal-soft)] px-5 py-4">
            <p className="font-semibold text-[var(--ink)]">No pressure.</p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
              This form starts the conversation. We&apos;ll review your details and contact you
              before you pay.
            </p>
          </aside>

          <div className="mt-8">
            <RegistrationForm courses={courses} branches={branches} />
          </div>
        </div>
      </section>

      {/* After submit */}
      <section className="bg-[var(--surface)] py-16 md:py-24">
        <div className={shell}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
              What happens <AccentWord>next</AccentWord>
            </h2>
          </div>
          <ol className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
            {AFTER_SUBMIT_STEPS.map((step, i) => (
              <li key={step.title} className="rounded-lg bg-[var(--panel)] px-5 py-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-[var(--ink)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{step.body}</p>
              </li>
            ))}
          </ol>
          <aside className="mx-auto mt-8 max-w-5xl rounded-lg border-l-4 border-[var(--brand)] bg-[var(--teal-soft)] px-5 py-4">
            <p className="font-semibold text-[var(--brand)]">No payment required to register.</p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Complete the form and talk to us first. Pay only when you&apos;re ready to start.
            </p>
          </aside>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-[var(--cream)] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            Questions about <AccentWord>registering</AccentWord>
          </h2>
          <div className="mt-10 space-y-3">
            {REGISTER_FAQS.map((item) => (
              <details key={item.q} className="rounded-lg bg-[var(--panel)] px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-[var(--ink)] marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {item.q}
                    <span className="text-lg text-[var(--muted)]" aria-hidden>
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact details */}
      <section className="bg-[var(--surface)] py-16 md:py-24">
        <div className={shell}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
              All the ways to <AccentWord>reach</AccentWord> us
            </h2>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <article className="rounded-lg bg-[var(--panel)] px-5 py-6">
              <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
                Emmasdale
              </h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                {emmasdale?.address ?? business.emmasdale.fullAddress}
              </p>
              <p className="mt-4 text-sm">
                <span className="font-semibold text-[var(--ink)]">Phone:</span>{" "}
                <TelLink
                  context="contact_emmasdale"
                  className="font-semibold text-[var(--brand)] hover:underline"
                />
              </p>
              <p className="text-sm">
                <span className="font-semibold text-[var(--ink)]">Email:</span>{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[var(--brand)] hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
              <ul className="mt-3 space-y-1 text-sm text-[var(--muted)]">
                {OFFICE_HOURS.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <div className="mt-5">
                <Link
                  href="/locations/emmasdale"
                  className="text-sm font-semibold text-[var(--brand)] hover:underline"
                >
                  Emmasdale details →
                </Link>
              </div>
            </article>

            <article className="rounded-lg bg-[var(--panel)] px-5 py-6">
              <h3 className="font-display text-xl font-semibold text-[var(--ink)]">Thornpark</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                {thornpark?.address ?? "Ask us for directions when you enquire"}
              </p>
              <p className="mt-4 text-sm">
                <span className="font-semibold text-[var(--ink)]">Phone:</span>{" "}
                {thornpark?.primary_phone || CONTACT_PHONE_DISPLAY}
              </p>
              <p className="text-sm">
                <span className="font-semibold text-[var(--ink)]">Email:</span> {CONTACT_EMAIL}
              </p>
              <ul className="mt-3 space-y-1 text-sm text-[var(--muted)]">
                {OFFICE_HOURS.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <div className="mt-5">
                <Link
                  href="/locations/thornpark"
                  className="text-sm font-semibold text-[var(--brand)] hover:underline"
                >
                  Thornpark details →
                </Link>
              </div>
            </article>

            <article className="rounded-lg bg-[var(--panel)] px-5 py-6">
              <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
                Online & social
              </h3>
              <p className="mt-4 text-sm">
                <span className="font-semibold text-[var(--ink)]">WhatsApp:</span>{" "}
                {CONTACT_PHONE_DISPLAY}
              </p>
              <p className="text-sm">
                <span className="font-semibold text-[var(--ink)]">Facebook:</span>{" "}
                facebook.com/roadstadriving
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <WhatsAppButton href={buildContactWhatsAppUrl()} size="sm" />
                <Button href={FACEBOOK_URL} external variant="secondary" size="sm">
                  Follow on Facebook
                </Button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={`${shell} bg-[var(--cream)] py-16 md:py-20`}>
        <RelatedPages
          links={[
            TIER_A_LINKS.fees,
            TIER_A_LINKS.emmasdale,
            TIER_A_LINKS.howItWorks,
            TIER_A_LINKS.classB,
          ]}
        />
      </section>

      {/* Soft close */}
      <section className="border-t border-black/8 bg-[var(--cream)] py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--ink)] md:text-3xl">
            Still not <AccentWord>sure</AccentWord>?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--muted)] md:text-lg">
            You don&apos;t have to decide today. Send a message, ask your questions, and take your
            time. We&apos;ll be here when you&apos;re ready.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppButton href={buildContactWhatsAppUrl()} size="lg" context="contact" />
            <TelButton size="lg" variant="secondary" context="contact_footer">
              Call {CONTACT_PHONE_DISPLAY}
            </TelButton>
          </div>
          <p className="mt-8 text-sm text-[var(--muted)]">
            {emmasdale?.address ?? business.emmasdale.fullAddress}
            <br />
            Thornpark: {thornpark?.address ?? "ask us for directions"}
          </p>
        </div>
      </section>
    </div>
  );
}
