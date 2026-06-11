"use client";
import { trpc } from "../lib/trpc";

export default function Home() {
  const { data } = trpc.workflow.getWorkflows.useQuery();

  return <div>{JSON.stringify(data)}</div>;
}
