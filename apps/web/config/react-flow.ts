import { HttpExecutionNode } from "@/components/execution-nodes/Http-nodes/http-node";
import { InitialNode } from "@/components/initial-node/initial-node";
import { NodeType } from "@repo/contracts";
import { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_TRIGGER]: HttpExecutionNode,
} as const satisfies NodeTypes;

export type RegisterNodes = keyof typeof nodeComponents;
