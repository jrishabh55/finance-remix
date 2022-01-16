import { FC } from 'react';

export type TypographyProps = {
  className?: string;
  type?: keyof typeof TextSize;
};

const TextSize = {
  'page-header': 'text-3xl',
  text: ''
};

export const Title: FC<TypographyProps> = ({ children, className, type = 'text' }) => {
  return (
    <h1
      className={`text-lg text-primary dark:text-secondary ${TextSize?.[type] ?? ''} ${
        className ?? ''
      }`}>
      {children}
    </h1>
  );
};
