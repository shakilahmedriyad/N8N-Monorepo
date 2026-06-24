"use client";
import { Node, NodeProps } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo } from "react";
import BaseExecutionNode from "../Base-execution-node/base-execution-node";

type HtttpExecutionNodeProps = {
  url?: string;
  method?: "GET" | "PATCH" | "POST" | "DELETE";
  body?: string;
  [key: string]: unknown;
};

type NodePropsType = Node<HtttpExecutionNodeProps>;

const status = "initial";

export const HttpExecutionNode = memo((props: NodeProps<NodePropsType>) => {
  const description = props.data.url ? props.data.url : "Not configured yet";
  return (
    <BaseExecutionNode
      {...props}
      title="Http Request"
      description={description}
      status={status}
    >
      <GlobeIcon className="text-muted-foreground size-4 group-hover:text-accent-foreground" />
    </BaseExecutionNode>
  );
});

HttpExecutionNode.displayName = "HttpExecutionNode";
