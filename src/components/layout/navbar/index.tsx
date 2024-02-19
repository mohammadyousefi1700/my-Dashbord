// import { ChevronDown, User, UserGroup } from "heroicons-react";
import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import MenuDropDown from "components/DropDown";
import { ChevronDown, LockClosedOutline, User } from "heroicons-react";
import { useLoggedInUser } from "utils/AutContext";
import "../../../index.css";
import { account } from "appwrite.config";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, LogOut } = useLoggedInUser();
  // console.log("user", user);
  return (
    <div className="fixed w-full  top-0 left-0  right-0 z-30 flex items-center justify-between p-2 h-10 bg-[#343a40] ">
      {/* //   <p className="flex items-center mr-auto">
    //     <User className="text-white " />
    //     <ChevronDown className="w-4 pt-2 text-white" />
    //   </p> */}
      <div className="text-lg text-yellow-500 rounded-full custom_font">
        MrYou{" "}
      </div>
      <div className="mr-auto ">
        <MenuDropDown
          classNameMenuButton="w-fit h-10 rounded-full"
          Option={
            <p className="flex items-center mr-auto">
              <User className="text-white " />
              <ChevronDown className="w-4 pt-2 text-white" />
            </p>
          }
          menuItems={
            <div className="flex flex-col items-start p-2 pr-4 text-sm font-medium gap-y-3 w-36 ">
              <div className="">نام کاربری : {user?.name} </div>
              <button
                onClick={LogOut}
                className="flex items-center gap-x-2 hover:text-slate-400"
              >
                <LockClosedOutline className="w-5 h-5 " />
                خروج{" "}
              </button>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default Navbar;
