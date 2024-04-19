import { TypedColumn } from "../types";

export type GetTodosGroupedByColumnTypes = {
  $id?: string;
  $updatedAt?: string;
  categoryStatusOrderRelations: {
    $id: string;
    statusNames: TypedColumn;
  };
  number?: number;
  price?: string;
  productName?: string;
  CustomerName?: string;
  stateProduct?: boolean;
  images: string;
};
