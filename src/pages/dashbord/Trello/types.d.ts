interface Board {
  columns: Map<TypedColumn, ColumnType>;
}

export enum TypedColumn {
  PaymentAndOrderFinalizationStatus = "Payment and order finalization",
  AwaitingOrderConfirmation = "Awaiting order confirmation",
  OrderConfirmed = "Order confirmed",
  TheOrderWasSent = "The order was sent",
  OrderCompletions = "Order completion",
}

export type Todo = {
  ordersProduct?: {
    description: string;
    price: string;
    images: string;
    productName: string;
    qty: number;
  }[];
  $id: string;
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
