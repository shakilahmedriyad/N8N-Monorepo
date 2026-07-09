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
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  const webhookUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/webhooks/google-form/${workflowId}`;

  const scriptCode = `function onFormSubmit(e) {
  var formResponse = e.response;
  var itemResponses = formResponse.getItemResponses();
  
  var payload = {
    formId: formResponse.getId(),
    timestamp: formResponse.getTimestamp(),
    respondentEmail: formResponse.getRespondentEmail(),
    variable:"formData",
    responses: {}
  };
  
  for (var i = 0; i < itemResponses.length; i++) {
    var itemResponse = itemResponses[i];
    payload.responses[itemResponse.getItem().getTitle()] = itemResponse.getResponse();
  }
  
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload)
  };
  
  UrlFetchApp.fetch('${webhookUrl}', options);
}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(webhookUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyScript = async () => {
    try {
      await navigator.clipboard.writeText(scriptCode);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild />
      <DialogContent className="sm:max-w-2xl">
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
                onClick={handleCopyUrl}
                className="shrink-0"
              >
                {copiedUrl ? (
                  <CheckIcon className="h-4 w-4 text-green-600" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Copy Script Button */}
          <div className="space-y-2">
            <Label className="font-body text-sm font-medium text-foreground">
              Apps Script Code
            </Label>
            <Button
              variant="outline"
              onClick={handleCopyScript}
              className="w-full font-body"
            >
              {copiedScript ? (
                <>
                  <CheckIcon className="h-4 w-4 mr-2 text-green-600" />
                  Script Copied!
                </>
              ) : (
                <>
                  <CopyIcon className="h-4 w-4 mr-2" />
                  Copy Apps Script Code
                </>
              )}
            </Button>
          </div>

          {/* Instructions Section */}
          <div className="rounded-lg border bg-muted/50 p-4 space-y-3">
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                1
              </div>
              <p className="font-body text-sm text-foreground">
                Open your Google Form and click the three dots menu (⋮) in the
                top right
              </p>
            </div>

            <div className="flex items-start gap-2">
              <div className="rounded-full bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                2
              </div>
              <div className="space-y-1">
                <p className="font-body text-sm text-foreground">
                  Select <span className="font-semibold">Script editor</span>{" "}
                  from the menu
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="rounded-full bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                3
              </div>
              <div className="space-y-1">
                <p className="font-body text-sm text-foreground">
                  Click the{" "}
                  <span className="font-semibold">Copy Apps Script Code</span>{" "}
                  button above and paste it in the script editor
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="rounded-full bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                4
              </div>
              <div className="space-y-1">
                <p className="font-body text-sm text-foreground">
                  Save the script (💾), then click on the clock icon (⏰) or go
                  to <span className="font-semibold">Triggers</span> in the left
                  sidebar
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="rounded-full bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                5
              </div>
              <div className="space-y-1">
                <p className="font-body text-sm text-foreground">
                  Click <span className="font-semibold">Add Trigger</span> and
                  configure:
                </p>
                <ul className="list-disc list-inside text-xs text-muted-foreground ml-2 space-y-1">
                  <li>
                    Choose function: <strong>onFormSubmit</strong>
                  </li>
                  <li>
                    Select event source: <strong>From form</strong>
                  </li>
                  <li>
                    Select event type: <strong>On form submit</strong>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="rounded-full bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                6
              </div>
              <div className="space-y-1">
                <p className="font-body text-sm text-foreground">
                  Click <span className="font-semibold">Save</span> and
                  authorize the script when prompted
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
