import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { FileTextIcon } from "lucide-react";
import useNodeStatusStore from "@/store/node-status-store";
import BaseGoogleFormNode from "../google-form-base-nodes/manual-base-nodes";
import { GoogleFormTriggerDialog } from "../google-form-trigger-dialog/google-form-trigger-dialog";

export const GoogleFormTriggerNode = memo((props: NodeProps) => {
  const nodeId = props.id;
  const status = useNodeStatusStore((state) => state.nodeStatuses[nodeId]);
  const [open, setOpen] = useState(false);
  const handleUpdate = () => {
    setOpen(true);
  };
  return (
    <>
      <GoogleFormTriggerDialog onOpenChange={setOpen} open={open} />
      <BaseGoogleFormNode
        onUpdate={handleUpdate}
        onDoubleClick={handleUpdate}
        {...props}
        status={status}
        title="Google Form Trigger"
        description="This node will trigger the workflow when a form is submitted"
      >
        <FileTextIcon className="text-muted-foreground size-4 group-hover:text-accent-foreground" />
      </BaseGoogleFormNode>
    </>
  );
});

GoogleFormTriggerNode.displayName = "GoogleFormTriggerNode";
