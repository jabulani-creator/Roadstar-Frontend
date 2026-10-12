import { customFetch } from "../customFetch";

export type LeadCreatePayload = {
  full_name: string;
  phone: string;
  email?: string;
  preferred_contact?: string;
  experience_level?: string;
  licence_class?: string;
  transmission?: string;
  preferred_branch?: number | null;
  preferred_schedule?: string;
  message?: string;
  interested_course?: number | null;
  channel?: string;
  referral_source?: string;
  referral_detail?: string;
  whatsapp_summary?: string;
};

export type LeadCreated = {
  id: number;
  full_name: string;
  status: string;
  created_at: string;
};

export const leadService = {
  create: (data: LeadCreatePayload) =>
    customFetch<LeadCreated>("/leads/", {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-store",
    }),
};
