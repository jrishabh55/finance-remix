import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
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
      <div className="flex-grow p-2">
        <Listbox value={selected} onChange={handleChange}>
          <div className="relative mt-1">
            <Listbox.Button className="relative z-0 w-full cursor-pointer rounded-lg bg-primary py-2 pl-3 text-left shadow-input focus:outline-none dark:bg-black sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 z-0 flex items-center pr-2">
                <SelectorIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-black py-1 text-base shadow-lg focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      clsx('relative z-40 cursor-pointer select-none py-2 pl-10 pr-4', {
                        'text-primary': active,
                        'text-secondary': !active
                      })
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
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
