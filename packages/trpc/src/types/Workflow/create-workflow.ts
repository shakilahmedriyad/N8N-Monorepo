import * as z from "zod";

export const CreateWorkflowSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3).max(60),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type CreateWorkflowDto = z.infer<typeof CreateWorkflowSchema>;
