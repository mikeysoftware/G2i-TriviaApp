import { Fragment } from "react";
import { RadioGroup } from "@headlessui/react";

interface RadioGroupProps {
  options?: any[];
  value?: any;
  groupTitle?: string;
  onChangeHandler?: (option: any) => void;
}

export default function FormRadioGroup({
  options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ],
  value = options[0]?.value,
  groupTitle = "Group Title",
  onChangeHandler = (option: any) => {
    console.log(`${option} Selected!`);
  },
}: RadioGroupProps): JSX.Element {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <h4 className="text-sm text-gray-900 font-medium">{groupTitle}</h4>
      </div>

      <RadioGroup value={value} onChange={onChangeHandler} className="mt-4">
        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
        <div className={`grid grid-cols-${options.length} gap-4`}>
          {options.map((option) => (
            <RadioGroup.Option
              key={option?.label}
              value={option?.value}
              disabled={false}
              className={({ active }) =>
                classNames(
                  active ? "ring-2 ring-red-500" : "",
                  "bg-white shadow-sm text-gray-900 cursor-pointer group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                )
              }>
              {({ active, checked }) => (
                <>
                  <RadioGroup.Label as="p">{option?.label}</RadioGroup.Label>
                  <div
                    className={classNames(
                      active ? "border" : "border-2",
                      checked ? "border-red-500" : "border-transparent",
                      "absolute -inset-px rounded-md pointer-events-none"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </Fragment>
  );
}
