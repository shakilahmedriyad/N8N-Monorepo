import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;
import { CreateWorkflowSchema } from "../types/Workflow/create-workflow";
import { WorkflowSchema } from "../types/Workflow/workflow";
const appRouter = t.router({
  user: t.router({
    getUser: publicProcedure.query(
      async () => "PLACEHOLDER_DO_NOT_REMOVE" as any,
    ),
  }),
  workflow: t.router({
    getWorkflows: publicProcedure
      .output(z.array(WorkflowSchema))
      .query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    createWorkflow: publicProcedure
      .input(CreateWorkflowSchema)
      .output(CreateWorkflowSchema)
      .mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
  }),
});

export type AppRouter = typeof appRouter;
