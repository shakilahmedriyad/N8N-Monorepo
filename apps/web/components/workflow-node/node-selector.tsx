import Image from "next/image";
import { isValidElement, PropsWithChildren, ReactNode } from "react";
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
import { Globe2Icon, MousePointer2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    icons: <Globe2Icon className="h-5 w-5" />,
    type: NodeType.HTTP_TRIGGER,
  },
];

export default function NodeSelector({ children }: PropsWithChildren) {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
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
