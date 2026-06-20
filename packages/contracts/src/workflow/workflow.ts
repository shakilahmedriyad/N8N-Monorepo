import * as z from "zod";

export const CreateWorkflowSchema = z.object({
  name: z.string().min(3).max(60),
});

export type CreateWorkflowDto = z.infer<typeof CreateWorkflowSchema>;

export const WorkflowSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Workflow = z.infer<typeof WorkflowSchema>;

export const GetWorkflowByIdSchema = z.object({
  workflowId: z.string(),
});

export type GetWorkflowByIdDto = z.infer<typeof GetWorkflowByIdSchema>;

export const UpdateWorkflowSchema = z.object({
  workflowId: z.string(),
  workflow: CreateWorkflowSchema.partial(),
});

export type UpdateWorkflowDto = z.infer<typeof UpdateWorkflowSchema>;
