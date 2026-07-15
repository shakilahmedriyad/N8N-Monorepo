export interface GeminiContextDto {
  model: string;
  apiKey: string;
  prompt: string;
  maxTokens: number;
  temperature: number;
  variableName: string;
}
