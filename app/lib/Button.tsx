import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

export type ButtonColors =
  | 'bg-primary'
  | 'bg-secondary'
  | 'bg-success'
  | 'bg-danger'
  | 'bg-warning'
  | 'bg-info'
  | 'bg-light'
  | 'bg-dark';

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  color?: ButtonColors;
  dark?: ButtonColors;
};

const Button: FC<ButtonProps> = ({ children, className, color = 'bg-primary', ...props }) => {
  return (
    <button
      className={`min-w-[10rem] rounded-lg p-2 shadow shadow-background dark:text-black ${color} ${
        className ?? ''
      }`}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
