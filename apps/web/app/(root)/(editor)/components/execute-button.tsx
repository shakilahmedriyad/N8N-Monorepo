import { Button } from "@/components/ui/button";
import { FlaskConicalIcon, Loader2Icon } from "lucide-react";
import { memo } from "react";

export const ExecuteButton = memo(
  ({ onClick, isPending }: { onClick: () => void; isPending: boolean }) => {
    {
      return (
        <Button
          className="flex items-center justify-center"
          size={"lg"}
          onClick={onClick}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2Icon className="animate-spin mt-3.5 ml-2.5" />
          ) : (
            <FlaskConicalIcon />
          )}

          {isPending ? (
            <span>Executing workflow ...</span>
          ) : (
            <span>Execute Workflow</span>
          )}
        </Button>
      );
    }
  },
);
