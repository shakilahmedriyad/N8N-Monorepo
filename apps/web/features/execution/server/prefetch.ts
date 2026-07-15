import { prefetch, trpc } from "@/lib/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";

export type input = inferInput<typeof trpc.execution.getExecutions>;

export async function prefetchExecutions(params: input) {
  prefetch(trpc.execution.getExecutions.queryOptions(params));
}
