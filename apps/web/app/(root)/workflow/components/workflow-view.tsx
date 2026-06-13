"use client";
import useGetWorkflow from "@/features/workflow/hooks/use-get-workflow";

export default function WorkflowView() {
  const { data: workflows } = useGetWorkflow();
  console.log(workflows);
  return (
    <div>
      {workflows?.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
}
