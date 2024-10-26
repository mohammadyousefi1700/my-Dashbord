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
  return (
    <div
      className="flex flex-col items-center justify-center px-4 py-2 space-y-1 bg-white rounded-md shadow-xl drop-shadow-sm"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <UserSvg />
      <div className="flex flex-col justify-start w-full max-w-sm pt-1 pb-1 font-sans text-base text-gray-600 gap-y-2 ">
        <p className="truncate">
          جمع قیمت فروش:{" "}
          <span className="text-gray-900">
            {HandleSeparateThreeDigits(todo.totalPrice)}
          </span>
        </p>
        <p className="truncate">
          فروشنده:{" "}
          <span className="text-gray-900">
            {" "}
            {todo.ordersProduct?.[0]?.saleProvider}
          </span>
        </p>
        <p className="truncate">
          نام خریدار:
          <span className="text-gray-900">{todo.CustomerName}</span>
        </p>
        <p title={todo.customerAddress} className="truncate">
          محل تحویل کالا :
          <span className="text-gray-900">{todo.customerAddress}</span>
        </p>
      </div>

      <Link
        className="p-1 text-lg font-semibold text-white bg-red-600 rounded-lg xl:p-2 lg:p-1 md:p-1"
        to={`order/detail/${todo.$id}`}
      >
        جزئیات سفارش
      </Link>
    </div>
  );
}

export default TodoCard;
