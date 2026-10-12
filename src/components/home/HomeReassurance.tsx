const items = [
  "RTSA-Ready Training",
  "Transparent Fees",
  "Patient Instructors",
  "Emmasdale & Thornpark",
];

export function HomeReassurance() {
  return (
    <section className="border-y border-black/8 bg-[var(--mist)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 py-4 text-center md:justify-between md:gap-x-6 md:px-6 md:py-5">
        {items.map((item, i) => (
          <p
            key={item}
            className={`text-[11px] font-semibold uppercase tracking-[0.12em] md:text-xs ${
              i % 2 === 0 ? "text-[var(--brand)]" : "text-[var(--accent)]"
            }`}
          >
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
