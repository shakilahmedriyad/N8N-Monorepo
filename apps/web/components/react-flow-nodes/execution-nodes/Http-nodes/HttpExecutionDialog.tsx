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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Loader2 } from "lucide-react";
import { ReactNode, useState } from "react";
import { useReactFlow } from "@xyflow/react";

const httpExecutionSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  method: z.enum(["GET", "PATCH", "POST", "DELETE"]),
  body: z.string().optional(),
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
    reset,
    formState: { errors },
  } = useForm<HttpExecutionFormData>({
    resolver: zodResolver(httpExecutionSchema),
    defaultValues: {
      url: defaultValues?.url || "",
      method: defaultValues?.method || "GET",
      body: defaultValues?.body || "",
    },
  });

  const method = watch("method");

  const handleFormSubmit = async (data: HttpExecutionFormData) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id != id) return node;
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
          <DialogTitle>HTTP Request</DialogTitle>
          <DialogDescription>
            Configure your HTTP request settings
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel>URL</FieldLabel>
              <Input
                type="url"
                placeholder="https://api.example.com/endpoint"
                {...register("url")}
              />
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

            {(method === "POST" || method === "PATCH") && (
              <Field>
                <FieldLabel>Body</FieldLabel>
                <Textarea
                  placeholder='{"key": "value"}'
                  rows={4}
                  {...register("body")}
                />
                {errors.body && <FieldError>{errors.body.message}</FieldError>}
              </Field>
            )}
          </FieldGroup>

          <DialogFooter className="mt-6">
            <DialogClose>
              <Button
                type="button"
                variant="outline"
                // disabled={isLoading}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              // disabled={isLoading}
            >
              save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
