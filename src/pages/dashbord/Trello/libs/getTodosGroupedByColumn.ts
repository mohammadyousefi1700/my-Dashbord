import { database } from "appwrite.config";
import { ColumnType, TypedColumn } from "./typeGetTodosGroup";
import { Board } from "../types";

export const getTodosGroupedByColumn = async () => {
  const data = await database.listDocuments(
    "65bea692defb4ac174b5",
    "65bea7a66c63686afbef"
  );
  const todos = data.documents;
  console.log("data", data);

  const columns = todos.reduce((acc, todo) => {
    const ordersProductArray = JSON.parse(todo.ordersProduct);

    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }
    acc.get(todo.status)!.todos.push({
      ordersProduct: ordersProductArray.map((order: any) => ({
        description: order.description,
        price: order.price,
        images: order.images,
        productName: order.productName,
        qty: order.qty,
      })),
      $id: todo.$id,
      $updatedAt: todo.$updatedAt,
      seller: todo.seller,
      // number: todo.number,
      customerAddress: todo.customerAddress,
      totalPrice: todo.totalPrice,
      CustomerName: todo.CustomerName,
      status: todo.status,
    });

    return acc;
  }, new Map<TypedColumn, ColumnType>());

  const columnTypes: TypedColumn[] = [
    TypedColumn.PaymentAndOrderFinalizationStatus,
    TypedColumn.AwaitingOrderConfirmation,
    TypedColumn.OrderConfirmed,
    TypedColumn.TheOrderWasSent,
    TypedColumn.OrderCompletions,
  ];

  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );
  const board: Board = {
    columns: sortedColumns as any,
  };
  return board;
};
