"use client";

import { useState } from "react";
import { leadService } from "@/lib/services/leadService";
import { ApiError } from "@/lib/customFetch";
import { DRIVER_COUNT_OPTIONS } from "@/lib/professionalCopy";
import { buildProfessionalWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Input, Textarea } from "@/components/ui/Input";

const TRAINING_OPTIONS = [
  "Defensive Driving",
  "Class C1 / C Licence Training",
  "Fleet Safety Audit",
  "Other",
] as const;

export function FleetEnquiryForm() {
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [driverCount, setDriverCount] = useState("");
  const [training, setTraining] = useState<string[]>([]);
  const [trainingOther, setTrainingOther] = useState("");
  const [locationPref, setLocationPref] = useState("");
  const [clientLocation, setClientLocation] = useState("");
  const [timing, setTiming] = useState("");
  const [concern, setConcern] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [doneId, setDoneId] = useState<number | null>(null);

  function toggleTraining(label: string) {
    setTraining((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label],
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!company.trim() || !name.trim() || !phone.trim() || !email.trim()) {
      setError("Please complete all required fields.");
      return;
    }
    if (!driverCount || training.length === 0) {
      setError("Please tell us how many drivers and what training you need.");
      return;
    }

    const trainingList = training
      .map((t) => (t === "Other" ? `Other: ${trainingOther.trim() || "unspecified"}` : t))
      .join(", ");

    const needsC =
      training.includes("Class C1 / C Licence Training") ||
      trainingList.toLowerCase().includes("class c");

    const message = [
      `Company: ${company.trim()}`,
      role.trim() ? `Role: ${role.trim()}` : null,
      `Drivers: ${driverCount}`,
      `Training needed: ${trainingList}`,
      locationPref
        ? `Preferred location: ${
            locationPref === "client"
              ? `At client premises (${clientLocation.trim() || "TBC"})`
              : "Emmasdale"
          }`
        : null,
      timing ? `Timing: ${timing}` : null,
      concern.trim() ? `Fleet / safety concern:\n${concern.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappSummary = [
      "Fleet / professional training enquiry",
      `Company: ${company.trim()}`,
      `Contact: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Drivers: ${driverCount}`,
      `Training: ${trainingList}`,
    ].join("\n");

    setSubmitting(true);
    try {
      const created = await leadService.create({
        full_name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        preferred_contact: role.trim() ? `Role: ${role.trim()}` : "email",
        experience_level: "professional",
        licence_class: needsC ? "C1" : "unsure",
        transmission: "either",
        preferred_schedule: timing || "",
        message,
        channel: "other",
        referral_source: "website",
        referral_detail: `Fleet enquiry — ${company.trim()}`,
        whatsapp_summary: whatsappSummary,
      });
      setDoneId(created.id);
    } catch (err) {
      if (err instanceof ApiError) {
        const body = err.body as { detail?: string } | null;
        setError(
          typeof body === "object" && body?.detail
            ? String(body.detail)
            : "We couldn't submit your enquiry. Please try again or WhatsApp us.",
        );
      } else {
        setError("We couldn't submit your enquiry. Please try again or WhatsApp us.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (doneId !== null) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-[var(--card-shadow)] ring-1 ring-black/5 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Enquiry received
        </p>
        <h3 className="mt-3 font-display text-2xl font-semibold text-[var(--ink)]">
          Thank you, {name.split(/\s+/)[0]}. We&apos;ll be in touch.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          Reference #{doneId}. We&apos;ll review your enquiry and contact you within one business
          day to discuss your needs and provide a quote. No obligation.
        </p>
        <div className="mt-6">
          <WhatsAppButton href={buildProfessionalWhatsAppUrl()} />
        </div>
      </div>
    );
  }

  return (
    <form
      id="fleet-enquiry"
      onSubmit={onSubmit}
      className="scroll-mt-24 space-y-5 rounded-3xl bg-white p-6 shadow-[var(--card-shadow)] ring-1 ring-black/5 md:p-8"
    >
      <Input
        label="Company Name *"
        required
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <Input
        label="Your Name *"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input label="Your Role" value={role} onChange={(e) => setRole(e.target.value)} />
      <Input
        label="Phone Number *"
        required
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Input
        label="Email Address *"
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-[var(--ink)]">
          Number of drivers to be trained <span className="text-[var(--muted)]">*</span>
        </legend>
        <div className="space-y-2">
          {DRIVER_COUNT_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-start gap-2 text-sm">
              <input
                type="radio"
                name="drivers"
                checked={driverCount === opt}
                onChange={() => setDriverCount(opt)}
                className="mt-1 accent-[var(--brand)]"
                required
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-[var(--ink)]">
          What training do you need? <span className="text-[var(--muted)]">*</span>
        </legend>
        <div className="space-y-2">
          {TRAINING_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={training.includes(opt)}
                onChange={() => toggleTraining(opt)}
                className="mt-1 accent-[var(--brand)]"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
        {training.includes("Other") ? (
          <Input
            label="Please specify"
            value={trainingOther}
            onChange={(e) => setTrainingOther(e.target.value)}
          />
        ) : null}
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-[var(--ink)]">
          Preferred training location
        </legend>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="radio"
            name="loc"
            checked={locationPref === "emmasdale"}
            onChange={() => setLocationPref("emmasdale")}
            className="mt-1 accent-[var(--brand)]"
          />
          <span>At our premises (Emmasdale)</span>
        </label>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="radio"
            name="loc"
            checked={locationPref === "client"}
            onChange={() => setLocationPref("client")}
            className="mt-1 accent-[var(--brand)]"
          />
          <span>At your premises (specify below)</span>
        </label>
      </fieldset>

      {locationPref === "client" ? (
        <Input
          label="Your location (if training at your premises)"
          value={clientLocation}
          onChange={(e) => setClientLocation(e.target.value)}
        />
      ) : null}

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-[var(--ink)]">
          When do you need this training?
        </legend>
        {[
          ["asap", "As soon as possible"],
          ["1month", "Within 1 month"],
          ["3months", "Within 3 months"],
          ["planning", "Planning ahead"],
        ].map(([value, label]) => (
          <label key={value} className="flex items-start gap-2 text-sm">
            <input
              type="radio"
              name="timing"
              checked={timing === label}
              onChange={() => setTiming(label)}
              className="mt-1 accent-[var(--brand)]"
            />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>

      <Textarea
        label="Tell us about your fleet and your biggest road safety concern"
        value={concern}
        onChange={(e) => setConcern(e.target.value)}
      />

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit Enquiry"}
      </Button>
      <p className="text-xs text-[var(--muted)]">
        What happens next? We&apos;ll review your enquiry and contact you within one business day to
        discuss your needs and provide a quote. No obligation.
      </p>
    </form>
  );
}
