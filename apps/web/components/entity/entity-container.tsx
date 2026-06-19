import { ReactNode } from "react";

type EntityContainerProps = {
  children: ReactNode;
  header?: ReactNode;
  search?: ReactNode;
  pagination?: ReactNode;
};

export default function EntityContainer({
  children,
  header,
  search,
  pagination,
}: EntityContainerProps) {
  return (
    <div className="flex w-full flex-col h-full">
      {/* Header Section */}
      {header && <div className="shrink-0 px-5 pt-5 pb-2">{header}</div>}

      {/* Search Section */}
      {search && <div className="shrink-0 ml-auto px-5 ">{search}</div>}

      {/* Main Content */}
      <div className="flex-1 px-5 py-5 overflow-auto">{children}</div>

      {/* Pagination Section */}
      {pagination && <div className="shrink-0   border-t">{pagination}</div>}
    </div>
  );
}
