import React, { ReactNode } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
type Props = {
  children?: ReactNode | JSX.Element;
};
function Layout({ children }: Props) {
  return (
    <div className="overflow-x-hidden flex w-full flex-col min-h-screen  bg-[#f5f5f7]  pr-[45px]">
      <Navbar />
      <div className="flex w-full h-full mt-12">
        <Sidebar />
        <div className="inline-block w-full h-full mr-40">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
