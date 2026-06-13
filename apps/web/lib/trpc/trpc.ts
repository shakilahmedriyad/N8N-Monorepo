import { createTRPCClient, httpBatchLink } from "@trpc/react-query";
import { appRouter } from "@repo/trpc";
import { makeQueryClient } from "./query-client";
import { createTRPCContext } from "./context";
import { headers } from "next/headers";
import { getQueryClient } from "./server";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";

export const trpc = createTRPCOptionsProxy({
  ctx: async () =>
    createTRPCContext({
      headers: await headers(),
    }),
  router: appRouter,
  queryClient: getQueryClient,
});

createTRPCOptionsProxy({
  client: createTRPCClient({
    links: [
      httpBatchLink({
        url: process.env.NEXT_PUBLIC_API_URL!,
      }),
    ],
  }),
  queryClient: getQueryClient,
});

export const queryClient = makeQueryClient();
