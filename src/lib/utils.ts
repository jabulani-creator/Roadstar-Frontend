import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatZmw(amount: string | number | null | undefined): string {
  if (amount === null || amount === undefined || amount === "") return "Quote";
  const n = typeof amount === "string" ? Number(amount) : amount;
  if (Number.isNaN(n)) return "Quote";
  return `K${n.toLocaleString("en-ZM", { maximumFractionDigits: 0 })}`;
}

export function stripDemoPrefix(text: string): string {
  return text.replace(/^\[DEMO\]\s*/i, "").replace(/^Demo\s+/i, "");
}
