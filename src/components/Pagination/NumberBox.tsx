import parseClassNames from "classnames";

import {
  boxNumberClassName,
  currentPageClassName,
  numberClassName,
} from "./classNames";
import { HandleSeparateThreeDigits } from "Func/SeparateThreeDigits";

const NumberBox = ({
  pageNumber,
  currentPage,
  pageChange,
  boxNumberClassName2,
  numberClassName2,
}: {
  pageNumber: number;
  currentPage: number;
  pageChange: (newPageNumber: number) => void;
  boxNumberClassName2?: string;
  numberClassName2?: string;
}) => {
  return (
    <>
      {pageNumber === 0 ? null : (
        <div
          className={parseClassNames(
            boxNumberClassName2 ? boxNumberClassName2 : boxNumberClassName,
            `${pageNumber === currentPage ? currentPageClassName : null}`
          )}
        >
          <span
            className={numberClassName2 ? numberClassName2 : numberClassName}
            onClick={() => pageChange(pageNumber)}
          >
            {HandleSeparateThreeDigits(pageNumber)}
          </span>
        </div>
      )}
    </>
  );
};

export default NumberBox;
