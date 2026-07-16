import * as z from "zod";

export const ExecutionSchema = z.object({
  id: z.string(),
  status: z.string(),
  nodeResults: z.json().nullable(),
  error: z.json().nullable(),
  errorStack: z.string().nullable(),
  startedAt: z.date(),
  finishedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ExecutionType = z.infer<typeof ExecutionSchema>;

export const GetExecutionByIdSchema = z.object({
  executionId: z.string(),
});

export type GetExecutionByIdDto = z.infer<typeof GetExecutionByIdSchema>;
