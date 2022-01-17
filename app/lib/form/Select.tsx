import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { FC, Fragment, useState } from 'react';
import InputWrapper from './InputWrapper';

export type SelectOption = {
  id: number | string;
  name: string;
  disabled?: boolean;
};

export type SelectProps = {
  options: SelectOption[];
  onChange?: (value: SelectProps['options'][0]) => void;
  id?: string;
  name: string;
  label?: string;
  className?: string;
  error?: string;
};

const Select: FC<SelectProps> = ({ error, id, name, label, options = [], onChange }) => {
  const [selected, setSelected] = useState(options[0]);

  const handleChange = (option: SelectOption) => {
    setSelected(option);
    onChange?.(option);
  };

  return (
    <InputWrapper id={id} name={name} label={label} error={error}>
      <input type="hidden" name={name} value={selected.id} />
      <div className="w-full">
        <Listbox value={selected} onChange={handleChange}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full py-2 pl-3 text-left bg-primary dark:bg-black rounded-lg shadow-input cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-secondary focus-visible:ring-offset-warning  focus-visible:ring-offset-2 focus-visible:border-error sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="w-5 h-5" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-black/90 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                          cursor-pointer select-none relative py-2 pl-10 pr-4`
                    }
                    disabled={option.disabled}
                    value={option}>
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                          {option.name}
                        </span>
                        {selected ? (
                          <span
                            className={`${active ? 'text-amber-600' : 'text-amber-600'}
                                absolute inset-y-0 left-0 flex items-center pl-3`}>
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </InputWrapper>
  );
};

export default Select;
