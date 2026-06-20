import { useTRPC } from "@/lib/trpc/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useSuspenseWorkflowbyId(workflowId: string) {
  const trpc = useTRPC();
  return useSuspenseQuery(
    trpc.workflow.getWorkflowById.queryOptions({ workflowId }),
  );
}
