"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExecutionHeader } from "./Execution-header";
import { ExecutionMeta } from "./Execution-meta";
import { JsonTerminal } from "./json-terminal";
import { useSuspenseGetExecutionById } from "@/features/execution/hooks/use-get-execution-by-id";
import { AlertCircle, CheckCircle2 } from "lucide-react";

type Props = {
  executionId: string;
};

export function ExecutionDetails({ executionId }: Props) {
  const { data: execution } = useSuspenseGetExecutionById(executionId);

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <ExecutionHeader id={execution.id} status={execution.status} />

      <ExecutionMeta
        startedAt={execution.startedAt}
        finishedAt={execution.finishedAt}
      />

      <Tabs
        defaultValue={execution.status === "FAILED" ? "error" : "result"}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="result" className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Execution Result
          </TabsTrigger>
          <TabsTrigger value="error" className="gap-2">
            <AlertCircle className="h-4 w-4" />
            Error Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="result" className="mt-4">
          <Card className="flex flex-col">
            <div className="flex items-center gap-2 border-b p-4">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold">Execution Result</h3>
            </div>
            <div className="p-4">
              {execution.nodeResults ? (
                <JsonTerminal data={execution.nodeResults} />
              ) : (
                <div className="flex min-h-100 items-center justify-center rounded-lg border border-dashed">
                  <div className="text-center">
                    <p className="text-sm font-medium">No results yet</p>
                    <p className="text-xs text-muted-foreground">
                      Results will appear here after execution
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="error" className="mt-4">
          <Card className="flex flex-col">
            <div className="flex items-center gap-2 border-b p-4">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <h3 className="font-semibold">Error Logs</h3>
            </div>
            <div className="p-4">
              {execution.error ? (
                <JsonTerminal data={execution.error} isError />
              ) : (
                <div className="flex min-h-100 items-center justify-center rounded-lg border border-dashed">
                  <div className="text-center">
                    <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-green-600" />
                    <p className="text-sm font-medium">No errors detected</p>
                    <p className="text-xs text-muted-foreground">
                      Your execution completed successfully
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
