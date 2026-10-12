import type { Metadata } from "next";
import { HomeCoursePaths } from "@/components/home/HomeCoursePaths";
import { HomeFaq } from "@/components/home/HomeFaq";
import { HomeFinalCta } from "@/components/home/HomeFinalCta";
import { HomeFleet } from "@/components/home/HomeFleet";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeInstructors } from "@/components/home/HomeInstructors";
import { HomeJourney } from "@/components/home/HomeJourney";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/business";
import { drivingSchoolJsonLd } from "@/lib/seo";
import { branchService } from "@/lib/services/branchService";
import { contentService } from "@/lib/services/contentService";
import { courseService } from "@/lib/services/courseService";
import { fleetService } from "@/lib/services/fleetService";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    absolute: "Roadstar Driving School | Driving Lessons in Lusaka, Emmasdale & Thornpark",
  },
  description:
    "Learn to drive in Lusaka with Roadstar Driving School. Patient, certified instructors. Transparent fees. Class B, C1 & C. Emmasdale & Thornpark. Book your first lesson today.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Roadstar Driving School | Lusaka",
    description:
      "Patient instructors. Transparent fees. RTSA-ready training in Emmasdale and Thornpark.",
    url: absoluteUrl("/"),
  },
};

export default async function HomePage() {
  const [courses, vehicles, instructors, branches, testimonials] = await Promise.all([
    courseService.listPublic().catch(() => []),
    fleetService.vehiclesPublic().catch(() => []),
    fleetService.instructorsPublic().catch(() => []),
    branchService.listPublic().catch(() => []),
    contentService.testimonials().catch(() => []),
  ]);

  const emmasdale =
    branches.find((b) => b.slug === "emmasdale") ??
    branches.find((b) => b.slug.includes("emmasdale"));
  const thornpark =
    branches.find((b) => b.slug === "thornpark") ??
    branches.find((b) => b.slug.includes("thornpark"));

  const heroTrust = [
    { lead: "Structured learning", label: "Build your skills step by step." },
    { lead: "Flexible lessons", label: "Book around your schedule." },
    { lead: "Safer driving", label: "Responsible habits for Lusaka roads." },
  ];

  return (
    <>
      <JsonLd
        data={drivingSchoolJsonLd({
          path: "/",
          description:
            "Driving school in Lusaka, Emmasdale. Class B, C1 and C training with patient instructors and transparent tuition separate from RTSA fees.",
        })}
      />
      <HomeHero stats={heroTrust} />
      <HomeCoursePaths courses={courses} />
      <HomeJourney />
      <HomeInstructors instructors={instructors} />
      <HomeFleet vehicles={vehicles} />
      <HomeTestimonials testimonials={testimonials} />
      <HomeFaq />
      <HomeFinalCta
        emmasdaleAddress={emmasdale?.address}
        emmasdaleMapUrl={emmasdale?.map_url}
        thornparkNote={thornpark?.address ?? "Ask us for directions when you enquire"}
      />
    </>
  );
}
