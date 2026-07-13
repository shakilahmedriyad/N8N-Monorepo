"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { useReactFlow } from "@xyflow/react";

const GeminiExecutionSchema = z.object({
  variable: z
    .string()
    .min(1, "Variable name is required")
    .regex(
      /^[A-Za-z_$][A-Za-z0-9_$]*$/,
      "Must start with letter, _, or $ and contain only letters, numbers, _, or $",
    ),
  url: z.url("Please enter a valid URL"),
  method: z.enum(["GET", "PATCH", "POST", "DELETE"]),
  body: z.string().optional(),
});

type GeminiExecutionFormData = z.infer<typeof GeminiExecutionSchema>;

type GeminiExecutionDialogProps = {
  id: string;
  defaultValues?: Partial<GeminiExecutionFormData>;
  open: boolean;
  onOpenChange: (val: boolean) => void;
};

export default function GeminiExecutionDialog({
  id,
  defaultValues,
  open,
  onOpenChange,
}: GeminiExecutionDialogProps) {
  const { setNodes } = useReactFlow();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GeminiExecutionFormData>({
    resolver: zodResolver(GeminiExecutionSchema),
    defaultValues: {
      variable: defaultValues?.variable || "",
      url: defaultValues?.url || "",
      method: defaultValues?.method || "GET",
      body: defaultValues?.body || "",
    },
  });

  const method = watch("method");
  const variable = watch("variable");

  const handleFormSubmit = async (data: GeminiExecutionFormData) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id !== id) return node;
        const newNode = {
          ...node,
          data,
        };
        return newNode;
      }),
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Gemini Request</DialogTitle>
          <DialogDescription>
            Configure your Gemini request and store the response
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Variable Name</FieldLabel>
              <Input
                type="text"
                placeholder="myApiResponse"
                {...register("variable")}
              />
              <FieldDescription>
                Store response as a variable. Use it in later steps like:{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  {variable
                    ? `{{${variable}.userId}}`
                    : "{{variableName.property}}"}
                </code>
              </FieldDescription>
              {errors.variable && (
                <FieldError>{errors.variable.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel>URL</FieldLabel>
              <Input
                type="url"
                placeholder="Geminis://api.example.com/users"
                {...register("url")}
              />
              <FieldDescription>
                Use variables from previous steps like:{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  {"{{previousVar.id}}"}
                </code>
              </FieldDescription>
              {errors.url && <FieldError>{errors.url.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel>Method</FieldLabel>
              <Select
                value={method}
                onValueChange={(value) =>
                  setValue("method", value as GeminiExecutionFormData["method"])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PATCH">PATCH</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
              {errors.method && (
                <FieldError>{errors.method.message}</FieldError>
              )}
            </Field>

            {(method === "POST" || method === "PATCH") && (
              <Field>
                <FieldLabel>Body</FieldLabel>
                <Textarea
                  placeholder='{"name": "{{userName}}", "email": "user@example.com"}'
                  rows={4}
                  {...register("body")}
                />
                <FieldDescription>
                  JSON body. You can use variables from previous steps
                </FieldDescription>
                {errors.body && <FieldError>{errors.body.message}</FieldError>}
              </Field>
            )}
          </FieldGroup>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
