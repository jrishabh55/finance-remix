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
      className={`${bg ? 'rounded-lg bg-primary/50 shadow-xl dark:bg-black' : ''} ${
        className ?? ''
      }`}
      style={style}>
      {(title || action) && (
        <header
          className={`flex items-center justify-between border-b px-4 ${
            small ? 'py-2' : 'py-4'
          } border-background`}>
          {title && <Title>{title}</Title>}
          <div>{action && action}</div>
        </header>
      )}
      <main className={small ? 'w-full p-1 sm:p-1' : 'w-full p-4 sm:p-6'} style={bodyStyle}>
        {children}
      </main>
      {footer && <footer className={`px-4 ${small ? 'py-2' : 'py-4'}`}>{footer}</footer>}
    </section>
  );
};

export default Card;
