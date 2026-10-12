"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Vehicle } from "@/lib/types";
import { vehicleLearnerSpecs, vehiclePhoto } from "@/lib/fleetMedia";
import { VehiclePlaceholder } from "@/components/ui/PlaceholderIcons";

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

function VehicleSlide({ vehicle }: { vehicle: Vehicle }) {
  const specs = vehicleLearnerSpecs(vehicle);
  const photo = vehiclePhoto(vehicle);
  const alt = `${vehicle.name} — ${vehicle.licence_class_label} ${vehicle.transmission_label}`;

  return (
    <article className="mx-auto flex h-full w-full max-w-[22rem] flex-col">
      <h3 className="text-center font-display text-xl font-semibold tracking-tight text-[var(--ink)] md:text-2xl">
        {vehicle.name}
      </h3>

      {/* Photo: floating cutout, no box/shadow. Empty: icon only. Soft panel below = demarcation. */}
      <div className="relative mx-auto mt-8 flex h-44 w-full items-end justify-center md:h-52">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={alt}
            className="max-h-full w-auto max-w-full object-contain"
          />
        ) : (
          <VehiclePlaceholder
            name={alt}
            licenceClass={vehicle.licence_class}
            vehicleType={vehicle.vehicle_type}
          />
        )}
      </div>

      {/* Soft shaded list panel — subtle column demarcation, not a full card */}
      <div className="mt-8 overflow-hidden rounded-lg bg-[var(--panel)]">
        <ul>
          {specs.map((spec) => (
            <li
              key={spec.label}
              className="flex items-baseline justify-between gap-4 border-b border-black/10 px-4 py-3.5 last:border-b-0"
            >
              <span className="text-sm text-[var(--muted)]">{spec.label}</span>
              <span className="text-right text-sm font-semibold text-[var(--ink)]">
                {spec.value}
              </span>
            </li>
          ))}
        </ul>
        {vehicle.public_description ? (
          <p className="border-t border-black/10 px-4 py-3.5 text-sm leading-relaxed text-[var(--muted)]">
            {vehicle.public_description}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export function FleetCarousel({
  vehicles,
  variant = "page",
  heading = "Our training fleet",
  subheading = "These are the actual vehicles Roadstar uses for lessons. Filter by what matters to you — class, transmission, and where you’ll train.",
}: {
  vehicles: Vehicle[];
  variant?: "page" | "home";
  heading?: React.ReactNode;
  subheading?: string;
}) {
  const perView = usePerView();
  const [index, setIndex] = useState(0);

  const maxIndex = Math.max(0, vehicles.length - perView);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex, perView]);

  // Auto-scroll on mobile (one vehicle at a time).
  useEffect(() => {
    if (perView !== 1 || vehicles.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i >= vehicles.length - 1 ? 0 : i + 1));
    }, 4500);
    return () => window.clearInterval(id);
  }, [perView, vehicles.length]);

  const pages = useMemo(() => {
    if (vehicles.length === 0) return 0;
    return maxIndex + 1;
  }, [vehicles.length, maxIndex]);

  function go(delta: number) {
    setIndex((i) => {
      const next = i + delta;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });
  }

  if (vehicles.length === 0) {
    return (
      <section className="bg-[var(--cream)] py-16 md:py-24">
        <div className="mx-auto w-full max-w-[90rem] px-4 text-center md:px-12 lg:px-16 xl:px-20">
          <h2 className="font-display text-3xl font-semibold text-[var(--ink)]">{heading}</h2>
          <p className="mt-4 text-[var(--muted)]">
            Fleet details are being updated. WhatsApp us and we&apos;ll tell you what&apos;s
            available.
          </p>
        </div>
      </section>
    );
  }

  const slidePercent = 100 / perView;

  return (
    <section
      className={
        variant === "home"
          ? "bg-[var(--cream)] py-16 md:py-24"
          : "bg-[var(--cream)] py-12 md:py-16"
      }
    >
      <div className="mx-auto w-full max-w-[90rem] px-4 md:px-12 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
            {subheading}
          </p>
          <p className="mt-3 text-sm font-medium text-[var(--muted)]">
            {vehicles.length} vehicle{vehicles.length === 1 ? "" : "s"} available for lessons
          </p>
        </div>

        <div className="relative mt-10 md:mt-14">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${index * slidePercent}%)`,
              }}
            >
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  className="shrink-0 px-1.5 md:px-2"
                  style={{ width: `${slidePercent}%` }}
                >
                  <VehicleSlide vehicle={v} />
                </div>
              ))}
            </div>
          </div>

          {vehicles.length > perView ? (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-0 top-[28%] z-10 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-lg text-[var(--ink)] shadow-sm hover:border-[var(--brand)] md:flex"
                aria-label="Previous vehicles"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-0 top-[28%] z-10 hidden h-10 w-10 translate-x-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-lg text-[var(--ink)] shadow-sm hover:border-[var(--brand)] md:flex"
                aria-label="Next vehicles"
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
                aria-label={`Show fleet set ${i + 1}`}
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

        {variant === "home" ? (
          <p className="mt-10 text-center">
            <Link
              href="/fleet"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--ink)]/15 bg-white px-6 py-3 text-sm font-semibold text-[var(--ink)] shadow-sm transition hover:border-[var(--ink)]/40"
            >
              See all {vehicles.length} vehicles →
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
