import * as z from "zod";

export const CreateWorkflowSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3).max(60),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type CreateWorkflowDto = z.infer<typeof CreateWorkflowSchema>;

import { initTRPC } from "@trpc/server";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  user: t.router({
    getUser: publicProcedure.query(
      async () => "PLACEHOLDER_DO_NOT_REMOVE" as any,
    ),
  }),
  workflow: t.router({
    getWorkflows: publicProcedure
      .output(z.array(CreateWorkflowSchema))
      .query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    createWorkflow: publicProcedure
      .input(CreateWorkflowSchema)
      .output(CreateWorkflowSchema)
      .mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
  }),
});

export type AppRouter = typeof appRouter;
