"use client";

import { useMemo, useState } from "react";
import type { Course } from "@/lib/types";
import { recommendCourse, type SelectorAnswers } from "@/lib/courseSelector";
import { Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CourseCard } from "@/components/courses/CourseCard";
import { trackFindCourseClick } from "@/lib/analytics";
import { buildFindYourCourseWhatsAppUrl, buildStandardWhatsAppUrl } from "@/lib/whatsapp";
import { formatZmw } from "@/lib/utils";

type Step = 1 | 2 | 3 | 4 | 5 | "result";

const TOTAL_STEPS = 5;

const LICENCE_GUIDE = [
  {
    value: "B" as const,
    title: "Class B — everyday cars",
    plain: "This is the one most people need first.",
    detail:
      "Lets you drive normal passenger cars and light vehicles — like a Toyota Vitz, Corolla, or family SUV. If you want to drive yourself around Lusaka, start here.",
  },
  {
    value: "C1" as const,
    title: "Class C1 — light commercial",
    plain: "For smaller trucks and work vans.",
    detail:
      "For light goods vehicles (roughly under 7,500 kg) — delivery vans, small trucks, and similar work vehicles. You normally need a Class B licence first.",
  },
  {
    value: "C" as const,
    title: "Class C — heavy vehicles",
    plain: "For large trucks and heavy goods.",
    detail:
      "For heavier commercial vehicles used in freight and professional driving. You normally need a Class B licence first, then progress toward C.",
  },
] as const;

function ChoiceCards({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: ReadonlyArray<{ value: string; title: string; plain: string; detail: string }>;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-3" role="radiogroup" aria-label={name}>
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <label
            key={opt.value}
            className={`block cursor-pointer rounded-lg px-4 py-4 transition ${
              selected
                ? "bg-[var(--brand)] text-white"
                : "bg-[var(--cream)] text-[var(--ink)] hover:bg-[var(--teal-soft)]"
            }`}
          >
            <span className="flex items-start gap-3">
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                className="mt-1 accent-[var(--accent)]"
              />
              <span className="min-w-0">
                <span className="block font-display text-base font-semibold">{opt.title}</span>
                <span
                  className={`mt-1 block text-sm font-medium ${selected ? "text-white/90" : "text-[var(--brand)]"}`}
                >
                  {opt.plain}
                </span>
                <span
                  className={`mt-2 block text-sm leading-relaxed ${selected ? "text-white/80" : "text-[var(--muted)]"}`}
                >
                  {opt.detail}
                </span>
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
}

export function FindYourCourseForm({ courses }: { courses: Course[] }) {
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<SelectorAnswers>({
    licenceClass: "B",
    experience: "beginner_full",
    transmission: "both",
    branchSlug: "demo-emmasdale",
  });
  const [startTiming, setStartTiming] = useState("asap");

  const recommendation = useMemo(
    () => (step === "result" ? recommendCourse(courses, answers) : null),
    [answers, courses, step],
  );

  function nextFrom(current: Step) {
    if (current === 1) setStep(2);
    else if (current === 2) setStep(3);
    else if (current === 3) setStep(4);
    else if (current === 4) setStep(5);
    else if (current === 5) {
      trackFindCourseClick("quiz_complete");
      setStep("result");
    }
  }

  const progress = step === "result" ? TOTAL_STEPS : step;

  return (
    <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
      <div className="rounded-lg bg-[var(--panel)] px-5 py-6 md:px-8 md:py-8">
        {step !== "result" ? (
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Step {progress} of {TOTAL_STEPS}
          </p>
        ) : null}

        {step === 1 && (
          <div className="space-y-5">
            <h3 className="font-display text-xl font-semibold text-[var(--ink)] md:text-2xl">
              What is your driving experience?
            </h3>
            <Select
              label="Experience"
              value={answers.experience}
              onChange={(e) =>
                setAnswers((a) => ({
                  ...a,
                  experience: e.target.value as SelectorAnswers["experience"],
                }))
              }
            >
              <option value="beginner_full">I&apos;ve never driven before</option>
              <option value="standard">I&apos;ve had some lessons</option>
              <option value="refresher">I have a licence but need a refresher</option>
              <option value="test_prep">I need test preparation</option>
            </Select>
            <Button type="button" onClick={() => nextFrom(1)}>
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h3 className="font-display text-xl font-semibold text-[var(--ink)] md:text-2xl">
                What do you want to drive?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Licence &quot;classes&quot; are RTSA categories. In plain English: pick the kind of
                vehicle you want to be allowed to drive.
              </p>
            </div>
            <ChoiceCards
              name="licence-class"
              options={LICENCE_GUIDE}
              value={answers.licenceClass}
              onChange={(v) =>
                setAnswers((a) => ({
                  ...a,
                  licenceClass: v as SelectorAnswers["licenceClass"],
                }))
              }
            />
            <aside className="rounded-lg border-l-4 border-[var(--brand)] bg-[var(--teal-soft)] px-4 py-3 text-sm leading-relaxed text-[var(--muted)]">
              <span className="font-semibold text-[var(--ink)]">Not sure?</span> Choose Class B —
              that&apos;s everyday cars. You can always WhatsApp us if you&apos;re training for work
              vehicles.
            </aside>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="secondary" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="button" onClick={() => nextFrom(2)}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h3 className="font-display text-xl font-semibold text-[var(--ink)] md:text-2xl">
              Manual or automatic?
            </h3>
            <Select
              label="Transmission"
              value={answers.transmission}
              onChange={(e) =>
                setAnswers((a) => ({
                  ...a,
                  transmission: e.target.value as SelectorAnswers["transmission"],
                }))
              }
            >
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
              <option value="both">Either is fine</option>
            </Select>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="secondary" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button type="button" onClick={() => nextFrom(3)}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <h3 className="font-display text-xl font-semibold text-[var(--ink)] md:text-2xl">
              Which location is best for you?
            </h3>
            <Select
              label="Location"
              value={answers.branchSlug ?? "demo-emmasdale"}
              onChange={(e) => setAnswers((a) => ({ ...a, branchSlug: e.target.value }))}
            >
              <option value="demo-emmasdale">Emmasdale</option>
              <option value="demo-thornpark">Thornpark</option>
            </Select>
            <p className="text-xs text-[var(--muted)]">
              Need at-customer pickup? Mention it when you WhatsApp us — we&apos;ll confirm if your
              area is covered.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="secondary" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button type="button" onClick={() => nextFrom(4)}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-5">
            <h3 className="font-display text-xl font-semibold text-[var(--ink)] md:text-2xl">
              When do you want to start?
            </h3>
            <Select
              label="Timing"
              value={startTiming}
              onChange={(e) => setStartTiming(e.target.value)}
            >
              <option value="asap">As soon as possible</option>
              <option value="month">Within the next month</option>
              <option value="exploring">Just exploring for now</option>
            </Select>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="secondary" onClick={() => setStep(4)}>
                Back
              </Button>
              <Button type="button" onClick={() => nextFrom(5)}>
                See my recommendation
              </Button>
            </div>
          </div>
        )}

        {step === "result" && (
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Your recommendation
            </p>
            <h3 className="font-display text-xl font-semibold text-[var(--ink)] md:text-2xl">
              Based on your answers, we recommend:
            </h3>
            <Button type="button" variant="secondary" size="sm" onClick={() => setStep(1)}>
              Start over
            </Button>
          </div>
        )}
      </div>

      <div className="rounded-lg bg-[var(--cream)] px-5 py-6 md:px-8 md:py-8">
        {step !== "result" ? (
          <aside className="rounded-lg border-l-4 border-[var(--brand)] bg-[var(--teal-soft)] px-5 py-4">
            <p className="font-semibold text-[var(--ink)]">Take your time.</p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
              Answer a few questions. We&apos;ll recommend a real Roadstar package — not an
              automatic booking. You can always chat with an advisor first.
            </p>
          </aside>
        ) : recommendation ? (
          <div className="space-y-4">
            <div className="[&_article]:rounded-lg [&_article]:bg-[var(--panel)] [&_article]:shadow-none [&_article]:ring-0 [&_article]:hover:translate-y-0 [&_article]:hover:shadow-none">
              <CourseCard course={recommendation} showCtas={false} />
            </div>
            <p className="text-sm text-[var(--muted)]">
              {recommendation.duration_days ? `${recommendation.duration_days} days` : ""} ·{" "}
              {recommendation.transmission_label} ·{" "}
              {recommendation.show_price
                ? formatZmw(recommendation.price_amount)
                : "Quote on request"}
              {startTiming === "exploring" ? " · You’re exploring — no pressure." : ""}
            </p>
            {recommendation.level === "test_prep" ? (
              <aside className="rounded-lg border-l-4 border-[var(--accent)] bg-[var(--panel)] px-5 py-4 text-sm text-[var(--ink)]">
                Reminder: test preparation does not guarantee that you will pass.
              </aside>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <Button href={`/courses/${recommendation.slug}`} variant="primary">
                View this course
              </Button>
              <WhatsAppButton
                href={buildFindYourCourseWhatsAppUrl({
                  courseName: recommendation.name,
                  experience: answers.experience,
                  licenceClass: recommendation.licence_class_label,
                  transmission: recommendation.transmission_label,
                  branch: answers.branchSlug,
                  startTiming:
                    startTiming === "asap"
                      ? "ASAP"
                      : startTiming === "month"
                        ? "Within a month"
                        : "Just exploring",
                })}
              />
            </div>
            <p className="text-sm text-[var(--muted)]">
              Not sure if this is right? Chat with us on WhatsApp and we&apos;ll help you decide.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              No matching package found. Try another combination or enquire on WhatsApp.
            </p>
            <WhatsAppButton
              href={buildStandardWhatsAppUrl([
                "I used Find Your Course but didn't get a matching package.",
                `Experience: ${answers.experience}`,
                `Licence class: ${answers.licenceClass}`,
                `Transmission: ${answers.transmission}`,
              ])}
            />
          </div>
        )}
      </div>
    </div>
  );
}
