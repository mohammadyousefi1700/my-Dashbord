import React from "react";
import UserSvg from "../../components/userSvg";
import { CartInfo } from "./type";

function CustomerInformationData(props: CartInfo) {
  const { customerAddress, seller, CustomerName } = props;
  return (
    <div className="flex shadow-xl text-base text-gray-600 font-sans rounded-lg border-[1px] p-2 w-full bg-slate-100">
      <UserSvg />
      <div className="flex flex-col w-full mr-2">
        <span>
          نام خریدار :{" "}
          <span className="!text-xl text-gray-800">{CustomerName}</span>
        </span>
        <span>
          آدرس :{" "}
          <span className="!text-xl text-gray-800">{customerAddress}</span>
        </span>
        <span>
          فروشنده : <span className="!text-xl text-gray-800">{seller}</span>
        </span>
      </div>{" "}
    </div>
  );
}

export default CustomerInformationData;
