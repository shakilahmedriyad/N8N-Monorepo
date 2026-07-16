"use client";
import { useSuspenseGetExecutions } from "@/features/execution/hooks/use-get-execution";
import { ExecutionList } from "./Execution-containar";

export default function ExecutionView() {
  const { data } = useSuspenseGetExecutions();
  return (
    <div>
      <ExecutionList executions={data.items} />
    </div>
  );
}
