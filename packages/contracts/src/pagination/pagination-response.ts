import { z } from "zod";

export const createPaginationResponseSchema = <T extends z.ZodTypeAny>(
  itemSchema: T,
) =>
  z.object({
    totalCount: z.number(),
    totalPage: z.number(),
    currentPage: z.number(),
    nextPage: z.number(),
    prevPage: z.number(),
    items: z.array(itemSchema),
  });
