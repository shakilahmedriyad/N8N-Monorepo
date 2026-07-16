import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

type Props = {
  id: string;
  status: "SUCCESS" | "FAILED" | "RUNNING" | "PENDING";
};

const statusConfig = {
  SUCCESS: {
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
    borderColor: "border-green-200 dark:border-green-800",
    label: "Completed Successfully",
    animate: false,
  },
  FAILED: {
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20",
    label: "Execution Failed",
    animate: false,
  },
  RUNNING: {
    icon: Loader2,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    borderColor: "border-blue-200 dark:border-blue-800",
    label: "Running...",
    animate: true,
  },
  PENDING: {
    icon: Loader2,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    borderColor: "border-blue-200 dark:border-blue-800",
    label: "Running...",
    animate: true,
  },
};

export function ExecutionHeader({ id, status }: Props) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`rounded-lg border p-6 ${config.bgColor} ${config.borderColor}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className={`mt-0.5 rounded-full bg-background p-2 ${config.color}`}
          >
            <Icon
              className={`h-6 w-6 ${config.animate ? "animate-spin" : ""}`}
            />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">
              {config.label}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Execution ID:</span>
              <code className="rounded bg-muted px-2 py-0.5 font-mono text-xs">
                {id}
              </code>
            </div>
          </div>
        </div>
        <Badge
          variant={
            status === "SUCCESS"
              ? "default"
              : status === "FAILED"
                ? "destructive"
                : "secondary"
          }
          className="shrink-0"
        >
          {status}
        </Badge>
      </div>
    </div>
  );
}
