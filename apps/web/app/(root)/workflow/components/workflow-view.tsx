"use client";

import useGetWorkflow from "@/features/workflow/hooks/use-get-workflow";
import { trpc } from "@/lib/trpc/trpc";

export default function WorkflowView() {
  const workflows = useGetWorkflow();
  console.log(workflows);
  return (
    <div>
      {/* {workflows?.map((item) => (
        <p key={item.}>{item.}</p>
      ))} */}
    </div>
  );
}
