"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Plus, Trash2 } from "lucide-react";
import { useReactFlow } from "@xyflow/react";

const httpExecutionSchema = z.object({
  variable: z
    .string()
    .min(1, "Variable name is required")
    .regex(
      /^[A-Za-z_$][A-Za-z0-9_$]*$/,
      "Must start with letter, _, or $ and contain only letters, numbers, _, or $",
    ),
  url: z.string().url("Please enter a valid URL"),
  method: z.enum(["GET", "PATCH", "POST", "DELETE"]),
  body: z.string().optional(),
  headers: z
    .array(
      z.object({
        key: z.string().min(1, "Header name is required"),
        value: z.string().min(1, "Header value is required"),
      }),
    )
    .optional(),
});

type HttpExecutionFormData = z.infer<typeof httpExecutionSchema>;

type HttpExecutionDialogProps = {
  id: string;
  defaultValues?: Partial<HttpExecutionFormData>;
  open: boolean;
  onOpenChange: (val: boolean) => void;
};

export default function HttpExecutionDialog({
  id,
  defaultValues,
  open,
  onOpenChange,
}: HttpExecutionDialogProps) {
  const { setNodes } = useReactFlow();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<HttpExecutionFormData>({
    resolver: zodResolver(httpExecutionSchema),
    defaultValues: {
      variable: defaultValues?.variable || "",
      url: defaultValues?.url || "",
      method: defaultValues?.method || "GET",
      body: defaultValues?.body || "",
      headers: defaultValues?.headers || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "headers",
  });

  const method = watch("method");
  const variable = watch("variable");

  const handleFormSubmit = async (data: HttpExecutionFormData) => {
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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>HTTP Request</DialogTitle>
          <DialogDescription>
            Configure your HTTP request and store the response
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
                placeholder="https://api.example.com/users"
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
                  setValue("method", value as HttpExecutionFormData["method"])
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

            {/* Headers Section */}
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel>Headers</FieldLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ key: "", value: "" })}
                  className="gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add Header
                </Button>
              </div>
              <FieldDescription>
                Add custom headers like Authorization, Content-Type, etc.
              </FieldDescription>

              {fields.length > 0 && (
                <div className="space-y-3 mt-3">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex gap-2 items-start p-3 rounded-lg border bg-muted/50"
                    >
                      <div className="flex-1 space-y-2">
                        <Input
                          placeholder="Header name (e.g., Authorization)"
                          {...register(`headers.${index}.key`)}
                        />
                        {errors.headers?.[index]?.key && (
                          <FieldError>
                            {errors.headers[index]?.key?.message}
                          </FieldError>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <Input
                          placeholder="Header value (e.g., Bearer {{token}})"
                          {...register(`headers.${index}.value`)}
                        />
                        {errors.headers?.[index]?.value && (
                          <FieldError>
                            {errors.headers[index]?.value?.message}
                          </FieldError>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="shrink-0"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
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
