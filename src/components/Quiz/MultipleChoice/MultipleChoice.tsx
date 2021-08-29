import { RadioGroup } from "@headlessui/react";

interface MultipleChoiceProps {
  answers: any[];
  selected: string;
  onSelectHandler: (answer: string) => void;
}

export default function FormMultipleChoice({
  answers = ["Option 1", "Option 2", "Option 3"],
  selected = "Option 1",
  onSelectHandler = (answer: string) => {
    console.log(`${answer} Selected!`);
  },
}: MultipleChoiceProps): JSX.Element {
  return (
    <div className="w-full py-10">
      <div className="w-full">
        <RadioGroup value={selected} onChange={onSelectHandler}>
          <RadioGroup.Label className="sr-only">Answer options</RadioGroup.Label>
          <div className="space-y-3">
            {answers.map((answer) => (
              <RadioGroup.Option
                key={answer}
                value={answer}
                className={({ active, checked }) =>
                  `${active ? "ring-2 ring-offset-2 ring-offset-white ring-red-500" : ""}
                  ${checked ? "bg-red-600 text-red-600" : "bg-cool-200"}
                    relative drop-shadow-lg rounded-3xl px-4 py-3 sm:px-5 sm:py-4 cursor-pointer flex focus:outline-none`
                }>
                {({ checked }) => (
                  <>
                    <div className="flex items-center justify-start w-full">
                      <div className="flex-shrink-0 mr-4 text-red">
                        <div
                          className={` ${checked ? "border-red-600" : ""}
                            w-6 h-6 bg-gray-50 border border-gray-400 rounded-full flex items-center justify-center`}>
                          {checked && <div className="w-4 h-4 bg-red-700 rounded-full" />}
                        </div>
                      </div>
                      <div className="h-6 flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label as="p" className={`font-medium  ${checked ? "text-white" : "text-gray-900"}`}>
                            {answer}
                          </RadioGroup.Label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
