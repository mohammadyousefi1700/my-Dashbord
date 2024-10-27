import FetchData from "components/fetchData";
import Desktop from "./components/cmpResolution/cmpDesktop/Desktop";
import Mobile from "./components/cmpResolution/cmpMobile/mobile";
import useDocumentTitle from "components/useDocumentTitle/useDocumentTitle";
import useMediaQuery from "components/useMediaQuery";
import { useMemo, useState } from "react";
import { FiltersTypePageSales } from "./components/type";
import { GetSalesList } from "lib/listSales";

function Quotes() {
  const initialFilters = {
    productName: "",
    total: 0,
  };
  useDocumentTitle("فروش ها");

  const isMobile = useMediaQuery("(min-width: 690px)");
  const [filters, setFilters] = useState<FiltersTypePageSales>(initialFilters);

  const fetchDataSales = useMemo(() => {
    return async () => {
      const data = await GetSalesList(filters);
      return data;
    };
  }, [filters]);

  return (
    <FetchData
      queryKey={["sales", filters]} // استفاده از یک کلید ثابت به همراه filters
      queryFn={fetchDataSales}
      handleError={true}
      handleLoading={true}
      handleEmptyData={true}
    >
      {(data) => {
        return (
          <>
            {isMobile ? (
              <Desktop
                filters={filters}
                setFilters={setFilters}
                data={data as any}
              />
            ) : (
              <Mobile
                data={data as any}
                filters={filters}
                setFilters={setFilters}
              />
            )}
          </>
        );
      }}
    </FetchData>
  );
}
export default Quotes;
