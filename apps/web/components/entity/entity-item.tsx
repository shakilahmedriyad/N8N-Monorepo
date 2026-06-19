import React from "react";
import { Card, CardContent, CardDescription } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontalIcon, MoreVertical, TrashIcon } from "lucide-react";
import Link from "next/link";

export type EntityItemProps = {
  href: string;
  title: string;
  subtitle?: React.ReactNode;
  image?: React.ReactNode;
  actions?: React.ReactNode;
  onRemove?: () => void | Promise<void>;
  isRemoving?: boolean;
  className?: string;
};

export default function EntityItem({
  title,
  href,
  subtitle,
  actions,
  image,
  className,
  isRemoving,
  onRemove,
}: EntityItemProps) {
  return (
    <Link href={href}>
      <Card className="my-3 shadow">
        <CardContent className="flex">
          <div className="flex items-start gap-x-5">
            {image}
            <div className="">
              <h1 className="text-lg font-heading">{title}</h1>
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
                      onClick={(e) => e.stopPropagation()}
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
