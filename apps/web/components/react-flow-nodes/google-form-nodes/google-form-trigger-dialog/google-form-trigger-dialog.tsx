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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon, CopyIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

type GoogleFormTriggerDialogProps = {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  initialData?: any;
};

export function GoogleFormTriggerDialog({
  open,
  onOpenChange,
}: GoogleFormTriggerDialogProps) {
  const workflowId = useParams().workflowId as string;
  const [copied, setCopied] = useState(false);

  // Generate webhook URL with workflowId
  const webhookUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/webhooks/google-form/${workflowId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(webhookUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild />
      <DialogContent className="sm:max-w-135">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            Google Form Trigger
          </DialogTitle>
          <DialogDescription className="font-body text-sm text-muted-foreground">
            Configure your Google Form to send responses to this workflow
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Webhook URL Section */}
          <div className="space-y-2">
            <Label className="font-body text-sm font-medium text-foreground">
              Webhook URL
            </Label>
            <div className="flex gap-2">
              <Input
                value={webhookUrl}
                readOnly
                className="font-mono text-xs"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className="shrink-0"
              >
                {copied ? (
                  <CheckIcon className="h-4 w-4 text-green-600" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="rounded-lg border bg-muted/50 p-4 space-y-3">
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                1
              </div>
              <p className="font-body text-sm text-foreground">
                Copy the webhook URL above
              </p>
            </div>

            <div className="flex items-start gap-2">
              <div className="rounded-full bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                2
              </div>
              <div className="space-y-1">
                <p className="font-body text-sm text-foreground">
                  Open your Google Form and navigate to{" "}
                  <span className="font-semibold">Responses</span> tab
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="rounded-full bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                3
              </div>
              <div className="space-y-1">
                <p className="font-body text-sm text-foreground">
                  Click the three dots menu and select{" "}
                  <span className="font-semibold">
                    Get email notifications for new responses
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="rounded-full bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                4
              </div>
              <div className="space-y-1">
                <p className="font-body text-sm text-foreground">
                  Or use Google Apps Script to send POST requests to the webhook
                  URL when form is submitted
                </p>
              </div>
            </div>

            <div className="pt-2 border-t">
              <Link
                href="https://developers.google.com/apps-script/guides/triggers/installable"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-body text-primary hover:underline"
              >
                View Apps Script documentation
                <ExternalLinkIcon className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="font-body">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
