import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/business";
import { branchService } from "@/lib/services/branchService";
import { courseService } from "@/lib/services/courseService";
import { fleetService } from "@/lib/services/fleetService";

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const STATIC: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/courses-and-fees", priority: 0.95, changeFrequency: "weekly" },
  { path: "/locations/emmasdale", priority: 0.95, changeFrequency: "monthly" },
  { path: "/licence-classes/class-b", priority: 0.85, changeFrequency: "monthly" },
  { path: "/licence-classes", priority: 0.75, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
  { path: "/locations", priority: 0.7, changeFrequency: "monthly" },
  { path: "/fleet", priority: 0.65, changeFrequency: "monthly" },
  { path: "/faqs", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
  { path: "/find-your-course", priority: 0.7, changeFrequency: "monthly" },
  { path: "/licensing", priority: 0.55, changeFrequency: "monthly" },
  { path: "/professional-fleet", priority: 0.5, changeFrequency: "monthly" },
];

function thornparkReady(branch: {
  address?: string;
  map_url?: string;
}): boolean {
  return Boolean(branch.address?.trim() && branch.map_url?.trim());
}

function instructorsReady(
  list: { public_bio?: string; display_name?: string }[],
): boolean {
  // Gate: need real bios (not empty placeholders) for at least one instructor
  const withBio = list.filter((i) => (i.public_bio ?? "").trim().length > 40);
  return withBio.length >= 1;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = STATIC.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  try {
    const branches = await branchService.listPublic();
    const thorn = branches.find(
      (b) =>
        b.slug === "thornpark" || b.name.toLowerCase().includes("thornpark"),
    );
    if (thorn && thornparkReady(thorn)) {
      entries.push({
        url: `${SITE_URL}/locations/thornpark`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.9,
      });
    }
  } catch {
    /* omit gated pages on API failure */
  }

  try {
    const instructors = await fleetService.instructorsPublic();
    if (instructorsReady(instructors)) {
      entries.push({
        url: `${SITE_URL}/instructors`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.85,
      });
    }
  } catch {
    /* omit */
  }

  try {
    const courses = await courseService.listPublic();
    for (const c of courses) {
      if (!c.slug) continue;
      // Index only courses with real tuition or a clear summary
      if (!(c.show_price && c.price_amount) && !(c.summary?.trim().length > 20)) {
        continue;
      }
      entries.push({
        url: `${SITE_URL}/courses/${c.slug}`,
        lastModified: c.price_updated_at ? new Date(c.price_updated_at) : now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    const hasC1orC = courses.some((c) => c.licence_class === "C1" || c.licence_class === "C");
    if (hasC1orC) {
      entries.push({
        url: `${SITE_URL}/licence-classes/class-c1-c`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  } catch {
    /* omit dynamic courses */
  }

  return entries;
}
