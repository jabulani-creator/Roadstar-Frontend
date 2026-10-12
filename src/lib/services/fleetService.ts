import { customFetch } from "../customFetch";
import { api } from "../api";
import type { Instructor, Vehicle } from "../types";

export const fleetService = {
  vehiclesPublic: () => customFetch<Vehicle[]>("/vehicles/"),
  instructorsPublic: () => customFetch<Instructor[]>("/instructors/"),
  vehiclesStaff: () => api<Vehicle[]>("/staff/vehicles/"),
  instructorsStaff: () => api<Instructor[]>("/staff/instructors/"),
  updateVehicle: (id: number, data: Partial<Vehicle> | FormData) =>
    api<Vehicle>(`/staff/vehicles/${id}/`, {
      method: "PATCH",
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),
  createVehicle: (data: Record<string, unknown> | FormData) =>
    api<Vehicle>("/staff/vehicles/", {
      method: "POST",
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),
  updateInstructor: (id: number, data: Partial<Instructor> | FormData) =>
    api<Instructor>(`/staff/instructors/${id}/`, {
      method: "PATCH",
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),
  setVehicleStatus: (id: number, status: string, note = "") =>
    api<Vehicle>(`/staff/vehicles/${id}/status/`, {
      method: "POST",
      body: JSON.stringify({ status, note }),
    }),
};
