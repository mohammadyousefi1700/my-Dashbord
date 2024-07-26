export type PropType = {
  current?: number;
  total: number;
  onchange: (currentPage: number) => void;
  theme?: "blue" | "purple";
  arrowsClassName2?: string;
  boxNumberClassName2?: string;
  numberClassName2?: string;
};
