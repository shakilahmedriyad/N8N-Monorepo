"use client";
import EntityContainer from "@/components/entity/entity-container";
import EntityHeader from "@/components/entity/entity-header";
import EntityItem from "@/components/entity/entity-item";
import EntityLists from "@/components/entity/entity-lists";
import EntityPaginationBar from "@/components/entity/entity-pagination";
import EntitySearch from "@/components/entity/entity-search";
import { useSuspenseGetExecutions } from "@/features/execution/hooks/use-get-execution";
import useCreateWorkflow from "@/features/workflow/hooks/use-create-workflow";
import { ExecutionType } from "@repo/contracts";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { HistoryIcon, WorkflowIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export const ExecutionContainer = ({ children }: PropsWithChildren) => {
  return (
    <EntityContainer
      header={<ExecutionHeader />}
      pagination={<ExecutionPagination />}
    >
      {children}
    </EntityContainer>
  );
};

export const ExecutionPagination = () => {
  const { data } = useSuspenseGetExecutions();
  return (
    <EntityPaginationBar
      currentPage={data.currentPage}
      totalPages={data.totalPage}
    />
  );
};

export const ExecutionHeader = () => {
  const router = useRouter();
  const createWorkflow = useCreateWorkflow();
  const handleCreateWorkflow = () => {
    createWorkflow.mutate(
      {
        name: "first workflow",
      },
      {
        onSuccess(data) {
          router.push(`/execution/${data.id}`);
        },
      },
    );
  };
  return (
    <EntityHeader
      title="Execution"
      description="View your workflow executions"
      buttonText="New Execution"
      onNew={handleCreateWorkflow}
    />
  );
};

export const ExecutionList = ({
  executions,
}: {
  executions: ExecutionType[];
}) => {
  return (
    <EntityLists
      items={executions}
      renderItem={(item) => (
        <EntityItem
          id={item.id}
          title={item.status}
          href={`/executions/${item.id}`}
          image={
            <div>
              <HistoryIcon />
            </div>
          }
          subtitle={
            <p>
              Finished{" "}
              {formatDistanceToNow(item.finishedAt, {
                addSuffix: true,
              })}{" "}
              {""} &bull; Started{" "}
              {formatDistanceToNow(item.startedAt, {
                addSuffix: true,
              })}
            </p>
          }
        />
      )}
    />
  );
};
