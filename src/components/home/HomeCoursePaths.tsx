import type { Course } from "@/lib/types";
import { sortPublicCourses } from "@/lib/courseSort";
import { CoursePathsCarousel } from "@/components/courses/CoursePathsCarousel";
import { AccentWord } from "@/components/ui/AccentWord";

/** Homepage path section — all public CMS courses, carouselled 3-up on desktop. */
export function HomeCoursePaths({ courses }: { courses: Course[] }) {
  const ordered = sortPublicCourses(courses);
  return (
    <CoursePathsCarousel
      courses={ordered}
      heading={
        <>
          Which path <AccentWord>fits</AccentWord> you?
        </>
      }
    />
  );
}
