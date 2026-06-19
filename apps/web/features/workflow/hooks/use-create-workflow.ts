import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useWorkflowParams } from "./use-workflow-params";

export default function useCreateWorkflow() {
  const trpc = useTRPC();
  const [params] = useWorkflowParams();
  const queryClient = useQueryClient();
  return useMutation(
    trpc.workflow.createWorkflow.mutationOptions({
      onSuccess(data) {
        queryClient.invalidateQueries(
          trpc.workflow.getWorkflows.queryOptions(params),
        );
        toast.success(`workflow created successfully ${data.name}`);
      },
      onError(error) {
        toast.error(error.message);
      },
    }),
  );
}
