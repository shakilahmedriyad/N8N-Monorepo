import { useTRPC } from "@/lib/trpc/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useSuspenseGetExecutionById(executionId: string) {
  const trpc = useTRPC();
  return useSuspenseQuery(
    trpc.execution.getExecutionById.queryOptions({ executionId }),
  );
}
