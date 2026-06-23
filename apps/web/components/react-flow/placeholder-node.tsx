"use client";

import React, { type ReactNode } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

import { BaseNode } from "./base-node";

export type PlaceholderNodeProps = Partial<NodeProps> & {
  children?: ReactNode;
  handleClick: () => void;
};

export function PlaceholderNode({
  children,
  handleClick,
}: PlaceholderNodeProps) {
  return (
    <BaseNode
      className="bg-card w-fit h-fit border-dashed border-gray-400 p-2 text-center text-gray-400 shadow-none"
      onClick={handleClick}
    >
      {children}
      <Handle
        type="target"
        style={{ visibility: "hidden" }}
        position={Position.Top}
        isConnectable={false}
      />
      <Handle
        type="source"
        style={{ visibility: "hidden" }}
        position={Position.Bottom}
        isConnectable={false}
      />
    </BaseNode>
  );
}
