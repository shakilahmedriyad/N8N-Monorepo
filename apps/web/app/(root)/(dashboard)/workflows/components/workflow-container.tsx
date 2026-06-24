"use client";
import EntityContainer from "@/components/entity/entity-container";
import EntityHeader from "@/components/entity/entity-header";
import EntityItem from "@/components/entity/entity-item";
import EntityLists from "@/components/entity/entity-lists";
import EntityPaginationBar from "@/components/entity/entity-pagination";
import EntitySearch from "@/components/entity/entity-search";
import useCreateWorkflow from "@/features/workflow/hooks/use-create-workflow";
import useSuspenseGetWorkflow from "@/features/workflow/hooks/use-get-workflow";
import { useWorkflowParams } from "@/features/workflow/hooks/use-workflow-params";
import useEntitySearch from "@/hooks/use-entity-search";
import { type Workflow } from "@repo/contracts";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useCallback } from "react";
import { formatDistanceToNow } from "date-fns";
import { WorkflowIcon } from "lucide-react";
import EntityEmptyView from "@/components/entity/entity-empty-view";
import { toast } from "sonner";
import useDeleteWorkflow from "@/features/workflow/hooks/use-delete-workflow";

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
          router.push(`/workflows/${data.id}`);
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
      currentPage={data?.currentPage || 0}
      totalPages={data?.totalPage || 0}
    />
  );
};

export const WorkflowEmptyView = () => {
  const createWorkflow = useCreateWorkflow();
  const handleCreateWorkflow = () => {
    createWorkflow.mutate(
      {
        name: "Workflow",
      },
      {
        onError(error) {
          toast.error(error.message);
        },
        onSuccess(data) {
          toast.success(`${data.name} created successfully`);
        },
      },
    );
  };
  return (
    <EntityEmptyView
      title="No workflows yet"
      description="Get started by creating your first automation workflow"
      actionLabel="Create Workflow"
      onAction={handleCreateWorkflow}
    />
  );
};

export const WorkflowList = ({ workflows }: { workflows: Workflow[] }) => {
  const deleteWorkflow = useDeleteWorkflow();
  const handleDelete = useCallback((id: string) => {
    deleteWorkflow.mutate({ id });
  }, []);
  return (
    <EntityLists
      items={workflows}
      emptyView={<WorkflowEmptyView />}
      renderItem={(item) => (
        <EntityItem
          id={item.id}
          isRemoving={deleteWorkflow.isPending}
          href={`workflows/${item.id}`}
          title={item.name}
          image={
            <div>
              <WorkflowIcon />
            </div>
          }
          subtitle={
            <p>
              Updated{" "}
              {formatDistanceToNow(item.updatedAt, {
                addSuffix: true,
              })}{" "}
              {""} &bull; Created{" "}
              {formatDistanceToNow(item.createdAt, {
                addSuffix: true,
              })}
            </p>
          }
          onRemove={handleDelete}
        />
      )}
      getKey={(item, index) => item.id}
    />
  );
};
