import type { Course } from "./types";

export type CourseNarrative = {
  audience: string;
  whoFor: string;
  learn?: string[];
};

/** Warm “who is this for” copy — prices always come from the API. */
export function courseNarrative(course: Course): CourseNarrative {
  const key = `${course.licence_class}:${course.level}`;

  const map: Record<string, CourseNarrative> = {
    "B:beginner_full": {
      audience: "For complete beginners. Never driven before? Start here.",
      whoFor:
        "This is our most popular course. It’s designed for someone who has never driven before and wants a complete, structured path from first lesson to test-ready. You’ll start in a quiet area and progress to main roads at your pace. Most learners complete this course in 4–6 weeks.",
      learn: [
        "Vehicle controls and safety checks",
        "Moving off, steering, and stopping",
        "Road positioning and lane discipline",
        "Traffic signs, signals, and road markings",
        "Junctions, roundabouts, and intersections",
        "Parking (parallel, bay, and hill)",
        "Defensive driving and hazard awareness",
        "RTSA test routes and mock assessment",
      ],
    },
    "B:standard": {
      audience: "For learners with some driving experience who need structured lessons.",
      whoFor:
        "You’ve had some lessons before — maybe with a friend or family member — but you’re not ready for the test. This course fills the gaps, builds your confidence, and prepares you for the RTSA practical test.",
    },
    "B:half": {
      audience: "For learners who only need targeted practice before the test.",
      whoFor:
        "You can already drive, but you need focused practice on specific skills — parking, roundabouts, or test routes. This is not for complete beginners. If you’ve never driven, choose the Full Course.",
    },
    "B:refresher": {
      audience: "For licensed drivers who need to rebuild confidence.",
      whoFor:
        "You already have a licence but haven’t driven in a while. Maybe you’re nervous about Lusaka traffic, or you’ve had a long break. This course rebuilds your confidence in a patient, judgment-free environment.",
    },
    "B:test_prep": {
      audience: "For learners who are ready to book their RTSA test.",
      whoFor:
        "This course does not guarantee a pass. It prepares you for the test. RTSA administers and decides the outcome. We will give you an honest assessment of your readiness.",
    },
    "C1:beginner_full": {
      audience: "For a career on the road. Light commercial training.",
      whoFor:
        "You want to drive professionally — delivery, transport, or light commercial. You must already hold a Class B licence to begin. Contact us to confirm eligibility.",
    },
    "C:beginner_full": {
      audience: "For professional heavy vehicle training.",
      whoFor:
        "You want to drive heavy goods or larger vehicles. Confirm eligibility and vehicle availability with us before you enrol.",
    },
  };

  if (map[key]) return map[key];

  if (course.licence_class === "C1" || course.licence_class === "C") {
    return {
      audience: "For professional drivers. Confirm eligibility with RoadStar.",
      whoFor:
        "Professional pathway training. You typically need a Class B licence first. Enquire so we can confirm the right package for you.",
    };
  }

  return {
    audience: course.summary || "Choose the package that matches your experience.",
    whoFor: course.description || "Ask us if you’re unsure which package fits.",
  };
}

export function courseAnchorId(course: Course): string {
  return `course-${course.slug}`;
}
