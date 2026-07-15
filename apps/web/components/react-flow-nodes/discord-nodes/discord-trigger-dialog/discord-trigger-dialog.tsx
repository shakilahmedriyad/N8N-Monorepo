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
    formState: { errors },
  } = useForm<DiscordTriggerFormData>({
    resolver: zodResolver(discordTriggerSchema),
    defaultValues: {
      webhookUrl: defaultValues?.webhookUrl ?? "",
    },
  });

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
      <DialogContent className="sm:max-w-lg">
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
                This workflow will send notifications to the Discord channel
                associated with this webhook.
              </FieldDescription>

              {errors.webhookUrl && (
                <FieldError>{errors.webhookUrl.message}</FieldError>
              )}
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
                  Paste the copied URL into the field below and save this node.
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
