import { BaseHandle } from "@/components/react-flow/base-handle";
import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node";
import {
  NodeStatus,
  NodeStatusIndicator,
} from "@/components/react-flow/node-status-indicator";
import WorkflowNode from "@/components/workflow-node/workflow-node";
import { Position, useReactFlow } from "@xyflow/react";
import { ReactNode } from "react";

type BaseDiscordNodeProps = {
  id: string;
  title: string;
  status?: NodeStatus;
  children: ReactNode;
  description?: string;
  onUpdate?: () => void;
  onDoubleClick?: () => void;
  hideToolbar?: boolean;
};

export default function BaseDiscordNode({
  id,
  title,
  children,
  status = "initial",
  description,
  onUpdate,
  hideToolbar,
  onDoubleClick,
}: BaseDiscordNodeProps) {
  const { setNodes, setEdges } = useReactFlow();
  const handleDelete = () => {
    setNodes((nodes) => {
      return nodes.filter((node) => node.id != id);
    });
    setEdges((edges) => {
      return edges.filter((edge) => edge.source != id && edge.target != id);
    });
  };
  return (
    <WorkflowNode
      hideToolbar={hideToolbar}
      title={title}
      description={description}
      onDelete={handleDelete}
      onUpdate={onUpdate}
    >
      <NodeStatusIndicator
        status={status}
        variant="border"
        className="rounded-r-2xl"
      >
        <BaseNode
          onDoubleClick={onDoubleClick}
          className="rounded-r-2xl relative"
          status={status}
          statusPosition="left"
        >
          <BaseNodeContent>
            {children}
            <BaseHandle
              position={Position.Left}
              type="target"
              id={"target-1"}
            />
          </BaseNodeContent>
        </BaseNode>
      </NodeStatusIndicator>
    </WorkflowNode>
  );
}
