import { useTRPC } from "@/lib/trpc/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useWorkflowParams } from "./use-workflow-params";

export default function useSuspenseGetWorkflow() {
  const [params] = useWorkflowParams();
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workflow.getWorkflows.queryOptions(params));
}
