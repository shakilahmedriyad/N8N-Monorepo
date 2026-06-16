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
    <div className="flex w-full px-5 py-5 flex-col h-full">
      {/* Header Section */}
      {header && <div className="shrink-0">{header}</div>}

      {/* Search Section */}
      {search && <div className="shrink-0 ml-auto mb-4">{search}</div>}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{children}</div>

      {/* Pagination Section */}
      {pagination && (
        <div className="shrink-0 mt-4 pt-4 border-t">{pagination}</div>
      )}
    </div>
  );
}
