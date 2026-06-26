import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useExecuteWorkflow() {
  const trpc = useTRPC();
  return useMutation(
    trpc.workflow.execute.mutationOptions({
      onSuccess(data) {
        toast.success(`workflow started executing ....`);
      },
      onError(error) {
        toast.error(`could not start execution due to : ${error.message}`);
      },
    }),
  );
}
