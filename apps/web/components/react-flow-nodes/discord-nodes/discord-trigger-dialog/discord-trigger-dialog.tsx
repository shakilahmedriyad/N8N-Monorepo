"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useReactFlow } from "@xyflow/react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const discordTriggerSchema = z.object({
  webhookUrl: z
    .url("Please enter a valid URL")
    .regex(
      /^https:\/\/discord\.com\/api\/webhooks\/.+/,
      "Please enter a valid Discord webhook URL",
    ),
  username: z
    .string()
    .min(1, "Username is required")
    .max(80, "Username must be 80 characters or less"),
  avatarUrl: z
    .string()
    .url("Please enter a valid avatar URL")
    .optional()
    .or(z.literal("")),
  title: z
    .string()
    .min(1, "Title is required")
    .max(256, "Title must be 256 characters or less"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(4096, "Description must be 4096 characters or less"),
  color: z
    .string()
    .regex(
      /^#[0-9A-Fa-f]{6}$/,
      "Please enter a valid hex color (e.g., #00FF00)",
    ),
});

type DiscordTriggerFormData = z.infer<typeof discordTriggerSchema>;

type DiscordTriggerDialogProps = {
  id: string;
  open: boolean;
  onOpenChange: (val: boolean) => void;
  defaultValues?: Partial<DiscordTriggerFormData>;
};

export function DiscordTriggerDialog({
  id,
  open,
  onOpenChange,
  defaultValues,
}: DiscordTriggerDialogProps) {
  const { setNodes } = useReactFlow();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DiscordTriggerFormData>({
    resolver: zodResolver(discordTriggerSchema),
    defaultValues: {
      webhookUrl: defaultValues?.webhookUrl ?? "",
      username: defaultValues?.username ?? "Workflow Engine",
      avatarUrl: defaultValues?.avatarUrl ?? "",
      title: defaultValues?.title ?? "Execution Complete",
      description:
        defaultValues?.description ?? "Workflow executed successfully.",
      color: defaultValues?.color ?? "#00FF00",
    },
  });

  const colorValue = watch("color");

  const handleFormSubmit = (data: DiscordTriggerFormData) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id !== id) return node;
        return {
          ...node,
          data: {
            ...data,
          },
        };
      }),
    );

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Discord Notification</DialogTitle>
          <DialogDescription>
            Configure a Discord webhook to send notifications whenever this
            workflow reaches this step.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel>Discord Webhook URL</FieldLabel>
              <Input
                placeholder="https://discord.com/api/webhooks/..."
                {...register("webhookUrl")}
              />
              <FieldDescription>
                The Discord webhook URL where notifications will be sent.
              </FieldDescription>
              {errors.webhookUrl && (
                <FieldError>{errors.webhookUrl.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel>Bot Username</FieldLabel>
              <Input placeholder="Workflow Engine" {...register("username")} />
              <FieldDescription>
                The name that will appear as the message sender (max 80
                characters).
              </FieldDescription>
              {errors.username && (
                <FieldError>{errors.username.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel>Avatar URL (Optional)</FieldLabel>
              <Input
                placeholder="https://example.com/avatar.png"
                {...register("avatarUrl")}
              />
              <FieldDescription>
                URL of the image to use as the bot's avatar.
              </FieldDescription>
              {errors.avatarUrl && (
                <FieldError>{errors.avatarUrl.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel>Embed Title</FieldLabel>
              <Input placeholder="Execution Complete" {...register("title")} />
              <FieldDescription>
                The title of the Discord embed message (max 256 characters).
              </FieldDescription>
              {errors.title && <FieldError>{errors.title.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel>Embed Description</FieldLabel>
              <Textarea
                placeholder="Workflow executed successfully. Use variables like {{previousVar.data}}"
                rows={4}
                {...register("description")}
              />
              <FieldDescription>
                The description text. You can use variables from previous steps
                like:{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  {"{{variableName.property}}"}
                </code>
              </FieldDescription>
              {errors.description && (
                <FieldError>{errors.description.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel>Embed Color</FieldLabel>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="#00FF00"
                  {...register("color")}
                  className="flex-1"
                />
                <div
                  className="w-12 h-10 rounded-md border-2"
                  style={{ backgroundColor: colorValue }}
                />
              </div>
              <FieldDescription>
                Hex color code for the embed sidebar (e.g., #00FF00 for green,
                #FF0000 for red).
              </FieldDescription>
              {errors.color && <FieldError>{errors.color.message}</FieldError>}
            </Field>

            <div className="rounded-lg border bg-muted/40 p-4">
              <h4 className="mb-3 text-sm font-medium">
                How to create a Discord Webhook
              </h4>
              <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
                <li>
                  Open your Discord server and select the channel where you want
                  to receive notifications.
                </li>
                <li>
                  Click <strong>Edit Channel</strong> (⚙️).
                </li>
                <li>
                  Navigate to <strong>Integrations</strong>.
                </li>
                <li>
                  Click <strong>Create Webhook</strong>.
                </li>
                <li>
                  Give the webhook a name and choose an avatar (optional).
                </li>
                <li>
                  Click <strong>Copy Webhook URL</strong>.
                </li>
                <li>
                  Paste the copied URL into the field above and configure your
                  message.
                </li>
              </ol>
            </div>
          </FieldGroup>

          <DialogFooter>
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
