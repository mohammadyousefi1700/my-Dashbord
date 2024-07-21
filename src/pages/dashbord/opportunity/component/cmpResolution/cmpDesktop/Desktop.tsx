import { Models } from "appwrite";
import Pagination from "components/Pagination";
import BaseTable, { TableColumnType } from "components/Table";
import React from "react";
import { FiltersOpportunityType } from "../../type";
import "../../../../../../index.css";
import { Pencil, TrashOutline } from "heroicons-react";
import { PropCreatePosts } from "lib/apiOpportunity";
import ImageAndUploader from "components/ImagesComponent";
import { HandleSeparateThreeDigits } from "Func/SeparateThreeDigits";
import { ConvertDatePersian } from "Func/DatePer2";
type Props = {
  setUpdateOpp: React.Dispatch<React.SetStateAction<PropCreatePosts | null>>;
  data: Models.DocumentList<Models.Document> | null;
  filters: FiltersOpportunityType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersOpportunityType>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
};
function Desktop({
  data,
  filters,
  setFilters,
  setUpdateOpp,
  setIsOpenModal,
  setOpenConfirmModal,
}: Props) {
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
      title: "عکس",
      width: "3%",
      key: "images",
      headerClassName: "justify-center",
      dataClassName: "text-center !font-normal",
      render: ({ currentRow }) => {
        return (
          <ImageAndUploader
            classNameImage="w-10 h-10 object-cover rounded-full"
            isActiveUpload
            UploadImage={currentRow.images}
          />
        );
      },
    },
    {
      title: "نام کالا",
      width: "3%",
      key: "productName",
      headerClassName: "justify-center",
      dataClassName: "text-center !font-normal",
      render: ({ currentRow }) => {
        return <div className="object-cover">{currentRow?.productName}</div>;
      },
    },
    {
      title: "قیمت",
      width: "3%",
      key: "price",
      headerClassName: "justify-center",
      dataClassName: "text-center !font-normal",
      render: ({ currentRow }) => {
        return (
          <div key={currentRow.$id}>
            {HandleSeparateThreeDigits(currentRow.price)}
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
    {
      title: "ویرایش",
      width: "1%",
      key: "edit",
      headerClassName: "justify-center",
      dataClassName: "text-center !font-normal",
      render: ({ currentRow }) => {
        return (
          <div className="flex justify-center w-full">
            <Pencil
              onClick={() => {
                setUpdateOpp({
                  $id: currentRow.$id,
                  category: currentRow.category,
                  images: currentRow.images,
                  location: currentRow.location,
                  price: currentRow.price,
                  productName: currentRow.productName,
                  description: currentRow.description,
                  categoryId: currentRow.categoryId,
                });
                setIsOpenModal(true);
              }}
              className="flex justify-center w-6 h-6 cursor-pointer hover:-mt-2 hover:absolute hover:w-8 hover:h-8 hover:text-blue-500"
            />
          </div>
        );
      },
    },
    {
      title: "حذف کردن",
      width: "1%",
      key: "delete",
      headerClassName: "justify-center",
      dataClassName: "text-center !font-normal",
      render: ({ currentRow }) => {
        return (
          <div
            onClick={() => {
              setOpenConfirmModal(true);
              setUpdateOpp({
                $id: currentRow.$id,
                category: currentRow.category,
                images: currentRow.images,
                location: currentRow.location,
                price: currentRow.price,
                productName: currentRow.productName,
                description: currentRow.description,
                categoryId: currentRow.categoryId,
              });
            }}
            className="flex justify-center w-full"
          >
            <TrashOutline className="flex justify-center w-6 h-6 cursor-pointer hover:-mt-2 hover:absolute hover:w-8 hover:h-8 hover:text-red-500" />
          </div>
        );
      },
    },
  ];

  return (
    <div className="max-h-[80vh] px-4 overflow-y-scroll " id="scroll">
      <BaseTable columns={theadTable} data={data?.documents} />
      <Pagination
        current={filters.total}
        onchange={(currentPage) => {
          setFilters({ ...filters, total: currentPage });
        }}
        total={Number(data?.total || 1) / Number(8)}
      />
    </div>
  );
}

export default Desktop;
