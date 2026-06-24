import { NodeType } from "@repo/contracts";
import { NodeTypes } from "@xyflow/react";
import { InitialNode } from "@/components/initial-node/initial-node";
import { HttpExecutionNode } from "@/components/react-flow-nodes/execution-nodes/Http-nodes/http-node";
import { ManualTriggerNode } from "@/components/react-flow-nodes/Manual-nodes/manual-trigger/manual-trigge";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_TRIGGER]: HttpExecutionNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
} as const satisfies NodeTypes;

export type RegisterNodes = keyof typeof nodeComponents;
