"use client";
import EntityContainer from "@/components/entity/entity-container";
import EntityHeader from "@/components/entity/entity-header";
import { Input } from "@/components/ui/input";
import useCreateWorkflow from "@/features/workflow/hooks/use-create-workflow";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function WorkflowContainer({ children }: PropsWithChildren) {
  const router = useRouter();
  const createWorkflow = useCreateWorkflow();
  const handleCreateWorkflow = () => {
    createWorkflow.mutate(
      {
        name: "first workflow",
      },
      {
        onSuccess(data) {
          router.push(`/workflows/${data.name}`);
        },
      },
    );
  };
  return (
    <EntityContainer
      header={
        <EntityHeader
          title="Workflow"
          description="Manage your workflows"
          buttonText="New Workflow"
          onNew={handleCreateWorkflow}
        />
      }
      search={
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search workflows..."
            className="pl-10"
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      }
    >
      {children}
    </EntityContainer>
  );
}
