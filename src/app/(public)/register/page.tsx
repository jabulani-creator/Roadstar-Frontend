import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Register | Roadstar Driving School Zambia | Lusaka",
  description:
    "Register for driving lessons at Roadstar Driving School in Lusaka. Emmasdale & Thornpark. Class B, C1 & C.",
};

export default function RegisterPage() {
  redirect("/contact#register");
}
