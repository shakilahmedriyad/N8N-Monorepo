"use client";
import { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { memo } from "react";
import { PlaceholderNode } from "../react-flow/placeholder-node";
import WorkflowNode from "../workflow-node/workflow-node";

export const InitialNode = memo((props: NodeProps) => {
  return (
    <WorkflowNode title="Initial" description="Click to add new nodes">
      <PlaceholderNode {...props} handleClick={() => {}}>
        <div className="flex items-center justify-center w-auto">
          <PlusIcon className="size-4" />
        </div>
      </PlaceholderNode>
    </WorkflowNode>
  );
});

InitialNode.displayName = "InitialNode";
