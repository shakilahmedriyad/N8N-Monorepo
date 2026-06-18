"use client";

import useSuspenseGetWorkflow from "@/features/workflow/hooks/use-get-workflow";

export default function WorkflowView() {
  const { data } = useSuspenseGetWorkflow();
  return (
    <div>
      {data.items?.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
}
