import React, { ReactNode } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

function Layout({ children }: any) {
  return (
    <div className="overflow-x-hidden min-h-screen  bg-[#f5f5f7]  pr-[45px]">
      <Navbar />
      <div className=" flex mt-7 w-full h-full">
        <Sidebar />
        <div className="w-full h-full px-6">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
