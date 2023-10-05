import { ChangeEvent, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";

interface InputType {
  value: string | number;
  onChange: (e: ChangeEvent) => void;
}
interface SelectInputType {
  value: number;
  label: string;
  onChange: (val: number) => void | ((e: ChangeEvent) => void);
  selectItems?: { text: string; time: number }[];
}


function GetTimeText(
  arr: { time: number; text: string }[],
  targetValue: number
): string {
  for (const obj of arr) {
    if (Object.values(obj).includes(targetValue)) {
      return obj["text"]; // Return the value associated with "value1"
    }
  }
  return "10 minutes"; // Return null if not found
}


export const TextInput = ({ value, onChange }: InputType) => {
  return (
    // <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    <div className="sm:col-span-3">
      <label
        htmlFor="user-name"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        User name
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="user-name"
          id="user-name"
          value={value}
          onChange={(e) => onChange(e)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export const ListMenu = ({
  value,
  label,
  onChange,
  selectItems = [],
}: SelectInputType) => {
  console.log("time", value, "item", selectItems);
  return (
    <Listbox value={value} onChange={(e) => onChange(e)}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate">
                  {GetTimeText(selectItems, value)}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {selectItems.map((val) => (
                  <Listbox.Option
                    key={val.text}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "bg-indigo-600 text-white"
                          : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={val.time}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected
                                ? "font-semibold"
                                : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {val.text}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active
                                ? "text-white"
                                : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
