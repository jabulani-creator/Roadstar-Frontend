import { absoluteUrl, business } from "@/lib/business";
import type { Course } from "@/lib/types";
import { formatZmw } from "@/lib/utils";

export function drivingSchoolJsonLd(opts?: {
  path?: string;
  name?: string;
  streetAddress?: string;
  description?: string;
}) {
  const path = opts?.path ?? "/";
  const name = opts?.name ?? business.displayName;
  const street = opts?.streetAddress ?? business.emmasdale.streetAddress;

  return {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    "@id": `${absoluteUrl(path)}#org`,
    name,
    url: absoluteUrl(path),
    telephone: business.phoneTel,
    email: business.email,
    priceRange: "ZMW",
    address: {
      "@type": "PostalAddress",
      streetAddress: street,
      addressLocality: business.emmasdale.addressLocality,
      addressRegion: business.emmasdale.addressRegion,
      postalCode: business.emmasdale.postalCode,
      addressCountry: business.emmasdale.addressCountry,
    },
    openingHoursSpecification: business.openingHours.schema.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...h.days],
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [business.facebookUrl],
    ...(opts?.description ? { description: opts.description } : {}),
  };
}

export function courseOfferJsonLd(course: Course) {
  const offerDescription =
    "Tuition covers Roadstar practical instruction. Official RTSA fees (provisional licence, tests, licence card) are separate government charges paid directly to RTSA.";

  const offer =
    course.show_price && course.price_amount
      ? {
          "@type": "Offer",
          price: course.price_amount,
          priceCurrency: course.currency || business.currency,
          availability: "https://schema.org/InStock",
          url: absoluteUrl(`/courses/${course.slug}`),
          description: offerDescription,
        }
      : {
          "@type": "Offer",
          priceCurrency: business.currency,
          availability: "https://schema.org/InStock",
          url: absoluteUrl(`/courses/${course.slug}`),
          description: `${offerDescription} Contact Roadstar for current tuition.`,
        };

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.summary || course.description,
    provider: {
      "@type": "DrivingSchool",
      name: business.displayName,
      url: business.siteUrl,
    },
    offers: offer,
  };
}

export function faqPageJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/** Lowest public Class B tuition for Offer snippets when listing many packages. */
export function lowestPricedCourse(courses: Course[]): Course | null {
  const priced = courses.filter((c) => c.show_price && c.price_amount);
  if (!priced.length) return null;
  return [...priced].sort(
    (a, b) => parseFloat(a.price_amount!) - parseFloat(b.price_amount!),
  )[0];
}

export function formatCoursePriceLabel(course: Course): string {
  if (course.show_price && course.price_amount) return formatZmw(course.price_amount);
  return "Enquire for price";
}
