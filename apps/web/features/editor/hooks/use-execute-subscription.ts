import { NodeStatus } from "@/components/react-flow/node-status-indicator";
import { useTRPC } from "@/lib/trpc/trpc";
import { useSubscription } from "@trpc/tanstack-react-query";
import { Dispatch, SetStateAction } from "react";

export default function useExecuteSubscription(
  nodeId: string,
  setNodeStatus: Dispatch<SetStateAction<NodeStatus>>,
) {
  const trpc = useTRPC();
  return useSubscription(
    trpc.workflow.nodeStatus.subscriptionOptions(void 0, {
      onData: (data) => {
        setNodeStatus((prevStatus) => {
          if (data.nodeId === nodeId) {
            return data.status;
          }
          return prevStatus;
        });
      },
    }),
  );
}
