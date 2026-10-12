"use client";

import { FormEvent, useEffect, useState } from "react";
import { CmsDesktopOnly, CmsListCard, CmsMobileList } from "@/components/cms/CmsListCard";
import { DataTable } from "@/components/cms/DataTable";
import { EditFormShell } from "@/components/cms/EditFormShell";
import { StatusBadge } from "@/components/cms/StatusBadge";
import { useScrollToEdit } from "@/components/cms/useScrollToEdit";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { formatZmw } from "@/lib/utils";
import { contentService } from "@/lib/services/contentService";
import type { RTSAItem } from "@/lib/types";

type Editable = RTSAItem & { _new?: boolean };

const blank = (): Editable => ({
  id: 0,
  title: "",
  slug: "",
  body: "",
  fee_amount: null,
  currency: "ZMW",
  source_url: "",
  effective_date: null,
  last_reviewed_at: null,
  display_order: 0,
  status: "draft",
  _new: true,
});

export default function DashboardRtsaPage() {
  const [items, setItems] = useState<RTSAItem[]>([]);
  const [selected, setSelected] = useState<Editable | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const editRef = useScrollToEdit(selected?.id || undefined);

  async function load() {
    setItems(await contentService.rtsaStaff());
  }

  useEffect(() => {
    load().catch((e) => setError(String(e.message || e)));
  }, []);

  function closeForm() {
    setSelected(null);
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setError("");
    setMessage("");
    try {
      const payload = {
        title: selected.title.trim(),
        body: selected.body,
        fee_amount: selected.fee_amount,
        currency: selected.currency || "ZMW",
        source_url: selected.source_url ?? "",
        effective_date: selected.effective_date || null,
        last_reviewed_at: selected.last_reviewed_at || null,
        display_order: selected.display_order ?? 0,
      };
      if (selected._new || !selected.slug) {
        const created = await contentService.createRtsa({
          ...payload,
          title: payload.title,
          body: payload.body,
        });
        setSelected(created);
        setMessage(`Created “${created.title}”. Submit & approve to publish.`);
      } else {
        const updated = await contentService.updateRtsa(selected.slug, payload);
        setSelected(updated);
        setMessage("Saved. If this was approved, re-approve after edits if needed.");
      }
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  }

  async function run(action: "submit" | "approve" | "deactivate") {
    if (!selected?.slug) return;
    setError("");
    try {
      const updated =
        action === "submit"
          ? await contentService.submitRtsa(selected.slug)
          : action === "approve"
            ? await contentService.approveRtsa(selected.slug)
            : await contentService.deactivateRtsa(selected.slug);
      setSelected(updated);
      setMessage(`Action “${action}” completed.`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed");
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
              title={selected._new ? "New RTSA / licensing item" : `Edit · ${selected.title}`}
              actions={
                <div className="flex flex-wrap gap-2">
                  <Button type="button" size="sm" variant="secondary" onClick={closeForm}>
                    Back to list
                  </Button>
                  {!selected._new && selected.slug ? (
                    <>
                      <Button type="button" size="sm" variant="secondary" onClick={() => run("submit")}>
                        Submit
                      </Button>
                      <Button type="button" size="sm" onClick={() => run("approve")}>
                        Approve
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="danger"
                        onClick={() => run("deactivate")}
                      >
                        Deactivate
                      </Button>
                    </>
                  ) : null}
                </div>
              }
            >
              <Input
                label="Title"
                value={selected.title}
                onChange={(e) => setSelected({ ...selected, title: e.target.value })}
                required
              />
              {!selected._new && selected.slug ? (
                <p className="text-xs text-[var(--muted)]">Slug: {selected.slug}</p>
              ) : null}
              <Textarea
                label="Body / requirements"
                value={selected.body}
                onChange={(e) => setSelected({ ...selected, body: e.target.value })}
                required
              />
              <div className="grid gap-4 md:grid-cols-3">
                <Input
                  label="Fee (ZMW)"
                  type="number"
                  value={selected.fee_amount ?? ""}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      fee_amount: e.target.value || null,
                    })
                  }
                />
                <Input
                  label="Display order"
                  type="number"
                  value={selected.display_order ?? 0}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      display_order: Number(e.target.value) || 0,
                    })
                  }
                />
                <Input
                  label="Currency"
                  value={selected.currency || "ZMW"}
                  onChange={(e) => setSelected({ ...selected, currency: e.target.value })}
                />
              </div>
              <Input
                label="Source URL"
                value={selected.source_url ?? ""}
                onChange={(e) => setSelected({ ...selected, source_url: e.target.value })}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Effective date"
                  type="date"
                  value={selected.effective_date ?? ""}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      effective_date: e.target.value || null,
                    })
                  }
                />
                <Input
                  label="Last reviewed"
                  type="date"
                  value={selected.last_reviewed_at ?? ""}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      last_reviewed_at: e.target.value || null,
                    })
                  }
                />
              </div>
              {selected.status ? (
                <p className="text-sm text-[var(--muted)]">
                  Status: <StatusBadge status={selected.status} />
                </p>
              ) : null}
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
          <Button
            type="button"
            onClick={() => {
              setSelected(blank());
              setMessage("");
              setError("");
            }}
          >
            Add RTSA item
          </Button>
        </div>
        <CmsMobileList>
          {items.map((item) => (
            <CmsListCard
              key={item.id}
              title={item.title}
              meta={item.fee_amount ? formatZmw(item.fee_amount) : "No fee"}
              badge={<StatusBadge status={item.status} />}
              onEdit={() => {
                setSelected(item);
                setMessage("");
                setError("");
              }}
            />
          ))}
        </CmsMobileList>

        <CmsDesktopOnly>
          <DataTable headers={["Item", "Fee", "Order", "Status", ""]}>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-black/5">
                <td className="px-4 py-3 font-medium">{item.title}</td>
                <td className="px-4 py-3">
                  {item.fee_amount ? formatZmw(item.fee_amount) : "—"}
                </td>
                <td className="px-4 py-3">{item.display_order}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="rounded-md border border-[var(--brand)] px-3 py-1 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--teal-soft)]"
                    onClick={() => {
                      setSelected(item);
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
