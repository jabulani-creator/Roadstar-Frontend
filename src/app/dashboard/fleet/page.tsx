"use client";

import { FormEvent, useEffect, useState } from "react";
import { CmsDesktopOnly, CmsListCard, CmsMobileList } from "@/components/cms/CmsListCard";
import { DataTable } from "@/components/cms/DataTable";
import { EditFormShell } from "@/components/cms/EditFormShell";
import { StatusBadge } from "@/components/cms/StatusBadge";
import { useScrollToEdit } from "@/components/cms/useScrollToEdit";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { vehiclePhoto } from "@/lib/fleetMedia";
import { fleetService } from "@/lib/services/fleetService";
import type { Vehicle } from "@/lib/types";

export default function DashboardFleetPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [clearPhoto, setClearPhoto] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setVehicles(await fleetService.vehiclesStaff());
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

  function selectVehicle(v: Vehicle) {
    if (photoPreview?.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
    setSelected(v);
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
      body.append("name", selected.name);
      body.append("make_model", selected.make_model ?? "");
      body.append("registration_number", selected.registration_number ?? "");
      body.append("vehicle_type", selected.vehicle_type);
      body.append("licence_class", selected.licence_class);
      body.append("transmission", selected.transmission);
      body.append("public_description", selected.public_description ?? "");
      body.append("show_on_public_page", selected.show_on_public_page ? "true" : "false");
      if (photoFile) {
        body.append("photo", photoFile);
      } else if (clearPhoto) {
        body.append("clear_photo", "true");
      }

      await fleetService.updateVehicle(selected.id, body);
      await load();
      closeForm();
      setMessage(`Saved “${selected.name}”. Class ${selected.licence_class.toUpperCase()} · ${selected.transmission}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function setStatus(status: string) {
    if (!selected?.id) return;
    setError("");
    try {
      const name = selected.name;
      await fleetService.setVehicleStatus(
        selected.id,
        status,
        status === "available" ? "" : "Updated from CMS",
      );
      await load();
      closeForm();
      setMessage(`“${name}” marked ${status}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Status update failed");
    }
  }

  const previewSrc =
    photoPreview || (!clearPhoto ? vehiclePhoto(selected ?? ({} as Vehicle)) : null);
  const editRef = useScrollToEdit(selected?.id);

  return (
    <div className="space-y-6">
      {!selected ? (
        <aside className="rounded-lg border-l-4 border-[var(--brand)] bg-[var(--teal-soft)] px-4 py-3 text-sm leading-relaxed text-[var(--muted)]">
          <span className="font-semibold text-[var(--ink)]">What each vehicle stores:</span>{" "}
          name, registration, make/model, vehicle type (body style),{" "}
          <span className="font-semibold text-[var(--ink)]">licence class</span> (B / C1 / C),{" "}
          <span className="font-semibold text-[var(--ink)]">transmission</span> (manual /
          automatic), public description, photo, and whether it shows on the public fleet page.
        </aside>
      ) : null}

      {error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>
      ) : null}
      {message ? (
        <p className="rounded-xl bg-[var(--teal-soft)] px-4 py-3 text-sm text-[var(--brand-strong)]">
          {message}
        </p>
      ) : null}

      {selected ? (
        <div
          ref={editRef}
          className="scroll-mt-28 grid gap-6 lg:grid-cols-2"
        >
          <form onSubmit={save}>
            <EditFormShell
              title={`Edit · ${selected.name}`}
              actions={
                <div className="flex flex-wrap gap-2">
                  <Button type="button" size="sm" variant="secondary" onClick={closeForm}>
                    Back to list
                  </Button>
                  <Button type="button" size="sm" onClick={() => setStatus("available")}>
                    Available
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => setStatus("maintenance")}
                  >
                    Maintenance
                  </Button>
                </div>
              }
            >
              <Input
                label="Name *"
                value={selected.name}
                onChange={(e) => setSelected({ ...selected, name: e.target.value })}
              />
              <Input
                label="Registration number *"
                value={selected.registration_number ?? ""}
                onChange={(e) =>
                  setSelected({ ...selected, registration_number: e.target.value })
                }
                placeholder="e.g. ALB 1234"
              />
              <Input
                label="Make / model"
                value={selected.make_model}
                onChange={(e) => setSelected({ ...selected, make_model: e.target.value })}
                placeholder="e.g. Toyota Corolla"
              />

              <Select
                label="Licence class * — what learners train for in this car"
                value={selected.licence_class}
                onChange={(e) => setSelected({ ...selected, licence_class: e.target.value })}
              >
                <option value="B">Class B — everyday passenger cars</option>
                <option value="C1">Class C1 — light commercial</option>
                <option value="C">Class C — heavy vehicles</option>
                <option value="other">Other / specialised</option>
              </Select>
              <p className="!-mt-2 text-xs text-[var(--muted)]">
                This is separate from “vehicle type”. Class B is the default if you never set it.
              </p>

              <Select
                label="Transmission * — gearbox learners will use"
                value={selected.transmission}
                onChange={(e) => setSelected({ ...selected, transmission: e.target.value })}
              >
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
                <option value="both">Manual and automatic</option>
              </Select>
              <p className="!-mt-2 text-xs text-[var(--muted)]">
                Manual is the default if you never set it.
              </p>

              <Select
                label="Vehicle type — body / category"
                value={selected.vehicle_type}
                onChange={(e) => setSelected({ ...selected, vehicle_type: e.target.value })}
              >
                <option value="passenger">Passenger car</option>
                <option value="light_commercial">Light commercial</option>
                <option value="heavy">Heavy vehicle</option>
                <option value="other">Other</option>
              </Select>

              <Select
                label="Show on public fleet page"
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

              <div className="space-y-2">
                <label className="block space-y-1.5 text-sm">
                  <span className="font-medium text-[var(--ink)]">Cutout photo</span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/*"
                    className="block w-full text-sm text-[var(--muted)] file:mr-3 file:rounded-md file:border-0 file:bg-[var(--brand)] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
                    onChange={(e) => onPhotoChosen(e.target.files?.[0] ?? null)}
                  />
                </label>
                {previewSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewSrc}
                    alt={`${selected.name} preview`}
                    className="mt-2 max-h-40 w-auto object-contain"
                  />
                ) : (
                  <p className="text-xs text-[var(--muted)]">No photo — icon placeholder will show.</p>
                )}
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
                ) : null}
              </div>

              <Textarea
                label="Public description"
                value={selected.public_description}
                onChange={(e) =>
                  setSelected({ ...selected, public_description: e.target.value })
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
            <VehicleCard
              vehicle={{
                ...selected,
                photo: previewSrc || "",
              }}
            />
          </div>
        </div>
      ) : null}

      <div className={selected ? "hidden md:block" : undefined}>
        <CmsMobileList>
          {vehicles.map((v) => (
            <CmsListCard
              key={v.id}
              title={v.name}
              meta={`${v.licence_class_label} · ${v.transmission_label} · ${v.vehicle_type_label}${v.show_on_public_page ? " · Public" : ""}`}
              badge={<StatusBadge status={v.status} />}
              onEdit={() => selectVehicle(v)}
            />
          ))}
        </CmsMobileList>

        <CmsDesktopOnly>
          <DataTable headers={["Name", "Class", "Transmission", "Type", "Public", "Status", ""]}>
            {vehicles.map((v) => (
              <tr key={v.id} className="border-t border-black/5">
                <td className="px-4 py-3 font-medium">{v.name}</td>
                <td className="px-4 py-3">{v.licence_class_label}</td>
                <td className="px-4 py-3">{v.transmission_label}</td>
                <td className="px-4 py-3">{v.vehicle_type_label}</td>
                <td className="px-4 py-3">{v.show_on_public_page ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={v.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="rounded-md border border-[var(--brand)] px-3 py-1 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--teal-soft)]"
                    onClick={() => selectVehicle(v)}
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
