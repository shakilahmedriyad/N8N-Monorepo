"use client";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSuspenseGetExecutionById } from "@/features/execution/hooks/use-get-execution-by-id";
import Link from "next/link";

export default function ExicutionNavBar({
  executionId,
}: {
  executionId: string;
}) {
  return (
    <div className="bg-sidebar-accent border-b py-3 px-3 flex items-center gap-x-2.5">
      <SidebarTrigger />
      <ExecutionBreadCrumb executionId={executionId} />
    </div>
  );
}

export function ExecutionBreadCrumb({ executionId }: { executionId: string }) {
  const { data: execution } = useSuspenseGetExecutionById(executionId);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbLink asChild>
          <Link href={"/executions"}>Executions</Link>
        </BreadcrumbLink>
        <BreadcrumbSeparator />
        <h2>{execution.workflowName}</h2>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
