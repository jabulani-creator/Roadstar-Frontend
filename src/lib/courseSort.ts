import type { Course } from "@/lib/types";

/** Public catalogue order: Class B → C1 → C, then Full → Standard → Half → Refresher → Test prep. */
export function sortPublicCourses(courses: Course[]): Course[] {
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
    const byClass =
      classOrder.indexOf(a.licence_class) - classOrder.indexOf(b.licence_class);
    if (byClass !== 0) return byClass;
    const byLevel = levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level);
    if (byLevel !== 0) return byLevel;
    return a.name.localeCompare(b.name);
  });
}

export function isPopularCourse(course: Course): boolean {
  return course.licence_class === "B" && course.level === "beginner_full";
}
