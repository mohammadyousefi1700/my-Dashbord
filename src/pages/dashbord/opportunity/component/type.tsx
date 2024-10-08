import React from "react";

export type FiltersOpportunityType = {
  productName?: string;
  total?: number;
  fetchData?: () => void;
};

export type setFiltersTypeOpportunity = {
  filters?: FiltersOpportunityType;
  setFilters?: React.Dispatch<React.SetStateAction<FiltersOpportunityType>>;
  setIsCreateOpportunityOpenModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export type PropsImage = {
  uploadedFile: string | ArrayBuffer | null;
  setUploadedFile: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | null>
  >;
  onClose: () => void;
};
