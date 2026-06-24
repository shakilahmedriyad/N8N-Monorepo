import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import BaseManualNode from "../manual-base-nodes/manual-base-nodes";
import { MousePointer2 } from "lucide-react";
import { ManualTriggerDialog } from "../manual-trigger-dialog/manual-trigger-dialog";

const status = "initial";

export const ManualTriggerNode = memo((props: NodeProps) => {
  const [open, setOpen] = useState(false);
  const handleUpdate = () => {
    setOpen(true);
  };
  return (
    <>
      <ManualTriggerDialog onOpenChange={setOpen} open={open} />
      <BaseManualNode
        onUpdate={handleUpdate}
        onDoubleClick={handleUpdate}
        {...props}
        status={status}
        title="Click to execute node"
      >
        <MousePointer2 className="text-muted-foreground size-4 group-hover:text-accent-foreground" />
      </BaseManualNode>
    </>
  );
});

ManualTriggerNode.displayName = "ManualTriggerNode";
