// features/editor/server/prefetch.ts
import { prefetch, trpc } from "@/lib/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";

export type input = inferInput<typeof trpc.workflow.getWorkflowById>;

export async function prefetchWorkflowById(params: input) {
  prefetch(trpc.workflow.getWorkflowById.queryOptions(params));
}
