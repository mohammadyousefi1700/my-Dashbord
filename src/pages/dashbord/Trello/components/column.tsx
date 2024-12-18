import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { Todo, TypedColumn } from "../types";

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};

export const idTodoColumnText: {
  [key in
    | TypedColumn.AwaitingOrderConfirmation
    | TypedColumn.OrderConfirmed
    | TypedColumn.TheOrderWasSent
    | TypedColumn.OrderCompletions]: string;
} = {
  "Awaiting order confirmation": "در انتظار تایید سفارش",
  "Order confirmed": "تایید سفارش",
  "The order was sent": "سفارش ارسال شد",
  "Order completion": "تکمیل سفارش",
};

function Column({ id, index, todos }: Props) {
  return (
    <Draggable isDragDisabled={true} draggableId={id} index={index}>
      {(provided) => (
        <div
          className="pb-5"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 pb-14 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                }`}
              >
                <h2 className="py-2">{idTodoColumnText[id]}</h2>
                <div className="space-y-2">
                  {todos.map((todo, index) => {
                    return (
                      <Draggable
                        key={todo.$id}
                        draggableId={todo.$id}
                        index={index}
                      >
                        {(provided) => (
                          <TodoCard
                            todo={todo}
                            dragHandleProps={provided.dragHandleProps}
                            draggableProps={provided.draggableProps}
                            id={id}
                            index={index}
                            innerRef={provided.innerRef}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
