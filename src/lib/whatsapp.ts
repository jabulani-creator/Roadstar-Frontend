import { GOOGLE_REVIEW_URL, WHATSAPP_NUMBER } from "./env";
import { formatZmw } from "./utils";
import type { Course } from "./types";

function joinLines(lines: Array<string | false | null | undefined>): string {
  return lines.filter(Boolean).join("\n");
}

function waUrl(body: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
}

/**
 * One enquiry template for the whole site.
 * Optional `details` lines sit in the middle (course name, branch, etc.).
 */
export function buildStandardWhatsAppUrl(details: string[] = []): string {
  return waUrl(
    joinLines([
      "Hi Roadstar Driving School,",
      "I found you on the website and would like to enquire about driving lessons.",
      details.length ? "" : null,
      ...details,
      "",
      "My experience: [Never driven / Some lessons / Licensed, need refresher]",
      "Licence class: [Class B / C1 / C / Not sure]",
      "Transmission: [Manual / Automatic / Either]",
      "Preferred location: [Emmasdale / Thornpark / Pickup]",
      "When I want to start: [ASAP / Within a month / Just exploring]",
      "",
      "Please advise on next steps. Thank you.",
    ]),
  );
}

/** @deprecated Use buildStandardWhatsAppUrl */
export function buildWhatsAppUrl(ctx: {
  courseName?: string;
  licenceClass?: string;
  packageLabel?: string;
  branch?: string;
  message?: string;
} = {}): string {
  return buildStandardWhatsAppUrl(
    [
      ctx.courseName ? `Course: ${ctx.courseName}` : null,
      ctx.licenceClass ? `Licence class: ${ctx.licenceClass}` : null,
      ctx.packageLabel ? `Package: ${ctx.packageLabel}` : null,
      ctx.branch ? `Preferred branch: ${ctx.branch}` : null,
      ctx.message ?? null,
    ].filter(Boolean) as string[],
  );
}

export function buildHomepageWhatsAppUrl(): string {
  return buildStandardWhatsAppUrl();
}

export function buildContactWhatsAppUrl(): string {
  return buildStandardWhatsAppUrl();
}

export function buildCourseWhatsAppUrl(ctx: {
  courseName: string;
  licenceClass?: string;
  levelLabel?: string;
  durationDays?: number | null;
  transmission?: string;
  priceLabel?: string;
  branches?: string;
}): string {
  return buildStandardWhatsAppUrl(
    [
      `Course: ${ctx.courseName}`,
      ctx.licenceClass ? `Licence class: ${ctx.licenceClass}` : null,
      ctx.levelLabel ? `Package: ${ctx.levelLabel}` : null,
      ctx.durationDays != null ? `Duration: ${ctx.durationDays} days` : null,
      ctx.transmission ? `Transmission: ${ctx.transmission}` : null,
      ctx.priceLabel ? `Tuition: ${ctx.priceLabel}` : null,
      ctx.branches ? `Available at: ${ctx.branches}` : null,
    ].filter(Boolean) as string[],
  );
}

export function buildCourseEnquiryWhatsAppUrl(course: Course): string {
  const branches =
    course.branch_details?.map((b) => b.name).filter(Boolean).join(" & ") || undefined;

  return buildCourseWhatsAppUrl({
    courseName: course.name,
    licenceClass: course.licence_class_label,
    levelLabel: course.level_label,
    durationDays: course.duration_days,
    transmission: course.transmission_label,
    priceLabel:
      course.show_price && course.price_amount
        ? formatZmw(course.price_amount)
        : "Please quote",
    branches,
  });
}

export function buildFindYourCourseWhatsAppUrl(ctx: {
  courseName: string;
  experience?: string;
  licenceClass?: string;
  transmission?: string;
  branch?: string;
  startTiming?: string;
}): string {
  return buildStandardWhatsAppUrl(
    [
      "I used Find Your Course and it recommended:",
      `Course: ${ctx.courseName}`,
      ctx.experience ? `Experience: ${ctx.experience}` : null,
      ctx.licenceClass ? `Licence class: ${ctx.licenceClass}` : null,
      ctx.transmission ? `Transmission: ${ctx.transmission}` : null,
      ctx.branch ? `Location: ${ctx.branch}` : null,
      ctx.startTiming ? `Start date: ${ctx.startTiming}` : null,
    ].filter(Boolean) as string[],
  );
}

export function buildInstructorWhatsAppUrl(ctx: {
  instructorName: string;
  experience?: string;
  branch?: string;
  preferredTimes?: string;
}): string {
  return buildStandardWhatsAppUrl(
    [
      `I'd like to book lessons with ${ctx.instructorName}.`,
      ctx.experience ? `Experience: ${ctx.experience}` : null,
      ctx.branch ? `Preferred location: ${ctx.branch}` : null,
      ctx.preferredTimes ? `Preferred times: ${ctx.preferredTimes}` : null,
    ].filter(Boolean) as string[],
  );
}

export function buildLocationWhatsAppUrl(branchName: string): string {
  return buildStandardWhatsAppUrl([`I'm interested in lessons at your ${branchName} branch.`]);
}

/** Emmasdale location page — local-intent lead signal. */
export function buildEmmasdaleWhatsAppUrl(): string {
  return buildStandardWhatsAppUrl([
    "I'm interested in driving lessons at your Emmasdale branch (Plot No. 238, Vubu Road).",
  ]);
}

/** Courses & fees page — commercial-intent lead signal. */
export function buildFeesWhatsAppUrl(): string {
  return buildStandardWhatsAppUrl([
    "I'd like more details on Class B driving lesson fees and start dates.",
  ]);
}

/** Class B owner page. */
export function buildClassBWhatsAppUrl(): string {
  return buildStandardWhatsAppUrl([
    "I'm interested in Class B training (manual or automatic).",
    "My experience: [Never driven / Some lessons / Licensed, need refresher]",
  ]);
}

export function buildProfessionalWhatsAppUrl(): string {
  return buildStandardWhatsAppUrl([
    "I'm enquiring about professional / fleet driver training.",
    "Company: [Company name]",
    "Number of drivers: [Number]",
    "Licence class: [C1 / C]",
    "Training needed: [Defensive driving / Assessment / Full course]",
  ]);
}

export function buildLicenceClassWhatsAppUrl(licenceClass: string): string {
  return buildStandardWhatsAppUrl([
    `I have a question about ${licenceClass} training.`,
    "My current licence: [None / Class B / Other]",
    "I want to: [Get my first licence / Upgrade my class]",
  ]);
}

/**
 * Staff-facing template: ask a completed learner for a Google review.
 * Set NEXT_PUBLIC_GOOGLE_REVIEW_URL to your GBP review link.
 */
export function buildReviewAskWhatsAppUrl(learnerFirstName?: string): string {
  const greeting = learnerFirstName?.trim()
    ? `Hi ${learnerFirstName.trim()},`
    : "Hi,";
  const reviewLine = GOOGLE_REVIEW_URL
    ? `Leave a short Google review here: ${GOOGLE_REVIEW_URL}`
    : "Leave a short Google review for Roadstar Driving School (search us on Google Maps / Emmasdale).";

  return waUrl(
    joinLines([
      greeting,
      "Thank you for training with Roadstar Driving School.",
      "If you were happy with your lessons, a Google review helps other Lusaka learners find us.",
      reviewLine,
      "",
      "No pressure — only if you have a moment. Thank you!",
    ]),
  );
}

export function googleReviewUrl(): string {
  return GOOGLE_REVIEW_URL;
}
