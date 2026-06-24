import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import BaseManualNode from "../manual-base-nodes/manual-base-nodes";
import { MouseIcon } from "lucide-react";

export const ManualTriggerNode = memo((props: NodeProps) => {
  return (
    <BaseManualNode {...props} title="Click to execute node">
      <MouseIcon />
    </BaseManualNode>
  );
});

ManualTriggerNode.displayName = "ManualTriggerNode";
