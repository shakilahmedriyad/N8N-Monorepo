"use client";
import { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { memo, useState } from "react";
import { PlaceholderNode } from "../react-flow/placeholder-node";
import WorkflowNode from "../workflow-node/workflow-node";
import NodeSelector from "../workflow-node/node-selector";

export const InitialNode = memo((props: NodeProps) => {
  return (
    <WorkflowNode
      title="Initial"
      hideToolbar={true}
      description="Click to add new nodes"
    >
      <NodeSelector>
        <PlaceholderNode {...props} handleClick={() => {}}>
          <div className="flex items-center justify-center w-auto">
            <PlusIcon className="size-4" />
          </div>
        </PlaceholderNode>
      </NodeSelector>
    </WorkflowNode>
  );
});

InitialNode.displayName = "InitialNode";
