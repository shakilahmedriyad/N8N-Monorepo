import { BaseHandle } from "@/components/react-flow/base-handle";
import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node";
import WorkflowNode from "@/components/workflow-node/workflow-node";
import { Position, useReactFlow } from "@xyflow/react";
import { ReactNode } from "react";

type BaseManualNodeProps = {
  id: string;
  title: string;
  children: ReactNode;
  description?: string;
  onUpdate?: () => void;
  onDoubleClick?: () => void;
  hideToolbar?: boolean;
};

export default function BaseManualNode({
  id,
  title,
  children,
  description,
  onUpdate,
  hideToolbar,
  onDoubleClick,
}: BaseManualNodeProps) {
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
      <BaseNode onDoubleClick={onDoubleClick} className="rounded-l-2xl">
        <BaseNodeContent>
          {children}
          <BaseHandle position={Position.Right} type="source" id={"source-1"} />
        </BaseNodeContent>
      </BaseNode>
    </WorkflowNode>
  );
}
