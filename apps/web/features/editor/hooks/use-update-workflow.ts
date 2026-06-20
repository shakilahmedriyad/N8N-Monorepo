import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useWorkflowUpdate(workflowId: string) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  return useMutation(
    trpc.workflow.updateWorkflow.mutationOptions({
      onSuccess(data) {
        toast.success(`${data.name} updated successfully`);
        queryClient.invalidateQueries(
          trpc.workflow.getWorkflowById.queryOptions({ workflowId }),
        );
      },
      onError(error) {
        toast.error(`update failed with ${error.message}`);
      },
    }),
  );
}
