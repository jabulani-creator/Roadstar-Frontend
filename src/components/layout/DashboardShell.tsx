"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DashboardNav } from "@/components/layout/DashboardNav";
import { authService } from "@/lib/services/authService";
import { getAccessToken } from "@/lib/api";
import type { MeUser } from "@/lib/types";

const titles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": {
    title: "Overview",
    subtitle: "Manage what learners see on the Roadstar site.",
  },
  "/dashboard/courses": {
    title: "Courses & fees",
    subtitle: "Edit packages, tuition, and publish status.",
  },
  "/dashboard/fleet": {
    title: "Fleet",
    subtitle: "Vehicle profiles and cutout photos for the public fleet.",
  },
  "/dashboard/instructors": {
    title: "Instructors",
    subtitle: "Public bios, classes, and transmission capabilities.",
  },
};

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [me, setMe] = useState<MeUser | null>(null);

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/login");
      return;
    }
    authService
      .me()
      .then(setMe)
      .catch(() => {
        authService.logout();
        router.replace("/login");
      });
  }, [router]);

  if (!me) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--cream)] text-sm text-[var(--muted)]">
        Checking session…
      </div>
    );
  }

  const meta = titles[pathname] ?? {
    title: "Dashboard",
    subtitle: "Roadstar staff CMS",
  };
  const displayName =
    [me.first_name, me.last_name].filter(Boolean).join(" ") || me.email.split("@")[0];
  const roleLabel = me.roles?.[0]?.role_label || (me.is_superuser ? "Owner" : "Staff");
  const initials = displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="min-h-screen bg-[var(--surface)] md:flex">
      <DashboardNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-14 z-20 flex items-center justify-between gap-3 border-b border-black/5 bg-[var(--surface)]/95 px-4 py-3 backdrop-blur-md md:top-0 md:gap-4 md:px-8 md:py-4">
          <div className="min-w-0">
            <h1 className="truncate font-display text-lg font-semibold text-[var(--ink)] md:text-2xl">
              {meta.title}
            </h1>
            <p className="mt-0.5 hidden text-sm text-[var(--muted)] md:block">{meta.subtitle}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg bg-[var(--panel)] py-1 pl-1 pr-2.5 md:gap-2 md:pr-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand)] text-xs font-semibold text-white">
              {initials || "R"}
            </span>
            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-sm font-semibold text-[var(--ink)]">{displayName}</p>
              <p className="truncate text-[11px] text-[var(--muted)]">{roleLabel}</p>
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
