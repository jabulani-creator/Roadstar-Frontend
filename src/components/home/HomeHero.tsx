import Link from "next/link";
import { AccentWord } from "@/components/ui/AccentWord";
import { FindCourseButton } from "@/components/ui/FindCourseButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

type HeroStat = {
  lead: string;
  label: string;
};

export function HomeHero({ stats }: { stats: HeroStat[] }) {
  return (
    <>
      <section data-home-hero className="relative h-[100svh] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/HERO-4.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-[35%_center] md:object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/55 md:bg-gradient-to-r md:from-black/80 md:via-black/55 md:to-black/30"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-black/55 to-transparent md:block md:h-36"
          aria-hidden
        />

        <div className="relative mx-auto flex h-full w-full max-w-none flex-col justify-center px-4 pb-8 pt-[calc(var(--site-header-height)+0.5rem)] md:justify-between md:gap-0 md:px-12 md:pb-10 md:pt-0 lg:px-16 xl:px-20">
          <div className="flex max-w-xl flex-col md:max-w-[48rem] md:flex-1 md:items-start md:justify-center md:pt-[var(--site-header-height)] md:text-left lg:max-w-[56rem] xl:max-w-[62rem]">
            <h1 className="font-display text-[1.85rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-7xl md:leading-[1.08] lg:text-[5.5rem] xl:text-[6.25rem]">
              <span className="md:hidden">
                Your driving journey
                <br />
                <AccentWord tone="soft">begins</AccentWord> right here.
              </span>
              <span className="hidden md:inline">
                Your driving journey <AccentWord tone="soft">begins</AccentWord> right here.
              </span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/90 md:mt-7 md:max-w-2xl md:text-2xl md:leading-relaxed lg:max-w-3xl lg:text-[1.75rem]">
              Practical lessons with certified instructors in Emmasdale, Lusaka — build skills and
              become a safer driver.
            </p>
            <p className="mt-3 text-sm font-medium text-white/80 md:mt-4 md:text-base">
              Certified instructors · Transparent tuition · RTSA fees shown separately
            </p>
            <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:items-center md:mt-10 md:w-auto md:gap-5">
              <FindCourseButton
                size="md"
                variant="accent"
                context="hero"
                className="h-12 w-full rounded-md px-6 md:h-16 md:w-auto md:px-12 md:text-xl"
              />
              <WhatsAppButton
                size="lg"
                context="hero"
                className="h-12 w-full px-6 md:h-16 md:w-auto md:px-12 md:text-xl"
              />
            </div>
            <p className="mt-4 text-sm text-white/75 md:mt-5 md:text-base">
              <Link
                href="/courses-and-fees"
                className="font-semibold text-white underline-offset-4 hover:underline"
              >
                Explore courses &amp; fees
              </Link>
              <span className="text-white/60"> — compare packages and find your starting point.</span>
            </p>
          </div>

          {/* Desktop: concrete benefits, not slogan repeats */}
          <div className="hidden md:block md:pt-10">
            <div className="grid grid-cols-3 md:gap-0">
              {stats.map((item, i) => (
                <div
                  key={item.label}
                  className={`px-2 text-center md:px-0 md:text-left ${
                    i > 0 ? "md:border-l md:border-white/25 md:pl-10 lg:pl-14" : ""
                  }`}
                >
                  <p className="font-display text-base font-semibold leading-snug tracking-tight text-[var(--brand-soft)] md:text-2xl lg:text-3xl">
                    {item.lead}
                  </p>
                  <p className="mt-1.5 text-xs leading-snug text-white/85 md:mt-3 md:text-base md:text-white lg:text-lg">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile benefits — below first screen */}
      <section className="border-b border-black/8 bg-white px-4 py-7 md:hidden">
        <ul className="mx-auto flex max-w-lg flex-col gap-0 divide-y divide-black/8">
          {stats.map((item, i) => (
            <li key={item.label} className="flex gap-4 py-4 first:pt-0 last:pb-0">
              <span
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--teal-soft)] text-xs font-bold text-[var(--brand)]"
                aria-hidden
              >
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="font-display text-base font-semibold tracking-tight text-[var(--ink)]">
                  {item.lead}
                </p>
                <p className="mt-0.5 text-sm leading-snug text-[var(--muted)]">{item.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
