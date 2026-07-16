import { Card } from "@/components/ui/card";
import { Calendar, Clock, Zap } from "lucide-react";

type Props = {
  startedAt: Date;
  finishedAt?: Date | null;
};

function formatDuration(start: Date, end?: Date | null) {
  if (!end) {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - start.getTime()) / 1000);
    return `${seconds}s (ongoing)`;
  }

  const ms = end.getTime() - start.getTime();
  const seconds = ms / 1000;

  if (seconds < 60) return `${seconds.toFixed(2)}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = (seconds % 60).toFixed(0);
  return `${minutes}m ${remainingSeconds}s`;
}

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

export function ExecutionMeta({ startedAt, finishedAt }: Props) {
  const isRunning = !finishedAt;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-950">
            <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">
              Started At
            </p>
            <p className="text-sm font-semibold">{formatDateTime(startedAt)}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={`rounded-lg p-2 ${isRunning ? "bg-orange-100 dark:bg-orange-950" : "bg-green-100 dark:bg-green-950"}`}
          >
            <Clock
              className={`h-4 w-4 ${isRunning ? "text-orange-600 dark:text-orange-400" : "text-green-600 dark:text-green-400"}`}
            />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">
              Finished At
            </p>
            <p className="text-sm font-semibold">
              {finishedAt ? (
                formatDateTime(finishedAt)
              ) : (
                <span className="text-muted-foreground">In progress...</span>
              )}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-950">
            <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">
              Duration
            </p>
            <p className="text-sm font-semibold">
              {formatDuration(startedAt, finishedAt)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
