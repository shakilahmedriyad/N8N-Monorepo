import { AlertCircle } from "lucide-react";

type EntityErrorProps = {
  message: string;
};

export default function EntityError({ message }: EntityErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <p className="text-sm text-muted-foreground max-w-sm">{message}</p>
    </div>
  );
}
