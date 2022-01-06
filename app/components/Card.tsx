import { CSSProperties, FC } from 'react';
import { Title } from './Typography';

export type CardProps = {
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
  small?: boolean;
  bg?: boolean;
  title?: string;
};

const Card: FC<CardProps> = ({ children, title, bodyStyle, bg = true, style, small = false }) => {
  return (
    <div className={bg ? 'bg-primary/50 dark:bg-black shadow-xl rounded-lg' : ''} style={style}>
      {title && (
        <div className={`border-b pl-4 ${small ? 'py-2' : 'py-4'} border-background`}>
          <Title>{title}</Title>
        </div>
      )}
      <div className={small ? 'p-1 sm:p-1' : 'p-4 sm:p-6'} style={bodyStyle}>
        {children}
      </div>
    </div>
  );
};

export default Card;
