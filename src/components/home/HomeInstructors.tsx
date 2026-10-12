import type { Instructor } from "@/lib/types";
import { InstructorCarousel } from "@/components/instructors/InstructorCarousel";
import { AccentWord } from "@/components/ui/AccentWord";

export function HomeInstructors({ instructors }: { instructors: Instructor[] }) {
  const ordered = [...instructors].sort((a, b) => {
    const rank = (name: string) => {
      const n = name.toLowerCase();
      if (n.startsWith("louise")) return 0;
      if (n.startsWith("grace")) return 1;
      return 2;
    };
    return rank(a.display_name) - rank(b.display_name);
  });

  return (
    <InstructorCarousel
      instructors={ordered}
      heading={
        <>
          You&apos;ll be taught by people who remember what it felt like to be a{" "}
          <AccentWord>beginner</AccentWord>.
        </>
      }
      subheading="Certified, patient instructors. No shouting. No rushing. We go at your pace."
    />
  );
}
