import { FC } from 'react';

type InputWrapperProps = {
  id?: string;
  name: string;
  label?: string;
  error?: string;
};

const InputWrapper: FC<InputWrapperProps> = ({ id, name, label, error, children }) => {
  return (
    <fieldset className="finance-field p-2 flex items-center">
      {label && (
        <label
          htmlFor={id || name}
          className="text-md m-2  text-primary mx-2 inline-block dark:text-secondary w-48">
          {label}
        </label>
      )}
      {children}
      {error && <p className="text-red text-sm">{error}</p>}
    </fieldset>
  );
};

export default InputWrapper;
