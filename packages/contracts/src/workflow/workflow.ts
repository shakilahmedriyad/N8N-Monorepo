import * as z from "zod";
import type { Edge, Node } from "@xyflow/react";

/**
 * Workflow type
 */
export const WorkflowSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Workflow = z.infer<typeof WorkflowSchema>;

/**
 * create Workflow type
 */
export const CreateWorkflowSchema = z.object({
  name: z.string().min(3).max(60),
});

export type CreateWorkflowDto = z.infer<typeof CreateWorkflowSchema>;

/**
 * Get Workflow by id type
 */

export const GetWorkflowByIdSchema = z.object({
  workflowId: z.string(),
});

export type GetWorkflowByIdDto = z.infer<typeof GetWorkflowByIdSchema>;

/**
 * Get Workflow by id Output type
 */

const NodeSchema = z.custom<Node>();
const EdgeSchema = z.custom<Edge>();

export const GetWorkflowByIdOutputSchema = z.object({
  workflow: WorkflowSchema,
  nodes: z.array(NodeSchema),
  connections: z.array(EdgeSchema),
});

/**
 * Update Workflow type
 */

export const UpdateWorkflowSchema = z.object({
  workflowId: z.string(),
  workflow: CreateWorkflowSchema.partial(),
});

export type UpdateWorkflowDto = z.infer<typeof UpdateWorkflowSchema>;
