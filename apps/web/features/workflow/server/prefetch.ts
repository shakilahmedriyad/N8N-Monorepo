"use server";
import { trpc } from "@/lib/trpc/trpc";
import { prefetch } from "@/lib/trpc/server";

export const workflowPrefetch = async () => {
  prefetch(trpc.workflow.getWorkflows.queryOptions());
};
