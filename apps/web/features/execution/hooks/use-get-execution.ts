import { useWorkflowParams } from "@/features/workflow/hooks/use-workflow-params";
import { useTRPC } from "@/lib/trpc/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useSuspenseGetExecutions() {
  const [params] = useWorkflowParams();
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.execution.getExecutions.queryOptions(params));
}
