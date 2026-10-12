import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";
import { TelLink } from "@/components/ui/TelLink";
import { business } from "@/lib/business";
import { CONTACT_EMAIL } from "@/lib/contactCopy";

const explore = [
  { href: "/courses-and-fees", label: "Courses & Fees" },
  { href: "/find-your-course", label: "Find Your Course" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/licence-classes", label: "Licence Classes" },
  { href: "/licence-classes/class-b", label: "Class B" },
  { href: "/locations", label: "Locations" },
  { href: "/locations/emmasdale", label: "Emmasdale" },
  { href: "/instructors", label: "Instructors" },
  { href: "/fleet", label: "Training Fleet" },
  { href: "/professional-fleet", label: "Professional & Fleet" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact & Register" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--brand-strong)]/40 bg-[var(--brand)] text-white">
      {/* Soft orange washes — same language as mobile nav */}
      <div
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[var(--accent)]/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[var(--accent)]/15 blur-2xl"
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-none gap-10 px-4 py-14 md:grid-cols-3 md:px-12 lg:px-16 xl:px-20">
        <div>
          <BrandMark light />
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-white">
            Safe drivers build{" "}
            <span className="text-[var(--accent)]">safer roads</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/90">
            Learn · Practise · Drive Safe. Clear courses and transparent fees in Lusaka.
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            Explore
          </p>
          <ul className="mt-3 columns-1 space-y-2.5 text-sm font-medium uppercase tracking-[0.1em] text-white/95 sm:columns-2 sm:gap-6">
            {explore.map((l) => (
              <li key={l.href} className="break-inside-avoid">
                <Link href={l.href} className="transition hover:text-[var(--accent)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            Contact
          </p>
          <ul className="mt-3 space-y-3 text-sm text-white/95">
            <li>
              <span className="font-semibold text-white">{business.emmasdale.name}</span>
              <br />
              <span className="text-white/90">{business.emmasdale.fullAddress}</span>
            </li>
            <li>
              <span className="font-semibold text-white">Thornpark</span>
              <br />
              <span className="text-white/90">Ask us for directions when you enquire</span>
            </li>
            <li>
              <TelLink
                context="footer"
                className="font-semibold transition hover:text-[var(--accent)]"
              />
            </li>
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="transition hover:text-[var(--accent)]"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            Legal
          </p>
          <ul className="mt-3 space-y-2.5 text-sm font-medium uppercase tracking-[0.1em] text-white/95">
            <li>
              <Link href="/contact" className="transition hover:text-[var(--accent)]">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-[var(--accent)]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/licensing" className="transition hover:text-[var(--accent)]">
                RTSA Disclaimer & Costs
              </Link>
            </li>
            <li>
              <Link href="/login" className="transition hover:text-[var(--accent)]">
                Staff login
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/15">
        <div className="mx-auto flex w-full max-w-none flex-col gap-2 px-4 py-5 text-xs text-white/80 md:flex-row md:items-center md:justify-between md:px-12 lg:px-16 xl:px-20">
          <p>© 2026 Roadstar Driving School Zambia. All rights reserved.</p>
          <p>
            Roadstar prepares you for the RTSA process. Licence approval is the sole authority of
            RTSA.
          </p>
        </div>
      </div>
    </footer>
  );
}
