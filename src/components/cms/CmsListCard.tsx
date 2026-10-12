/** Mobile-first CMS row — Edit always visible, no horizontal scroll. */
export function CmsListCard({
  title,
  meta,
  badge,
  onEdit,
}: {
  title: string;
  meta: string;
  badge?: React.ReactNode;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-[var(--panel)] px-4 py-3.5">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold text-[var(--ink)]">{title}</p>
          {badge}
        </div>
        {meta ? <p className="mt-1 text-sm leading-snug text-[var(--muted)]">{meta}</p> : null}
      </div>
      <button
        type="button"
        className="shrink-0 rounded-md bg-[var(--brand)] px-3 py-1.5 text-sm font-semibold text-white"
        onClick={onEdit}
      >
        Edit
      </button>
    </div>
  );
}

export function CmsMobileList({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2 md:hidden">{children}</div>;
}

export function CmsDesktopOnly({ children }: { children: React.ReactNode }) {
  return <div className="hidden md:block">{children}</div>;
}
