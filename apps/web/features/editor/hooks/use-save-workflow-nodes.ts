import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useSaveWorkflowNodes() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  return useMutation(
    trpc.workflow.saveWorkflowNodes.mutationOptions({
      onSuccess(data) {
        queryClient.invalidateQueries(
          trpc.workflow.getWorkflowById.queryOptions({ workflowId: data.id }),
        );
        queryClient.invalidateQueries(
          trpc.workflow.getWorkflows.queryOptions({}),
        );
        toast.success(` nodes of workflow '${data.name}' has been saved`);
      },
      onError(error) {
        toast.error(
          `Could not update the workflow nodes due to ${error.message}`,
        );
      },
    }),
  );
}
