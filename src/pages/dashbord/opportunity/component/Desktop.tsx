import { Models } from "appwrite";
import Pagination from "components/Pagination";
import BaseTable, { TableColumnType } from "components/Table";
import React from "react";
import { FiltersOpportunityType } from "./type";
type Props = {
  theadTable: TableColumnType<any>[];
  data: Models.DocumentList<Models.Document> | null;
  filters: FiltersOpportunityType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersOpportunityType>>;
};
function Desktop({ theadTable, data, filters, setFilters }: Props) {
  return (
    <>
      <BaseTable columns={theadTable} data={data?.documents} />
      <Pagination
        current={filters.total}
        onchange={(currentPage) => {
          setFilters({ ...filters, total: currentPage });
        }}
        total={Number(data?.total || 1) / Number(8)}
      />
    </>
  );
}

export default Desktop;
