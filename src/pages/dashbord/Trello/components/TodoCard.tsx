import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import { HandleSeparateThreeDigits } from "Func/SeparateThreeDigits";
import { Todo, TypedColumn } from "../types";
import UserSvg from "./userSvg";
import { Link } from "react-router-dom";

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
  console.log("todocart", todo);

  return (
    <div
      className="flex flex-col items-center justify-center px-4 py-2 space-y-1 bg-white rounded-md shadow-xl drop-shadow-sm"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      {/* تغییر Flexbox برای نگه داشتن تصاویر و آیکون در یک ردیف */}
      {/* تصاویر محصولات */}
      <UserSvg />
      {/* اطلاعات محصول */}
      <div className="justify-start w-full max-w-sm ">
        <p className="truncate">
          جمع قیمت فروش: {HandleSeparateThreeDigits(todo.totalPrice)}
        </p>
        <p className="truncate">فروشنده: {todo.seller}</p>
        <p className="truncate">نام خریدار: {todo.CustomerName}</p>
        <p title={todo.customerAddress} className="truncate">
          محل تحویل کالا : {todo.customerAddress}
        </p>
      </div>
      <Link
        className="p-2 text-lg font-semibold text-white bg-red-600 rounded-lg"
        to={`/detail/${todo.$id}`}
      >
        جزئیات سفارش
      </Link>
    </div>
  );
}

export default TodoCard;
