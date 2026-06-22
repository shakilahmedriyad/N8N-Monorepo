"use client";

import useSuspenseGetWorkflow from "@/features/workflow/hooks/use-get-workflow";
import { WorkflowList } from "./workflow-container";
export default function WorkflowView() {
  const { data } = useSuspenseGetWorkflow();
  return <WorkflowList workflows={data?.items || []} />;
}
