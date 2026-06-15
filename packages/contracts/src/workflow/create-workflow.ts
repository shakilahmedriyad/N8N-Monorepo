import * as z from "zod";

export const CreateWorkflowSchema = z.object({
  name: z.string().min(3).max(60),
});

export type CreateWorkflowDto = z.infer<typeof CreateWorkflowSchema>;
