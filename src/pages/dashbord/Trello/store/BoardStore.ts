import { database } from "appwrite.config";
import { create } from "zustand";
import { getTodosGroupedByColumn } from "../libs/getTodosGroupedByColumn";
import { Board, ColumnType, Todo, TypedColumn } from "../types";
// import { Board, ColumnType, Todo, TypedColumn } from "../types";

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
    console.log(todo.$id, columnId);
    console.log(JSON.stringify(todo.ordersProduct));

    await database.updateDocument(
      "65bea692defb4ac174b5",
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
  },
}));
