"use client";

import { FormEvent, useEffect, useState } from "react";
import { CmsDesktopOnly, CmsListCard, CmsMobileList } from "@/components/cms/CmsListCard";
import { DataTable } from "@/components/cms/DataTable";
import { EditFormShell } from "@/components/cms/EditFormShell";
import { StatusBadge } from "@/components/cms/StatusBadge";
import { useScrollToEdit } from "@/components/cms/useScrollToEdit";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { contentService } from "@/lib/services/contentService";
import type { FAQ } from "@/lib/types";

const FAQ_CATEGORIES = [
  { value: "courses", label: "Courses & fees" },
  { value: "enrolment", label: "Enrolment & documents" },
  { value: "lessons", label: "Lessons & scheduling" },
  { value: "rtsa", label: "RTSA & licensing" },
  { value: "general", label: "General" },
] as const;

type Editable = FAQ & { _new?: boolean };

const blank = (): Editable => ({
  id: 0,
  question: "",
  answer: "",
  category: "general",
  display_order: 0,
  status: "draft",
  _new: true,
});

export default function DashboardFaqsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [selected, setSelected] = useState<Editable | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const editRef = useScrollToEdit(selected?.id || undefined);

  async function load() {
    setFaqs(await contentService.faqsStaff());
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
        question: selected.question.trim(),
        answer: selected.answer,
        category: selected.category,
        display_order: selected.display_order ?? 0,
      };
      if (selected._new || !selected.id) {
        const created = await contentService.createFaq({
          ...payload,
          question: payload.question,
          answer: payload.answer,
        });
        setSelected(created);
        setMessage(`Created FAQ. Submit & approve to publish.`);
      } else {
        const updated = await contentService.updateFaq(selected.id, payload);
        setSelected(updated);
        setMessage("Saved. Re-approve if this was already live.");
      }
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  }

  async function run(action: "submit" | "approve" | "deactivate") {
    if (!selected?.id) return;
    setError("");
    try {
      const updated =
        action === "submit"
          ? await contentService.submitFaq(selected.id)
          : action === "approve"
            ? await contentService.approveFaq(selected.id)
            : await contentService.deactivateFaq(selected.id);
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
              title={selected._new ? "New FAQ" : `Edit · FAQ #${selected.id}`}
              actions={
                <div className="flex flex-wrap gap-2">
                  <Button type="button" size="sm" variant="secondary" onClick={closeForm}>
                    Back to list
                  </Button>
                  {!selected._new && selected.id ? (
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
                label="Question"
                value={selected.question}
                onChange={(e) => setSelected({ ...selected, question: e.target.value })}
                required
              />
              <Textarea
                label="Answer"
                value={selected.answer}
                onChange={(e) => setSelected({ ...selected, answer: e.target.value })}
                required
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Select
                  label="Category"
                  value={selected.category}
                  onChange={(e) => setSelected({ ...selected, category: e.target.value })}
                >
                  {FAQ_CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </Select>
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
            Add FAQ
          </Button>
        </div>
        <CmsMobileList>
          {faqs.map((f) => (
            <CmsListCard
              key={f.id}
              title={f.question}
              meta={f.category_label || f.category}
              badge={<StatusBadge status={f.status} />}
              onEdit={() => {
                setSelected(f);
                setMessage("");
                setError("");
              }}
            />
          ))}
        </CmsMobileList>

        <CmsDesktopOnly>
          <DataTable headers={["Question", "Category", "Order", "Status", ""]}>
            {faqs.map((f) => (
              <tr key={f.id} className="border-t border-black/5">
                <td className="max-w-md truncate px-4 py-3 font-medium">{f.question}</td>
                <td className="px-4 py-3 text-sm">{f.category_label || f.category}</td>
                <td className="px-4 py-3">{f.display_order}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={f.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="rounded-md border border-[var(--brand)] px-3 py-1 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--teal-soft)]"
                    onClick={() => {
                      setSelected(f);
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
