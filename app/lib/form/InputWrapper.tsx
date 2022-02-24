import { FC } from 'react';

type InputWrapperProps = {
  id?: string;
  name: string;
  label?: string;
  error?: string;
};

const InputWrapper: FC<InputWrapperProps> = ({ id, name, label, error, children }) => {
  return (
    <fieldset className="finance-field flex items-center p-2 text-primary dark:text-secondary">
      {label && (
        <label
          htmlFor={id || name}
          className="text-md m-2 mx-2 inline-block w-44 text-primary dark:text-secondary">
          {label}
        </label>
      )}
      {children}
      {error && <p className="text-red text-sm">{error}</p>}
    </fieldset>
  );
};

export default InputWrapper;
