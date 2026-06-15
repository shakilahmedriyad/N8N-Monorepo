import * as z from "zod";

export const WorkflowSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Workflow = z.infer<typeof WorkflowSchema>;
