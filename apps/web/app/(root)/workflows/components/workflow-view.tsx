"use client";

import useSuspenseGetWorkflow from "@/features/workflow/hooks/use-get-workflow";

export default function WorkflowView() {
  const { data: workflows } = useSuspenseGetWorkflow();
  return (
    <div>
      {workflows?.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
}
