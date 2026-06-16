import {
  CreateTRPCReact,
  createTRPCReact,
  httpBatchLink,
} from "@trpc/react-query";
import { TRPCQueryOptions } from "@trpc/tanstack-react-query";
import { AppRouter } from "@repo/trpc";
import { QueryClient } from "@tanstack/react-query";

export const trpc: CreateTRPCReact<AppRouter, object> = createTRPCReact<
  AppRouter,
  object
>();

export const queryClient = new QueryClient({});

function getUrl() {
  if (typeof window !== "undefined") {
    return "/trpc";
  }

  return process.env.API_URL!;
}

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: getUrl(),
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
    }),
  ],
});

export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T,
) {
  if (queryOptions.queryKey[1]?.type === "infinite") {
    void queryClient.prefetchInfiniteQuery(queryOptions as any);
  } else {
    void queryClient.prefetchQuery(queryOptions);
  }
}
