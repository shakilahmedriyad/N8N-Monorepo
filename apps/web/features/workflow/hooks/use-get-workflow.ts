"use client";
import { trpc } from "@/lib/trpc/trpc";

export default function useGetWorkflow() {
  const [workflow] = trpc.workflow.getWorkflows.useSuspenseQuery();
  return workflow;
}
