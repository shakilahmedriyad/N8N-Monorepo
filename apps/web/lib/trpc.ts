import {
  CreateTRPCReact,
  createTRPCReact,
  httpBatchLink,
} from "@trpc/react-query";
import { AppRouter } from "@repo/trpc";
import { QueryClient } from "@tanstack/react-query";

export const trpc: CreateTRPCReact<AppRouter, object> = createTRPCReact<
  AppRouter,
  object
>();

export const queryClient = new QueryClient({});

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_API_URL!,
    }),
  ],
});
