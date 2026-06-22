import { InitialNode } from "@/components/initial-node/initial-node";
import { NodeType } from "@repo/database";
import { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
  INITIAL: InitialNode,
} as const satisfies NodeTypes;

export type RegisterNodes = keyof typeof nodeComponents;
