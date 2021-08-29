import "./MultipleChoice.css";
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
    <div className="w-full py-6 sm:py-10">
      <div className="w-full">
        <RadioGroup value={selected} onChange={onSelectHandler}>
          <RadioGroup.Label className="sr-only">Answer options</RadioGroup.Label>
          <div className="space-y-3">
            {answers.map((answer) => (
              <RadioGroup.Option
                key={answer}
                value={answer}
                className={({ active, checked }) =>
                  `${active ? "choice--active" : ""}
                  ${checked ? "choice--checked" : "bg-cool-200"}
                    choice`
                }>
                {({ checked }) => (
                  <>
                    <div className="radio__wrapper">
                      <div className="radio__container">
                        <div
                          className={` ${checked ? "border-red-600" : ""}
                            radio`}>
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
