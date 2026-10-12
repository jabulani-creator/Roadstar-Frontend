import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { SITE_URL, business } from "@/lib/business";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RoadStar Driving School",
    template: "%s | RoadStar",
  },
  description:
    "Patient, certified driving instruction in Emmasdale, Lusaka. Clear courses, transparent fees, and WhatsApp enrolment support.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "en_ZM",
    siteName: business.displayName,
    title: "RoadStar Driving School",
    description:
      "Patient, certified driving instruction in Emmasdale, Lusaka. Clear courses, transparent fees, and WhatsApp enrolment support.",
    url: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="bg-[var(--surface)] font-sans antialiased text-[var(--ink)]">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
