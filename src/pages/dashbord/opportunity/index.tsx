import FetchData from "components/fetchData";
import { deletePost, GetPostList, PropCreatePosts } from "lib/apiOpportunity";
import { useState } from "react";
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
                <>
                  <Desktop
                    filters={filters}
                    setFilters={setFilters}
                    data={data}
                    setIsOpenModal={setIsOpenModal}
                    setOpenConfirmModal={setOpenConfirmModal}
                    setUpdateOpp={setUpdateOpp}
                  />
                </>
              ) : (
                <Mobile
                  setIsOpenModal={setIsOpenModal}
                  setOpenConfirmModal={setOpenConfirmModal}
                  setUpdateOpp={setUpdateOpp}
                  data={data}
                  filters={filters}
                  setFilters={setFilters}
                />
              )}
              <CreateOpportunityModal
                fetchData={fetchData}
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
                  deletePost(stateUpdateOpp as any).then((res) => {
                    setOpenConfirmModal(false);
                    if (res) {
                      return fetchData;
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
