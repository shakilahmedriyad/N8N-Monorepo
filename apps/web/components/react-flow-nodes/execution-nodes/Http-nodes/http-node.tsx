"use client";
import { Node, NodeProps } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo, useState } from "react";
import BaseExecutionNode from "../Base-execution-node/base-execution-node";
import HttpExecutionDialog from "./HttpExecutionDialog";
import useNodeStatusStore from "@/store/node-status-store";

type HtttpExecutionNodeProps = {
  url?: string;
  method?: "GET" | "PATCH" | "POST" | "DELETE";
  body?: string;
  [key: string]: unknown;
};

type NodePropsType = Node<HtttpExecutionNodeProps>;

export const HttpExecutionNode = memo((props: NodeProps<NodePropsType>) => {
  const nodeId = props.id;
  const status = useNodeStatusStore((state) => state.nodeStatuses[nodeId]);

  const [open, setOpen] = useState(false);
  const description = props.data.url
    ? props.data.method + " : " + props.data.url
    : "Not configured yet";

  const handleUpdate = () => {
    setOpen(true);
  };

  return (
    <>
      <HttpExecutionDialog
        id={props.id}
        open={open}
        onOpenChange={setOpen}
        defaultValues={props.data}
      />
      <BaseExecutionNode
        {...props}
        title="Http Request"
        description={description}
        status={status || "initial"}
        onDoubleClick={handleUpdate}
        onUpdate={handleUpdate}
      >
        <GlobeIcon className="text-muted-foreground size-4 group-hover:text-accent-foreground" />
      </BaseExecutionNode>
    </>
  );
});

HttpExecutionNode.displayName = "HttpExecutionNode";
