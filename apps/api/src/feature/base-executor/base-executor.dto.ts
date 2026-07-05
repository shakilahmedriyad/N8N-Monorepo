export class NodeExecutionResultDto {
  success: boolean;
  output?: any;
  error?: string;
}

export class ExecutionContextDto {
  workflowId: string;
  variable: string;
  userId: string;
  previousNodeOutputs: Record<string, any>;
  currentNodeInput?: any;
  metadata?: Record<string, any>;
}
