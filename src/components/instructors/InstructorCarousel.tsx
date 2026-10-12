"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Instructor } from "@/lib/types";
import { InstructorProfile } from "@/components/instructors/InstructorProfile";

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

export function InstructorCarousel({
  instructors,
  heading = "You'll be taught by people who remember what it felt like to be a beginner.",
  subheading = "Certified, patient instructors. No shouting. No rushing. We go at your pace.",
}: {
  instructors: Instructor[];
  heading?: React.ReactNode;
  subheading?: string;
}) {
  const perView = usePerView();
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, instructors.length - perView);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex, perView]);

  useEffect(() => {
    if (perView !== 1 || instructors.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i >= instructors.length - 1 ? 0 : i + 1));
    }, 4500);
    return () => window.clearInterval(id);
  }, [perView, instructors.length]);

  const pages = useMemo(() => {
    if (instructors.length === 0) return 0;
    return maxIndex + 1;
  }, [instructors.length, maxIndex]);

  function go(delta: number) {
    setIndex((i) => {
      const next = i + delta;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });
  }

  if (instructors.length === 0) {
    return (
      <section id="instructors" className="scroll-mt-24 bg-[var(--surface)] py-16 md:py-24">
        <div className="mx-auto w-full max-w-[90rem] px-4 text-center md:px-12 lg:px-16 xl:px-20">
          <h2 className="font-display text-3xl font-semibold text-[var(--ink)]">{heading}</h2>
          <p className="mt-4 text-[var(--muted)]">
            Instructor profiles are being updated. WhatsApp us and we&apos;ll introduce you to the
            right teacher.
          </p>
        </div>
      </section>
    );
  }

  const slidePercent = 100 / perView;
  const centerFew = instructors.length > 0 && instructors.length < perView;

  return (
    <section id="instructors" className="scroll-mt-24 bg-[var(--surface)] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[90rem] px-4 md:px-12 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
            {subheading}
          </p>
        </div>

        <div className="relative mt-10 md:mt-14">
          <div className="overflow-hidden">
            <div
              className={`flex transition-transform duration-500 ease-out ${
                centerFew ? "justify-center" : ""
              }`}
              style={
                centerFew
                  ? undefined
                  : { transform: `translateX(-${index * slidePercent}%)` }
              }
            >
              {instructors.map((instructor) => (
                <div
                  key={instructor.id}
                  className="shrink-0 px-1.5 md:px-2"
                  style={{ width: `${slidePercent}%` }}
                >
                  <InstructorProfile instructor={instructor} />
                </div>
              ))}
            </div>
          </div>

          {instructors.length > perView ? (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-0 top-[40%] z-10 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-lg text-[var(--ink)] shadow-sm hover:border-black/25 md:flex"
                aria-label="Previous instructors"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-0 top-[40%] z-10 hidden h-10 w-10 translate-x-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-lg text-[var(--ink)] shadow-sm hover:border-black/25 md:flex"
                aria-label="Next instructors"
              >
                ›
              </button>
            </>
          ) : null}
        </div>

        {pages > 1 ? (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show instructors set ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition ${
                  i === index
                    ? "w-6 bg-[var(--accent)]"
                    : "w-2.5 bg-black/15 hover:bg-black/25"
                }`}
              />
            ))}
          </div>
        ) : null}

        <p className="mt-8 text-center">
          <Link
            href="/instructors"
            className="text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
          >
            See all instructors →
          </Link>
        </p>
      </div>
    </section>
  );
}
