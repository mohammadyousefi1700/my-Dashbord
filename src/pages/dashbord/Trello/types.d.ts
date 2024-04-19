// interface Board {
//   columns: Map<TypedColumn, Column>;
// }

// type TypedColumn = "todo" | "inprogress" | "done";

// interface Column {
//   id: TypedColumn;
//   todos: Todo[];
// }

// interface Todo {
//   $id: string;
//   $createdAt: string;
//   title: string;
//   status: TypedColumn;
//   image: Image;
// }

// interface Image {
//   bucketId: string;
//   fileId: string;
// }

interface Board {
  columns: Map<TypedColumn, Column>;
}
// export enum columnTyped {
//   EnteringInformation = "65e1e9ab9a3bf5378f21",
//   PaymentAndOrderFinalizationStatus = "65e1ed8d3f1bb5c5a460",
//   AwaitingOrderConfirmation = "65e1e9ab9a3bf5378f21",
//   TheOrderWasSent = "65e1ee3b4cbbd9e17155",
//   OrderCompletion = "65e1ee9e4d7612578afd",
// }
export type TypedColumn =
  | "درحال ورود اطلاعات"
  | "پرداخت و نهایی کردن سفارش"
  | "در انتظار تایید سفارش"
  | "سفارش ارسال شد"
  | "تکمیل سفارش";
// | columnTyped.EnteringInformation
// | columnTyped.PaymentAndOrderFinalizationStatus
// | columnTyped.AwaitingOrderConfirmation
// | columnTyped.TheOrderWasSent
// | columnTyped.OrderCompletion;

interface ColumnType {
  id: string;
  todos: Todo[];
}

interface Todo {
  $id: string;
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
}

interface Image {
  bucketId: string;
  fileId: string;
}
