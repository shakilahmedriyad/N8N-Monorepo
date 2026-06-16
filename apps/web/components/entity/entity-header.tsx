import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import Link from "next/link";

type BaseProps = {
  title: string;
  description: string;
  buttonText: string;
  disabled?: boolean;
  isLoading?: boolean;
};

type EntityHeaderProps = BaseProps &
  (
    | {
        onNew: () => void;
        href?: never;
      }
    | {
        href: string;
        onNew?: never;
      }
  );

export default function EntityHeader({
  title,
  description,
  buttonText,
  disabled = false,
  isLoading = false,
  onNew,
  href,
}: EntityHeaderProps) {
  const ButtonContent = () => (
    <>
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Plus className="mr-2 h-4 w-4" />
      )}
      {buttonText}
    </>
  );

  return (
    <div className="flex items-center justify-between  mb-3">
      <div className="space-y-1">
        <h1 className="text-3xl font-heading font-bold tracking-tight">
          {title}
        </h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div>
        {href ? (
          <Button asChild disabled={disabled || isLoading}>
            <Link href={href} prefetch>
              <ButtonContent />
            </Link>
          </Button>
        ) : (
          <Button onClick={onNew} disabled={disabled || isLoading}>
            <ButtonContent />
          </Button>
        )}
      </div>
    </div>
  );
}
