"use client";

import { Check, Copy, Minimize2, Maximize2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type JsonTerminalProps = {
  data: unknown;
  isError?: boolean;
};

export function JsonTerminal({ data, isError = false }: JsonTerminalProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const json = useMemo(() => {
    if (typeof data === "string") {
      try {
        return JSON.stringify(JSON.parse(data), null, 2);
      } catch {
        return data;
      }
    }
    return JSON.stringify(data, null, 2);
  }, [data]);

  async function handleCopy() {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="flex items-center justify-between border-b bg-muted/50 px-3 py-2">
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${isError ? "bg-red-500" : "bg-green-500"} animate-pulse`}
          />
          <span className="text-xs font-medium">
            {isError ? "Error Output" : "JSON Data"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setExpanded(!expanded)}
            className="h-7 w-7 p-0"
          >
            {expanded ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="h-7 gap-1.5 px-2"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-600" />
                <span className="text-xs">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span className="text-xs">Copy</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <ScrollArea className={expanded ? "h-175" : "h-125"}>
        <pre
          className={`p-4 text-xs font-mono leading-relaxed ${
            isError
              ? "bg-red-50 text-red-900 dark:bg-red-950/50 dark:text-red-200"
              : "bg-slate-50 text-slate-900 dark:bg-slate-950/50 dark:text-slate-200"
          }`}
        >
          {json}
        </pre>
      </ScrollArea>
    </div>
  );
}
