import { database } from "appwrite.config";
import { Board, ColumnType, TypedColumn } from "../types";

export const getTodosGroupedByColumn = async () => {
  const data = await database.listDocuments(
    "65bea692defb4ac174b5",
    "65bea7a66c63686afbef"
  );
  const todos = data.documents;

  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.categoryStatusOrderRelations?.statusNames)) {
      acc.set(todo.categoryStatusOrderRelations?.statusNames, {
        id: todo.categoryStatusOrderRelations.status,
        todos: [],
      });
    }
    acc.get(todo.categoryStatusOrderRelations.statusNames)!.todos.push({
      $id: todo.$id,
      $updatedAt: todo.$updatedAt,
      productName: todo.productName,
      number: todo.number,
      stateProduct: todo.stateProduct,
      images: todo.images,
      price: todo.price,
      CustomerName: todo.CustomerName,
      categoryStatusOrderRelations: {
        $id: todo.categoryStatusOrderRelations.$id,
        statusNames: todo.categoryStatusOrderRelations.statusNames,
      },
    });

    return acc;
  }, new Map<TypedColumn, ColumnType>());

  const columnTypes: TypedColumn[] = [
    "در انتظار تایید سفارش",
    "سفارش ارسال شد",
    "تکمیل سفارش",
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
    columns: sortedColumns,
  };
  return board;
};
