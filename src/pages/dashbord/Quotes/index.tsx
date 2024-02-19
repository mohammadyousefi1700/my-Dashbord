import { ConvertDatePersian } from "Func/DatePer2";
import Button from "components/Button";
import { HandleSeparateThreeDigits } from "components/SeparateThreeDigits";
import BaseTable, { TableColumnType } from "components/Table";
import FetchData from "components/fetchData";
import { GetPostList } from "lib/post";
import React, { useState } from "react";

const theadTable: TableColumnType<any>[] = [
  {
    title: "ردیف",
    width: "3%",
    key: "rowIndex",
    headerClassName: "justify-center",
    dataClassName: "text-center !font-normal",
    render: ({ currentRowIndex, currentRow }) => (
      <div className={currentRow?.$id}>{currentRowIndex + 1}</div>
    ),
  },
  {
    title: "نام کالا",
    width: "3%",
    key: "ProductName",
    headerClassName: "justify-center",
    dataClassName: "text-center !font-normal",
    render: ({ currentRow }) => {
      console.log("currentRow", currentRow);

      return <div>{currentRow?.ProductName}</div>;
    },
  },
  {
    title: "قیمت",
    width: "3%",
    key: "price",
    headerClassName: "justify-center",
    dataClassName: "text-center !font-normal",
    render: ({ currentRow }) => {
      return <div>{HandleSeparateThreeDigits(currentRow.price)}</div>;
    },
  },
  {
    title: "تاریخ ایجاد",
    width: "3%",
    key: "",
    headerClassName: "justify-center",
    dataClassName: "text-center !font-normal",
    render: ({ currentRow }) => {
      // ConvertDatePersian(currentRow.$createdAt.split());

      return <div>{ConvertDatePersian(currentRow.$createdAt)}</div>;
    },
  },
];

function Quotes() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const fetchDataQuotes = async () => {
    const data = await GetPostList();

    return data;
  };
  return (
    <>
      <div className="flex w-full   ">
        <Button
          onClick={() => setIsOpenModal(true)}
          className="p-2 rounded-lg text-lg font-medium bg-red-600 text-white"
        >
          ایجاد فرصت فروش
        </Button>
      </div>
      <FetchData deps={[]} request={fetchDataQuotes}>
        {(data) => {
          return <BaseTable columns={theadTable} data={data?.documents} />;
        }}
      </FetchData>
    </>
  );
}

export default Quotes;
