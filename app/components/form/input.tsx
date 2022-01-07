import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label?: string;
  name: string;
  error?: string;
};

const Input: FC<InputProps> = ({ className, error, id, name, label, ...props }) => {
  return (
    <fieldset className="p-2 flex items-center">
      {label && (
        <label
          htmlFor={id || name}
          className="text-md m-2  text-primary mx-2 inline-block dark:text-secondary w-48">
          {label}
        </label>
      )}
      <input
        id={id || name}
        name={name}
        {...props}
        className={`p-1 mx-2 text-primary dark:text-black outline-none rounded-lg shadow dark:shadow-background shadow-primary w-full ${
          className ?? ''
        }`}
      />
      {error && <p className="text-red text-sm">{error}</p>}
    </fieldset>
  );
};

export default Input;
