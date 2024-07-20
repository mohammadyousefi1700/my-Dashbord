import { Models } from "appwrite";
import Pagination from "components/Pagination";
import BaseTable, { TableColumnType } from "components/Table";
import React from "react";
import { FiltersOpportunityType } from "../type";
import "../../../../../index.css";
type Props = {
  theadTable: TableColumnType<any>[];
  data: Models.DocumentList<Models.Document> | null;
  filters: FiltersOpportunityType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersOpportunityType>>;
};
function Desktop({ theadTable, data, filters, setFilters }: Props) {
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
