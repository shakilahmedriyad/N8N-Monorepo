import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useReactFlow } from "@xyflow/react";

type GeminiNodeDialogProps = {
  id: string;
  open: boolean;
  onOpenChange: (val: boolean) => void;
  defaultValues?: {
    apiKey?: string;
    model?: string;
    prompt?: string;
    temperature?: number;
    maxTokens?: number;
    variableName?: string;
  };
};

const GEMINI_MODELS = [
  { value: "gemini-pro", label: "Gemini Pro" },
  { value: "gemini-pro-vision", label: "Gemini Pro Vision" },
  { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
  { value: "gemini-3.5-flash", label: "Gemini 3.5 Flash" },
];

export function GeminiExecutionDialog({
  id,
  open,
  onOpenChange,
  defaultValues,
}: GeminiNodeDialogProps) {
  const { setNodes } = useReactFlow();
  const [formData, setFormData] = useState({
    apiKey: defaultValues?.apiKey || "",
    model: defaultValues?.model || "gemini-pro",
    prompt: defaultValues?.prompt || "",
    temperature: defaultValues?.temperature || 0.7,
    maxTokens: defaultValues?.maxTokens || 1024,
    variable: defaultValues?.variableName || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.apiKey.trim()) {
      newErrors.apiKey = "API Key is required";
    }

    if (!formData.prompt.trim()) {
      newErrors.prompt = "Prompt is required";
    }

    if (!formData.variable.trim()) {
      newErrors.variableName = "Variable name is required";
    } else if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(formData.variable)) {
      newErrors.variableName =
        "Variable name must start with a letter or underscore and contain only letters, numbers, and underscores";
    }

    if (formData.temperature < 0 || formData.temperature > 2) {
      newErrors.temperature = "Temperature must be between 0 and 2";
    }

    if (formData.maxTokens < 1 || formData.maxTokens > 32768) {
      newErrors.maxTokens = "Max tokens must be between 1 and 32768";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id != id) return node;
          return {
            ...node,
            data: formData,
          };
        }),
      );
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild />
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl flex items-center gap-2">
            Gemini AI Node
          </DialogTitle>
          <DialogDescription className="font-body text-sm text-muted-foreground">
            Configure Google Gemini AI to process text and generate responses
          </DialogDescription>
        </DialogHeader>

        <FieldGroup className="py-4 space-y-4">
          {/* API Key Field */}
          <Field>
            <FieldLabel
              htmlFor="api-key"
              className="font-body text-sm font-medium"
            >
              Gemini API Key <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="api-key"
              type="password"
              placeholder="Enter your Gemini API key"
              value={formData.apiKey}
              onChange={(e) => handleInputChange("apiKey", e.target.value)}
              className={errors.apiKey ? "border-destructive" : ""}
            />
            {errors.apiKey && (
              <p className="text-xs text-destructive mt-1">{errors.apiKey}</p>
            )}
            <FieldDescription>
              Get your API key from{" "}
              <Link
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                Google AI Studio
                <ExternalLinkIcon className="h-3 w-3" />
              </Link>
            </FieldDescription>
          </Field>

          {/* Model Selection */}
          <Field>
            <FieldLabel
              htmlFor="model"
              className="font-body text-sm font-medium"
            >
              Model <span className="text-destructive">*</span>
            </FieldLabel>
            <Select
              value={formData.model}
              onValueChange={(value) => handleInputChange("model", value)}
            >
              <SelectTrigger id="model">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {GEMINI_MODELS.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldDescription>
              Choose the Gemini model to use for generation
            </FieldDescription>
          </Field>

          {/* Prompt Field */}
          <Field>
            <FieldLabel
              htmlFor="prompt"
              className="font-body text-sm font-medium"
            >
              Prompt <span className="text-destructive">*</span>
            </FieldLabel>
            <Textarea
              id="prompt"
              placeholder="Enter your prompt here. You can use variables like {{formData.responses.Name}}"
              value={formData.prompt}
              onChange={(e) => handleInputChange("prompt", e.target.value)}
              rows={5}
              className={errors.prompt ? "border-destructive" : ""}
            />
            {errors.prompt && (
              <p className="text-xs text-destructive mt-1">{errors.prompt}</p>
            )}
            <FieldDescription>
              Use variables from previous steps like:{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">
                {"{{variableName}}"}
              </code>
            </FieldDescription>
          </Field>

          {/* Temperature Field */}
          <Field>
            <FieldLabel
              htmlFor="temperature"
              className="font-body text-sm font-medium"
            >
              Temperature
            </FieldLabel>
            <div className="flex items-center gap-3">
              <Input
                id="temperature"
                type="number"
                min="0"
                max="2"
                step="0.1"
                value={formData.temperature}
                onChange={(e) =>
                  handleInputChange("temperature", parseFloat(e.target.value))
                }
                className={`max-w-24 ${errors.temperature ? "border-destructive" : ""}`}
              />
              <span className="text-sm text-muted-foreground">
                {formData.temperature}
              </span>
            </div>
            {errors.temperature && (
              <p className="text-xs text-destructive mt-1">
                {errors.temperature}
              </p>
            )}
            <FieldDescription>
              Controls randomness: 0 is focused, 2 is more creative (0-2)
            </FieldDescription>
          </Field>

          {/* Max Tokens Field */}
          <Field>
            <FieldLabel
              htmlFor="max-tokens"
              className="font-body text-sm font-medium"
            >
              Max Output Tokens
            </FieldLabel>
            <Input
              id="max-tokens"
              type="number"
              min="1"
              max="32768"
              value={formData.maxTokens}
              onChange={(e) =>
                handleInputChange("maxTokens", parseInt(e.target.value))
              }
              className={errors.maxTokens ? "border-destructive" : ""}
            />
            {errors.maxTokens && (
              <p className="text-xs text-destructive mt-1">
                {errors.maxTokens}
              </p>
            )}
            <FieldDescription>
              Maximum number of tokens to generate (1-32768)
            </FieldDescription>
          </Field>

          {/* Variable Name Field */}
          <Field>
            <FieldLabel
              htmlFor="variable-name"
              className="font-body text-sm font-medium"
            >
              Variable Name <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="variable-name"
              placeholder="e.g., geminiResponse"
              value={formData.variable}
              onChange={(e) =>
                handleInputChange("variableName", e.target.value)
              }
              className={errors.variableName ? "border-destructive" : ""}
            />
            {errors.variableName && (
              <p className="text-xs text-destructive mt-1">
                {errors.variableName}
              </p>
            )}
            <FieldDescription>
              Store the AI response in a variable. Use it in later steps like:{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">
                {`{{${formData.variable || "variableName"}}}`}
              </code>
            </FieldDescription>
          </Field>
        </FieldGroup>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="font-body">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSave} className="font-body">
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
