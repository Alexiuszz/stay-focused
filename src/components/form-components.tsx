import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";

interface SettingsInputType {
  value: string | number;
  onChange: (val: string | number) => void;
  selectItems?: { text: string; time: number }[];
}

const goalValues = [
  {
    time: 1 * 60 * 60,
    text: "1 hour",
  },
  {
    time: 2 * 60 * 60,
    text: "2 hours",
  },
  {
    time: 3 * 60 * 60,
    text: "3 hours",
  },
  {
    time: 4 * 60 * 60,
    text: "4 hours",
  },
  {
    time: 5 * 60 * 60,
    text: "5 hours",
  },
  {
    time: 6 * 60 * 60,
    text: "6 hours",
  },
  {
    time: 7 * 60 * 60,
    text: "7 hours",
  },
  {
    time: 8 * 60 * 60,
    text: "8 hours",
  },
];
const breakValues = [
  {
    time: 10 * 60,
    text: "10 minutes",
  },
  {
    time: 15 * 60,
    text: "15 minutes",
  },
  {
    time: 30 * 60,
    text: "30 minutes",
  },
  {
    time: 1 * 60 * 60,
    text: "1 hour",
  },
];

export const BreakSetting = ({
  value,
  onChange,
}: SettingsInputType) => {
  return (
    <ListMenu
      value={value}
      onChange={onChange}
      selectItems={breakValues}
    />
  );
};
export const GoalSetting = ({
  value,
  onChange,
}: SettingsInputType) => {
  return (
    <ListMenu
      value={value}
      onChange={onChange}
      selectItems={goalValues}
    />
  );
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export const ListMenu = ({
  value,
  onChange,
  selectItems = [],
}: SettingsInputType) => {
  return (
    <Listbox value={value} onChange={(e) => onChange(e)}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
            Assigned to
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{value}</span>
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
