"use client";
import { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { memo } from "react";
import { PlaceholderNode } from "../react-flow/placeholder-node";

export const InitialNode = memo((props: NodeProps) => {
  return (
    <PlaceholderNode {...props}>
      <div className="flex">
        <PlusIcon className="size-4" />
      </div>
    </PlaceholderNode>
  );
});

InitialNode.displayName = "InitialNode";
