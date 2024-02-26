import { Listbox, Transition } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/solid";
import parseClassNames from "classnames";
import { FC, ReactNode, useEffect, useState } from "react";
// import LoadingSpinner from "shared/components/loading/loading-spinner";

import BaseSelectLeadingIcon from "./base-select-leading-icon";
import BaseSelectTrailingIcon from "./base-select-trailing-icon";
import BaseLabel, { BaseLabelProps } from "components/Label";
import { ChevronDown } from "heroicons-react";
import HandleLoading from "components/Loading";

export type OptionType<T> = {
  label: string;
  value: T;
  key?: string | number;
  render?: (label: string) => ReactNode;
};

export type SelectPropTypes<T = any> = {
  onSelect?: (value: T, node: OptionType<T>) => any;
  trailingIcon?: FC;
  leadingIcon?: FC;
  label?: string;
  className?: string;
  options: OptionType<T>[];
  defaultValue?: T;
  disabled?: boolean;
  setInputClassName?: (args: { disabled: boolean; open: boolean }) => string;
  isLoading?: boolean;
  value?: T;
  labelProps?: BaseLabelProps;
  limitOptionsHeight?: boolean;
  renderValue?: (node: any) => ReactNode;
  optionListClassName?: string;
  multiple?: boolean;
  tabIndex?: number;
  onBlur?: any;
  optionClassName?: string;
};

export default function BaseSelect<T>(props: SelectPropTypes<T>) {
  const {
    trailingIcon,
    tabIndex,
    leadingIcon = ChevronDown,
    label,
    options,
    setInputClassName,
    defaultValue,
    onSelect,
    className,
    disabled,
    value,
    isLoading,
    labelProps,
    limitOptionsHeight = true,
    optionListClassName,
    renderValue,
    multiple,
    onBlur,
    optionClassName,
  } = props;
  const [selected, setSelected] = useState<T | null | T[]>(
    defaultValue || multiple ? [] : null
  );

  const handleSelect = (value: any) => {
    if (multiple) {
      const newSelected = value;
      setSelected(newSelected);
      onSelect?.(newSelected, value);
    } else {
      setSelected(value.value);
      onSelect?.(value.value, value);
    }
  };

  const getSelectedValue = () => {
    if (multiple) {
      if (!selected || !Array.isArray(selected as any)) return [];
      return options?.filter((option) =>
        (selected as any).find((item: any) => item?.value === option.value)
      );
    }

    if (options?.length)
      return options?.filter((option) => option.value === selected)?.[0];
    else return [];
  };

  const renderSelectedValue = () => {
    const selectedValue: any = getSelectedValue();

    if (typeof renderValue === "function") {
      return renderValue(selectedValue as any);
    }

    if (multiple) {
      return selectedValue?.length ? (
        <div className="flex items-center justify-between text-gray-medium gap-x-1">
          <span>{selectedValue?.length || 0} مورد انتخاب شده</span>
          <span
            className="ml-5 bg-[#FEF0ED] text-[#EA1D25] px-2 rounded"
            onClick={() => handleSelect([])}
          >
            پاک کردن همه
          </span>
        </div>
      ) : null;
    }

    return <span>{selectedValue?.label}</span>;
  };

  useEffect(() => {
    if (value !== selected) setSelected(value as any);
  }, [value]);

  return (
    <div className={parseClassNames(className || "", "")}>
      <Listbox
        value={selected}
        onChange={(x) => {
          handleSelect(x as any);
        }}
        disabled={disabled}
        multiple={multiple}
      >
        {({ disabled, open }) => (
          <>
            {label && (
              <Listbox.Label>
                <BaseLabel {...labelProps}>{label}</BaseLabel>
              </Listbox.Label>
            )}
            <div className="relative h-full">
              <Listbox.Button
                onBlur={onBlur}
                tabIndex={tabIndex}
                className={parseClassNames(
                  "relative min-h-[2.5625rem] w-full",
                  "rounded-md pl-3 px-4 pt-2 pb-1 shadow-sm text-right cursor-pointer",
                  "text-normal leading-7 text-xs",
                  "border border-gray-light hover:border hover:border-gray-medium focus-within:border-gray-medium",
                  !!trailingIcon ? "pr-10" : "pr-3",
                  disabled
                    ? "text-gray-900 cursor-not-allowed !bg-disable-gray"
                    : "bg-white text-color-body",
                  setInputClassName ? setInputClassName({ disabled, open }) : ""
                )}
              >
                {trailingIcon && <BaseSelectTrailingIcon icon={trailingIcon} />}

                {renderSelectedValue()}

                {isLoading && (
                  <BaseSelectLeadingIcon icon={HandleLoading as any} />
                )}
                {!isLoading && leadingIcon && (
                  <BaseSelectLeadingIcon icon={leadingIcon} />
                )}
              </Listbox.Button>
              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-y-0"
                enterTo="transform scale-y-100"
                leave="transition duration-100 ease-out"
                leaveFrom="transform scale-y-100"
                leaveTo="transform scale-y-0 shadow-none"
              >
                {options?.length ? (
                  <Listbox.Options
                    className={parseClassNames(
                      "absolute  mt-1 w-full bg-white rounded-md z-[100] py-2.5 text-base space-y-3",
                      "ring-1 ring-black ring-opacity-5 overflow-auto soft-scrollbar focus:outline-none  transition-transform ease-out",
                      open ? "shadow-lg" : "shadow-none",
                      limitOptionsHeight ? "max-h-60" : "",
                      optionListClassName
                    )}
                  >
                    {options?.map((option) => (
                      <Listbox.Option
                        key={option.key || (option.value as any)}
                        className={({ active, selected }) =>
                          parseClassNames(
                            active ? "!bg-gray-border font-black" : "",
                            "cursor-pointer select-none relative pr-4 min-h-[1.875rem]",
                            selected ? "!bg-light-purple" : null,
                            optionClassName
                          )
                        }
                        value={option}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={parseClassNames(
                                selected
                                  ? "font-semibold text-xs leading-7 text-black-title"
                                  : "font-normal text-xs leading-7 text-black-title",
                                "block "
                              )}
                            >
                              {typeof option.render === "function"
                                ? option.render(option.label)
                                : option.label}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                ) : null}
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}

export type Option = {
  label: string;
  value: string;
  key: string;
};
