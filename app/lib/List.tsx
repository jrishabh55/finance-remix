import { ReactNode } from 'react';

export type ListProps<T> = {
  title?: string;
  items: T[];
  renderItem: (item: T, dataKey?: string) => ReactNode;
  keyExtractor?: (item: T) => string;
  dataKey?: string;
};

const List = <T extends unknown>({ items, renderItem, keyExtractor, dataKey }: ListProps<T>) => {
  return (
    <ul className="flex w-full list-none flex-col space-y-2">
      {items.map((item, i) => (
        <li className="list-item" key={keyExtractor?.(item) ?? i}>
          {renderItem(item, dataKey)}
        </li>
      ))}
    </ul>
  );
};

List.defaultProps = {
  keyExtractor: (item: any) => item?.id?.toString(),
  renderItem: (item: any, dataKey: string) => <li>{item?.[dataKey]}</li>
};

export default List;
