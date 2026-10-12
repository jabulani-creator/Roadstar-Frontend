import { customFetch } from "../customFetch";
import { api } from "../api";
import type { Course } from "../types";

export const courseService = {
  listPublic: () => customFetch<Course[]>("/courses/"),
  getPublic: (slug: string) => customFetch<Course>(`/courses/${slug}/`),
  listStaff: () => api<Course[]>("/staff/courses/"),
  getStaff: (slug: string) => api<Course>(`/staff/courses/${slug}/`),
  create: (data: Partial<Course> & { name: string }) =>
    api<Course>("/staff/courses/", { method: "POST", body: JSON.stringify(data) }),
  update: (slug: string, data: Partial<Course>) =>
    api<Course>(`/staff/courses/${slug}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  submit: (slug: string) =>
    api<Course>(`/staff/courses/${slug}/submit/`, { method: "POST", body: "{}" }),
  approve: (slug: string) =>
    api<Course>(`/staff/courses/${slug}/approve/`, { method: "POST", body: "{}" }),
  reject: (slug: string, note = "") =>
    api<Course>(`/staff/courses/${slug}/reject/`, {
      method: "POST",
      body: JSON.stringify({ note }),
    }),
  deactivate: (slug: string) =>
    api<Course>(`/staff/courses/${slug}/deactivate/`, {
      method: "POST",
      body: "{}",
    }),
};
