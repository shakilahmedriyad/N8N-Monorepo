import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { CreateWorkflowSchema } from "../types/Workflow/create-workflow";
import { WorkflowSchema } from "../types/Workflow/workflow";

const t = initTRPC.create();
const publicProcedure = t.procedure;

export const appRouter = t.router({
  user: t.router({
    getUser: publicProcedure.query(
      async () => "PLACEHOLDER_DO_NOT_REMOVE" as any,
    ),
  }),
  workflow: t.router({
    getWorkflows: publicProcedure
      .output(z.array(WorkflowSchema))
      .query(async () => []),
    createWorkflow: publicProcedure
      .input(CreateWorkflowSchema)
      .output(CreateWorkflowSchema)
      .mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
  }),
});

export type AppRouter = typeof appRouter;
