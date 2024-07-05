import { ConvertDatePersian } from "Func/DatePer2";
import { TableColumnType } from "components/Table";
import FetchData from "components/fetchData";
import { deletePost, GetPostList, PropCreatePosts } from "lib/apiOpportunity";
import { useState } from "react";
import { CreateOpportunityModal } from "./component/CreateOpportunityModal";
import { HandleSeparateThreeDigits } from "Func/SeparateThreeDigits";
import { Pencil, TrashOutline } from "heroicons-react";
import useDocumentTitle from "components/useDocumentTitle/useDocumentTitle";
import { FiltersOpportunityType } from "./component/type";
import FiltersOpportunity from "./component/filter";
import ModalOnConfirm from "./component/ModalOnConfirm";
import useMediaQuery from "components/useMediaQuery";
import Desktop from "./component/Desktop";
import Mobile from "./component/Mobile";
import ImageAndUploader from "components/ImagesComponent";

function Quotes() {
  const initialFilters = {
    productName: "",
    $createdAt: String(new Date()),
    total: 1,
  };
  useDocumentTitle("کوت");

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [stateUpdateOpp, setUpdateOpp] = useState<PropCreatePosts | null>(null);
  const isMobile = useMediaQuery("(min-width: 690px)");
  const [filters, setFilters] =
    useState<FiltersOpportunityType>(initialFilters);
  const fetchDataQuotes = async () => {
    const data = await GetPostList(filters);
    return data;
  };

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
      key: "",
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
    <>
      <div className="flex w-full ">
        <FiltersOpportunity
          filters={filters}
          setFilters={setFilters}
          setIsCreateOpportunityOpenModal={setIsOpenModal}
        />
      </div>
      <FetchData
        handleEmptyData={false}
        deps={[filters]}
        request={fetchDataQuotes}
      >
        {(data, { fetchData }) => {
          return (
            <>
              {isMobile ? (
                <Desktop
                  filters={filters}
                  setFilters={setFilters}
                  data={data}
                  theadTable={theadTable}
                />
              ) : (
                <Mobile data={data} />
              )}
              <CreateOpportunityModal
                onclose={() => {
                  setIsOpenModal(false);
                  setUpdateOpp(null);
                }}
                isShow={isOpenModal}
                dataRowUpdate={stateUpdateOpp}
              />
              <ModalOnConfirm
                onReloadTable={fetchData as any}
                onClick={() =>
                  deletePost(stateUpdateOpp as any).then(() =>
                    setOpenConfirmModal(false)
                  )
                }
                text="آیا عملیات حذف آیتم اجرا شود؟"
                onclose={() => setOpenConfirmModal(false)}
                isShow={openConfirmModal}
              />
            </>
          );
        }}
      </FetchData>
    </>
  );
}

export default Quotes;
