import { Models } from "appwrite";
import ImageAndUploader from "components/ImagesComponent";
import { ConvertDatePersian } from "Func/DatePer2";
import { HandleSeparateThreeDigits } from "Func/SeparateThreeDigits";
type Props = {
  data: Models.DocumentList<Models.Document> | null;
};

function Mobile({ data }: Props) {
  // const observer=new IntersectionObserver()

  return (
    <div className="w-full pl-4">
      <div className="w-full rounded-lg bg-[#cccc] p-2  overflow-y-scroll  min-h-[700px]">
        {data?.documents.map((items, index) => {
          return (
            <section
              key={index}
              className="w-full px-2 py-2 my-2 bg-white rounded-lg"
            >
              <span className="flex">
                <span className="px-2 border-2 rounded-full border-amber-600">
                  {index + 1}
                </span>
                <span className="flex justify-end w-full text-gray-600">
                  {ConvertDatePersian(items.$createdAt)}
                </span>
              </span>
              <ImageAndUploader
                classNameImage="w-20 h-20 object-cover rounded-full"
                isActiveUpload
                UploadImage={items.images}
              />
              <div className="w-full">
                <div className="flex min-w-[200px] truncate justify-between   ">
                  <span
                    title={items.productName}
                    className={`w-[100px] truncate `}
                  >
                    نام کالا : {items.productName}
                  </span>
                  <span>قیمت : {HandleSeparateThreeDigits(items.price)}</span>
                </div>{" "}
                <span className="max-w-[200px] flex truncate">
                  مکان :
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">
                    {items.location}{" "}
                  </p>
                </span>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Mobile;
