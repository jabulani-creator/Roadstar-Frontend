import type { Course, RTSAItem } from "./types";

/** Pathway fees used in the combined cost estimate (provisional path). */
export const PATHWAY_SLUGS = [
  "demo-rtsa-provisional",
  "demo-medical-certificate",
  "demo-rtsa-practical-test",
  "demo-rtsa-licence-printing",
] as const;

export function pathwayFees(items: RTSAItem[]): RTSAItem[] {
  const bySlug = new Map(items.map((i) => [i.slug, i]));
  return PATHWAY_SLUGS.map((s) => bySlug.get(s)).filter(Boolean) as RTSAItem[];
}

export function pathwayTotal(items: RTSAItem[]): number {
  return pathwayFees(items).reduce((sum, i) => sum + Number(i.fee_amount ?? 0), 0);
}

export function combinedEstimate(
  course: Course,
  rtsaItems: RTSAItem[],
): { tuition: number; additional: number; combined: number } | null {
  if (!course.show_price || course.price_amount == null) return null;
  const tuition = Number(course.price_amount);
  const additional = pathwayTotal(rtsaItems);
  return { tuition, additional, combined: tuition + additional };
}
