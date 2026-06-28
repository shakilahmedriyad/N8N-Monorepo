import { NodeToolbar, Position } from "@xyflow/react";
import { Settings2Icon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import { boolean } from "zod";

type WorkflowNodeProps = {
  title: string;
  description?: string;
  onUpdate?: () => void;
  onDelete?: () => void;
  children: ReactNode;
  hideToolbar?: boolean;
};

export default function WorkflowNode({
  title,
  description,
  hideToolbar = false,
  onUpdate,
  onDelete,
  children,
}: WorkflowNodeProps) {
  return (
    <>
      {!hideToolbar && (
        <NodeToolbar position={Position.Top}>
          <div className="flex">
            <Button onClick={onUpdate} variant={"ghost"} size={"icon-sm"}>
              <Settings2Icon className="size-4" />
            </Button>
            <Button onClick={onDelete} variant={"ghost"} size={"icon-sm"}>
              <Trash2Icon className="size-4" />
            </Button>
          </div>
        </NodeToolbar>
      )}
      {children}
      {boolean(title) && (
        <NodeToolbar
          isVisible
          position={Position.Bottom}
          className="flex flex-col text-center max-w-3xs"
        >
          <span className="font-heading font-bold">{title}</span>
          <span className="text-muted-foreground truncate">{description}</span>
        </NodeToolbar>
      )}
    </>
  );
}
