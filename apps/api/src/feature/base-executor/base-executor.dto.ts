export class NodeExecutionResultDto {
  success: boolean;
  output?: any;
  error?: string;
}

export class ExecutionContextDto {
  workflowId: string;
  variable: string;
  previousNodeOutputs: Record<string, any>;
  currentNodeInput?: any;
  metadata?: Record<string, any>;
}
