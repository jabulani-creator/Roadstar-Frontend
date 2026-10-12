import type { Course } from "@/lib/types";
import { buildCourseEnquiryWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function CourseCtaGroup({
  course,
  compact = false,
}: {
  course: Course;
  compact?: boolean;
}) {
  const wa = buildCourseEnquiryWhatsAppUrl(course);

  if (compact) {
    return (
      <div className="flex flex-col gap-2">
        <Button href={`/courses/${course.slug}`} size="sm" variant="secondary">
          View Details
        </Button>
        <WhatsAppButton href={wa} size="sm" fullWidth />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <WhatsAppButton href={wa} size="lg" />
      <Button href="/contact#register" size="lg" variant="secondary">
        Register
      </Button>
    </div>
  );
}
