import type { Course } from "./types";

export type SelectorAnswers = {
  licenceClass: "B" | "C1" | "C";
  experience: "beginner_full" | "standard" | "refresher" | "test_prep";
  transmission: "manual" | "automatic" | "both";
  branchSlug?: string;
};

/** Map experience UI choices onto course level codes. */
export function recommendCourse(
  courses: Course[],
  answers: SelectorAnswers,
): Course | null {
  const pool = courses.filter((c) => c.licence_class === answers.licenceClass);
  const byLevel = pool.filter((c) => c.level === answers.experience);
  const candidates = byLevel.length ? byLevel : pool;

  const withTransmission = candidates.filter((c) => {
    if (answers.licenceClass !== "B") return true;
    if (c.transmission === "both") return true;
    if (answers.transmission === "both") return true;
    return c.transmission === answers.transmission;
  });

  const list = withTransmission.length ? withTransmission : candidates;
  if (!list.length) return null;

  if (answers.branchSlug) {
    const atBranch = list.find((c) =>
      c.branch_details?.some((b) => b.slug === answers.branchSlug),
    );
    if (atBranch) return atBranch;
  }
  return list[0];
}
