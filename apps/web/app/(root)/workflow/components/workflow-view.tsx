"use client";

import useSuspenseGetWorkflow from "@/features/workflow/hooks/use-get-workflow";

export default function WorkflowView() {
  const workflows = useSuspenseGetWorkflow();
  return (
    <div>
      {workflows?.map((item) => (
        <p key={item.name}>{item.name}</p>
      ))}
    </div>
  );
}
