import { Models } from "appwrite";
import ImageAndUploader from "components/ImagesComponent";
import { ConvertDatePersian } from "Func/DatePer2";
import { HandleSeparateThreeDigits } from "Func/SeparateThreeDigits";
import { Pencil, TrashOutline } from "heroicons-react";
import { PropCreatePosts } from "lib/apiOpportunity";
import React from "react";
type Props = {
  sectionRefs: React.MutableRefObject<(HTMLElement | HTMLDivElement | null)[]>;
  index: number;
  items: Models.Document;
  setOpenConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateOpp?: React.Dispatch<React.SetStateAction<PropCreatePosts | null>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Section = ({
  items,
  sectionRefs,
  index,
  setOpenConfirmModal,
  setUpdateOpp,
  setIsOpenModal,
}: Props) => {
  return (
    <section
      ref={(el) => (sectionRefs.current[index] = el)}
      id={`section_Id${index}`}
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
          <span title={items.productName} className={`w-[100px] truncate `}>
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
        <div className="flex justify-center w-full h-5 gap-x-4 ">
          <span
            onClick={() => {
              setOpenConfirmModal(true);
              setUpdateOpp?.({
                $id: items.$id,
                category: items.category,
                images: items.images,
                location: items.location,
                price: items.price,
                productName: items.productName,
                description: items.description,
                categoryId: items.categoryId,
              });
            }}
            className="flex justify-center h-6 px-1 text-center text-red-600 border-2 border-red-600 rounded-lg hover:border-none "
          >
            <TrashOutline className="flex justify-center w-5 h-5 cursor-pointer hover:-mt-2 hover:w-8 hover:h-8 hover:text-red-500" />
          </span>{" "}
          <span
            onClick={() => {
              setUpdateOpp?.({
                $id: items.$id,
                category: items.category,
                images: items.images,
                location: items.location,
                price: items.price,
                productName: items.productName,
                description: items.description,
                categoryId: items.categoryId,
              });
              setIsOpenModal(true);
            }}
            className="flex justify-center h-6 px-1 text-center text-blue-600 border-2 border-blue-600 rounded-lg hover:border-none "
          >
            <Pencil className="flex justify-center w-5 h-5 cursor-pointer hover:-mt-2 hover:w-8 hover:h-8 hover:text-blue-500" />
          </span>
        </div>{" "}
      </div>
    </section>
  );
};

export default Section;
