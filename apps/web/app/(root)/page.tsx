"use client";
import { toast } from "sonner";
import { trpc } from "../../lib/trpc";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: workflows } = trpc.workflow.getWorkflows.useQuery();
  const utils = trpc.useUtils();
  const mutation = trpc.workflow.createWorkflow.useMutation({
    onSuccess: () => {
      utils.workflow.invalidate();
      toast.success("New Workflow created");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleCreateWorkflow = () => {
    mutation.mutate({ name: "First Workflow" });
  };

  return (
    <div>
      <h1 className="font-heading">First workflow</h1>
      <Button onClick={handleCreateWorkflow}>Click me</Button>
      {workflows?.map((item) => (
        <p className="" key={item.id}>
          {item.name}
        </p>
      ))}
    </div>
  );
}
