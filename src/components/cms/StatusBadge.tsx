import { Badge } from "@/components/ui/Badge";

export function StatusBadge({ status }: { status?: string }) {
  const tone =
    status === "approved"
      ? "success"
      : status === "draft" || status === "pending_review"
        ? "warn"
        : "neutral";
  return <Badge tone={tone}>{status ?? "unknown"}</Badge>;
}
