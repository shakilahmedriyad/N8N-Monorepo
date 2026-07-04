import { NodeStatus } from "@/components/react-flow/node-status-indicator";
import { create } from "zustand";

const useNodeStatusStore = create<{
  nodeStatuses: Record<string, NodeStatus>;
  setNodeStatus: (nodeId: string, status: NodeStatus) => void;
  reset: () => void;
  isPending: boolean;
}>((set) => ({
  nodeStatuses: {},
  isPending: false,
  setNodeStatus: (nodeId: string, status: NodeStatus) =>
    set((state) => ({
      nodeStatuses: {
        ...state.nodeStatuses,
        [nodeId]: status,
      },
      isPending: Object.values({
        ...state.nodeStatuses,
        [nodeId]: status,
      }).includes("loading"),
    })),
  reset: () => set({ nodeStatuses: {} }),
}));

export default useNodeStatusStore;
