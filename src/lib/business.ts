/**
 * Canonical NAP + site identity for SEO, footer, contact, and JSON-LD.
 * Keep character-for-character consistent with GBP / directories.
 */
import { SITE_URL } from "./env";

export { SITE_URL };

export const business = {
  displayName: "Roadstar Driving School",
  /** Confirmed public contact until domain email is live */
  email: "roadstardrivingschool2022@gmail.com",
  phoneDisplay: "+260 975 072617",
  phoneTel: "+260975072617",
  facebookUrl: "https://facebook.com/roadstadriving",
  currency: "ZMW",
  siteUrl: SITE_URL,
  openingHours: {
    weekdays: "08:00 – 17:00",
    saturday: "08:00 – 13:00",
    sunday: "Closed",
    schema: [
      {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const,
        opens: "08:00",
        closes: "17:00",
      },
      {
        days: ["Saturday"] as const,
        opens: "08:00",
        closes: "13:00",
      },
    ],
  },
  emmasdale: {
    name: "Emmasdale",
    slug: "emmasdale",
    streetAddress: "Plot No. 238, Vubu Road",
    addressLocality: "Lusaka",
    addressRegion: "Lusaka Province",
    postalCode: "10101",
    addressCountry: "ZM",
    fullAddress: "Plot No. 238 Vubu Road, Emmasdale, Lusaka, Zambia, 10101",
    landmark: "",
    path: "/locations/emmasdale",
    /** Maps search until a Place pin is pasted in CMS */
    mapUrl:
      "https://maps.google.com/?q=Plot+No.+238+Vubu+Road+Emmasdale+Lusaka+Zambia+10101",
  },
  thornpark: {
    name: "Thornpark",
    slug: "thornpark",
    path: "/locations/thornpark",
  },
} as const;

/** Absolute URL helper for canonicals / schema. */
export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
