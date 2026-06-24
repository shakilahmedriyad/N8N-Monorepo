import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteWorkflow() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  return useMutation(
    trpc.workflow.removeWorkflow.mutationOptions({
      onSuccess(data) {
        toast.success(`workflow '${data.name}' deleted successfully.`);
        queryClient.invalidateQueries(
          trpc.workflow.getWorkflows.queryOptions({}),
        );
      },

      onError(error) {
        toast(`could not delete workflow ${error.message}`);
      },
    }),
  );
}
