import { FC } from 'react';
import { Title } from '../lib/Typography';

export type GridHeaderProps = {
  title?: string;
};

export const GridHeader: FC<GridHeaderProps> = ({ title, children }) => {
  return (
    <header className="flex items-center justify-between col-span-12 bg-black p-4 rounded-lg">
      {title && <Title type="page-header">{title}</Title>}
      <div className="flex">{children}</div>
    </header>
  );
};
