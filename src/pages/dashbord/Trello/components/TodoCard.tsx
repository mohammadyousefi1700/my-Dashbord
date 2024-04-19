import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import { TypedColumn, Todo } from "../types";
import Image from "components/ImagesComponent/ImageUploader";
import { HandleSeparateThreeDigits } from "Func/SeparateThreeDigits";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({
  dragHandleProps,
  draggableProps,
  id,
  innerRef,
  todo,
}: Props) {
  return (
    <div
      className="flex flex-col items-center justify-center px-4 py-2 space-y-2 bg-white rounded-md drop-shadow-sm"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      {/* <Image classNames="w-10 h-10 "  uploadedFile={todo.images} /> */}
      <Image uploadedFile={todo.images} classNames="w-20 h-20  rounded-full" />
      <div>
        <p>{todo.productName}</p>
        <p>قیمت: {HandleSeparateThreeDigits(todo.price)}</p>
        <p>تعداد: {todo.number}</p>
        <p>نام خریدار: {todo.CustomerName}</p>
      </div>
    </div>
  );
}

export default TodoCard;
