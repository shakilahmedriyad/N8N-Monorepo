import { HydrateClient } from "@/lib/trpc/server";
import { ExecutionDetails } from "../components/Execution-details";
import { ErrorBoundary } from "react-error-boundary";
import EntityError from "@/components/entity/entity-error";
import { Suspense } from "react";
import EntityLoading from "@/components/entity/entity-loading";

export default async function ExecutionPage({
  params,
}: {
  params: Promise<{ executionId: string }>;
}) {
  const { executionId } = await params;
  return (
    <HydrateClient>
      <ErrorBoundary
        fallback={<EntityError message="Error loading execution history" />}
      >
        <Suspense
          fallback={<EntityLoading description="Loading Executions history" />}
        >
          <ExecutionDetails executionId={executionId} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
