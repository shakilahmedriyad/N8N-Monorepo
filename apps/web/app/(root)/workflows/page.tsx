import { ErrorBoundary } from "react-error-boundary";
import WorkflowView from "./components/workflow-view";

import { Suspense } from "react";
import { prefetchWorkflows } from "@/features/workflow/server/prefetch";
import { HydrateClient } from "@/lib/trpc/server";
import requireAuth from "@/lib/auth/require-auth";
import WorkflowContainer from "./components/workflow-container";
import Loading from "@/components/loaders/loading";
import Error from "@/components/errors/error";

export default async function workflow() {
  await requireAuth();
  prefetchWorkflows();

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
