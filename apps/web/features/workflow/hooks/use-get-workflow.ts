import "client-only";
import { trpc } from "@/lib/trpc/trpc";

export default function useSuspenseGetWorkflow() {
  const [workflow] = trpc.workflow.getWorkflows.useSuspenseQuery();
  return workflow;
}
