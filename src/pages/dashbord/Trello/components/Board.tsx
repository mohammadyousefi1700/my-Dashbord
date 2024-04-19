"use client";

import React, { useEffect } from "react";
import Column from "./column";
import { useBoardStore } from "../store/BoardStore";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { ColumnType } from "../types";

function Board() {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore(
    (state) => [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.updateTodoInDB,
    ]
  );

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      console.log("entries", entries);

      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({
        ...board,
        columns: rearrangedColumns,
      });
    }
    const columns = Array.from(board.columns);
    const startColumnIndex = columns[Number(source.droppableId)];
    const finishColumnIndex = columns[Number(destination.droppableId)];

    const startCol: ColumnType = {
      id: startColumnIndex[0],
      todos: startColumnIndex[1].todos,
    };
    const finishCol: ColumnType = {
      id: finishColumnIndex[0],
      todos: finishColumnIndex[1].todos,
    };

    if (!startCol || !finishCol) return;
    if (source.index === destination.index && startCol === finishCol) return;
    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);
    if (startCol.id === finishCol.id) {
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id as any, newCol);
      setBoardState({ ...board, columns: newColumns });
    } else {
      const finishTodos = Array.from(finishCol.todos);
      finishTodos.splice(destination.index, 0, todoMoved);
      const newColumns = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      newColumns.set(startCol.id as any, newCol);
      newColumns.set(finishCol.id as any, {
        id: finishCol.id,
        todos: finishTodos,
      });
      setBoardState({ ...board, columns: newColumns });
      updateTodoInDB(todoMoved, finishCol.id as any);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 gap-5 mx-auto md:grid-cols-3 max-w-7xl"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => {
              console.log("id", id);
              console.log("column", column);

              return (
                <Column key={id} id={id} todos={column.todos} index={index} />
              );
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
