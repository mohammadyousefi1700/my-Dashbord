import Button from "components/Button";
import FetchData from "components/fetchData";
import useDocumentTitle from "components/useDocumentTitle/useDocumentTitle";
import { GetOrderId } from "lib/order";
import { useNavigate, useParams } from "react-router-dom";
import CustomerInformationData from "./components/CustomerInformationData";
import OrderDataCart from "./components/OrderDataCart";
import { HandleSeparateThreeDigits } from "Func/SeparateThreeDigits";
import { PrinterOutline } from "heroicons-react";
import { ConvertDatePersian } from "Func/DatePer2";

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
        const dataJson = data && JSON.parse(data.ordersProduct);
        return (
          <div id="scroll" className="h-[calc(100vh - 60px)] ml-7">
            <div className="flex justify-between">
              <Button
                className="mb-5 text-white !bg-red-600 text-lg font-bold  print:hidden"
                onClick={() => navigate(-1)}
              >
                بازگشت
              </Button>
              <Button
                className="!bg-gray-400 mb-5 ml-4 font-sans text-lg text-white print:hidden"
                onClick={() => window.print()}
              >
                <PrinterOutline className="w-10 h-10" />
                چاپ سفارش
              </Button>
            </div>

            <div
              id="scroll"
              className="w-full py-4 px-2 bg-white gap-y-4 rounded-lg  flex flex-col  border-[2px]  "
            >
              <span className="hidden mx-auto font-sans text-xl print:inline">
                صورتحساب فروش
              </span>
              <span className="flex justify-end w-full text-gray-600">
                {data && ConvertDatePersian(data.$createdAt)}
              </span>
              {data && (
                <CustomerInformationData
                  seller={dataJson.map((item: any) => item.saleProvider)}
                  CustomerName={data.CustomerName}
                  customerAddress={data.customerAddress}
                />
              )}
              <span className="text-lg font-bold "> سفارشات :</span>{" "}
              {dataJson &&
                dataJson.map((item: any, index: number) => (
                  <OrderDataCart key={index} {...item} />
                ))}
              <span className="text-2xl font-bold text-violet-700">
                جمع سفارشات:{" "}
                <span className="text-xl text-gray-600">
                  {HandleSeparateThreeDigits(data?.totalPrice)}
                </span>
              </span>
            </div>
          </div>
        );
      }}
    </FetchData>
  );
}

export default Detail;
