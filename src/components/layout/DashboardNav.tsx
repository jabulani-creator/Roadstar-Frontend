"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authService } from "@/lib/services/authService";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview", icon: OverviewIcon, exact: true },
  { href: "/dashboard/courses", label: "Courses & fees", icon: CourseIcon },
  { href: "/dashboard/fleet", label: "Fleet", icon: FleetIcon },
  { href: "/dashboard/instructors", label: "Instructors", icon: InstructorIcon },
  { href: "/dashboard/branches", label: "Branches", icon: BranchIcon },
  { href: "/dashboard/rtsa", label: "RTSA & licensing", icon: RtsaIcon },
  { href: "/dashboard/faqs", label: "FAQs", icon: FaqIcon },
] as const;

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function logout() {
    authService.logout();
    router.push("/login");
  }

  return (
    <>
      {/* Mobile: compact teal bar + drawer */}
      <div className="sticky top-0 z-40 bg-[var(--brand)] md:hidden">
        <div className="flex h-14 items-center justify-between gap-3 px-4">
          <Link
            href="/dashboard"
            className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[var(--brand)]"
          >
            Roadstar
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/15"
            aria-expanded={open}
            aria-controls="dashboard-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative flex h-4 w-5 items-center justify-center">
              <span
                className={cn(
                  "absolute block h-0.5 w-5 bg-current transition",
                  open ? "translate-y-0 rotate-45" : "-translate-y-1.5",
                )}
              />
              <span
                className={cn(
                  "absolute block h-0.5 w-5 bg-current transition",
                  open ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "absolute block h-0.5 w-5 bg-current transition",
                  open ? "translate-y-0 -rotate-45" : "translate-y-1.5",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden" id="dashboard-mobile-menu">
          <button
            type="button"
            className="absolute inset-0 bg-[var(--ink)]/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <nav className="absolute inset-y-0 right-0 flex w-[min(19rem,88vw)] flex-col bg-[var(--brand)] text-white shadow-xl">
            <div className="flex items-center justify-between border-b border-white/15 px-4 py-4">
              <div>
                <p className="font-semibold">Menu</p>
                <p className="text-xs text-white/75">Staff CMS · Lusaka</p>
              </div>
              <button
                type="button"
                className="rounded-full px-3 py-1.5 text-sm text-white/90 hover:bg-white/15"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
              {links.map((item) => {
                const active = isActive(pathname, item.href, "exact" in item ? item.exact : false);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition",
                      active
                        ? "bg-white font-semibold text-[var(--brand)]"
                        : "text-white/90 hover:bg-white/15",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="space-y-1 border-t border-white/15 px-3 py-4">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/90 hover:bg-white/15"
              >
                <SiteIcon className="h-4 w-4 shrink-0" />
                View public site
              </Link>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-white/90 hover:bg-white/15"
                onClick={logout}
              >
                <LogoutIcon className="h-4 w-4 shrink-0" />
                Log out
              </button>
            </div>
          </nav>
        </div>
      ) : null}

      {/* Desktop sidebar */}
      <aside className="hidden shrink-0 flex-col bg-[var(--brand)] text-white md:flex md:min-h-screen md:w-64 md:border-r md:border-[var(--brand-strong)]/30">
        <div className="px-4 py-5">
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold tracking-wide text-[var(--brand)]"
          >
            Roadstar
          </Link>
          <p className="mt-3 text-xs text-white/80">Staff CMS · Lusaka</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 pb-4">
          <p className="mb-1 mt-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-soft)]">
            Catalogue
          </p>
          {links.map((item) => {
            const active = isActive(pathname, item.href, "exact" in item ? item.exact : false);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
                  active
                    ? "bg-white font-semibold text-[var(--brand)]"
                    : "text-white/90 hover:bg-white/15",
                )}
              >
                <Icon className="h-4 w-4 shrink-0 opacity-90" />
                {item.label}
              </Link>
            );
          })}

          <div className="mt-auto space-y-1 border-t border-white/20 pt-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/85 hover:bg-white/15"
            >
              <SiteIcon className="h-4 w-4 shrink-0" />
              View public site
            </Link>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-white/85 hover:bg-white/15"
              onClick={logout}
            >
              <LogoutIcon className="h-4 w-4 shrink-0" />
              Log out
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}

function OverviewIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CourseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v14.5a.5.5 0 0 1-.5.5H6.5A2.5 2.5 0 0 0 4 21.5V6.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path d="M8 8h8M8 12h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function FleetIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3 15.5h18l-1.2-5.2A2 2 0 0 0 17.86 9H6.14a2 2 0 0 0-1.94 1.3L3 15.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M5 15.5v2.5h2.5M16.5 18H19v-2.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="8" cy="18" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="18" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function InstructorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M5.5 19.5c1.6-3 4-4.5 6.5-4.5s4.9 1.5 6.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BranchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 21s6-4.5 6-10a6 6 0 1 0-12 0c0 5.5 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.25" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function RtsaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M8 9h8M8 13h8M8 17h5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FaqIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M9.5 9.5a2.5 2.5 0 1 1 3.2 2.4c-.7.3-1.2.9-1.2 1.6V14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" />
    </svg>
  );
}

function SiteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M4.5 12h15M12 4.5c2.2 2.3 3.3 4.8 3.3 7.5S14.2 17.2 12 19.5C9.8 17.2 8.7 14.7 8.7 12S9.8 6.8 12 4.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M10 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M14 8l4 4-4 4M10 12h8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
