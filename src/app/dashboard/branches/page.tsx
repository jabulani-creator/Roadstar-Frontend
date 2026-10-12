"use client";

import { FormEvent, useEffect, useState } from "react";
import { CmsDesktopOnly, CmsListCard, CmsMobileList } from "@/components/cms/CmsListCard";
import { DataTable } from "@/components/cms/DataTable";
import { EditFormShell } from "@/components/cms/EditFormShell";
import { StatusBadge } from "@/components/cms/StatusBadge";
import { useScrollToEdit } from "@/components/cms/useScrollToEdit";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { branchService } from "@/lib/services/branchService";
import type { Branch } from "@/lib/types";

const emptyBranch = (): Partial<Branch> & { name: string } => ({
  name: "",
  address: "",
  landmark: "",
  map_url: "",
  operating_hours: "",
  primary_phone: "",
  secondary_phone: "",
  email: "",
  classes_available_note: "",
  is_active: true,
});

export default function DashboardBranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selected, setSelected] = useState<(Branch & { _new?: boolean }) | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const editRef = useScrollToEdit(selected ? selected.id || "new" : undefined);

  async function load() {
    setBranches(await branchService.listStaff());
  }

  useEffect(() => {
    load().catch((e) => setError(String(e.message || e)));
  }, []);

  function closeForm() {
    setSelected(null);
  }

  function startNew() {
    setSelected({ ...(emptyBranch() as Branch), id: 0, slug: "", _new: true });
    setMessage("");
    setError("");
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setError("");
    setMessage("");
    try {
      const payload = {
        name: selected.name,
        address: selected.address ?? "",
        landmark: selected.landmark ?? "",
        map_url: selected.map_url ?? "",
        operating_hours: selected.operating_hours ?? "",
        primary_phone: selected.primary_phone ?? "",
        secondary_phone: selected.secondary_phone ?? "",
        email: selected.email ?? "",
        classes_available_note: selected.classes_available_note ?? "",
        is_active: selected.is_active,
      };
      if (selected._new || !selected.slug) {
        await branchService.create({ ...payload, name: selected.name.trim() });
        setMessage(`Created “${selected.name}”.`);
      } else {
        await branchService.update(selected.slug, payload);
        setMessage(`Saved “${selected.name}”.`);
      }
      await load();
      closeForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  }

  return (
    <div className="space-y-6">
      {error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>
      ) : null}
      {message ? (
        <p className="rounded-xl bg-[var(--teal-soft)] px-4 py-3 text-sm text-[var(--brand-strong)]">
          {message}
        </p>
      ) : null}

      {selected ? (
        <div ref={editRef} className="scroll-mt-28">
          <form onSubmit={save}>
            <EditFormShell
              title={selected._new ? "New branch" : `Edit · ${selected.name}`}
              actions={
                <Button type="button" size="sm" variant="secondary" onClick={closeForm}>
                  Back to list
                </Button>
              }
            >
              <Input
                label="Name"
                value={selected.name}
                onChange={(e) => setSelected({ ...selected, name: e.target.value })}
                required
              />
              <Input
                label="Address"
                value={selected.address ?? ""}
                onChange={(e) => setSelected({ ...selected, address: e.target.value })}
              />
              <Input
                label="Landmark"
                value={selected.landmark ?? ""}
                onChange={(e) => setSelected({ ...selected, landmark: e.target.value })}
              />
              <Input
                label="Map URL (Google Maps link)"
                value={selected.map_url ?? ""}
                onChange={(e) => setSelected({ ...selected, map_url: e.target.value })}
                placeholder="https://maps.google.com/…"
              />
              <Input
                label="Operating hours"
                value={selected.operating_hours ?? ""}
                onChange={(e) => setSelected({ ...selected, operating_hours: e.target.value })}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Primary phone"
                  value={selected.primary_phone ?? ""}
                  onChange={(e) => setSelected({ ...selected, primary_phone: e.target.value })}
                />
                <Input
                  label="Secondary phone"
                  value={selected.secondary_phone ?? ""}
                  onChange={(e) => setSelected({ ...selected, secondary_phone: e.target.value })}
                />
              </div>
              <Input
                label="Email"
                type="email"
                value={selected.email ?? ""}
                onChange={(e) => setSelected({ ...selected, email: e.target.value })}
              />
              <Textarea
                label="Classes available note"
                value={selected.classes_available_note ?? ""}
                onChange={(e) =>
                  setSelected({ ...selected, classes_available_note: e.target.value })
                }
              />
              <Select
                label="Active on public site"
                value={selected.is_active ? "yes" : "no"}
                onChange={(e) =>
                  setSelected({ ...selected, is_active: e.target.value === "yes" })
                }
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Select>
              <div className="flex flex-wrap gap-3">
                <Button type="submit">Save</Button>
                <Button type="button" variant="secondary" onClick={closeForm}>
                  Cancel
                </Button>
              </div>
            </EditFormShell>
          </form>
        </div>
      ) : null}

      <div className={selected ? "hidden md:block" : undefined}>
        <div className="mb-4 flex justify-end">
          <Button type="button" onClick={startNew}>
            Add branch
          </Button>
        </div>
        <CmsMobileList>
          {branches.map((b) => (
            <CmsListCard
              key={b.id}
              title={b.name}
              meta={b.address || b.slug}
              badge={<StatusBadge status={b.is_active ? "approved" : "inactive"} />}
              onEdit={() => {
                setSelected(b);
                setMessage("");
                setError("");
              }}
            />
          ))}
        </CmsMobileList>

        <CmsDesktopOnly>
          <DataTable headers={["Branch", "Address", "Phone", "Status", ""]}>
            {branches.map((b) => (
              <tr key={b.id} className="border-t border-black/5">
                <td className="px-4 py-3 font-medium">{b.name}</td>
                <td className="max-w-xs truncate px-4 py-3 text-sm text-[var(--muted)]">
                  {b.address || "—"}
                </td>
                <td className="px-4 py-3 text-sm">{b.primary_phone || "—"}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={b.is_active ? "approved" : "inactive"} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="rounded-md border border-[var(--brand)] px-3 py-1 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--teal-soft)]"
                    onClick={() => {
                      setSelected(b);
                      setMessage("");
                      setError("");
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </DataTable>
        </CmsDesktopOnly>
      </div>
    </div>
  );
}
