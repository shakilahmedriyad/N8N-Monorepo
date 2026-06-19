import { Button } from "@/components/ui/button";
import { useWorkflowParams } from "@/features/workflow/hooks/use-workflow-params";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationBarProps = {
  currentPage: number;
  totalPages: number;
  disabled?: boolean;
};

export default function EntityPaginationBar({
  currentPage,
  totalPages,
  disabled = false,
}: PaginationBarProps) {
  const [params, setParams] = useWorkflowParams();
  const handlePrev = () => {
    setParams({
      ...params,
      page: currentPage - 1,
    });
  };

  const handleNext = () => {
    setParams({
      ...params,
      page: currentPage + 1,
    });
  };

  return (
    <div className="flex bg-accent px-3 py-3 flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-muted-foreground order-2 sm:order-1">
        Page {currentPage} of {totalPages}
      </div>

      <div className="flex items-center gap-2 order-1 sm:order-2">
        <Button
          size="sm"
          onClick={handlePrev}
          disabled={currentPage <= 1 || disabled}
          className="flex-1 sm:flex-initial"
        >
          <ChevronLeft className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <Button
          size="sm"
          onClick={handleNext}
          disabled={currentPage >= totalPages || disabled}
          className="flex-1 sm:flex-initial"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4 sm:ml-1" />
        </Button>
      </div>
    </div>
  );
}
