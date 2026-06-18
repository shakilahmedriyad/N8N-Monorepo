import { useTRPC } from "@/lib/trpc/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useSuspenseGetWorkflow() {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workflow.getWorkflows.queryOptions({}));
}
