import React, { ReactNode } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import useMediaQuery from "components/useMediaQuery";

type Props = {
  children?: ReactNode | JSX.Element;
};
function Layout({ children }: Props) {
  const isMobile = useMediaQuery("(min-width: 300px)");

  return (
    <div className="overflow-x-hidden overflow-y-hidden flex w-full flex-col min-h-screen  bg-[#f5f5f7]  ">
      <Navbar />
      <div className="flex justify-start w-full h-full mt-12 overflow-x-hidden overflow-y-hidden">
        <Sidebar />
        <div
          className={`w-full ml-8 overflow-y-hidden overflow-x-hidden  h-full xl:mr-[5rem] lg:mr-24 ${
            isMobile && "mr-[70px] ml-1"
          } `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Layout);
