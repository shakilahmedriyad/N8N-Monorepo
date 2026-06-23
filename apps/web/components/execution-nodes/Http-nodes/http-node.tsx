"use client";
import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node";
import { NodeProps } from "@xyflow/react";
import { GlobeIcon, PlusIcon } from "lucide-react";
import { memo } from "react";
import BaseExecutionNode from "../Base-execution-node/base-execution-node";

export const HttpExecutionNode = memo((props: NodeProps) => {
  return (
    <BaseExecutionNode title="Http Request">
      <GlobeIcon />
    </BaseExecutionNode>
  );
});

HttpExecutionNode.displayName = "HttpExecutionNode";
