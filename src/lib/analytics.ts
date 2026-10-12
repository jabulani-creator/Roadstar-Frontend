/** GA4 helpers — no-ops when NEXT_PUBLIC_GA_ID is unset. */

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getGaId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_ID?.trim();
  return id || undefined;
}

export function trackEvent(name: string, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;
  if (!getGaId()) return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

export function trackWhatsAppClick(context?: string): void {
  trackEvent("whatsapp_click", {
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    context: context || undefined,
  });
}

export function trackTelClick(context?: string): void {
  trackEvent("tel_click", {
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    context: context || undefined,
  });
}

export function trackFindCourseClick(context?: string): void {
  trackEvent("find_course_click", {
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    context: context || undefined,
  });
}

export function trackRegisterClick(context?: string): void {
  trackEvent("register_click", {
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    context: context || undefined,
  });
}
