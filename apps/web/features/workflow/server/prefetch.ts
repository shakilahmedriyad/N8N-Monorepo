// features/workflow/server/prefetch.ts
import { trpc } from "@/lib/trpc/server";
import { prefetch } from "@/lib/trpc/trpc";

export async function prefetchWorkflows() {
  prefetch(trpc.workflow.getWorkflows.queryOptions());
}
