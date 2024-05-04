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

export type ColumnType = {
  id: string;
  todos: Todo[];
};

export type Todo = {
  $id: string;
  $updatedAt?: string;
  status: TypedColumn;
  number?: number;
  price?: string;
  productName?: string;
  CustomerName?: string;
  stateProduct?: boolean;
  images: string;
};

interface Image {
  bucketId: string;
  fileId: string;
}
