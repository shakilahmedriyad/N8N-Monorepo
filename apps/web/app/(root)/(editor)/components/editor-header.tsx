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
import { Workflow } from "@repo/contracts";
import { SaveIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
  const { data: workflow } = useSuspenseWorkflowbyId(workflowId);
  return (
    <div>
      <BreadcrumbItem onClick={() => setEditing(true)}>
        {!isEditing && (
          <div className="cursor-pointer hover:text-accent-foreground transition-colors">
            {workflow.name}
          </div>
        )}
        {isEditing && (
          <EditorWorkflowNameInput
            setEditing={setEditing}
            workflow={workflow}
          />
        )}
      </BreadcrumbItem>
    </div>
  );
}

export function EditorWorkflowNameInput({
  workflow,
  setEditing,
}: {
  workflow: Workflow;
  setEditing: (val: boolean) => void;
}) {
  const [workflowName, setWorkflowName] = useState(workflow.name);

  return (
    <Input
      className="text-accent-foreground"
      value={workflowName}
      onChange={(e) => setWorkflowName(e.target.value)}
    />
  );
}
