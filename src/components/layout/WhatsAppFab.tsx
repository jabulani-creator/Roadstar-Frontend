"use client";

import { useEffect, useState } from "react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/**
 * Desktop floating WhatsApp.
 * Hidden on the homepage while the hero is visible (header + hero already have CTAs).
 * On other pages, always available.
 */
export function WhatsAppFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-home-hero]");
    if (!hero) {
      setShow(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    setShow(hero.getBoundingClientRect().bottom <= 0);
    return () => observer.disconnect();
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 hidden md:block">
      <WhatsAppButton size="md" context="fab" />
    </div>
  );
}
