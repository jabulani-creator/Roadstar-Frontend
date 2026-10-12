"use client";

import { FormEvent, useEffect, useState } from "react";
import { CmsDesktopOnly, CmsListCard, CmsMobileList } from "@/components/cms/CmsListCard";
import { DataTable } from "@/components/cms/DataTable";
import { EditFormShell } from "@/components/cms/EditFormShell";
import { StatusBadge } from "@/components/cms/StatusBadge";
import { useScrollToEdit } from "@/components/cms/useScrollToEdit";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { formatZmw } from "@/lib/utils";
import { courseService } from "@/lib/services/courseService";
import type { Course } from "@/lib/types";

export default function DashboardCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selected, setSelected] = useState<Course | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const editRef = useScrollToEdit(selected?.id);

  async function load() {
    const data = await courseService.listStaff();
    setCourses(data);
  }

  useEffect(() => {
    load().catch((e) => setError(String(e.message || e)));
  }, []);

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setError("");
    setMessage("");
    try {
      await courseService.update(selected.slug, {
        name: selected.name,
        summary: selected.summary,
        description: selected.description,
        price_amount: selected.price_amount,
        show_price: selected.show_price,
        duration_days: selected.duration_days,
        inclusions: selected.inclusions,
        exclusions: selected.exclusions,
        min_age: selected.min_age,
        max_gvm_kg: selected.max_gvm_kg,
      });
      await load();
      setSelected(null);
      setMessage("Saved. If this course was approved, it may need re-approval after edits.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  }

  function closeForm() {
    setSelected(null);
  }

  async function run(action: "submit" | "approve" | "deactivate") {
    if (!selected) return;
    setError("");
    try {
      const updated =
        action === "submit"
          ? await courseService.submit(selected.slug)
          : action === "approve"
            ? await courseService.approve(selected.slug)
            : await courseService.deactivate(selected.slug);
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
            title={`Edit · ${selected.name}`}
            actions={
              <div className="flex flex-wrap gap-2">
                <Button type="button" size="sm" variant="secondary" onClick={closeForm}>
                  Back to list
                </Button>
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
              </div>
            }
          >
            <Input
              label="Name"
              value={selected.name}
              onChange={(e) => setSelected({ ...selected, name: e.target.value })}
            />
            <Input
              label="Summary"
              value={selected.summary}
              onChange={(e) => setSelected({ ...selected, summary: e.target.value })}
            />
            <Textarea
              label="Description"
              value={selected.description}
              onChange={(e) => setSelected({ ...selected, description: e.target.value })}
            />
            <div className="grid gap-4 md:grid-cols-3">
              <Input
                label="Tuition (ZMW)"
                type="number"
                value={selected.price_amount ?? ""}
                onChange={(e) =>
                  setSelected({ ...selected, price_amount: e.target.value || null })
                }
              />
              <Input
                label="Duration days"
                type="number"
                value={selected.duration_days ?? ""}
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    duration_days: e.target.value ? Number(e.target.value) : null,
                  })
                }
              />
              <Select
                label="Show price publicly"
                value={selected.show_price ? "yes" : "no"}
                onChange={(e) =>
                  setSelected({ ...selected, show_price: e.target.value === "yes" })
                }
              >
                <option value="yes">Yes</option>
                <option value="no">No (request quote)</option>
              </Select>
            </div>
            <Textarea
              label="Inclusions"
              value={selected.inclusions}
              onChange={(e) => setSelected({ ...selected, inclusions: e.target.value })}
            />
            <Textarea
              label="Exclusions"
              value={selected.exclusions}
              onChange={(e) => setSelected({ ...selected, exclusions: e.target.value })}
            />
            <div className="flex flex-wrap gap-3">
              <Button type="submit">Save changes</Button>
              <Button type="button" variant="secondary" onClick={closeForm}>
                Back to list
              </Button>
            </div>
          </EditFormShell>
        </form>
        </div>
      ) : null}

      <div className={selected ? "hidden md:block" : undefined}>
        <CmsMobileList>
          {courses.map((c) => (
            <CmsListCard
              key={c.id}
              title={c.name}
              meta={`${c.licence_class_label} · ${formatZmw(c.price_amount)}`}
              badge={<StatusBadge status={c.status} />}
              onEdit={() => setSelected(c)}
            />
          ))}
        </CmsMobileList>

        <CmsDesktopOnly>
          <DataTable headers={["Course", "Class", "Price", "Status", ""]}>
            {courses.map((c) => (
              <tr key={c.id} className="border-t border-black/5">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3">{c.licence_class_label}</td>
                <td className="px-4 py-3">{formatZmw(c.price_amount)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="rounded-md border border-[var(--brand)] px-3 py-1 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--teal-soft)]"
                    onClick={() => setSelected(c)}
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
