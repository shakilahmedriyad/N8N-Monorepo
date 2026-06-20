import { Loader2 } from "lucide-react";

export default function EntityLoading({
  description,
}: {
  description: string;
}) {
  return (
    <div className="flex w-full items-center justify-center min-h-100">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        {Boolean(description) && <p>{description}</p>}
      </div>
    </div>
  );
}
