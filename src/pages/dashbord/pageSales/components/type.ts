import React from "react";

export type FiltersTypePageSales = {
  CustomerName?: string;
  total?: number;
  fetchData?: () => void;
};

export type setFiltersTypePageSales = {
  filters?: FiltersTypePageSales;
  setFilters?: React.Dispatch<React.SetStateAction<FiltersTypePageSales>>;
  setIsCreateOpportunityOpenModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};
