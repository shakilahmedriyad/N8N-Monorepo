"use client";
import { Node, NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import BaseExecutionNode from "../Base-execution-node/base-execution-node";

import useNodeStatusStore from "@/store/node-status-store";
import GeminiIcon from "@/icons/GeminiIcon";
import { GeminiExecutionDialog } from "./geminiExecutionDialog";

type GeminiExecutionNodeProps = {
  apiKey: string;
  model: string;
  prompt: string;
  temperature: number;
  maxTokens: number;
  variableName: string;
};

type NodePropsType = Node<GeminiExecutionNodeProps>;

export const GeminiExecutionNode = memo((props: NodeProps<NodePropsType>) => {
  const nodeId = props.id;
  const status = useNodeStatusStore((state) => state.nodeStatuses[nodeId]);

  const [open, setOpen] = useState(false);

  const handleUpdate = () => {
    setOpen(true);
  };

  return (
    <>
      <GeminiExecutionDialog
        id={props.id}
        open={open}
        onOpenChange={setOpen}
        defaultValues={props.data}
      />
      <BaseExecutionNode
        {...props}
        title="Gemini Request"
        status={status || "initial"}
        onDoubleClick={handleUpdate}
        onUpdate={handleUpdate}
      >
        <GeminiIcon className="text-muted-foreground size-4 group-hover:text-accent-foreground" />
      </BaseExecutionNode>
    </>
  );
});

GeminiExecutionNode.displayName = "GeminiExecutionNode";
