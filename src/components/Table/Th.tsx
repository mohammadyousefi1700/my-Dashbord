import classNames from "classnames";
import React, { ReactNode } from "react";

type Props = {
  hasSort?: boolean;
  children?: ReactNode;
  sortOrder: string;
  className?: string;
  onSortChange?: (sortOrder: SORT_ENUM | "") => void;
};

export enum SORT_ENUM {
  ASC = "ASC",
  DESC = "DESC",
}

function Th({ onSortChange, hasSort, children, sortOrder, className }: Props) {
  const handleClick = () => {
    if (!hasSort || typeof onSortChange !== "function") return;

    if (sortOrder === "") onSortChange(SORT_ENUM.ASC);
    else if (sortOrder === SORT_ENUM.ASC) onSortChange(SORT_ENUM.DESC);
    else onSortChange("");
  };

  return (
    <div
      className={classNames(
        "flex w-full",
        hasSort && "cursor-pointer select-none",
        className
      )}
      onClick={handleClick}
    >
      {children}
      {hasSort && (
        <div
          className={
            "h-[15px] space-y-[-7px] left-0 pb-1 self-start overflow-nowrap bottom-2 mr-2"
          }
        >
          <div
            className={classNames(
              "w-[14px] fill-wild-blue-yonder cursor-pointer",
              sortOrder === SORT_ENUM.ASC && "fill-blue-600 text-blue-600"
            )}
          />
          <div
            className={classNames(
              "w-[14px] fill-wild-blue-yonder cursor-pointer",
              sortOrder === SORT_ENUM.DESC && "fill-blue-600 text-blue-600"
            )}
          />
        </div>
      )}
    </div>
  );
}

export default Th;
