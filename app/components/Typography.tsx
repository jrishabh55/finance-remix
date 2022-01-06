import { FC } from 'react';

export type TypographyProps = {
  className?: string;
};

export const Title: FC<TypographyProps> = ({ children, className }) => {
  return (
    <h1 className={`text-lg text-primary dark:text-secondary ${className ?? ''}`}>{children}</h1>
  );
};
