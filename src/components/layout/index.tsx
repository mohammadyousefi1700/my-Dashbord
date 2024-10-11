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
    <div className="overflow-x-hidden  flex w-full flex-col pb-10 h-screen  bg-[#f5f5f7]  ">
      <Navbar />
      <div className="flex justify-start w-full h-screen mt-12 overflow-x-hidden overflow-y-auto ">
        <Sidebar />
        <div
          id="scroll"
          className={`w-full ml-8  h-full overflow-x-hidden xl:mr-[5rem] lg:mr-24 ${
            isMobile && "mr-[70px] ml-1"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Layout);
