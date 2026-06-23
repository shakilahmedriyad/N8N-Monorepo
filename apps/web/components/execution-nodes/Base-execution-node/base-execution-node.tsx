import { BaseHandle } from "@/components/react-flow/base-handle";
import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node";
import WorkflowNode from "@/components/workflow-node/workflow-node";
import { Position } from "@xyflow/react";
import { Globe2Icon } from "lucide-react";
import { ReactNode } from "react";

type BaseExecutionNodeProps = {
  title: string;
  children: ReactNode;
  description?: string;
  onDelete?: () => void;
  onUpdate?: () => void;
  hideToolbar?: boolean;
};

export default function BaseExecutionNode({
  title,
  children,
  description,
  onDelete,
  onUpdate,
  hideToolbar,
}: BaseExecutionNodeProps) {
  return (
    <WorkflowNode
      hideToolbar={hideToolbar}
      title={title}
      description={description}
      onDelete={onDelete}
      onUpdate={onUpdate}
    >
      <BaseNode>
        <BaseNodeContent>
          {children}
          <BaseHandle position={Position.Right} type="source" id={"source-1"} />
          <BaseHandle position={Position.Left} type="target" id={"target-1"} />
        </BaseNodeContent>
      </BaseNode>
    </WorkflowNode>
  );
}
