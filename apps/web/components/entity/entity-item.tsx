import React from "react";
import { Card, CardContent, CardDescription } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  MoreVertical,
  TrashIcon,
  CheckCircle2,
  XCircle,
  Loader2,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export type EntityItemProps = {
  id: string;
  href: string;
  title: string;
  status?: "SUCCESS" | "FAILED" | "PENDING" | "RUNNING";
  subtitle?: React.ReactNode;
  image?: React.ReactNode;
  actions?: React.ReactNode;
  onRemove?: (id: string) => void | Promise<void>;
  isRemoving?: boolean;
  className?: string;
};

const statusConfig = {
  SUCCESS: {
    icon: CheckCircle2,
    label: "Success",
    variant: "default" as const,
    animate: false,
  },
  FAILED: {
    icon: XCircle,
    label: "Failed",
    variant: "destructive" as const,
    animate: false,
  },
  RUNNING: {
    icon: Loader2,
    label: "Running",
    variant: "secondary" as const,
    animate: true,
  },
  PENDING: {
    icon: Clock,
    label: "Pending",
    variant: "outline" as const,
    animate: false,
  },
};

export default function EntityItem({
  id,
  title,
  href,
  subtitle,
  actions,
  image,
  className,
  isRemoving,
  status,
  onRemove,
}: EntityItemProps) {
  const statusInfo = status ? statusConfig[status] : null;
  const StatusIcon = statusInfo?.icon;

  return (
    <Link href={href} prefetch>
      <Card className={cn("my-3 shadow", className)}>
        <CardContent className="flex">
          <div className="flex items-start gap-x-5">
            {image}
            <div className="">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-heading">{title}</h1>
                {status && statusInfo && (
                  <Badge variant={statusInfo.variant}>
                    {StatusIcon && (
                      <StatusIcon
                        className={cn(
                          "mr-1 h-3 w-3",
                          statusInfo.animate && "animate-spin",
                        )}
                      />
                    )}
                    {statusInfo.label}
                  </Badge>
                )}
              </div>
              {subtitle && (
                <CardDescription className="text-sm text-gray-500">
                  {subtitle}
                </CardDescription>
              )}
            </div>
          </div>
          {(actions || onRemove) && (
            <div className="flex ml-auto">
              {actions}
              {onRemove && (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <MoreVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      disabled={isRemoving}
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(id);
                      }}
                    >
                      <TrashIcon />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
