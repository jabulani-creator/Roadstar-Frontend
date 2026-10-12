export function EditFormShell({
  title,
  children,
  actions,
}: {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-[var(--panel)] px-5 py-6 md:px-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">{title}</h2>
        {actions}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
