import type { Metadata } from "next";
import { FleetEnquiryForm } from "@/components/contact/FleetEnquiryForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import {
  AUDIENCE_CARDS,
  DELIVERY_PACKAGES,
  PROFESSIONAL_FAQS,
  TRAINING_MODULES,
  WHY_ROADSTAR,
} from "@/lib/professionalCopy";
import { buildProfessionalWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Professional & Fleet Driver Training in Lusaka | Roadstar Driving School",
  description:
    "Corporate fleet driver training, defensive driving, and professional licence classes in Lusaka. Reduce crash risk and protect your drivers. Enquire with Roadstar.",
};

export default function ProfessionalFleetPage() {
  const wa = buildProfessionalWhatsAppUrl();

  return (
    <div className="pb-20">
      <div className="border-b border-[var(--brand)]/10 bg-[var(--mist)]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <SectionHeading
            eyebrow="Professional & fleet"
            title="Professional driver training for organisations that can't afford a crash."
            subtitle="A serious crash is not just a road safety problem. It's a business, legal, and reputational crisis. We train your drivers to reduce risk, protect your vehicles, and keep your operations moving."
          />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">
            Defensive Driving · Fleet Risk Assessment · Licence Class Training · Lusaka-Based
          </p>
          <p className="mt-4 max-w-2xl rounded-2xl border border-black/30 bg-white/80 px-4 py-3 text-sm text-[var(--ink)]">
            Corporate and fleet programmes are scoped by enquiry. Tell us your needs and we&apos;ll
            confirm what Roadstar can deliver for your organisation.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <SectionHeading
          eyebrow="Who this is for"
          title="Is your organisation exposed to road risk?"
          subtitle="If your business depends on vehicles, you have road risk. Here's who we help."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {AUDIENCE_CARDS.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl bg-white p-6 shadow-[var(--card-shadow)] ring-1 ring-black/5"
            >
              <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--brand)]/10 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <SectionHeading
            eyebrow="What we offer"
            title="Training that reduces real-world risk."
            subtitle="Our programmes are practical, not theoretical. Drivers leave with skills they can use on their next trip."
          />
          <div className="mt-10 space-y-8">
            {TRAINING_MODULES.map((mod, i) => (
              <article
                key={mod.title}
                className="rounded-2xl bg-[var(--mist)] p-6 ring-1 ring-black/5 md:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  Module {i + 1}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--ink)]">
                  {mod.title}
                </h3>
                <h4 className="mt-5 text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
                  What it covers
                </h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--ink)]/85">
                  {mod.covers.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <h4 className="mt-5 text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
                  Why it matters
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{mod.why}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <SectionHeading
          eyebrow="Delivery options"
          title="Choose the package that fits your operation."
        />
        <div className="mt-8 overflow-x-auto rounded-2xl bg-white ring-1 ring-black/5">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[var(--ink)] text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Package</th>
                <th className="px-4 py-3 font-semibold">Best For</th>
                <th className="px-4 py-3 font-semibold">What&apos;s Included</th>
              </tr>
            </thead>
            <tbody>
              {DELIVERY_PACKAGES.map((pkg) => (
                <tr key={pkg.name} className="border-t border-black/5">
                  <td className="px-4 py-3 font-semibold text-[var(--ink)]">{pkg.name}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{pkg.bestFor}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{pkg.includes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-[var(--muted)]">
          Packages are indicative delivery formats. Final scope is confirmed with Roadstar
          management for each organisation.
        </p>
        <aside className="mt-6 rounded-2xl border border-[var(--brand)]/15 bg-[var(--mist)] p-5">
          <p className="font-semibold text-[var(--brand)]">Pricing</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/85">
            We don&apos;t publish fixed prices because scope varies. Pricing depends on participant
            numbers, location, duration, reporting needs, and whether route assessment is included.
            Contact us for a quote.
          </p>
        </aside>
      </section>

      <section className="border-y border-[var(--brand)]/10 bg-[var(--mist)]">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <SectionHeading eyebrow="Why Roadstar" title="Why organisations choose Roadstar." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {WHY_ROADSTAR.map((col) => (
              <article
                key={col.title}
                className="rounded-2xl bg-white p-6 shadow-[var(--card-shadow)] ring-1 ring-black/5"
              >
                <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
                  {col.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{col.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
        <SectionHeading
          eyebrow="Fleet enquiry"
          title="Request a fleet training quote."
          subtitle="Tell us about your organisation and we'll get back to you within one business day."
        />
        <div className="mt-8">
          <FleetEnquiryForm />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
        <SectionHeading eyebrow="FAQs" title="Questions about professional training" />
        <div className="mt-8 space-y-3">
          {PROFESSIONAL_FAQS.map((item) => (
            <details
              key={item.q}
              className="rounded-2xl bg-white p-4 shadow-[var(--card-shadow)] ring-1 ring-black/5"
            >
              <summary className="cursor-pointer font-semibold text-[var(--ink)]">{item.q}</summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 md:px-6">
        <div className="rounded-3xl bg-[var(--ink)] px-6 py-12 text-white md:px-10">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            Protect your drivers. Protect your business.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-white/85">
            Let&apos;s discuss how Roadstar can help reduce your fleet&apos;s road risk.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#fleet-enquiry" variant="primary" size="lg">
              Request a Quote
            </Button>
            <WhatsAppButton size="lg" href={wa} />
          </div>
          <p className="mt-6 text-sm text-white/70">
            Emmasdale: Plot No. 238, Vubu Road, Lusaka · +260 975 072617
          </p>
        </div>
      </section>
    </div>
  );
}
