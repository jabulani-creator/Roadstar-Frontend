import type { Metadata } from "next";
import Link from "next/link";
import { InstructorProfile } from "@/components/instructors/InstructorProfile";
import { RelatedPages, TIER_A_LINKS } from "@/components/seo/RelatedPages";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { absoluteUrl } from "@/lib/business";
import { fleetService } from "@/lib/services/fleetService";

export const dynamic = "force-dynamic";

function hasRealProfiles(
  list: { public_bio?: string; display_name?: string }[],
): boolean {
  return list.filter((i) => (i.public_bio ?? "").trim().length > 40).length >= 1;
}

export async function generateMetadata(): Promise<Metadata> {
  const instructors = await fleetService.instructorsPublic().catch(() => []);
  const ready = hasRealProfiles(instructors);

  if (!ready) {
    return {
      title: "Instructors",
      description:
        "Meet Roadstar’s patient, certified driving instructors in Lusaka. Profiles publishing soon.",
      robots: { index: false, follow: true },
    };
  }

  return {
    title: "Patient Driving Instructors in Lusaka",
    description:
      "Meet Roadstar’s certified, patient driving instructors in Lusaka. No shouting. No rushing. Class B, C1 & C training in Emmasdale and Thornpark.",
    alternates: { canonical: "/instructors" },
    openGraph: {
      title: "Patient Driving Instructors in Lusaka | Roadstar Driving School",
      url: absoluteUrl("/instructors"),
    },
  };
}

export default async function InstructorsPage() {
  const instructors = await fleetService.instructorsPublic().catch(() => []);
  const ordered = [...instructors].sort((a, b) => {
    const rank = (name: string) => {
      const n = name.toLowerCase();
      if (n.startsWith("louise")) return 0;
      if (n.startsWith("grace")) return 1;
      return 2;
    };
    return rank(a.display_name) - rank(b.display_name);
  });
  const ready = hasRealProfiles(ordered);

  return (
    <div className="pb-20">
      <div className="border-b border-[var(--brand)]/10 bg-[var(--mist)]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Instructors
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            Patient driving instructors in Lusaka
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
            You&apos;ll be taught by people who remember what it felt like to be a beginner. No
            shouting. No rushing. We go at your pace.
          </p>
          {!ready ? (
            <p className="mt-4 rounded-lg border border-black/10 bg-white/80 px-4 py-3 text-sm text-[var(--ink)]">
              Full instructor profiles (photos and teaching quotes) are being prepared. WhatsApp us
              and we&apos;ll introduce you to the right teacher for your course.
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton size="lg" />
            <Button href="/contact#register" size="lg">
              Register
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        {ordered.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ordered.map((instructor) => (
              <InstructorProfile key={instructor.id} instructor={instructor} />
            ))}
          </div>
        ) : (
          <p className="text-[var(--muted)]">
            Instructor profiles are being updated.{" "}
            <Link href="/contact" className="font-semibold text-[var(--brand)] hover:underline">
              Contact us
            </Link>{" "}
            and we&apos;ll match you with a teacher.
          </p>
        )}

        <RelatedPages
          links={[
            TIER_A_LINKS.fees,
            TIER_A_LINKS.emmasdale,
            TIER_A_LINKS.contact,
          ]}
        />
      </div>
    </div>
  );
}
