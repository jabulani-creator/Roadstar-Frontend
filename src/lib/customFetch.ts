import { API_URL } from "./env";

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

export async function customFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_URL}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    next: init?.cache === "no-store" ? undefined : { revalidate: 60 },
  });
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
