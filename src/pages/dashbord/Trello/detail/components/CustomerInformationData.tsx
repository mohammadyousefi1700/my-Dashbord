import React from "react";
import UserSvg from "../../components/userSvg";
import { CartInfo } from "./type";

function CustomerInformationData(props: CartInfo) {
  const { customerAddress, seller, CustomerName } = props;
  return (
    <div className="flex shadow-xl rounded-lg border-[1px] p-2 w-full bg-slate-100">
      <UserSvg />
      <div className="flex flex-col w-full mt-2 mr-2">
        <span>نام خریدار : {CustomerName}</span>
        <span>آدرس : {customerAddress}</span>
        <span>فروشنده : {seller}</span>
      </div>{" "}
    </div>
  );
}

export default CustomerInformationData;
