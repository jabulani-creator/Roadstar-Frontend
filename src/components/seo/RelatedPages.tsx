import Link from "next/link";

export type RelatedLink = {
  href: string;
  label: string;
  blurb?: string;
};

/** Curated Tier A cluster links — not a full nav dump. */
export function RelatedPages({
  title = "Explore more",
  links,
}: {
  title?: string;
  links: RelatedLink[];
}) {
  if (!links.length) return null;

  return (
    <section className="mt-14 border-t border-black/8 pt-10">
      <h2 className="font-display text-xl font-semibold tracking-tight text-[var(--ink)] md:text-2xl">
        {title}
      </h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="block rounded-lg bg-[var(--panel)] px-4 py-4 transition hover:bg-[var(--teal-soft)]"
            >
              <span className="font-semibold text-[var(--brand)]">{l.label}</span>
              {l.blurb ? (
                <span className="mt-1 block text-sm text-[var(--muted)]">{l.blurb}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export const TIER_A_LINKS = {
  fees: {
    href: "/courses-and-fees",
    label: "Courses & fees",
    blurb: "Transparent tuition packages. RTSA costs shown separately.",
  },
  emmasdale: {
    href: "/locations/emmasdale",
    label: "Emmasdale branch",
    blurb: "Plot No. 238, Vubu Road — our main training base.",
  },
  classB: {
    href: "/licence-classes/class-b",
    label: "Class B training",
    blurb: "Light motor vehicles — manual and automatic.",
  },
  howItWorks: {
    href: "/how-it-works",
    label: "How enrolment works",
    blurb: "From enquiry to RTSA test readiness.",
  },
  contact: {
    href: "/contact",
    label: "Contact & register",
    blurb: "WhatsApp, call, or register online.",
  },
  faqs: {
    href: "/faqs",
    label: "FAQs",
    blurb: "Fees, documents, lessons, and RTSA answers.",
  },
  instructors: {
    href: "/instructors",
    label: "Our instructors",
    blurb: "Patient, certified teachers — at your pace.",
  },
} as const;
