import { BaseHandle } from "@/components/react-flow/base-handle";
import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node";
import WorkflowNode from "@/components/workflow-node/workflow-node";
import { Position } from "@xyflow/react";
import { ReactNode } from "react";

type BaseManualNodeProps = {
  title: string;
  children: ReactNode;
  description?: string;
  onDelete?: () => void;
  onUpdate?: () => void;
  onDoubleClick?: () => void;
  hideToolbar?: boolean;
};

export default function BaseManualNode({
  title,
  children,
  description,
  onDelete,
  onUpdate,
  hideToolbar,
  onDoubleClick,
}: BaseManualNodeProps) {
  return (
    <WorkflowNode
      hideToolbar={hideToolbar}
      title={title}
      description={description}
      onDelete={onDelete}
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
