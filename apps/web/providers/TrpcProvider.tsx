"use client";
import { PropsWithChildren } from "react";
import { queryClient, trpc, trpcClient } from "../lib/trpc/trpc";
import { QueryClientProvider } from "@tanstack/react-query";
export default function TrpcProvider({ children }: PropsWithChildren) {
  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
