import { NodeStatus } from "@/components/react-flow/node-status-indicator";
import { useTRPC } from "@/lib/trpc/trpc";
import useNodeStatusStore from "@/store/node-status-store";
import { useSubscription } from "@trpc/tanstack-react-query";

export default function useExecuteSubscription() {
  const trpc = useTRPC();
  return useSubscription(
    trpc.workflow.nodeStatus.subscriptionOptions(void 0, {
      //@ts-expect-error type error
      onData: (data: { nodeId: string; status: NodeStatus }) => {
        useNodeStatusStore.getState().setNodeStatus(data.nodeId, data.status);
      },
    }),
  );
}
