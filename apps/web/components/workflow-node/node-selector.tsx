import Image from "next/image";
import {
  isValidElement,
  PropsWithChildren,
  ReactNode,
  useCallback,
} from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { NodeType } from "@repo/contracts";
import { GlobeIcon, MousePointer2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Node, useNodes, useReactFlow } from "@xyflow/react";
import { toast } from "sonner";
import { createId } from "@paralleldrive/cuid2";

type NodeTypes = {
  type: NodeType;
  label: string;
  description: string;
  icons: ReactNode | string;
};

const triggerNodes: NodeTypes[] = [
  {
    label: "Manual Trigger",
    description: "Manually start this workflow with a click",
    icons: <MousePointer2Icon className="h-5 w-5" />,
    type: NodeType.MANUAL_TRIGGER,
  },
  {
    label: "HTTP Trigger",
    description: "Start this workflow via HTTP request",
    icons: <GlobeIcon className="h-5 w-5" />,
    type: NodeType.HTTP_TRIGGER,
  },
];

export default function NodeSelector({
  children,
  asChild = false,
}: {
  children: ReactNode;
  asChild: boolean;
}) {
  const { setNodes, screenToFlowPosition } = useReactFlow();

  const handleNodeCreate = useCallback((type: NodeType) => {
    setNodes((nodes) => {
      if (
        nodes.some(
          (node) =>
            node.type == NodeType.MANUAL_TRIGGER &&
            type == NodeType.MANUAL_TRIGGER,
        )
      ) {
        toast.error(
          `this ${NodeType.MANUAL_TRIGGER} node already exist. try creating other types node`,
        );
        return nodes;
      }

      const base = screenToFlowPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });

      const position = {
        x: base.x + (Math.random() - 0.5) * 120,
        y: base.y + (Math.random() - 0.5) * 120,
      };

      const newNode: Node = {
        id: createId(),
        data: {},
        position,
        type: type,
      };

      if (nodes.some((node) => node.type == NodeType.INITIAL)) {
        return [newNode];
      }

      return [...nodes, newNode];
    });
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild={asChild}>{children}</SheetTrigger>
      <SheetContent side="right" className="sm:max-w-sm">
        <SheetHeader>
          <SheetTitle className="text-xl">
            What triggers this workflow?
          </SheetTitle>
          <SheetDescription>
            Select a trigger to start your workflow
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          {triggerNodes.map((item, index) => (
            <div key={item.type}>
              <Button
                onClick={() => handleNodeCreate(item.type)}
                variant="ghost"
                className="w-full my-2 h-auto p-4 justify-start items-start hover:bg-accent"
              >
                <div className="flex gap-3 text-left">
                  <div className="flex items-center justify-center shrink-0">
                    {typeof item.icons === "string" ? (
                      <Image
                        src={item.icons}
                        width={20}
                        height={20}
                        alt={`${item.label} icon`}
                      />
                    ) : (
                      item.icons
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-0.5">
                      {item.label}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Button>
              {index < triggerNodes.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
