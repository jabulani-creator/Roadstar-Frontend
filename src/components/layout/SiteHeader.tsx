"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildHomepageWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { BrandMark } from "@/components/layout/BrandMark";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/contactCopy";

/** Primary story nav — deeper pages live in the footer. */
const links = [
  { href: "/courses-and-fees", label: "Courses & fees" },
  { href: "/find-your-course", label: "Find your course" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/contact", label: "Contact" },
];

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/courses-and-fees", label: "Courses & fees" },
  { href: "/find-your-course", label: "Find your course" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/fleet", label: "Fleet" },
  { href: "/contact", label: "Contact" },
];

const secondaryLinks = [
  { href: "/licence-classes", label: "Licence classes" },
  { href: "/professional-fleet", label: "Professional & fleet" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Register" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const overHero = pathname === "/" && !open;
  const mobileTealBar = !overHero && !open;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={
        overHero
          ? "absolute inset-x-0 top-0 z-40 border-b border-transparent bg-transparent"
          : open
            ? "fixed inset-x-0 top-0 z-[60] border-b border-transparent bg-transparent"
            : "sticky top-0 z-40 border-b border-[var(--brand-strong)]/30 bg-[var(--brand)] lg:border-black/5 lg:bg-[var(--surface)]/95 lg:backdrop-blur"
      }
    >
      <div className="relative z-[60] mx-auto flex h-[var(--site-header-height)] w-full max-w-none items-center justify-between gap-3 px-4 md:gap-4 md:px-12 lg:px-16 xl:px-20">
        <Link
          href="/"
          className="flex min-w-0 items-center"
          onClick={() => setOpen(false)}
        >
          <BrandMark light={overHero || open} onTeal={mobileTealBar} />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                overHero
                  ? "text-sm font-medium uppercase tracking-[0.12em] text-white/90 transition hover:text-[var(--brand-soft)] lg:text-base"
                  : "text-sm font-medium uppercase tracking-[0.12em] text-[var(--ink)]/80 transition hover:text-[var(--brand)] lg:text-base"
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {!open ? (
            <div className="hidden sm:block">
              <WhatsAppButton />
            </div>
          ) : null}
          <button
            type="button"
            className={
              open
                ? "inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--brand)] shadow-sm lg:hidden"
                : overHero
                  ? "inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden"
                  : "inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10 lg:text-[var(--ink)] lg:hover:bg-black/5 lg:hidden"
            }
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span
                className={`absolute block h-0.5 w-5 bg-current transition duration-300 ${
                  open ? "translate-y-0 rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-5 bg-current transition duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-5 bg-current transition duration-300 ${
                  open ? "translate-y-0 -rotate-45" : "translate-y-1.5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Full-VH teal menu — orange accents; expands from top-left */}
      <div
        id="mobile-nav-panel"
        className={`fixed inset-0 z-50 flex h-[100svh] w-full origin-top-left flex-col bg-[var(--brand)] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open
            ? "pointer-events-auto translate-x-0 translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-x-6 -translate-y-6 scale-[0.35] opacity-0"
        }`}
        aria-hidden={!open}
      >
        {/* Soft orange wash in the corner */}
        <div
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[var(--accent)]/25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[var(--accent)]/15 blur-2xl"
          aria-hidden
        />

        <div className="relative flex h-full w-full flex-col px-6 pb-8 pt-[calc(var(--site-header-height)+1.25rem)]">
          <nav className="flex flex-1 flex-col justify-center">
            {primaryLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`border-b border-white/20 py-3.5 text-sm font-normal uppercase tracking-[0.14em] text-white/90 transition hover:text-[var(--accent)] sm:text-base ${
                  i === 0 ? "border-t border-white/20" : ""
                } ${open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                style={{
                  transitionDelay: open ? `${80 + i * 35}ms` : "0ms",
                  transitionProperty: "opacity, transform",
                  transitionDuration: "380ms",
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div
            className={`mt-6 border-t border-[var(--accent)]/40 pt-5 transition duration-400 ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: open ? "320ms" : "0ms" }}
          >
            <div className="flex flex-wrap gap-x-5 gap-y-2.5">
              {secondaryLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)] transition hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div
            className={`mt-6 flex items-center gap-3 rounded-2xl border border-[var(--accent)]/35 bg-black/20 px-4 py-4 transition duration-400 ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: open ? "380ms" : "0ms" }}
          >
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                Quick contact
              </p>
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="mt-1 block truncate text-base font-semibold text-white"
              >
                {CONTACT_PHONE_DISPLAY}
              </a>
              <p className="mt-0.5 truncate text-sm text-white/70">
                Plot No. 238, Vubu Road, Emmasdale
              </p>
            </div>
            <a
              href={buildHomepageWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[var(--brand)] shadow-sm"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
                <path d="M20.5 3.5A11 11 0 004.1 17.4L3 21l3.7-1A11 11 0 1020.5 3.5zm-8.5 17a9 9 0 01-4.6-1.3l-.3-.2-2.7.7.7-2.6-.2-.3A9 9 0 1120 12a9 9 0 01-8 8.5zm5-6.7c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 01-2.2-1.4 8.2 8.2 0 01-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5c.1-.1.2-.3.3-.4s0-.3 0-.4-.6-1.5-.8-2-.2-.5-.5-.5h-.4c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3a9.5 9.5 0 003.6 3.2c1.3.6 1.8.7 2.4.6.4-.1 1.2-.5 1.4-1s.2-.9.1-1-.2-.2-.5-.3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
