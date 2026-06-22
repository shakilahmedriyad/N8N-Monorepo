"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSuspenseWorkflowbyId } from "@/features/editor/hooks/use-get-workflow-by-id";
import useWorkflowUpdate from "@/features/editor/hooks/use-update-workflow";
import { Workflow } from "@repo/contracts";
import { SaveIcon } from "lucide-react";
import Link from "next/link";
import { RefObject, useEffect, useRef, useState } from "react";

export default function EditorHeader({ workflowId }: { workflowId: string }) {
  return (
    <div className="bg-sidebar-accent border-b py-3 px-3 flex items-center gap-x-2.5">
      <SidebarTrigger />
      <EditorBreadCrumb workflowId={workflowId} />
      <EditorSaveButton workflowId={workflowId} />
    </div>
  );
}

export function EditorSaveButton({ workflowId }: { workflowId: string }) {
  return (
    <div className="ml-auto">
      <Button disabled={false}>
        <SaveIcon />
        Save
      </Button>
    </div>
  );
}

export function EditorBreadCrumb({ workflowId }: { workflowId: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbLink asChild>
          <Link href={"/workflows"}>Workflows</Link>
        </BreadcrumbLink>
        <BreadcrumbSeparator />
        <EditorWorkflowName workflowId={workflowId} />
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function EditorWorkflowName({ workflowId }: { workflowId: string }) {
  const [isEditing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, isLoading } = useSuspenseWorkflowbyId(workflowId);
  const handleEditing = () => {
    setEditing(true);
  };
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);
  return (
    <div>
      <BreadcrumbItem aria-disabled={isLoading} onClick={handleEditing}>
        {!isEditing && (
          <div className="cursor-pointer hover:text-accent-foreground transition-colors">
            {data.workflow.name}
          </div>
        )}
        {isEditing && (
          <EditorWorkflowNameInput
            setEditing={setEditing}
            workflow={data.workflow}
            ref={inputRef}
            isLoading={isLoading}
          />
        )}
      </BreadcrumbItem>
    </div>
  );
}

export function EditorWorkflowNameInput({
  workflow,
  setEditing,
  ref,
  isLoading,
}: {
  ref: RefObject<HTMLInputElement | null>;
  workflow: Workflow;
  isLoading: boolean;
  setEditing: (val: boolean) => void;
}) {
  const [workflowName, setWorkflowName] = useState(workflow.name);
  const updateWorkflow = useWorkflowUpdate(workflow.id);

  const handleUpdate = () => {
    setEditing(false);
    if (workflowName == workflow.name) {
      return;
    }
    updateWorkflow.mutate({
      workflowId: workflow.id,
      workflow: {
        name: workflowName,
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") handleUpdate();
    if (e.key == "Escape") setEditing(false);
  };

  return (
    <Input
      ref={ref}
      disabled={isLoading}
      className="text-accent-foreground"
      value={workflowName}
      onBlur={handleUpdate}
      onKeyDown={handleKeyDown}
      onChange={(e) => setWorkflowName(e.target.value)}
    />
  );
}
