"use client";

import { API_URL } from "./env";
import { ApiError } from "./customFetch";

const ACCESS_KEY = "roadstar_access";
const REFRESH_KEY = "roadstar_refresh";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_KEY);
}

export function setTokens(access: string, refresh: string) {
  localStorage.setItem(ACCESS_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

async function refreshAccess(): Promise<string | null> {
  const refresh = localStorage.getItem(REFRESH_KEY);
  if (!refresh) return null;
  const res = await fetch(`${API_URL}/auth/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });
  if (!res.ok) {
    clearTokens();
    return null;
  }
  const data = (await res.json()) as { access: string };
  localStorage.setItem(ACCESS_KEY, data.access);
  return data.access;
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_URL}${path}`;
  let token = getAccessToken();

  const isFormData =
    typeof FormData !== "undefined" && init?.body instanceof FormData;

  const doFetch = (access: string | null) =>
    fetch(url, {
      ...init,
      headers: {
        // Let the browser set multipart boundary for FormData uploads.
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(access ? { Authorization: `Bearer ${access}` } : {}),
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    });

  let res = await doFetch(token);
  if (res.status === 401 && token) {
    token = await refreshAccess();
    if (token) res = await doFetch(token);
  }
  if (!res.ok) {
    let body: unknown = null;
    try {
      body = await res.json();
    } catch {
      body = await res.text();
    }
    throw new ApiError(`Request failed: ${res.status}`, res.status, body);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
