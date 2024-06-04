import React from "react";

export type FiltersOpportunityType = {
  productName?: string;
  $createdAt?: string;
  total?: number;
};

export type setFiltersTypeOpportunity = {
  filters?: FiltersOpportunityType;
  setFilters?: React.Dispatch<React.SetStateAction<FiltersOpportunityType>>;
  setIsCreateOpportunityOpenModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};
