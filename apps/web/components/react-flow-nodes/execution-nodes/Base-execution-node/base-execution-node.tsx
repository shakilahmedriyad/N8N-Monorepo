import { BaseHandle } from "@/components/react-flow/base-handle";
import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node";
import {
  NodeStatus,
  NodeStatusIndicator,
} from "@/components/react-flow/node-status-indicator";
import WorkflowNode from "@/components/workflow-node/workflow-node";
import { Position, useReactFlow } from "@xyflow/react";
import { ReactNode } from "react";

type BaseExecutionNodeProps = {
  id: string;
  title: string;
  children: ReactNode;
  status?: NodeStatus;
  description?: string;
  onUpdate?: () => void;
  onDoubleClick?: () => void;
  hideToolbar?: boolean;
};

export default function BaseExecutionNode({
  id,
  title,
  children,
  status = "initial",
  description,
  onUpdate,
  hideToolbar,
  onDoubleClick,
}: BaseExecutionNodeProps) {
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
      <NodeStatusIndicator status={status} variant="border">
        <BaseNode
          onDoubleClick={onDoubleClick}
          className="relative group"
          status={status}
        >
          <BaseNodeContent>
            {children}
            <BaseHandle
              position={Position.Right}
              type="source"
              id={"source-1"}
            />
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
