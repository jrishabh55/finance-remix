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
      className={`p-2 shadow min-w-[10rem] shadow-background rounded-lg dark:text-black ${color} ${
        className ?? ''
      }`}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
