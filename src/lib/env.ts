/** Public site origin — production uses DJANGO_ORIGIN / NEXT_PUBLIC_SITE_URL. */
const siteOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.DJANGO_ORIGIN ||
  "https://roadstardriving.co.zm"
).replace(/\/$/, "");

/**
 * API base. Prefer NEXT_PUBLIC_API_URL; otherwise derive from DJANGO_ORIGIN
 * so production builds never bake in 127.0.0.1.
 */
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  (process.env.DJANGO_ORIGIN
    ? `${process.env.DJANGO_ORIGIN.replace(/\/$/, "")}/api/v1`
    : "http://127.0.0.1:8000/api/v1");

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "260975072617";

export const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME ?? "RoadStar Driving School";

export const SITE_URL = siteOrigin;

/** GA4 measurement ID — leave unset locally; set in production. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || "";

/** Optional Google Business / Maps review link for staff WhatsApp ask. */
export const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL?.trim() || "";
