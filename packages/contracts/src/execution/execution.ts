import * as z from "zod";

export const ExecutionSchema = z.object({
  id: z.string(),
  nodeResults: z.json().optional(),
  error: z.string().optional(),
  startedAt: z.date(),
  finishedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ExecutionType = z.infer<typeof ExecutionSchema>;



