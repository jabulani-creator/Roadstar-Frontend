import { customFetch } from "../customFetch";
import { api } from "../api";
import type { FAQ, RTSAItem, Testimonial } from "../types";

export const contentService = {
  faqs: () => customFetch<FAQ[]>("/faqs/"),
  rtsa: () => customFetch<RTSAItem[]>("/rtsa/"),
  testimonials: () => customFetch<Testimonial[]>("/testimonials/"),

  faqsStaff: () => api<FAQ[]>("/staff/faqs/"),
  createFaq: (data: Partial<FAQ> & { question: string; answer: string }) =>
    api<FAQ>("/staff/faqs/", { method: "POST", body: JSON.stringify(data) }),
  updateFaq: (id: number, data: Partial<FAQ>) =>
    api<FAQ>(`/staff/faqs/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  submitFaq: (id: number) =>
    api<FAQ>(`/staff/faqs/${id}/submit/`, { method: "POST", body: "{}" }),
  approveFaq: (id: number) =>
    api<FAQ>(`/staff/faqs/${id}/approve/`, { method: "POST", body: "{}" }),
  deactivateFaq: (id: number) =>
    api<FAQ>(`/staff/faqs/${id}/deactivate/`, { method: "POST", body: "{}" }),

  rtsaStaff: () => api<RTSAItem[]>("/staff/rtsa/"),
  createRtsa: (data: Partial<RTSAItem> & { title: string; body: string }) =>
    api<RTSAItem>("/staff/rtsa/", { method: "POST", body: JSON.stringify(data) }),
  updateRtsa: (slug: string, data: Partial<RTSAItem>) =>
    api<RTSAItem>(`/staff/rtsa/${slug}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  submitRtsa: (slug: string) =>
    api<RTSAItem>(`/staff/rtsa/${slug}/submit/`, { method: "POST", body: "{}" }),
  approveRtsa: (slug: string) =>
    api<RTSAItem>(`/staff/rtsa/${slug}/approve/`, { method: "POST", body: "{}" }),
  deactivateRtsa: (slug: string) =>
    api<RTSAItem>(`/staff/rtsa/${slug}/deactivate/`, { method: "POST", body: "{}" }),
};
