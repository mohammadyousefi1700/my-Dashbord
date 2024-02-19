import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import cx from "classnames";
import type { ReactNode } from "react";
import React, { Fragment } from "react";

type Props = {
  Option?: ReactNode;
  menuItems?: ReactNode;
  classNameMenuButton?: string;
  classNameMenuItem?: string;
};

const MenuDropDown = (props: Props) => {
  const { Option, menuItems, classNameMenuButton, classNameMenuItem } = props;

  return (
    <Menu as="div" className="relative inline-block ">
      <Menu.Button
        className={classNames(
          "inline-flex justify-center w-full px-2 py-2 text-sm font-medium text-white rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75",
          classNameMenuButton
        )}
      >
        {Option}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={classNames(
            "absolute z-50 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none left-0",
            classNameMenuItem
          )}
        >
          {menuItems}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuDropDown;
