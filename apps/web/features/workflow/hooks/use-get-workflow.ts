import { useTRPC } from "@/lib/trpc/trpc";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useWorkflowParams } from "./use-workflow-params";

export default function useSuspenseGetWorkflow() {
  const [params] = useWorkflowParams();
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workflow.getWorkflows.queryOptions(params));
}
