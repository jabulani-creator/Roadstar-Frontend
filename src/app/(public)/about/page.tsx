import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { contentService } from "@/lib/services/contentService";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const testimonials = await contentService.testimonials().catch(() => []);

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <SectionHeading
          eyebrow="Meet Roadstar"
          title="A Lusaka driving school focused on clear training"
          subtitle="We help people learn to drive with patience, transparent packages, and an honest boundary between Roadstar training and RTSA licensing."
        />
        <div className="mt-8 space-y-4 text-base leading-relaxed text-[var(--ink)]/85">
          <p>
            Choosing a driving school is about money, time, safety, and confidence. Roadstar’s
            digital foundation exists so you can understand the offer before you send a WhatsApp
            message — and so staff can keep courses, fleet, and fees accurate.
          </p>
          <p>
            We do not promise guaranteed passes or fixed licence timelines. We promise clarity about
            what each course includes, how training works, and what happens next.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/courses-and-fees">Explore courses</Button>
          <Button href="/contact" variant="secondary">
            Contact
          </Button>
        </div>
      </div>
      <HomeTestimonials testimonials={testimonials} />
    </>
  );
}
