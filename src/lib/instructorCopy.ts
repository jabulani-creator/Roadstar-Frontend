import type { Instructor } from "./types";

/** Curated public copy layered on API instructor profiles. */
export type InstructorEnrichment = {
  specialty: string;
  style: string;
  title: string;
  teachingSince?: string;
};

const ENRICHMENT: Record<string, InstructorEnrichment> = {
  louise: {
    title: "Certified RTSA Instructor",
    specialty: "Nervous beginners, first-time drivers",
    teachingSince: "Teaching with patience first",
    style:
      "Louise has a calm, reassuring teaching style that puts even the most anxious learners at ease. She's known for her patience and her ability to break down complex manoeuvres into simple, manageable steps.",
  },
  grace: {
    title: "Senior Certified Instructor",
    specialty: "Professional drivers, Class C1 preparation",
    teachingSince: "Teaching with patience first",
    style:
      "Grace brings years of professional driving experience to her teaching. She's especially skilled at preparing learners for the Class C1 test and helping experienced drivers refine their skills.",
  },
};

export function instructorKey(instructor: Instructor): string {
  return instructor.display_name.split(/\s+/)[0]?.toLowerCase() ?? "";
}

export function enrichInstructor(instructor: Instructor): InstructorEnrichment {
  const key = instructorKey(instructor);
  return (
    ENRICHMENT[key] ?? {
      title: instructor.credentials_note || "Certified RTSA Instructor",
      specialty: "Patient, certified instruction",
      teachingSince: "Teaching with patience first",
      style:
        "Every Roadstar instructor is certified, background-checked, and trained to teach with patience — at your pace.",
    }
  );
}

export const TEACHING_PROMISE = [
  {
    title: "Patient Instruction",
    body: "We never shout, rush, or make you feel embarrassed. Learning to drive is stressful enough. Our job is to make it easier, not harder.",
  },
  {
    title: "Clear Explanations",
    body: "We explain what we're doing and why. You'll understand the rules of the road, not just memorise them.",
  },
  {
    title: "Your Pace",
    body: "Some people need 10 lessons. Some need 30. We go at your pace and never push you to take the test before you're ready.",
  },
  {
    title: "Honest Feedback",
    body: "We'll tell you when you're ready — and when you're not. You deserve an honest assessment, not false confidence.",
  },
  {
    title: "Safe Vehicles",
    body: "All our training vehicles are regularly serviced, insured, and roadworthy. We never use a vehicle with a known defect for lessons.",
  },
  {
    title: "Clear Pricing",
    body: "No hidden fees. No surprise charges. The price you see is the price you pay. RTSA fees are always shown separately.",
  },
] as const;

export const INSTRUCTOR_FAQS = [
  {
    q: "Can I choose my instructor?",
    a: "Yes. You can request a specific instructor when you book. We'll do our best to accommodate you, depending on availability. All our instructors are certified and patient.",
  },
  {
    q: "What if I don't get along with my instructor?",
    a: "It happens rarely, but if you feel uncomfortable with your instructor for any reason, contact us. We'll reassign you to another instructor. Your comfort and safety are our priority.",
  },
  {
    q: "Are all instructors certified?",
    a: "Yes. Every Roadstar instructor is certified by RTSA and has a clean driving record. We also provide ongoing training and review instructor performance through student feedback.",
  },
  {
    q: "Do you have female instructors?",
    a: "Yes. We have both male and female instructors. If you have a preference, let us know when you book.",
  },
  {
    q: "Can I request a specific instructor for all my lessons?",
    a: "Yes, subject to availability. Many learners prefer to stay with one instructor for consistency. We'll do our best to accommodate you.",
  },
  {
    q: "How do I give feedback about my instructor?",
    a: "We welcome all feedback. You can share it directly with us via WhatsApp, through your student account, or by leaving a review on Google or Facebook. If you have a concern, please contact us directly so we can address it.",
  },
] as const;

export const GALLERY_CAPTIONS = [
  "Quiet area practice — where every learner starts.",
  "Road positioning on Vubu Road, Emmasdale.",
  "Mock test on an RTSA route.",
  "Parking practice — parallel, bay, and hill.",
  "Highway driving — building confidence at speed.",
  "Test day — ready and confident.",
] as const;
