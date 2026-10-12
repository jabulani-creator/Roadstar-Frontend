import type { Instructor, Vehicle } from "./types";
import { API_URL } from "./env";

/** Turn a relative /media path into an absolute API-host URL when needed. */
export function resolveMediaUrl(src: string | null | undefined): string | null {
  const value = src?.trim();
  if (!value) return null;
  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("blob:") ||
    value.startsWith("data:")
  ) {
    return value;
  }
  const origin = API_URL.replace(/\/api\/v1\/?$/, "");
  return value.startsWith("/") ? `${origin}${value}` : `${origin}/${value}`;
}

/** Public cutout photo when set; otherwise null → icon placeholder. */
export function vehiclePhoto(vehicle: Vehicle): string | null {
  return resolveMediaUrl(vehicle.photo);
}

/** Instructor profile photo when set; otherwise null → placeholder. */
export function instructorPhoto(instructor: Instructor): string | null {
  return resolveMediaUrl(instructor.photo);
}

/** Tailwind object-position class for instructor crop focus. */
export function instructorPhotoFocusClass(
  focus?: Instructor["photo_focus"],
): string {
  if (focus === "top") return "object-top";
  if (focus === "bottom") return "object-bottom";
  return "object-center";
}

/** Specs learners care about when choosing a training vehicle. */
export function vehicleLearnerSpecs(vehicle: Vehicle): { label: string; value: string }[] {
  const specs: { label: string; value: string }[] = [
    { label: "Licence class", value: vehicle.licence_class_label || `Class ${vehicle.licence_class}` },
    { label: "Transmission", value: vehicle.transmission_label || vehicle.transmission },
    { label: "Vehicle type", value: vehicle.vehicle_type_label || vehicle.vehicle_type },
  ];
  if (vehicle.make_model) {
    specs.push({ label: "Make / model", value: vehicle.make_model });
  }
  if (vehicle.branch_name) {
    specs.push({ label: "Branch", value: vehicle.branch_name });
  }
  return specs;
}
