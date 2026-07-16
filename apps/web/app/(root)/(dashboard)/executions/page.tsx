import EntityError from "@/components/entity/entity-error";
import EntityLoading from "@/components/entity/entity-loading";
import { HydrateClient } from "@/lib/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ExecutionList from "./components/ExecutionView";
import { prefetchExecutions } from "@/features/execution/server/prefetch";
import type { SearchParams } from "nuqs/server";
import { loadWorkflowParams } from "@/features/workflow/params";
import requireAuth from "@/lib/auth/require-auth";
import { ExecutionContainer } from "./components/Execution-containar";
type PageProps = {
  searchParams: Promise<SearchParams>;
};
export default async function Executions({ searchParams }: PageProps) {
  await requireAuth();
  const params = await loadWorkflowParams(searchParams);
  prefetchExecutions(params);
  return (
    <HydrateClient>
      <ErrorBoundary
        fallback={<EntityError message="Error loading execution history" />}
      >
        <Suspense
          fallback={<EntityLoading description="Loading Executions history" />}
        >
          <ExecutionContainer>
            <ExecutionList />
          </ExecutionContainer>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
