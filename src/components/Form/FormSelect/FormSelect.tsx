import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

interface RadioGroupProps {
  options?: any[];
  value?: any;
  onChangeHandler?: (option: any) => void;
}

export default function FormSelect({
  options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ],
  value = options[0].value,
  onChangeHandler = (option: any) => {
    console.log(`${option} Selected!`);
  },
}: RadioGroupProps): JSX.Element {
  function findValueLabel(value: any) {
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption.label;
  }

  return (
    <Listbox value={value} onChange={onChangeHandler}>
      <div className="relative mt-1">
        <Listbox.Button className="relative h-11 w-full py-2 pl-3 pr-10 text-left bg-white rounded-md shadow-sm border cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
          <span className="block truncate">{findValueLabel(value)}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  `${active ? "text-red-900 bg-red-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                }
                value={option.value}>
                {({ selected, active }) => (
                  <>
                    <span className={`${selected ? "font-medium" : "font-normal"} block truncate`}>{option.label}</span>
                    {selected ? (
                      <span
                        className={`${active ? "text-red-600" : "text-red-600"}
                                absolute inset-y-0 left-0 flex items-center pl-3`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
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
  );
}
