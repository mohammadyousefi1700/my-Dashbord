import { Models } from "appwrite";
import Pagination from "components/Pagination";
import BaseTable, { TableColumnType } from "components/Table";
import React from "react";
import "../../../../../../index.css";
import { HandleSeparateThreeDigits } from "Func/SeparateThreeDigits";
import { ConvertDatePersian } from "Func/DatePer2";
import { FiltersTypePageSales } from "../../type";
type Props = {
  data: Models.DocumentList<Models.Document> | null;
  filters: FiltersTypePageSales;
  setFilters: React.Dispatch<React.SetStateAction<FiltersTypePageSales>>;
};
function Desktop({ data, filters, setFilters }: Props) {
  const theadTable: TableColumnType<any>[] = [
    {
      title: "ردیف",
      width: "3%",
      key: "rowIndex",
      headerClassName: "justify-center rounded-lg",
      dataClassName: "text-center !font-normal",
      render: ({ currentRowIndex, currentRow }) => (
        <div id={currentRow.length} className={"rounded-lg"}>
          {currentRowIndex + 1}
        </div>
      ),
    },
    {
      title: "نام مشتری",
      width: "3%",
      key: "CustomerName",
      headerClassName: "justify-center",
      dataClassName: "text-center !font-normal",
      render: ({ currentRow }) => {
        return <div className="object-cover">{currentRow?.CustomerName}</div>;
      },
    },
    {
      title: "مبلغ فروش",
      width: "3%",
      key: "price",
      headerClassName: "justify-center",
      dataClassName: "text-center !font-normal",
      render: ({ currentRow }) => {
        return (
          <div key={currentRow.$id}>
            {HandleSeparateThreeDigits(currentRow.totalPrice)}
          </div>
        );
      },
    },
    {
      title: "تاریخ ایجاد",
      width: "3%",
      key: "$createdAt",
      headerClassName: "justify-center",
      dataClassName: "text-center !font-normal",
      render: ({ currentRow }) => {
        return <div>{ConvertDatePersian(currentRow.$createdAt)}</div>;
      },
    },
  ];

  return (
    <div className="px-4 overflow-y-hidden ">
      <BaseTable columns={theadTable} data={data?.documents} />
      <Pagination
        current={filters.total}
        onchange={(currentPage) => {
          setFilters({ ...filters, total: currentPage });
        }}
        total={Number(data?.total || 0) / Number(8)}
      />
    </div>
  );
}

export default Desktop;
