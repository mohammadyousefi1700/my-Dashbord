import FetchData from "components/fetchData";
import { deletePost, GetPostList, PropCreatePosts } from "lib/apiOpportunity";
import { useState, useMemo } from "react";
import { CreateOpportunityModal } from "./component/cmpOpportunity/CreateOpportunityModal";
import useDocumentTitle from "components/useDocumentTitle/useDocumentTitle";
import { FiltersOpportunityType } from "./component/type";
import FiltersOpportunity from "./component/filter";
import ModalOnConfirm from "./component/ModalOnConfirm";
import useMediaQuery from "components/useMediaQuery";
import Desktop from "./component/cmpResolution/cmpDesktop/Desktop";
import Mobile from "./component/cmpResolution/cmpMobile/Mobile";

function Quotes() {
  const initialFilters = {
    productName: "",
    total: 0,
  };
  useDocumentTitle("کوت");

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [stateUpdateOpp, setUpdateOpp] = useState<PropCreatePosts | null>(null);
  const isMobile = useMediaQuery("(min-width: 690px)");
  const [filters, setFilters] =
    useState<FiltersOpportunityType>(initialFilters);

  // استفاده از useMemo برای fetchDataQuotes
  const fetchDataQuotes = useMemo(() => {
    return async () => {
      const data = await GetPostList(filters);
      return data;
    };
  }, [filters]);

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
        queryKey={["quotes", filters]} // استفاده از یک کلید ثابت به همراه filters
        queryFn={fetchDataQuotes}
        handleError={true}
        handleLoading={true}
        handleEmptyData={true}
      >
        {(data, { refetch }) => {
          return (
            <>
              {isMobile ? (
                <Desktop
                  filters={filters}
                  setFilters={setFilters}
                  data={data as any}
                  setIsOpenModal={setIsOpenModal}
                  setOpenConfirmModal={setOpenConfirmModal}
                  setUpdateOpp={setUpdateOpp}
                />
              ) : (
                <Mobile
                  setIsOpenModal={setIsOpenModal}
                  setOpenConfirmModal={setOpenConfirmModal}
                  setUpdateOpp={setUpdateOpp}
                  data={data as any}
                  filters={filters}
                  setFilters={setFilters}
                />
              )}
              <CreateOpportunityModal
                fetchData={refetch}
                onclose={() => {
                  setIsOpenModal(false);
                  setUpdateOpp(null);
                }}
                isShow={isOpenModal}
                dataRowUpdate={stateUpdateOpp}
              />
              <ModalOnConfirm
                onReloadTable={refetch}
                onClick={() =>
                  deletePost(stateUpdateOpp as any).then((res) => {
                    setOpenConfirmModal(false);
                    if (res) {
                      setTimeout(() => refetch(), 1000); // اضافه کردن پرانتز به refetch
                    }
                  })
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
