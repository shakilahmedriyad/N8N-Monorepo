// features/workflow/server/prefetch.ts
import { prefetch, trpc } from "@/lib/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";

export type input = inferInput<typeof trpc.workflow.getWorkflows>;

export async function prefetchWorkflows(params: input) {
  prefetch(trpc.workflow.getWorkflows.queryOptions(params));
}
