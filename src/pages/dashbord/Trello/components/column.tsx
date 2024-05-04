import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { useBoardStore } from "../store/BoardStore";
import { HandleSeparateThreeDigits } from "Func/SeparateThreeDigits";
import { Todo, TypedColumn } from "../types";

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};

function Column({ id, index, todos }: Props) {
  const [searchString] = useBoardStore((state) => [
    state.searchString,
    // state.setNewTaskType,
  ]);

  const numbersState = !searchString
    ? todos.length
    : todos.filter(
        (todo) =>
          todo.CustomerName ||
          (todo.productName as string).includes(searchString.toLowerCase())
      ).length;

  const idTodoColumnText: {
    [key in
      | TypedColumn.PaymentAndOrderFinalizationStatus
      | TypedColumn.AwaitingOrderConfirmation
      | TypedColumn.OrderConfirmed
      | TypedColumn.TheOrderWasSent
      | TypedColumn.OrderCompletions]: string;
  } = {
    "Payment and order finalization": "پرداخت و نهایی کردن سفارش",
    "Awaiting order confirmation": "در انتظار تایید سفارش",
    "Order confirmed": "تایید سفارش",
    "The order was sent": "سفارش ارسال شد",
    "Order completion": "تکمیل سفارش",
  };

  return (
    <Draggable isDragDisabled={false} draggableId={id} index={index}>
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
                <h2 className="py-2">
                  {idTodoColumnText[id]}
                  <span>
                    {` (
                    ${HandleSeparateThreeDigits(numbersState)}
                 ) `}
                  </span>
                </h2>
                <div className="space-y-2">
                  {todos.map((todo, index) => {
                    // if (
                    //   (searchString && !(todo.productName as string)) ||
                    //   (todo.salesName as string).includes(
                    //     searchString.toLowerCase()
                    //   )
                    // )
                    //   return null;
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
