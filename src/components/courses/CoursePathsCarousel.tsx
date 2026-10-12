"use client";

import { useEffect, useMemo, useState } from "react";
import type { Course } from "@/lib/types";
import { isPopularCourse } from "@/lib/courseSort";
import { CoursePathCard } from "@/components/courses/CoursePathCard";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { trackFindCourseClick } from "@/lib/analytics";

function usePerView() {
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setPerView(mq.matches ? 3 : 1);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return perView;
}

function chunkCourses(courses: Course[], size: number): Course[][] {
  if (size <= 0) return [];
  const pages: Course[][] = [];
  for (let i = 0; i < courses.length; i += size) {
    pages.push(courses.slice(i, i + size));
  }
  return pages;
}

export function CoursePathsCarousel({
  courses,
  heading = "Which path fits you?",
  subheading = "Whether you've never touched a steering wheel or you just need a confidence refresher — we'll help you choose the right course. No pressure. No upselling.",
}: {
  courses: Course[];
  heading?: React.ReactNode;
  subheading?: string;
}) {
  const perView = usePerView();
  const pages = useMemo(() => chunkCourses(courses, perView), [courses, perView]);
  const [pageIndex, setPageIndex] = useState(0);
  const pageCount = pages.length;

  useEffect(() => {
    setPageIndex((i) => Math.min(i, Math.max(0, pageCount - 1)));
  }, [pageCount, perView]);

  // Advance a full page at a time (3 on desktop, 1 on mobile).
  useEffect(() => {
    if (pageCount <= 1) return;
    const id = window.setInterval(() => {
      setPageIndex((i) => (i >= pageCount - 1 ? 0 : i + 1));
    }, 5000);
    return () => window.clearInterval(id);
  }, [pageCount]);

  function go(delta: number) {
    setPageIndex((i) => {
      const next = i + delta;
      if (next < 0) return pageCount - 1;
      if (next >= pageCount) return 0;
      return next;
    });
  }

  // Only one Popular badge across the catalogue (first Class B Full).
  const popularId = useMemo(() => {
    const hit = courses.find(isPopularCourse);
    return hit?.id ?? null;
  }, [courses]);

  if (courses.length === 0) {
    return (
      <section className="bg-[var(--cream)] py-16 md:py-24">
        <div className="mx-auto w-full max-w-[90rem] px-4 text-center md:px-12 lg:px-16 xl:px-20">
          <h2 className="font-display text-3xl font-semibold text-[var(--ink)]">{heading}</h2>
          <p className="mt-4 text-[var(--muted)]">
            Course packages are being updated. WhatsApp us and we&apos;ll help you choose.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--cream)] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[90rem] px-4 md:px-12 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
            {subheading}
          </p>
          <p className="mt-3 text-sm font-medium text-[var(--muted)]">
            {courses.length} course{courses.length === 1 ? "" : "s"} from the catalogue
          </p>
        </div>

        <div className="relative mt-10 md:mt-14">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${pageIndex * 100}%)` }}
            >
              {pages.map((page, p) => (
                <div key={p} className="flex w-full shrink-0">
                  {page.map((course) => (
                    <div
                      key={course.id}
                      className="min-w-0 shrink-0 px-1.5 md:px-2"
                      style={{ width: `${100 / perView}%` }}
                    >
                      <CoursePathCard
                        course={course}
                        popular={course.id === popularId}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {pageCount > 1 ? (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-0 top-[40%] z-10 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-lg text-[var(--ink)] shadow-sm hover:border-black/25 md:flex"
                aria-label="Previous courses"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-0 top-[40%] z-10 hidden h-10 w-10 translate-x-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-lg text-[var(--ink)] shadow-sm hover:border-black/25 md:flex"
                aria-label="Next courses"
              >
                ›
              </button>
            </>
          ) : null}
        </div>

        {pageCount > 1 ? (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show course set ${i + 1}`}
                onClick={() => setPageIndex(i)}
                className={`h-2.5 rounded-full transition ${
                  i === pageIndex
                    ? "w-6 bg-[var(--accent)]"
                    : "w-2.5 bg-black/15 hover:bg-black/25"
                }`}
              />
            ))}
          </div>
        ) : null}

        <div className="mt-12 text-center md:mt-14">
          <p className="text-base text-[var(--muted)] md:text-lg">
            Not sure which package fits? Answer a few questions — we&apos;ll recommend one.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Button
              href="/find-your-course"
              variant="primary"
              size="lg"
              onClick={() => trackFindCourseClick("carousel_closer")}
            >
              Find Your Course
            </Button>
            <WhatsAppButton size="lg" context="home_courses" />
          </div>
        </div>
      </div>
    </section>
  );
}
