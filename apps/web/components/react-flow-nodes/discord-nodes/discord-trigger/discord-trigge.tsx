import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { DiscordTriggerDialog } from "../discord-trigger-dialog/discord-trigger-dialog";
import useNodeStatusStore from "@/store/node-status-store";
import BaseDiscordNode from "../discord-base-nodes/discord-base-nodes";
import DiscordIcon from "@/icons/DiscordIcon";

export const DiscordTriggerNode = memo((props: NodeProps) => {
  const nodeId = props.id;
  const status = useNodeStatusStore((state) => state.nodeStatuses[nodeId]);
  const [open, setOpen] = useState(false);
  const handleUpdate = () => {
    setOpen(true);
  };
  return (
    <>
      <DiscordTriggerDialog
        id={nodeId}
        onOpenChange={setOpen}
        open={open}
        defaultValues={props.data}
      />
      <BaseDiscordNode
        onUpdate={handleUpdate}
        onDoubleClick={handleUpdate}
        {...props}
        status={status}
        title="Discord Notification"
      >
        <DiscordIcon className="text-muted-foreground size-4 group-hover:text-accent-foreground" />
      </BaseDiscordNode>
    </>
  );
});

DiscordTriggerNode.displayName = "DiscordTriggerNode";
