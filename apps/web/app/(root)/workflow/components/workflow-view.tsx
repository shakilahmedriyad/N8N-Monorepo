"use client";

import { trpc } from "@/lib/trpc/trpc";

export default function WorkflowView() {
  const { data: workflows } = trpc.workflow.getWorkflows.useQuery();

  return (
    <div>
      {workflows?.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
}
