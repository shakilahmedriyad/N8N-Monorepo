import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useCreateWorkflow() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  return useMutation(
    trpc.workflow.createWorkflow.mutationOptions({
      onSuccess(data) {
        queryClient.invalidateQueries(
          trpc.workflow.getWorkflows.queryOptions(),
        );
        toast.success(`workflow created successfully ${data.name}`);
      },
      onError(error) {
        toast.error(error.message);
      },
    }),
  );
}
