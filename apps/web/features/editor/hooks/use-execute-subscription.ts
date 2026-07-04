import { useTRPC } from "@/lib/trpc/trpc";
import useNodeStatusStore from "@/store/node-status-store";
import { useSubscription } from "@trpc/tanstack-react-query";

export default function useExecuteSubscription() {
  const trpc = useTRPC();
  return useSubscription(
    trpc.workflow.nodeStatus.subscriptionOptions(void 0, {
      onData: (data) => {
        useNodeStatusStore.getState().setNodeStatus(data.nodeId, data.status);
      },
    }),
  );
}
