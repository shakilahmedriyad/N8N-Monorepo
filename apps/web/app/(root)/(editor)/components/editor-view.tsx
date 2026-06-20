"use client";

import { useSuspenseWorkflowbyId } from "@/features/editor/hooks/use-get-workflow-by-id";

export default function EditorView({ workflowId }: { workflowId: string }) {
  const { data: workflow } = useSuspenseWorkflowbyId(workflowId);
  return (
    <div>
      <p> workflow name: {workflow.name}</p>
      workflow created At : {workflow.createdAt.toDateString()}
    </div>
  );
}
