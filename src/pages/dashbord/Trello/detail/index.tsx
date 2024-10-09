import Button from "components/Button";
import FetchData from "components/fetchData";
import useDocumentTitle from "components/useDocumentTitle/useDocumentTitle";
import { GetOrderId } from "lib/order";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerInformationData from "./components/CustomerInformationData";
import OrderDataCart from "./components/OrderDataCart";
import { CartOrder } from "./components/type";

function Detail() {
  useDocumentTitle("جزئیات سفارش");
  const params = useParams();
  const navigate = useNavigate();
  const fetchData = async () => {
    const data = await GetOrderId(params.id as string);
    return await data;
  };

  return (
    <FetchData request={fetchData} deps={[params.id]}>
      {(data) => {
        const dataJson: CartOrder[] = data && JSON.parse(data.ordersProduct);
        console.log("dataJson", dataJson);

        return (
          <div>
            <Button
              color="textRed"
              className="!bg-red-600 mb-5 text-white"
              onClick={() => navigate(-1)}
            >
              بازگشت
            </Button>

            <div
              id="scroll"
              className="w-full py-4 px-2 bg-white rounded-lg h-[700px]  overflow-y-scroll scroll-m-2 border-[2px]  "
            >
              {data && (
                <CustomerInformationData
                  seller={data.seller}
                  CustomerName={data.CustomerName}
                  customerAddress={data.customerAddress}
                />
              )}
              <span className="text-lg font-bold"> سفارشات :</span>{" "}
              {dataJson && dataJson.map((item) => <OrderDataCart {...item} />)}
            </div>
          </div>
        );
      }}
    </FetchData>
  );
}

export default Detail;
