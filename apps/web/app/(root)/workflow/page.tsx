import { ErrorBoundary } from "react-error-boundary";
import WorkflowView from "./components/workflow-view";

import { Suspense } from "react";
import { prefetchWorkflows } from "@/features/workflow/server/prefetch";
import { HydrateClient } from "@/lib/trpc/server";
import requireAuth from "@/lib/auth/require-auth";
import WorkflowContainer from "./components/workflow-container";

export default async function workflow() {
  await requireAuth();
  prefetchWorkflows();

  return (
    <WorkflowContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<div>Error loading workflows</div>}>
          <Suspense fallback={<div>Loading workflows...</div>}>
            <WorkflowView />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowContainer>
  );
}
