import { ErrorBoundary } from "react-error-boundary";
import WorkflowView from "./components/workflow-view";

import { Suspense } from "react";
import { prefetchWorkflows } from "@/features/workflow/server/prefetch";
import { HydrateClient } from "@/lib/trpc/server";
import requireAuth from "@/lib/auth/require-auth";
import WorkflowContainer from "./components/workflow-container";
import Loading from "@/components/loaders/loading";
import Error from "@/components/errors/error";
import { loadWorkflowParams } from "@/features/workflow/params";

import type { SearchParams } from "nuqs/server";
type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function workflow({ searchParams }: PageProps) {
  await requireAuth();
  const params = await loadWorkflowParams(searchParams);
  prefetchWorkflows(params);

  return (
    <WorkflowContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<Error />}>
          <Suspense fallback={<Loading />}>
            <WorkflowView />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowContainer>
  );
}
