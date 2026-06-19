"use client";
import EntityContainer from "@/components/entity/entity-container";
import EntityHeader from "@/components/entity/entity-header";
import EntityPaginationBar from "@/components/entity/entity-pagination";
import EntitySearch from "@/components/entity/entity-search";
import useCreateWorkflow from "@/features/workflow/hooks/use-create-workflow";
import useSuspenseGetWorkflow from "@/features/workflow/hooks/use-get-workflow";
import { useWorkflowParams } from "@/features/workflow/hooks/use-workflow-params";
import useEntitySearch from "@/hooks/use-entity-search";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function WorkflowContainer({ children }: PropsWithChildren) {
  return (
    <EntityContainer
      header={<WorkflowHeader />}
      search={<WorkflowSearch />}
      pagination={<WorkflowPaginationBar />}
    >
      {children}
    </EntityContainer>
  );
}

export const WorkflowHeader = () => {
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
    <EntityHeader
      title="Workflow"
      description="Manage your workflows"
      buttonText="New Workflow"
      onNew={handleCreateWorkflow}
    />
  );
};

export const WorkflowSearch = () => {
  const [params, setParams] = useWorkflowParams();
  const { search, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });
  return (
    <EntitySearch
      placeholder="Search workflows..."
      searchQuery={search}
      handleSearch={onSearchChange}
    />
  );
};

export const WorkflowPaginationBar = () => {
  const { data } = useSuspenseGetWorkflow();
  return (
    <EntityPaginationBar
      currentPage={data.currentPage}
      totalPages={data.totalPage}
    />
  );
};
