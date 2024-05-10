import React, { ReactNode } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
type Props = {
  children?: ReactNode | JSX.Element;
};
function Layout({ children }: Props) {
  return (
    <div className="overflow-x-hidden flex w-full flex-col min-h-screen  bg-[#f5f5f7]  ">
      <Navbar />
      <div className="flex justify-start w-full h-full mt-12">
        <Sidebar />
        <div className="w-full h-full mr-24 ">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
