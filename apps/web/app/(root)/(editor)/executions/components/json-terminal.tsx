"use client";

import { Check, Copy, Minimize2, Maximize2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues
const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

type JsonTerminalProps = {
  data: unknown;
  isError?: boolean;
};

export function JsonTerminal({ data, isError = false }: JsonTerminalProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const jsonData = useMemo(() => {
    if (typeof data === "string") {
      try {
        return JSON.parse(data);
      } catch {
        return { error: "Invalid JSON", raw: data };
      }
    }
    return data;
  }, [data]);

  const jsonString = useMemo(() => {
    return JSON.stringify(jsonData, null, 2);
  }, [jsonData]);

  async function handleCopy() {
    await navigator.clipboard.writeText(jsonString);
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
        <div className="p-4">
          <ReactJson
            src={jsonData}
            theme={"rjv-default"}
            iconStyle="triangle"
            displayDataTypes={false}
            displayObjectSize={true}
            enableClipboard={true}
            collapsed={false}
            name={false}
            style={{
              backgroundColor: "transparent",
              fontSize: "0.75rem",
              fontFamily: "ui-monospace, monospace",
            }}
          />
        </div>
      </ScrollArea>
    </div>
  );
}
