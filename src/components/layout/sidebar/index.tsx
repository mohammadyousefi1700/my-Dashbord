import { sidebarLink } from "./root";
import { Link, useLocation, matchPath } from "react-router-dom";
import classNames from "classnames";
import DateMinute from "Func/Date/Datereturn";

function Sidebar() {
  const { pathname } = useLocation();
  const selectedPath = (path: string) =>
    path && !!matchPath(path, pathname)?.pathname;
  const dateFormatYears = new Intl.DateTimeFormat("fa", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  // const dateFormatHours = new Intl.DateTimeFormat("fa", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // }).format(new Date());
  // console.log(dateFormatHours);
  console.log("Date.now()", Date.now());

  return (
    <div
      style={{ width: "200px", padding: "10px" }}
      className="fixed  top-0 mt-[40px] inline-block right-0 z-[1000] flex flex-col bg-[#343a60] [height:calc(100vh-20px)] text-wild-blue-yonder transition-all text-xs duration-300"
    >
      <div className="flex flex-col w-48 gap-3 pl-2 mt-2">
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
            {item.title}
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center justify-end h-full mb-20">
        <div
          style={{ gap: "10px" }}
          className="flex bg-[rgba(255,255,255,0.10)] rounded-lg items-center justify-center "
        >
          <div style={{ padding: "10px" }} className="flex text-lg text-white ">
            <DateMinute />
          </div>
          <div style={{ padding: "15px" }} className="text-lg text-white ">
            {dateFormatYears.format(Date.now())}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
