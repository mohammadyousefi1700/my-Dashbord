import classNames from "classnames";
import { get, isEqual } from "lodash";
import React, { Fragment, ReactNode, useEffect, useState } from "react";
import HandleLoading from "components/Loading";
import Th, { SORT_ENUM } from "./Th";

export type RenderPayloadType<T> = {
  currentRow: T;
  allRows?: T[];
  currentRowIndex: number;
  expandedRows: number[];
  expandRow: (payload?: number[] | ((prev: number[]) => number[])) => void;
};

export type OnTableSortChangeType = (
  sortKey: string,
  sortOrder: SORT_ENUM | ""
) => void;

export type TableColumnType<T = any> = {
  key: string;
  title?: ReactNode;
  render?: (renderPayload: RenderPayloadType<T>) => ReactNode;
  footer?: (renderPayload: RenderPayloadType<T>) => ReactNode;
  width?: string;
  dataClassName?: string;
  headerClassName?: string;
  hasSort?: boolean;
};

export type BaseTablePropTypes<T = any> = {
  className?: string;
  loading?: boolean;
  data?: T[];
  hasFooter?: boolean;
  tfootClassName?: string;
  columns: TableColumnType<T>[];
  notFoundDom?: ReactNode;
  expandOnClickOnRow?: boolean;
  tableProps?: React.TableHTMLAttributes<HTMLTableElement>;
  defaultExpandedIndexes?: number[];
  tableHeaderProps?: React.ThHTMLAttributes<HTMLTableHeaderCellElement>;
  tableDataProps?:
    | React.HTMLAttributes<HTMLTableRowElement>
    | ((
        payload: RenderPayloadType<T>
      ) => React.HTMLAttributes<HTMLTableRowElement>);
  tableFooterProps?: React.TdHTMLAttributes<HTMLTableDataCellElement>;
  tableHeaderRowProps?: React.HTMLAttributes<HTMLTableRowElement>;
  tableDataRowProps?:
    | React.HTMLAttributes<HTMLTableRowElement>
    | ((
        payload: RenderPayloadType<T>
      ) => React.HTMLAttributes<HTMLTableRowElement>);
  tableFooterRowProps?:
    | React.HTMLAttributes<HTMLTableRowElement>
    | ((
        payload: RenderPayloadType<T>
      ) => React.HTMLAttributes<HTMLTableRowElement>);
  renderExpandedRow?: (
    payload: RenderPayloadType<T>,
    renderRow: (rowData: T, index: number) => ReactNode
  ) => ReactNode;
  onSortChange?: OnTableSortChangeType;
  sortValue?: {
    fieldName: string;
    order: SORT_ENUM | "";
  };
  alwaysExpanded?: boolean;
};

function BaseTable<T = any>(props: BaseTablePropTypes<T>) {
  const {
    data,
    loading,
    columns,
    sortValue,
    hasFooter = false,
    tableProps,
    notFoundDom,
    onSortChange,
    alwaysExpanded,
    tfootClassName,
    tableDataProps,
    tableFooterProps,
    tableHeaderProps,
    tableDataRowProps,
    renderExpandedRow,
    expandOnClickOnRow,
    tableHeaderRowProps,
    tableFooterRowProps,
    defaultExpandedIndexes,
  } = props;

  const [expandedIndexes, setExpandedIndexes] = useState<number[]>(
    defaultExpandedIndexes || []
  );
  const [sortOrder, setSortOrder] = useState<{
    fieldName: string;
    order: SORT_ENUM | "";
  }>({ fieldName: "", order: "" });

  useEffect(() => {
    if (sortValue) {
      setSortOrder(sortValue);
    }
  }, [sortValue]);

  const toggleExpandedIndex = (index: number) => {
    setExpandedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((el) => el !== index)
        : [...prev, index]
    );
  };

  useEffect(() => {
    const newIndexes =
      alwaysExpanded && data?.length
        ? data.map((_, index) => index)
        : defaultExpandedIndexes || [];
    if (!isEqual(expandedIndexes, newIndexes)) {
      setExpandedIndexes(newIndexes);
    }
  }, [alwaysExpanded, defaultExpandedIndexes, data?.length]); // Render each data row
  const renderRow = (item: T, index: number) => {
    const renderPayload: RenderPayloadType<T> = {
      currentRow: item,
      allRows: data,
      currentRowIndex: index,
      expandedRows: expandedIndexes,
      expandRow: (payload?: number[] | ((prev: number[]) => number[])) => {
        if (typeof payload === "function") {
          setExpandedIndexes((prev) => payload(prev));
        } else if (Array.isArray(payload)) {
          setExpandedIndexes(payload);
        }
      },
    };

    const rowProps =
      typeof tableDataRowProps === "function"
        ? tableDataRowProps(renderPayload)
        : tableDataRowProps;
    const dataProps =
      typeof tableDataProps === "function"
        ? tableDataProps(renderPayload)
        : tableDataProps;

    return (
      <Fragment key={`data-row-${index}`}>
        <tr
          onClick={() => expandOnClickOnRow && toggleExpandedIndex(index)}
          {...rowProps}
        >
          {columns.map((column) => {
            const objValue = get(item, column.key);
            return (
              <td
                key={`${column.key}-${index}`}
                className={classNames(
                  "text-[#5F5F5F] p-4 truncate",
                  dataProps?.className,
                  column.dataClassName
                )}
              >
                {column.render ? column.render(renderPayload) : objValue || "-"}
              </td>
            );
          })}
        </tr>

        {expandedIndexes.includes(index) && renderExpandedRow
          ? renderExpandedRow(renderPayload, renderRow)
          : null}
      </Fragment>
    );
  };

  // Render footer for each row
  const renderFooter = (item: T, index: number) => {
    const renderPayload: RenderPayloadType<T> = {
      currentRow: item,
      allRows: data,
      currentRowIndex: index,
      expandedRows: expandedIndexes,
      expandRow: (payload?: number[] | ((prev: number[]) => number[])) => {
        if (typeof payload === "function") {
          setExpandedIndexes((prev) => payload(prev));
        } else if (Array.isArray(payload)) {
          setExpandedIndexes(payload);
        }
      },
    };

    const rowProps =
      typeof tableFooterRowProps === "function"
        ? tableFooterRowProps(renderPayload)
        : tableFooterRowProps;

    return (
      <Fragment key={`footer-row-${index}`}>
        <tr {...rowProps}>
          {columns.map((column) => (
            <td
              key={`${column.key}-${index}-footer`}
              className={classNames(
                "text-[#5F5F5F] p-4 truncate",
                tableFooterProps?.className,
                column.dataClassName
              )}
            >
              {column.footer ? column.footer(renderPayload) : null}
            </td>
          ))}
        </tr>
      </Fragment>
    );
  };

  return (
    <div className="soft-scrollbar [height:inherit]">
      <table
        {...tableProps}
        className={classNames("w-full text-right", tableProps?.className)}
      >
        <thead>
          {columns.length > 0 && (
            <tr
              {...tableHeaderRowProps}
              className={classNames(
                "bg-[#F3F6F9]",
                tableHeaderRowProps?.className
              )}
            >
              {columns.map((col) => (
                <th
                  key={col.key}
                  {...tableHeaderProps}
                  className={classNames(
                    "p-4 font-medium text-[#292929]",
                    tableHeaderProps?.className
                  )}
                  style={{ width: col.width }}
                >
                  <Th
                    className={col.headerClassName}
                    sortOrder={
                      col.key === sortOrder.fieldName ? sortOrder.order : ""
                    }
                    onSortChange={(newOrder: SORT_ENUM | "") => {
                      const validSortOrder: SORT_ENUM | "" =
                        newOrder === SORT_ENUM.ASC ||
                        newOrder === SORT_ENUM.DESC
                          ? newOrder
                          : "";
                      setSortOrder({
                        fieldName: col.key,
                        order: validSortOrder,
                      });
                      if (typeof onSortChange === "function") {
                        onSortChange(col.key, validSortOrder);
                      }
                    }}
                    hasSort={col.hasSort}
                  >
                    {col.title}
                  </Th>
                </th>
              ))}
            </tr>
          )}
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="py-2 text-center">
                <div className="w-full h-[400px] flex items-center justify-center">
                  <HandleLoading />
                </div>
              </td>
            </tr>
          ) : data?.length ? (
            <>
              {data.map(renderRow)}
              {hasFooter && (
                <tfoot className={tfootClassName}>
                  {renderFooter(data[0], data.length)}
                </tfoot>
              )}
            </>
          ) : (
            notFoundDom
          )}
        </tbody>
      </table>
    </div>
  );
}

BaseTable.defaultProps = {
  notFoundDom: (
    <tbody>
      <tr>
        <td colSpan={999} className="py-2 text-center text-[#292929]">
          هیچ موردی برای نمایش وجود ندارد
        </td>
      </tr>
    </tbody>
  ),
};

export default BaseTable;
