"use client";
import { useGetExecution } from "@/features/execution/hooks/use-get-execution";

export default function ExecutionList() {
  const { data } = useGetExecution();
  return <div>List is coming for you broi</div>;
}
