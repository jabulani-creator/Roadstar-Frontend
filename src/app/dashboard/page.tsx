"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/cms/StatusBadge";
import { courseService } from "@/lib/services/courseService";
import { fleetService } from "@/lib/services/fleetService";
import { formatZmw } from "@/lib/utils";
import type { Course, Instructor, Vehicle } from "@/lib/types";

export default function DashboardHomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"courses" | "fleet" | "instructors">("courses");
  const [query, setQuery] = useState("");

  useEffect(() => {
    Promise.all([
      courseService.listStaff(),
      fleetService.vehiclesStaff(),
      fleetService.instructorsStaff(),
    ])
      .then(([c, v, i]) => {
        setCourses(c);
        setVehicles(v);
        setInstructors(i);
      })
      .catch((e) => setError(String(e.message || e)));
  }, []);

  const approvedCourses = courses.filter((c) => c.status === "approved").length;
  const publicFleet = vehicles.filter((v) => v.show_on_public_page).length;
  const publicInstructors = instructors.filter((i) => i.show_on_public_page).length;

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.licence_class_label?.toLowerCase().includes(q) ||
        c.status?.toLowerCase().includes(q),
    );
  }, [courses, query]);

  const filteredVehicles = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return vehicles;
    return vehicles.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.licence_class_label?.toLowerCase().includes(q) ||
        v.status?.toLowerCase().includes(q),
    );
  }, [vehicles, query]);

  const filteredInstructors = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return instructors;
    return instructors.filter(
      (i) =>
        i.display_name.toLowerCase().includes(q) ||
        i.licence_classes?.toLowerCase().includes(q),
    );
  }, [instructors, query]);

  return (
    <div className="space-y-6">
      {error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>
      ) : null}

      {/* Soft panels — same language as the public site */}
      <div className="grid gap-4 md:grid-cols-3">
        <ActionCard
          href="/dashboard/courses"
          title="Courses & fees"
          body={`${approvedCourses} live · ${courses.length} total packages`}
          cta="Manage"
          tone="teal"
        />
        <ActionCard
          href="/dashboard/fleet"
          title="Training fleet"
          body={`${publicFleet} on public page · ${vehicles.length} vehicles`}
          cta="Update"
          tone="cream"
        />
        <ActionCard
          href="/dashboard/instructors"
          title="Instructors"
          body={`${publicInstructors} public · ${instructors.length} profiles`}
          cta="Edit"
          tone="orange"
        />
        <ActionCard
          href="/dashboard/branches"
          title="Branches"
          body="Emmasdale, Thornpark — address, map, hours"
          cta="Manage"
          tone="teal"
        />
        <ActionCard
          href="/dashboard/rtsa"
          title="RTSA & licensing"
          body="Statutory fees and pathway guidance"
          cta="Update"
          tone="cream"
        />
        <ActionCard
          href="/dashboard/faqs"
          title="FAQs"
          body="Publish answers prospects ask before WhatsApp"
          cta="Edit"
          tone="orange"
        />
      </div>

      {/* Workbench panel */}
      <section className="rounded-lg bg-[var(--panel)] px-4 py-5 md:px-6 md:py-6">
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["courses", "Courses"],
              ["fleet", "Fleet"],
              ["instructors", "Instructors"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                tab === key
                  ? "bg-[var(--brand)] text-white"
                  : "bg-[var(--cream)] text-[var(--muted)] hover:text-[var(--brand)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              tab === "courses"
                ? "Search course name or class…"
                : tab === "fleet"
                  ? "Search vehicle name or status…"
                  : "Search instructor name…"
            }
            className="h-11 flex-1 rounded-md border border-black/10 bg-white px-3 text-sm outline-none ring-[var(--brand)]/25 focus:ring-2"
          />
          <Button
            href={
              tab === "courses"
                ? "/dashboard/courses"
                : tab === "fleet"
                  ? "/dashboard/fleet"
                  : "/dashboard/instructors"
            }
          >
            Open {tab}
          </Button>
        </div>

        <div className="mt-5 space-y-3">
          {tab === "courses" &&
            filteredCourses.slice(0, 6).map((c) => (
              <WorkbenchRow
                key={c.id}
                href="/dashboard/courses"
                title={c.name}
                meta={`${c.licence_class_label} · ${formatZmw(c.price_amount)}`}
                badge={<StatusBadge status={c.status} />}
                action="Edit"
              />
            ))}
          {tab === "fleet" &&
            filteredVehicles.slice(0, 6).map((v) => (
              <WorkbenchRow
                key={v.id}
                href="/dashboard/fleet"
                title={v.name}
                meta={`${v.licence_class_label} · ${v.transmission_label}${v.show_on_public_page ? " · Public" : ""}`}
                badge={<StatusBadge status={v.status} />}
                action="Edit"
              />
            ))}
          {tab === "instructors" &&
            filteredInstructors.slice(0, 6).map((i) => (
              <WorkbenchRow
                key={i.id}
                href="/dashboard/instructors"
                title={i.display_name}
                meta={`${i.licence_classes} · ${i.transmission_label}${i.show_on_public_page ? " · Public" : ""}`}
                badge={
                  <span className="rounded-full bg-[var(--teal-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--brand)]">
                    {i.show_on_public_page ? "Public" : i.status || "Staff"}
                  </span>
                }
                action="Edit"
              />
            ))}
          {tab === "courses" && filteredCourses.length === 0 ? (
            <EmptyRow label="No courses match." />
          ) : null}
          {tab === "fleet" && filteredVehicles.length === 0 ? (
            <EmptyRow label="No vehicles match." />
          ) : null}
          {tab === "instructors" && filteredInstructors.length === 0 ? (
            <EmptyRow label="No instructors match." />
          ) : null}
        </div>
      </section>
    </div>
  );
}

function ActionCard({
  href,
  title,
  body,
  cta,
  tone,
}: {
  href: string;
  title: string;
  body: string;
  cta: string;
  tone: "teal" | "cream" | "orange";
}) {
  const shell =
    tone === "teal"
      ? "bg-[var(--teal-soft)]"
      : tone === "orange"
        ? "bg-[var(--cream)] ring-1 ring-[var(--accent)]/25"
        : "bg-[var(--panel)]";
  const mark = tone === "orange" ? "bg-[var(--accent)]" : "bg-[var(--brand)]";

  return (
    <Link
      href={href}
      className={`rounded-lg ${shell} px-5 py-6 transition hover:brightness-[0.98]`}
    >
      <span className={`inline-block h-1.5 w-10 rounded-full ${mark}`} aria-hidden />
      <h2 className="mt-4 font-display text-xl font-semibold text-[var(--ink)]">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{body}</p>
      <span className="mt-5 inline-flex text-sm font-semibold text-[var(--brand)]">
        {cta} →
      </span>
    </Link>
  );
}

function WorkbenchRow({
  href,
  title,
  meta,
  badge,
  action,
}: {
  href: string;
  title: string;
  meta: string;
  badge: React.ReactNode;
  action: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-[var(--cream)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold text-[var(--ink)]">{title}</p>
          {badge}
        </div>
        <p className="mt-1 text-sm text-[var(--muted)]">{meta}</p>
      </div>
      <Link
        href={href}
        className="inline-flex shrink-0 items-center justify-center rounded-md bg-[var(--brand)] px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-[var(--brand-strong)]"
      >
        {action}
      </Link>
    </div>
  );
}

function EmptyRow({ label }: { label: string }) {
  return <p className="px-1 py-6 text-center text-sm text-[var(--muted)]">{label}</p>;
}
