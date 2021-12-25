import { CSSProperties, FC } from 'react';

const Card: FC<{ style?: CSSProperties; bodyStyle?: CSSProperties }> = ({
  children,
  bodyStyle,
  style
}) => {
  return (
    <div className="bg-black shadow-xl rounded-lg" style={style}>
      <div className="px-4 py-4 sm:p-6" style={bodyStyle}>
        {children}
      </div>
    </div>
  );
};

export default Card;
