import * as z from 'zod';

export const createWorkflowSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3).max(60),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type createWorkflowDto = z.infer<typeof createWorkflowSchema>;
