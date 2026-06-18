// features/workflow/server/prefetch.ts
import { prefetch, trpc } from "@/lib/trpc/server";
export async function prefetchWorkflows() {
  prefetch(
    trpc.workflow.getWorkflows.queryOptions({
      page: 1,
      pageSize: 5,
      search: "",
    }),
  );
}
