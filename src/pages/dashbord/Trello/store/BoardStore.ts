import { database } from "appwrite.config";
import { create } from "zustand";
import { getTodosGroupedByColumn } from "../libs/getTodosGroupedByColumn";
import { Board, ColumnType, Todo } from "../types";
// import { Board, ColumnType, Todo, TypedColumn } from "../types";
enum TypedColumn {
  AwaitingOrderConfirmation = "Awaiting order confirmation",
  OrderConfirmed = "Order confirmed",
  TheOrderWasSent = "The order was sent",
  OrderCompletions = "Order completion",
}

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
  image: File | null;
  setImage: (image: File | null) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, ColumnType>(),
  },

  image: null,
  searchString: "",
  setSearchString: (searchString) => set({ searchString }),
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),

  setImage: (image: File | null) => set({ image }),
  updateTodoInDB: async (todo, columnId) => {
    try {
      const updatedTodo = await database.updateDocument(
        "671eb933001b19ad2b2b",
        "65bea7a66c63686afbef",
        todo.$id,
        {
          ordersProduct: [JSON.stringify(todo.ordersProduct)],
          CustomerName: todo.CustomerName,
          totalPrice: todo.totalPrice,
          status: columnId,
          seller: todo.seller,
        }
      );

      console.log("Document updated successfully:", updatedTodo);

      const fetchedTodo = await database.getDocument(
        "671eb933001b19ad2b2b",
        "65bea7a66c63686afbef",
        todo.$id
      );

      if (fetchedTodo.status === TypedColumn.OrderCompletions) {
        await database.createDocument(
          "671eb933001b19ad2b2b",
          "65bea8862876af4bba92",
          todo.$id,
          {
            CustomerName: todo.CustomerName,
            ListPurchase: [JSON.stringify(todo.ordersProduct)],
            user_Id: fetchedTodo.userIdBuyer,
            totalPrice: todo.totalPrice,
          }
        );
        await database.deleteDocument(
          "671eb933001b19ad2b2b",
          "65bea7a66c63686afbef",
          todo.$id
        );
      }
    } catch (error) {
      console.error("Error updating document:", error);
    }
  },
}));
