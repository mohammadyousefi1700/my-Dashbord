import classNames from "classnames";
import {
  AllHTMLAttributes,
  DetailedHTMLProps,
  useEffect,
  useState,
} from "react";

import { arrowsClassName, boxNumberClassName } from "./classNames";
import NumberBox from "./NumberBox";
import { PropType } from "./type";
import { ArrowLeft, ArrowRight } from "heroicons-react";
// -------------------colors--------------
const darkPurple = "#5F41B2";
const lightPurple = "#C0B8E3";
const gray = "#1e252b73";
const blue = "#4EBABE";
// -------------------end colors--------------

const Pagination = (
  props: PropType &
    DetailedHTMLProps<AllHTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  const {
    boxNumberClassName2,
    arrowsClassName2,
    total,
    current,
    onchange,
    className,
    theme = "purple",
    numberClassName2,
  } = props;

  const [currentPage, setCurrentPage] = useState<number>(current || 1);
  const pageNumbers = Array.from(Array(Math.ceil(total) + 1).keys());

  useEffect(() => {
    if (current && current !== currentPage) {
      setCurrentPage(current || 1);
      onchange(current || 1);
    }
  }, [current, currentPage, onchange]);

  const changePage = (pageNumber: number) => {
    if (total)
      if (pageNumber > 0 && pageNumber - 1 < total) {
        setCurrentPage(pageNumber);
        onchange(pageNumber);
      }
  };

  const handleNumbersBetweenDots = () => {
    if (pageNumbers.length === 1) {
      return [1];
    } else if (pageNumbers[-1] <= 3) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    // agar page===1 bood az 1 ta 3 neshon bede
    else if (currentPage === 1) {
      return pageNumbers.slice(currentPage - 1, currentPage + 3);
      // agar akharin page bood akharin safhe va 2 taye ghablisho neshon bede
    } else if (currentPage === pageNumbers.length - 1) {
      return pageNumbers.slice(currentPage - 2);
      // dar gheire in soorat page ghable va page badi ro neshon bede
    } else {
      return pageNumbers.slice(currentPage - 2, currentPage + 3);
    }
  };

  const parseStartArrowColor = () => {
    if (theme === "purple") {
      if (currentPage === 1) return lightPurple;
      else return darkPurple;
    } else if (theme === "blue") {
      if (currentPage === 1) return gray;
      else return blue;
    }
  };

  const parseEndArrowColor = () => {
    if (theme === "purple") {
      if (currentPage === total) return lightPurple;
      else return darkPurple;
    } else if (theme === "blue") {
      if (current === total) return gray;
      else return blue;
    }
  };

  return (
    <>
      {total >= 1 ? (
        <div
          className={classNames(
            "flex flex-row justify-center mt-[27px] mb-[5rem] pb-3 w-full",
            className
          )}
        >
          <div className={"flex items-center "}>
            <span
              style={{ backgroundColor: `${parseStartArrowColor()}` }}
              className={classNames(
                arrowsClassName2 ? arrowsClassName2 : arrowsClassName
                // `${currentPage === 1 ? 'bg-[#C0B8E3]' : 'bg-[#5F41B2]'}`
              )}
              onClick={() => changePage(currentPage - 1)}
            >
              <ArrowRight className="text-white" />
            </span>
            <div className={"flex flex-row mx-[0.875rem] "}>
              {/*--------------------------start-------------------*/}

              {currentPage >= 4
                ? pageNumbers
                    .slice(1, 2)
                    .map((pageNumber: number, index: number) => (
                      <NumberBox
                        boxNumberClassName2={boxNumberClassName2}
                        key={index}
                        numberClassName2={numberClassName2}
                        pageNumber={pageNumber}
                        currentPage={currentPage}
                        pageChange={() => {
                          changePage(pageNumber);
                        }}
                      />
                    ))
                : null}
              {/*--------------------------dots-------------------*/}
              {currentPage <= 4 ? null : (
                <div
                  className={classNames(
                    boxNumberClassName2
                      ? boxNumberClassName2
                      : boxNumberClassName
                  )}
                >
                  ...
                </div>
              )}
              {/*--------------------------middle-------------------*/}
              {handleNumbersBetweenDots().map(
                (pageNumber: number, index: number) => (
                  <NumberBox
                    boxNumberClassName2={boxNumberClassName2}
                    key={index}
                    numberClassName2={numberClassName2}
                    pageNumber={pageNumber}
                    currentPage={currentPage}
                    pageChange={() => {
                      changePage(pageNumber);
                    }}
                  />
                )
              )}
              {/*--------------------------dots-------------------*/}
              {pageNumbers.length - currentPage <= 4 ? null : (
                <div
                  className={classNames(
                    boxNumberClassName2
                      ? boxNumberClassName2
                      : boxNumberClassName
                  )}
                >
                  ...
                </div>
              )}
              {/*--------------------------end-------------------*/}
              {currentPage >= pageNumbers.length - 3
                ? null
                : pageNumbers
                    .slice(pageNumbers.length - 1)
                    .map((pageNumber: number, index) => (
                      <NumberBox
                        boxNumberClassName2={boxNumberClassName2}
                        numberClassName2={numberClassName2}
                        key={index}
                        pageNumber={pageNumber}
                        currentPage={currentPage}
                        pageChange={() => {
                          changePage(pageNumber);
                        }}
                      />
                    ))}
            </div>

            <span
              style={{ backgroundColor: `${parseEndArrowColor()}` }}
              className={classNames(
                arrowsClassName2 ? arrowsClassName2 : arrowsClassName
                // `${currentPage === total ? 'bg-[#C0B8E3]' : 'bg-[#5F41B2]'}`
              )}
              onClick={() => changePage(currentPage + 1)}
            >
              <ArrowLeft className="text-white" />
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
