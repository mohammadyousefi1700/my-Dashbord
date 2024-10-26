import FetchData from "components/fetchData";
import { useState } from "react";
import useDocumentTitle from "components/useDocumentTitle/useDocumentTitle";
import useMediaQuery from "components/useMediaQuery";
import Desktop from "./components/cmpResolution/cmpDesktop/Desktop";
import Mobile from "./components/cmpResolution/cmpMobile/mobile";
import { GetSalesList } from "lib/listSales";
import { FiltersTypePageSales } from "./components/type";

function Quotes() {
  const initialFilters = {
    productName: "",
    total: 0,
  };
  useDocumentTitle("فروش ها");

  const isMobile = useMediaQuery("(min-width: 690px)");
  const [filters, setFilters] = useState<FiltersTypePageSales>(initialFilters);
  const fetchDataSales = async () => {
    const data = await GetSalesList(filters);
    return data;
  };

  return (
    <>
      <FetchData
        queryKey={[]}
        queryFn={fetchDataSales}
        handleError={true}
        handleLoading={true}
        handleEmptyData={true}
      >
        {(data) => {
          return (
            <>
              {isMobile ? (
                <>
                  <Desktop
                    filters={filters}
                    setFilters={setFilters}
                    data={data}
                  />
                </>
              ) : (
                <Mobile data={data} filters={filters} setFilters={setFilters} />
              )}
            </>
          );
        }}
      </FetchData>
    </>
  );
}

export default Quotes;
