import { sidebarLink } from "./root";
import { Link, useLocation, matchPath } from "react-router-dom";
import classNames from "classnames";
import DateMinute from "Func/Date/Datereturn";
import { useState } from "react";
import { ChevronDoubleLeft } from "heroicons-react";
import { useClickAwayListener } from "components/ModalComponent/components/UseClickAwayListner";

function Sidebar() {
  const { pathname } = useLocation();
  const [isDrag, setIsDrag] = useState<boolean>(false);

  const selectedPath = (path: string) =>
    path && !!matchPath(path, pathname)?.pathname;
  const dateFormatYears = new Intl.DateTimeFormat("fa", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const handleClickAway = () => {
    if (isDrag) setIsDrag(false);
  };

  const withClickAwayListener = useClickAwayListener(handleClickAway);

  return withClickAwayListener(
    <div
      // style={{ width: "200px", padding: "10px" }}
      className={classNames(
        `fixed  top-0 mt-[40px]  right-0 z-[1000] flex flex-col bg-[#343a60] [height:calc(100vh-20px)]  transition-all text-xs duration-300`,
        isDrag ? "w-[252px] " : "w-[60px]"
      )}
    >
      <ChevronDoubleLeft
        onClick={() => setIsDrag((state) => !state)}
        className="absolute w-[19px] cursor-pointer -left-3 bg-slate-300 rounded-md top-3 h-[19px]"
      />
      <div
        className={classNames(
          "flex flex-col  gap-3 pl-2 mt-2",
          isDrag ? "px-2" : "px-3"
        )}
      >
        {sidebarLink.map((item) => (
          <Link
            key={item.path}
            className={classNames(
              item.path.length === 0 ? "!p-0" : "",
              "flex  items-center hover:transition-all hover:duration-300  hover:rounded-md active:text-white hover:p-2 hover:text-white hover:bg-[rgba(255,255,255,0.10)]  gap-2   text-sm font-normal text-center text-slate-400",
              !!selectedPath(item.path) &&
                "!text-white bg-[rgba(255,255,255,0.10)] p-2 rounded-md"
            )}
            to={item.path}
          >
            {item.icons}
            {isDrag ? item.title : null}
          </Link>
        ))}
      </div>
      {isDrag ? (
        <div
          className={classNames(
            "flex flex-col items-center justify-end h-full mb-20"
          )}
        >
          <div
            style={{ gap: "10px" }}
            className="flex bg-[rgba(255,255,255,0.10)] rounded-lg items-center justify-center "
          >
            <div className="flex p-1 text-lg text-white gap-x-3 ">
              <DateMinute />
            </div>
            <div style={{ padding: "12px" }} className="text-lg text-white ">
              {dateFormatYears.format(Date.now())}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Sidebar;
