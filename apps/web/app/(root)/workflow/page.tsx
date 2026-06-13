import { workflowPrefetch } from "@/features/workflow/server/prefetch";
import { ErrorBoundary } from "react-error-boundary";
import { HydrateClient } from "@/lib/trpc/server";
import WorkflowView from "./components/workflow-view";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
export default async function workflow() {
  workflowPrefetch();
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Error loading workflows</div>}>
        <Suspense fallback={<div>Loading workflows...</div>}>
          <WorkflowView />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
