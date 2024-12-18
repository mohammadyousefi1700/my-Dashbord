interface Board {
  columns: Map<TypedColumn, ColumnType>;
}

export enum TypedColumn {
  AwaitingOrderConfirmation = "Awaiting order confirmation",
  OrderConfirmed = "Order confirmed",
  TheOrderWasSent = "The order was sent",
  OrderCompletions = "Order completion",
}

export type Todo = {
  userIdBuyer: string;
  ordersProduct?: {
    description: string;
    price: string;
    images: string;
    productName: string;
    qty: number;
    location?: string;
    saleProvider?: string;
    CustomerName?: string;
    totalProductId: string;
  }[];
  $id: string;
  customerAddress?: string;
  $updatedAt?: string;
  status: TypedColumn;
  seller?: string;
  CustomerName?: string;
  isProductActive?: boolean;
  totalPrice?: string;
};
export type ColumnType = {
  id: string;
  todos: Todo[];
};
interface Image {
  bucketId: string;
  fileId: string;
}
