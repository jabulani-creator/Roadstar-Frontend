export function DataTable({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-lg bg-[var(--panel)]">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-[var(--cream)] text-xs uppercase tracking-wide text-[var(--muted)]">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3.5 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[var(--cream)]/50">{children}</tbody>
      </table>
    </div>
  );
}
