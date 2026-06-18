import { useTRPC } from "@/lib/trpc/trpc";
import { useQuery } from "@tanstack/react-query";

export default function useSuspenseGetWorkflow() {
  const trpc = useTRPC();
  return useQuery(trpc.workflow.getWorkflows.queryOptions());
}
