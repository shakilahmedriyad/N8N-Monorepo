import { ReactNode } from "react";

export interface entityListsProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  getKey?: (item: T, index: number) => string | number;
  emptyView?: ReactNode;
  classNames?: string;
}

export default function EntityLists<T>({
  items,
  renderItem,
  getKey,
  emptyView,
  classNames,
}: entityListsProps<T>) {
  if (items.length == 0 && emptyView) {
    return <div className="w-full h-full">{emptyView}</div>;
  }
  return (
    <div>
      {items.map((items, index) => (
        <div key={getKey ? getKey(items, index) : index}>
          {renderItem(items, index)}
        </div>
      ))}
    </div>
  );
}
