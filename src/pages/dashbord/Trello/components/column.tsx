import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import TodoCard from "./TodoCard";
// import { useModalStore } from "../store/ModalStore";
import { Todo, TypedColumn } from "../types";
import { useBoardStore } from "../store/BoardStore";
import { HandleSeparateThreeDigits } from "Func/SeparateThreeDigits";
// import { GetOrderCategory } from "lib/orderCategory";

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
    [key in TypedColumn]: string;
  } = {
    "درحال ورود اطلاعات": "درحال ورود اطلاعات",
    "پرداخت و نهایی کردن سفارش": "پرداخت و نهایی کردن سفارش",
    "در انتظار تایید سفارش": "در انتظار تایید سفارش",
    "سفارش ارسال شد": "سفارش ارسال شد",
    "تکمیل سفارش": "تکمیل سفارش",
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
