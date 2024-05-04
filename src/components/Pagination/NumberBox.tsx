import parseClassNames from 'classnames'

import {
  boxNumberClassName,
  currentPageClassName,
  numberClassName,
} from './classNames'

const NumberBox = ({
  pageNumber,
  currentPage,
  pageChange,
}: {
  pageNumber: number
  currentPage: number
  pageChange: (newPageNumber: number) => void
}) => {
  return (
    <>
      {pageNumber === 0 ? null : (
        <div
          className={parseClassNames(
            boxNumberClassName,
            `${pageNumber === currentPage ? currentPageClassName : null}`
          )}
        >
          <span
            className={numberClassName}
            onClick={() => pageChange(pageNumber)}
          >
            {pageNumber}
          </span>
        </div>
      )}
    </>
  )
}

export default NumberBox
