import { FC } from 'react';
import { Title } from '../lib/Typography';

export type GridHeaderProps = {
  title?: string;
};

export const GridHeader: FC<GridHeaderProps> = ({ title, children }) => {
  return (
    <header className="col-span-12 flex items-center justify-between rounded-lg bg-black p-4">
      {title && <Title type="page-header">{title}</Title>}
      <div className="flex">{children}</div>
    </header>
  );
};
