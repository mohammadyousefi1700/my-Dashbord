import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import Image from "components/ImagesComponent/ImageUploader";
import { HandleSeparateThreeDigits } from "Func/SeparateThreeDigits";
import { Todo, TypedColumn } from "../types";
import { DotsCircleHorizontalOutline, User, UserCircle } from "heroicons-react";

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
      className="flex flex-col items-center justify-center px-4 py-2 space-y-2 bg-white rounded-md shadow-xl drop-shadow-sm"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      {/* تغییر Flexbox برای نگه داشتن تصاویر و آیکون در یک ردیف */}
      {/* تصاویر محصولات */}
      <svg
        className="p-1 bg-yellow-100 shadow-2xl rounded-2xl w-28 h-28"
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 122.88 121.84"
      >
        <defs>
          <style>.cls-1</style>
        </defs>
        <title>male-employee</title>
        <path
          className="cls-1"
          d="M46.39,70.56c-3.15-2.8-5.64-4.82-6.17-10.64h-.34a4.42,4.42,0,0,1-2.23-.58,6.13,6.13,0,0,1-2.46-3c-1.14-2.61-2-9.46.82-11.42l-.53-.36-.06-.76c-.11-1.38-.14-3-.17-4.8-.1-6.44-.23-14.26-5.42-15.82l-2.22-.67,1.46-1.82a84.53,84.53,0,0,1,13-13.17C47,3.6,52.12,1,57.08.23A18,18,0,0,1,71.7,4.32a27.47,27.47,0,0,1,3.92,3.93,16.63,16.63,0,0,1,11.7,6.84,23.76,23.76,0,0,1,3.81,7.69,26.15,26.15,0,0,1,1,8.72,20.93,20.93,0,0,1-6.07,14.13,4.3,4.3,0,0,1,1.89.48c2.16,1.16,2.23,3.67,1.66,5.78-.56,1.75-1.27,3.8-1.94,5.51-.82,2.32-2,2.75-4.32,2.5-.12,5.72-2.77,7.3-6.33,10.66.15,8.62-30.84,7.61-30.65,0Zm-1.61,7.11L54,104.31l4.63-15.63L56.37,86.2c-1.71-2.5-1.12-5.33,2-5.84a21.61,21.61,0,0,1,3.43-.07,18.84,18.84,0,0,1,3.77.14c2.94.65,3.25,3.5,1.78,5.77l-2.27,2.48,4.63,15.63L78.1,77.67c6,5.41,27.21,6.5,33.84,10.2,9.18,5.14,8.93,24.78,10.94,34H0c2-9.11,1.79-28.91,10.94-34,8.15-4.54,27.17-4.19,33.84-10.2Z"
        />
      </svg>

      {/* اطلاعات محصول */}
      <div className="justify-start w-full max-w-sm pt-8">
        <p className="truncate">
          جمع قیمت فروش: {HandleSeparateThreeDigits(todo.totalPrice)}
        </p>
        <p className="truncate">فروشنده: {todo.seller}</p>
        <p className="truncate">نام خریدار: {todo.CustomerName}</p>
      </div>
    </div>
  );
}

export default TodoCard;
