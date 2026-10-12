"use client";

import { useEffect, useRef } from "react";

/** Scroll the edit panel into view whenever a record is opened. */
export function useScrollToEdit(selectedId: number | string | null | undefined) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedId == null) return;
    // Defer so the panel is in the DOM first.
    const id = window.setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => window.clearTimeout(id);
  }, [selectedId]);

  return ref;
}
