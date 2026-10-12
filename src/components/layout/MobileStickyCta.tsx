"use client";

import { useEffect, useState } from "react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/**
 * Sticky bottom CTA — mobile only.
 * Hidden while the home hero is on screen; appears only after you scroll past it.
 * On other pages, appears after a short scroll.
 */
export function MobileStickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-home-hero]");

    if (hero) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Keep hidden while any meaningful part of the hero is visible.
          setShow(!entry.isIntersecting);
        },
        {
          // Fire as soon as the hero leaves the viewport (no early peek).
          root: null,
          threshold: 0,
          rootMargin: "0px",
        },
      );
      observer.observe(hero);
      // Sync immediately in case observer is delayed.
      const rect = hero.getBoundingClientRect();
      setShow(rect.bottom <= 0);
      return () => observer.disconnect();
    }

    const onScroll = () => setShow(window.scrollY > 160);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white px-3 py-2.5 md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <WhatsAppButton fullWidth className="flex-1" context="sticky_bar" />
        <a
          href="/find-your-course"
          className="inline-flex h-11 flex-[1.35] items-center justify-center rounded-md bg-[var(--brand)] text-sm font-semibold text-white"
        >
          Find Your Course
        </a>
      </div>
    </div>
  );
}
