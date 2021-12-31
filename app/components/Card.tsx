import { CSSProperties, FC } from 'react';

export type CardProps = { style?: CSSProperties; bodyStyle?: CSSProperties; small?: boolean };

const Card: FC<CardProps> = ({ children, bodyStyle, style, small = false }) => {
  return (
    <div className="bg-primary/50 dark:bg-black shadow-xl rounded-lg" style={style}>
      <div className={`${small ? 'p-1 sm:p-1' : 'p-4 sm:p-6'}`} style={bodyStyle}>
        {children}
      </div>
    </div>
  );
};

export default Card;
