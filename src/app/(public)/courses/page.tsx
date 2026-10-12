import { redirect } from "next/navigation";

/** Canonical courses page lives at /courses-and-fees */
export default function CoursesRedirectPage() {
  redirect("/courses-and-fees");
}
