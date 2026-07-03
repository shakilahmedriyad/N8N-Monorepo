import { useTRPC } from "@/lib/trpc/trpc";
import { useSubscription } from "@trpc/tanstack-react-query";
import { Node } from "@xyflow/react";
import { Dispatch, SetStateAction } from "react";

export default function useExecuteSubscription(
  setNodes: Dispatch<SetStateAction<Node[]>>,
) {
  const trpc = useTRPC();
  return useSubscription(
    trpc.workflow.nodeStatus.subscriptionOptions(void 0, {
      onData: (data) => {
        setNodes((prevNodes) =>
          prevNodes.map((node) => {
            if (node.id === data.nodeId) {
              return {
                ...node,
                data: {
                  ...node.data,
                  status: data.status,
                },
              };
            }
            return node;
          }),
        );
      },
    }),
  );
}
