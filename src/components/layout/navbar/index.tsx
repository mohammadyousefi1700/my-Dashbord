// import { ChevronDown, User, UserGroup } from "heroicons-react";
import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import MenuDropDown from "components/DropDown";
import { ChevronDown, User } from "heroicons-react";

function Navbar() {
  return (
    <div className="fixed w-full  top-0 left-0  right-0 z-30 flex items-center justify-between p-2 h-10 bg-[#343a40] ">
      {/* //   <p className="flex items-center mr-auto">
    //     <User className="text-white " />
    //     <ChevronDown className="w-4 pt-2 text-white" />
    //   </p> */}

      <div className="mr-auto ">
        <MenuDropDown
          classNameMenuButton="w-10 h-10 rounded-full"
          Option={
            <p className="flex items-center mr-auto">
              <User className="text-white " />
              <ChevronDown className="w-4 pt-2 text-white" />
            </p>
          }
          menuItems={<div></div>}
        />
      </div>
    </div>
  );
}

export default Navbar;
