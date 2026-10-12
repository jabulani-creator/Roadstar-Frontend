import { customFetch } from "../customFetch";
import { api } from "../api";
import type { Branch } from "../types";

export const branchService = {
  listPublic: () => customFetch<Branch[]>("/branches/"),
  getPublic: (slug: string) => customFetch<Branch>(`/branches/${slug}/`),
  listStaff: () => api<Branch[]>("/staff/branches/"),
  create: (data: Partial<Branch> & { name: string }) =>
    api<Branch>("/staff/branches/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (slug: string, data: Partial<Branch>) =>
    api<Branch>(`/staff/branches/${slug}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};
