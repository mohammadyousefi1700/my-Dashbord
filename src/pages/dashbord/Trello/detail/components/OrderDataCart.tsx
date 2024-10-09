import React from "react";
import { CartOrder } from "./type";

function OrderDataCart(props: CartOrder) {
  const { images, price, productName, qty } = props;

  console.log("price", price && price?.length - 1);

  return (
    <div className="flex flex-col pt-1">
      <div
        className={`w-full py-2 pr-2 rounded-[3px] ${
          productName && productName?.length - 1 ? "border-b-[1px]" : null
        }  `}
      >
        <img src={images} className="rounded-lg h-14 w-14" alt={productName} />
        <span>نام کالا : {productName}</span>
        <div className="flex items-center text-gray-600">
          <span>{qty}</span>
          <span>X</span>
          <span className="font-mono">
            {new Intl.NumberFormat("fa-IR", {
              style: "decimal",
              currency: "IRR",
            }).format(Number(price))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderDataCart;
