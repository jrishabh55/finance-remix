import { CSSProperties, FC, ReactNode } from 'react';
import { Title } from './Typography';

export type CardProps = {
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
  small?: boolean;
  bg?: boolean;
  title?: ReactNode;
  action?: ReactNode;
  className?: string;
  footer?: ReactNode;
};

const Card: FC<CardProps> = ({
  children,
  title,
  bodyStyle,
  bg = true,
  className,
  style,
  small = false,
  action,
  footer = null
}) => {
  return (
    <section
      className={`${bg ? 'bg-primary/50 dark:bg-black shadow-xl rounded-lg' : ''} ${
        className ?? ''
      }`}
      style={style}>
      {(title || action) && (
        <header
          className={`flex justify-between items-center border-b px-4 ${
            small ? 'py-2' : 'py-4'
          } border-background`}>
          {title && <Title>{title}</Title>}
          <div>{action && action}</div>
        </header>
      )}
      <main className={small ? 'p-1 sm:p-1 w-full' : 'p-4 sm:p-6 w-full'} style={bodyStyle}>
        {children}
      </main>
      {footer && <footer className={`px-4 ${small ? 'py-2' : 'py-4'}`}>{footer}</footer>}
    </section>
  );
};

export default Card;
