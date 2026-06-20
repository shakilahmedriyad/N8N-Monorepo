import { HydrateClient } from "@/lib/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import EditorView from "../../components/editor-view";
import EditorHeader from "../../components/editor-header";
import { prefetchWorkflowById } from "@/features/editor/server/prefetch";

interface PageProps {
  params: Promise<{ workflowId: string }>;
}

export default async function WorkflowPage({ params }: PageProps) {
  const param = await params;
  prefetchWorkflowById(param);
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Error ...</div>}>
        <Suspense fallback={<div>Loading ...</div>}>
          <div className="flex flex-col w-full">
            <EditorHeader workflowId={param.workflowId} />
            <EditorView workflowId={param.workflowId} />
          </div>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
