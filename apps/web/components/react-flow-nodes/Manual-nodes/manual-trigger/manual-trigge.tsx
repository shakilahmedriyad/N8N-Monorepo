import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import BaseManualNode from "../manual-base-nodes/manual-base-nodes";
import { MousePointer2 } from "lucide-react";

const status = "initial";

export const ManualTriggerNode = memo((props: NodeProps) => {
  return (
    <BaseManualNode {...props} status={status} title="Click to execute node">
      <MousePointer2 className="text-muted-foreground size-4 group-hover:text-accent-foreground" />
    </BaseManualNode>
  );
});

ManualTriggerNode.displayName = "ManualTriggerNode";
