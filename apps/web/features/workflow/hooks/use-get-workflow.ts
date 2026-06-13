"use client";
import { useTRPC } from "@/providers/TrpcProvider";
import { useQuery } from "@tanstack/react-query";

export default function useGetWorkflow() {
  const trpc = useTRPC();
  const workflow = useQuery(trpc.workflow.getWorkflows.queryOptions());
  return workflow;
}
