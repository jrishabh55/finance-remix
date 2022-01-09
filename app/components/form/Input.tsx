import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import InputWrapper from './InputWrapper';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label?: string;
  name: string;
  error?: string;
};

const Input: FC<InputProps> = ({ className, error, id, name, label, ...props }) => {
  return (
    <InputWrapper id={id} name={name} label={label} error={error}>
      <input
        id={id || name}
        name={name}
        {...props}
        className={`mx-2 p-1 border-none shadow-input rounded-lg ring-0 ring-black ring-opacity-5  bg-black text-primary dark:text-secondary outline-none w-full focus:outline-none ${
          className ?? ''
        }`}
      />
    </InputWrapper>
  );
};

export default Input;
