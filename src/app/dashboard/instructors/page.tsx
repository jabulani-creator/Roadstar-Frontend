"use client";

import { FormEvent, useEffect, useState } from "react";
import { CmsDesktopOnly, CmsListCard, CmsMobileList } from "@/components/cms/CmsListCard";
import { DataTable } from "@/components/cms/DataTable";
import { EditFormShell } from "@/components/cms/EditFormShell";
import { useScrollToEdit } from "@/components/cms/useScrollToEdit";
import { InstructorCard } from "@/components/instructors/InstructorCard";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { instructorPhoto } from "@/lib/fleetMedia";
import { fleetService } from "@/lib/services/fleetService";
import type { Instructor } from "@/lib/types";

export default function DashboardInstructorsPage() {
  const [rows, setRows] = useState<Instructor[]>([]);
  const [selected, setSelected] = useState<Instructor | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [clearPhoto, setClearPhoto] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setRows(await fleetService.instructorsStaff());
  }

  useEffect(() => {
    load().catch((e) => setError(String(e.message || e)));
  }, []);

  useEffect(() => {
    return () => {
      if (photoPreview?.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  function closeForm() {
    if (photoPreview?.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
    setSelected(null);
    setPhotoFile(null);
    setPhotoPreview(null);
    setClearPhoto(false);
  }

  function selectInstructor(r: Instructor) {
    if (photoPreview?.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
    setSelected(r);
    setPhotoFile(null);
    setPhotoPreview(null);
    setClearPhoto(false);
    setMessage("");
    setError("");
  }

  function onPhotoChosen(file: File | null) {
    if (photoPreview?.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
    setPhotoFile(file);
    setClearPhoto(false);
    setPhotoPreview(file ? URL.createObjectURL(file) : null);
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!selected?.id) return;
    setError("");
    setSaving(true);
    try {
      const body = new FormData();
      body.append("display_name", selected.display_name);
      body.append("licence_classes", selected.licence_classes);
      body.append("transmission", selected.transmission);
      body.append("credentials_note", selected.credentials_note ?? "");
      body.append("public_bio", selected.public_bio ?? "");
      body.append("show_on_public_page", selected.show_on_public_page ? "true" : "false");
      body.append("photo_focus", selected.photo_focus || "center");
      if (selected.status) body.append("status", selected.status);
      if (photoFile) {
        body.append("photo", photoFile);
      } else if (clearPhoto) {
        body.append("clear_photo", "true");
      }

      await fleetService.updateInstructor(selected.id, body);
      await load();
      closeForm();
      setMessage(`Saved “${selected.display_name}”.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const previewSrc =
    photoPreview || (!clearPhoto ? instructorPhoto(selected ?? ({} as Instructor)) : null);
  const editRef = useScrollToEdit(selected?.id);

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
        <div ref={editRef} className="scroll-mt-28 grid gap-6 lg:grid-cols-2">
          <form onSubmit={save}>
            <EditFormShell
              title={`Edit · ${selected.display_name}`}
              actions={
                <Button type="button" size="sm" variant="secondary" onClick={closeForm}>
                  Back to list
                </Button>
              }
            >
              <Input
                label="Display name"
                value={selected.display_name}
                onChange={(e) =>
                  setSelected({ ...selected, display_name: e.target.value })
                }
              />
              <Input
                label="Licence classes (comma-separated)"
                value={selected.licence_classes}
                onChange={(e) =>
                  setSelected({ ...selected, licence_classes: e.target.value })
                }
              />
              <Select
                label="Transmission"
                value={selected.transmission}
                onChange={(e) =>
                  setSelected({ ...selected, transmission: e.target.value })
                }
              >
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
                <option value="both">Both</option>
              </Select>
              <Select
                label="Show on public page"
                value={selected.show_on_public_page ? "yes" : "no"}
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    show_on_public_page: e.target.value === "yes",
                  })
                }
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Select>

              <div className="space-y-3">
                <label className="block space-y-1.5 text-sm">
                  <span className="font-medium text-[var(--ink)]">Profile photo</span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/*"
                    className="block w-full text-sm text-[var(--muted)] file:mr-3 file:rounded-md file:border-0 file:bg-[var(--brand)] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
                    onChange={(e) => onPhotoChosen(e.target.files?.[0] ?? null)}
                  />
                </label>
                <p className="text-xs leading-relaxed text-[var(--muted)]">
                  Best result: a clear head-and-shoulders photo (person looking at camera). The
                  public card crops to a wide frame — use Crop focus below if the face sits too
                  high or low.
                </p>
                <Select
                  label="Crop focus (how the public card frames the photo)"
                  value={selected.photo_focus || "center"}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      photo_focus: e.target.value as Instructor["photo_focus"],
                    })
                  }
                >
                  <option value="center">Center — show the face (recommended)</option>
                  <option value="top">Top — standing / upper-body shots</option>
                  <option value="bottom">Bottom — lower framing</option>
                </Select>
                {(previewSrc || selected.photo) && !clearPhoto ? (
                  <button
                    type="button"
                    className="text-sm font-semibold text-red-700"
                    onClick={() => {
                      onPhotoChosen(null);
                      setClearPhoto(true);
                    }}
                  >
                    Remove photo
                  </button>
                ) : (
                  <p className="text-xs text-[var(--muted)]">
                    No photo — placeholder will show on the public site.
                  </p>
                )}
              </div>

              <Input
                label="Credentials note"
                value={selected.credentials_note}
                onChange={(e) =>
                  setSelected({ ...selected, credentials_note: e.target.value })
                }
              />
              <Textarea
                label="Public bio"
                value={selected.public_bio}
                onChange={(e) =>
                  setSelected({ ...selected, public_bio: e.target.value })
                }
              />
              <div className="flex flex-wrap gap-3">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving…" : "Save changes"}
                </Button>
                <Button type="button" variant="secondary" onClick={closeForm}>
                  Back to list
                </Button>
              </div>
            </EditFormShell>
          </form>
          <div>
            <p className="mb-3 text-sm font-medium text-[var(--muted)]">Public preview</p>
            <InstructorCard
              instructor={{
                ...selected,
                photo: previewSrc || "",
                photo_focus: selected.photo_focus || "center",
              }}
            />
            <p className="mt-2 text-xs text-[var(--muted)]">
              Preview matches the public instructors card crop.
            </p>
          </div>
        </div>
      ) : null}

      <div className={selected ? "hidden md:block" : undefined}>
        <CmsMobileList>
          {rows.map((r) => (
            <CmsListCard
              key={r.id}
              title={r.display_name}
              meta={`Classes ${r.licence_classes}${r.show_on_public_page ? " · Public" : " · Hidden"}`}
              onEdit={() => selectInstructor(r)}
            />
          ))}
        </CmsMobileList>

        <CmsDesktopOnly>
          <DataTable headers={["Name", "Classes", "Public", ""]}>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-black/5">
                <td className="px-4 py-3 font-medium">{r.display_name}</td>
                <td className="px-4 py-3">{r.licence_classes}</td>
                <td className="px-4 py-3">{r.show_on_public_page ? "Yes" : "No"}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="rounded-md border border-[var(--brand)] px-3 py-1 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--teal-soft)]"
                    onClick={() => selectInstructor(r)}
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
