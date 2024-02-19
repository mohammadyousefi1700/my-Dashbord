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
  expandRow: (payload?: number[]) => void;
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
  tableProps?: React.DetailedHTMLProps<
    React.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  >;
  defaultExpandedIndexes?: number[];
  tableHeaderProps?: React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement
  >;

  tableDataProps?:
    | React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLTableRowElement>,
        HTMLTableRowElement
      >
    | ((
        payload: RenderPayloadType<T>
      ) => React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLTableRowElement>,
        HTMLTableRowElement
      >);

  tableFooterProps?: React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
  >;

  tableHeaderRowProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  >;
  tableDataRowProps?:
    | React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLTableRowElement>,
        HTMLTableRowElement
      >
    | ((
        payload: RenderPayloadType<T>
      ) => React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLTableRowElement>,
        HTMLTableRowElement
      >);
  tableFooterRowProps?:
    | React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLTableRowElement>,
        HTMLTableRowElement
      >
    | ((
        payload: RenderPayloadType<T>
      ) => React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLTableRowElement>,
        HTMLTableRowElement
      >);
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
  const [sortOrder, setSortOrder] = useState({
    fieldName: "",
    order: "",
  });

  useEffect(() => {
    if (sortValue) setSortOrder(sortValue);
  }, [sortValue]);

  const toggleExpandedIndex = (index: number) =>
    setExpandedIndexes((arr) =>
      arr.includes(index) ? arr.filter((el) => el !== index) : [...arr, index]
    );

  useEffect(() => {
    if (alwaysExpanded && data?.length) {
      setExpandedIndexes(data.map((_, index) => index));
    } else if (
      defaultExpandedIndexes?.length &&
      !isEqual(expandedIndexes, defaultExpandedIndexes)
    ) {
      setExpandedIndexes(defaultExpandedIndexes);
    } else {
      setExpandedIndexes([]);
    }
  }, [alwaysExpanded, defaultExpandedIndexes]);

  const renderRow = (item: T, index: number) => {
    const renderPayload = {
      currentRow: item,
      allRows: data,
      currentRowIndex: index,
      expandedRows: expandedIndexes,
      expandRow: setExpandedIndexes as any,
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
          onClick={() => {
            if (expandOnClickOnRow) {
              toggleExpandedIndex(index);
            }
          }}
          {...rowProps}
        >
          {columns.map((column) => {
            const objValue = get(item, column.key);
            return (
              <td
                key={column.key + index}
                className={classNames(
                  "text-[#5F5F5F] p-4 truncate !overflow-visible",
                  dataProps?.className,
                  column.dataClassName
                )}
              >
                {column?.render
                  ? column?.render(renderPayload)
                  : objValue || "-"}
              </td>
            );
          })}
        </tr>

        {expandedIndexes.includes(index) &&
          (renderExpandedRow
            ? renderExpandedRow(renderPayload, renderRow)
            : null)}
      </Fragment>
    );
  };

  const renderFooter = (item: T, index: number) => {
    const renderPayload = {
      currentRow: item,
      allRows: data,
      currentRowIndex: index,
      expandedRows: expandedIndexes,
      expandRow: setExpandedIndexes as any,
    };

    const rowProps =
      typeof tableDataRowProps === "function"
        ? tableDataRowProps(renderPayload)
        : tableDataRowProps;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    typeof tableFooterRowProps === "function"
      ? tableFooterRowProps(renderPayload)
      : tableFooterRowProps;

    const dataProps =
      typeof tableDataProps === "function"
        ? tableDataProps(renderPayload)
        : tableDataProps;

    return (
      <Fragment key={`data-row-${index}`}>
        <tr {...rowProps}>
          {columns.map((column) => {
            return (
              <td
                key={column.key + index}
                className={classNames(
                  "text-[#5F5F5F] p-4 truncate !overflow-visible",
                  dataProps?.className,
                  tableFooterProps?.className,
                  column.dataClassName
                )}
              >
                {column?.footer ? column?.footer(renderPayload) : null}
              </td>
            );
          })}
        </tr>

        {expandedIndexes.includes(index) &&
          (renderExpandedRow
            ? renderExpandedRow(renderPayload, renderRow)
            : null)}
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
          {columns.length && (
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
                    onSortChange={(newOrder: any) => {
                      setSortOrder({
                        fieldName: col.key,
                        order: newOrder || "",
                      });

                      if (typeof onSortChange === "function") {
                        onSortChange(col.key, newOrder);
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

        {loading ? (
          <tbody>
            <tr>
              <td colSpan={12} className="py-2 text-center">
                <div className="w-full h-[400px] flex items-center justify-center">
                  <HandleLoading />
                </div>
              </td>
            </tr>
          </tbody>
        ) : data?.length ? (
          <>
            <tbody>{data.map(renderRow)}</tbody>
            {hasFooter ? (
              <tfoot className={tfootClassName}>
                {renderFooter(data[0], data.length + 1)}
              </tfoot>
            ) : null}
          </>
        ) : (
          notFoundDom
        )}
      </table>
    </div>
  );
}

BaseTable.defaultProps = {
  notFoundDom: (
    <tbody>
      <tr>
        <td colSpan={12} className="py-8 text-center">
          موردی پیدا نشد
        </td>
      </tr>
    </tbody>
  ),
};

export default BaseTable;
