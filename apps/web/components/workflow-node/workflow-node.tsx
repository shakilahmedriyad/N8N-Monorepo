import { NodeToolbar, Position } from "@xyflow/react";
import { Settings2Icon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { ReactNode } from "react";

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
    <div className="flex flex-col justify-center items-center cursor-pointer">
      <NodeToolbar hidden={hideToolbar} position={Position.Top}>
        <div className="flex">
          <Button onClick={onUpdate} variant={"ghost"} size={"icon-sm"}>
            <Settings2Icon className="size-4" />
          </Button>
          <Button onClick={onDelete} variant={"ghost"} size={"icon-sm"}>
            <Trash2Icon className="size-4" />
          </Button>
        </div>
      </NodeToolbar>
      {children}
      <div className="w-full text-center text-xs my-2.5 flex flex-col ">
        <span className="text-sm font-heading">{title}</span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
    </div>
  );
}
