"use client";

import { useMemo, useState } from "react";
import type { Branch, Course } from "@/lib/types";
import { leadService } from "@/lib/services/leadService";
import { ApiError } from "@/lib/customFetch";
import { formatZmw } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { trackRegisterClick } from "@/lib/analytics";
import { Input, Select, Textarea } from "@/components/ui/Input";

type Props = {
  courses: Course[];
  branches: Branch[];
};

const EXPERIENCE = [
  { value: "beginner", label: "I've never driven before" },
  { value: "some", label: "I've had some lessons" },
  { value: "licensed_refresher", label: "I have a licence but need a refresher" },
  { value: "professional", label: "I'm licensed and want to upgrade my class" },
] as const;

const LICENCE = [
  {
    value: "B",
    label: "Class B — everyday cars (Vitz, Corolla, family SUV)",
    hint: "Most people start here. For normal passenger cars and light vehicles around Lusaka.",
  },
  {
    value: "C1",
    label: "Class C1 — light commercial (vans, small trucks)",
    hint: "For light goods / work vehicles. You normally need a Class B licence first.",
  },
  {
    value: "C",
    label: "Class C — heavy vehicles (large trucks)",
    hint: "For heavier commercial vehicles. You normally need a Class B licence first.",
  },
  {
    value: "unsure",
    label: "I'm not sure — help me decide",
    hint: "We'll recommend the right class based on what you want to drive.",
  },
] as const;

const TRANSMISSION = [
  { value: "manual", label: "Manual" },
  { value: "automatic", label: "Automatic" },
  { value: "either", label: "Either is fine" },
  { value: "unsure", label: "I don't know the difference" },
] as const;

const CONTACT_METHODS = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "phone", label: "Phone call" },
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
] as const;

const AGE_RANGES = ["Under 18", "18–24", "25–34", "35–49", "50+"] as const;

const START_OPTIONS = [
  { value: "asap", label: "As soon as possible" },
  { value: "month", label: "Within the next month" },
  { value: "1-3-months", label: "In 1–3 months" },
  { value: "exploring", label: "Just exploring for now" },
] as const;

const TIME_OPTIONS = [
  "Early morning (before 09:00)",
  "Morning (09:00–12:00)",
  "Afternoon (12:00–17:00)",
  "Evening (after 17:00)",
  "Weekends",
  "Flexible",
] as const;

const REFERRAL_OPTIONS = [
  { value: "social", label: "Facebook", detail: "Facebook" },
  { value: "social", label: "Instagram", detail: "Instagram" },
  { value: "google", label: "Google Search", detail: "Google Search" },
  { value: "google", label: "Google Maps", detail: "Google Maps" },
  { value: "referral", label: "Friend or family referral", detail: "Friend/family" },
  { value: "referral", label: "Former student", detail: "Former student" },
  { value: "walk_in", label: "Walked past the branch", detail: "Walk-in" },
  { value: "other", label: "Other", detail: "" },
] as const;

export function RegistrationForm({ courses, branches }: Props) {
  const emmasdale = branches.find((b) => b.slug.includes("emmasdale"));
  const thornpark = branches.find((b) => b.slug.includes("thornpark"));

  const courseOptions = useMemo(() => {
    const levelOrder = [
      "beginner_full",
      "standard",
      "half",
      "refresher",
      "test_prep",
      "professional",
      "other",
    ];
    return [...courses].sort((a, b) => {
      const c = ["B", "C1", "C"].indexOf(a.licence_class) - ["B", "C1", "C"].indexOf(b.licence_class);
      if (c !== 0) return c;
      return levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level);
    });
  }, [courses]);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [preferredContact, setPreferredContact] = useState("whatsapp");
  const [ageRange, setAgeRange] = useState("");
  const [experience, setExperience] = useState("");
  const [licenceClass, setLicenceClass] = useState("");
  const [transmission, setTransmission] = useState("");
  const [courseChoice, setCourseChoice] = useState("recommend");
  const [location, setLocation] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [startWhen, setStartWhen] = useState("");
  const [lessonTimes, setLessonTimes] = useState<string[]>([]);
  const [referralIndex, setReferralIndex] = useState<number | null>(null);
  const [referralOther, setReferralOther] = useState("");
  const [docs, setDocs] = useState({ nrc: false, photo: false, residence: false });
  const [comments, setComments] = useState("");
  const [consentContact, setConsentContact] = useState(false);
  const [consentTerms, setConsentTerms] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [doneId, setDoneId] = useState<number | null>(null);

  function toggleTime(label: string) {
    setLessonTimes((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label],
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!consentContact || !consentTerms) {
      setError("Please confirm contact consent and agree to the Terms & Privacy Policy.");
      return;
    }
    if (!experience || !licenceClass || !transmission || !location || !startWhen) {
      setError("Please complete all required fields.");
      return;
    }
    if (referralIndex === null) {
      setError("Please tell us how you heard about Roadstar.");
      return;
    }

    const referral = REFERRAL_OPTIONS[referralIndex];
    const branchId =
      location === "emmasdale"
        ? emmasdale?.id ?? null
        : location === "thornpark"
          ? thornpark?.id ?? null
          : null;

    const interestedCourse =
      courseChoice !== "recommend" && courseChoice !== ""
        ? Number(courseChoice)
        : null;

    const locationLabel =
      location === "pickup"
        ? "At-customer pickup"
        : location === "emmasdale"
          ? "Emmasdale"
          : location === "thornpark"
            ? "Thornpark"
            : location;

    const scheduleParts = [
      `Start: ${START_OPTIONS.find((s) => s.value === startWhen)?.label ?? startWhen}`,
      lessonTimes.length ? `Preferred times: ${lessonTimes.join(", ")}` : null,
      location === "pickup" && pickupAddress ? `Pickup address: ${pickupAddress}` : null,
    ].filter(Boolean);

    const messageParts = [
      comments.trim() || null,
      ageRange ? `Age range: ${ageRange}` : null,
      whatsappNumber.trim() ? `WhatsApp (if different): ${whatsappNumber.trim()}` : null,
      `Documents ready: NRC/Passport=${docs.nrc ? "yes" : "no"}; Photo=${docs.photo ? "yes" : "no"}; Proof of residence=${docs.residence ? "yes" : "no"}`,
      marketing ? "Opted in to tips/updates via WhatsApp." : "Did not opt in to marketing tips.",
      courseChoice === "recommend" ? "Requested course recommendation." : null,
    ].filter(Boolean);

    const whatsappSummary = [
      `New web registration: ${fullName}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      `Experience: ${experience}`,
      `Licence: ${licenceClass}`,
      `Transmission: ${transmission}`,
      `Location: ${locationLabel}`,
      scheduleParts.join(" | "),
      interestedCourse
        ? `Interested course id: ${interestedCourse}`
        : "Wants course recommendation",
    ]
      .filter(Boolean)
      .join("\n");

    setSubmitting(true);
    try {
      const created = await leadService.create({
        full_name: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        preferred_contact: preferredContact,
        experience_level: experience,
        licence_class: licenceClass,
        transmission,
        preferred_branch: branchId,
        preferred_schedule: scheduleParts.join(" · "),
        message: messageParts.join("\n"),
        interested_course: interestedCourse,
        channel: "register_interest",
        referral_source: referral.value,
        referral_detail:
          referral.value === "other" ? referralOther.trim() || "Other" : referral.detail,
        whatsapp_summary: whatsappSummary,
      });
      trackRegisterClick("form_submit");
      setDoneId(created.id);
    } catch (err) {
      if (err instanceof ApiError) {
        const body = err.body as { detail?: string; code?: string } | null;
        setError(
          typeof body === "object" && body?.detail
            ? String(body.detail)
            : "We couldn't submit your registration. Please try again or WhatsApp us.",
        );
      } else {
        setError("We couldn't submit your registration. Please try again or WhatsApp us.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (doneId !== null) {
    return (
      <div className="rounded-lg bg-[var(--panel)] px-5 py-6 md:px-8 md:py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Registration received
        </p>
        <h3 className="mt-3 font-display text-2xl font-semibold text-[var(--ink)]">
          Thank you, {fullName.split(/\s+/)[0]}. We&apos;ve got your details.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] md:text-base">
          Reference #{doneId}. We&apos;ll review your registration and contact you via{" "}
          {preferredContact} during office hours. No payment is required until you&apos;re ready to
          start.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <WhatsAppButton />
          <Button href="/how-it-works" variant="secondary">
            See what happens next
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-10 rounded-lg bg-[var(--panel)] px-5 py-6 md:px-8 md:py-8"
    >
      <div>
        <h3 className="font-display text-2xl font-semibold text-[var(--ink)]">
          Student Registration
        </h3>
        <p className="mt-2 text-sm text-[var(--muted)]">
          All fields marked with * are required. Your information is kept private and secure.
        </p>
      </div>

      <section className="space-y-5">
        <h4 className="font-display text-xl font-semibold text-[var(--ink)]">A. About You</h4>
        <Input
          label="Full Name *"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="As it appears on your NRC or passport"
        />
        <p className="-mt-3 text-xs text-[var(--muted)]">
          As it appears on your NRC or passport.
        </p>
        <Input
          label="Phone Number *"
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+260 ..."
        />
        <Input
          label="WhatsApp Number"
          type="tel"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          placeholder="If different from your phone number"
        />
        <Input
          label="Email Address *"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Select
          label="Preferred Contact Method *"
          required
          value={preferredContact}
          onChange={(e) => setPreferredContact(e.target.value)}
        >
          {CONTACT_METHODS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </Select>
        <div>
          <Select
            label="Age Range"
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value)}
          >
            <option value="">Select age range</option>
            {AGE_RANGES.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </Select>
          <p className="mt-1.5 text-xs text-[var(--muted)]">
            Why we ask: Some courses have age requirements. This helps us recommend the right path.
          </p>
        </div>
      </section>

      <section className="space-y-5">
        <h4 className="font-display text-xl font-semibold text-[var(--ink)]">
          B. Your Driving Goals
        </h4>
        <Select
          label="What is your driving experience? *"
          required
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        >
          <option value="">Select experience</option>
          {EXPERIENCE.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
        <div>
          <Select
            label="What do you want to drive? (licence class) *"
            required
            value={licenceClass}
            onChange={(e) => setLicenceClass(e.target.value)}
          >
            <option value="">Select licence class</option>
            {LICENCE.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
          <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">
            {LICENCE.find((o) => o.value === licenceClass)?.hint ??
              "Licence classes are RTSA categories. Class B = everyday cars. C1/C = commercial vehicles (usually after Class B)."}
          </p>
        </div>
        <div>
          <Select
            label="Manual or Automatic? *"
            required
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
          >
            <option value="">Select transmission</option>
            {TRANSMISSION.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
          <p className="mt-1.5 text-xs text-[var(--muted)]">
            Don&apos;t worry if you&apos;re not sure — we&apos;ll explain the difference and help you
            choose.
          </p>
        </div>
        <Select
          label="Which course are you interested in?"
          value={courseChoice}
          onChange={(e) => setCourseChoice(e.target.value)}
        >
          <option value="recommend">Not sure — recommend a course for me</option>
          {courseOptions.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.licence_class_label} — {c.level_label}
              {c.duration_days ? ` (${c.duration_days} days)` : ""}
              {c.show_price && c.price_amount ? ` — ${formatZmw(c.price_amount)}` : ""}
            </option>
          ))}
        </Select>
      </section>

      <section className="space-y-5">
        <h4 className="font-display text-xl font-semibold text-[var(--ink)]">C. Logistics</h4>
        <Select
          label="Preferred Location *"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Select location</option>
          <option value="emmasdale">Emmasdale</option>
          <option value="thornpark">Thornpark</option>
          <option value="pickup">At-customer pickup (add address below)</option>
        </Select>
        {location === "pickup" ? (
          <Input
            label="Pickup Address"
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)}
            placeholder="We'll confirm if your area is within our service zone"
          />
        ) : null}
        <Select
          label="When do you want to start? *"
          required
          value={startWhen}
          onChange={(e) => setStartWhen(e.target.value)}
        >
          <option value="">Select when</option>
          {START_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-[var(--ink)]">Preferred lesson times</legend>
          <div className="space-y-2">
            {TIME_OPTIONS.map((t) => (
              <label key={t} className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={lessonTimes.includes(t)}
                  onChange={() => toggleTime(t)}
                  className="mt-1 accent-[var(--brand)]"
                />
                <span>{t}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div>
          <Select
            label="How did you hear about Roadstar? *"
            required
            value={referralIndex === null ? "" : String(referralIndex)}
            onChange={(e) =>
              setReferralIndex(e.target.value === "" ? null : Number(e.target.value))
            }
          >
            <option value="">Select an option</option>
            {REFERRAL_OPTIONS.map((opt, i) => (
              <option key={`${opt.label}-${i}`} value={String(i)}>
                {opt.label}
              </option>
            ))}
          </Select>
          <p className="mt-1.5 text-xs text-[var(--muted)]">
            This helps us understand how people find us. No wrong answer.
          </p>
          {referralIndex !== null && REFERRAL_OPTIONS[referralIndex].value === "other" ? (
            <div className="mt-3">
              <Input
                label="Please specify"
                value={referralOther}
                onChange={(e) => setReferralOther(e.target.value)}
              />
            </div>
          ) : null}
        </div>
      </section>

      <section className="space-y-5">
        <h4 className="font-display text-xl font-semibold text-[var(--ink)]">
          D. Documents & Consent
        </h4>
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-[var(--ink)]">
            Do you have the following ready?
          </legend>
          <p className="text-xs text-[var(--muted)]">
            Don&apos;t worry if you don&apos;t have everything yet. You can submit documents later.
          </p>
          {(
            [
              ["nrc", "NRC or Passport"],
              ["photo", "Passport-sized photo"],
              ["residence", "Proof of residence (optional)"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={docs[key]}
                onChange={(e) => setDocs((d) => ({ ...d, [key]: e.target.checked }))}
                className="mt-1 accent-[var(--brand)]"
              />
              <span>{label}</span>
            </label>
          ))}
        </fieldset>
        <Textarea
          label="Do you have any questions or comments?"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder='Tell us anything that will help us serve you better. For example: "I&apos;m very nervous" or "I need weekend lessons only."'
        />
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-[var(--ink)]">
            Consent <span className="text-[var(--muted)]">*</span>
          </legend>
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={consentContact}
              onChange={(e) => setConsentContact(e.target.checked)}
              className="mt-1 accent-[var(--brand)]"
              required
            />
            <span>
              I agree to Roadstar contacting me about my registration via WhatsApp, phone, or email.
            </span>
          </label>
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={consentTerms}
              onChange={(e) => setConsentTerms(e.target.checked)}
              className="mt-1 accent-[var(--brand)]"
              required
            />
            <span>
              I have read and agree to the Terms & Conditions and Privacy Policy.
            </span>
          </label>
        </fieldset>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
            className="mt-1 accent-[var(--brand)]"
          />
          <span>Yes, send me driving tips, course updates, and promotions via WhatsApp.</span>
        </label>
      </section>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      <div>
        <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? "Submitting…" : "Submit Registration"}
        </Button>
        <p className="mt-3 text-xs text-[var(--muted)]">
          By submitting, you agree to our Terms & Conditions and Privacy Policy. We&apos;ll never
          share your information without your consent.
        </p>
      </div>
    </form>
  );
}
