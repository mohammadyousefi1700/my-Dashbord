import { Models } from "appwrite";
import Image from "components/ImagesComponent/ImageUploader";
import { ConvertDatePersian } from "Func/DatePer2";
import { HandleSeparateThreeDigits } from "Func/SeparateThreeDigits";
import { Pencil, TrashOutline } from "heroicons-react";
import { PropCreatePosts } from "lib/apiOpportunity";
import React from "react";
import { useLoggedInUser } from "utils/AutContext";
type Props = {
  sectionRefs: React.MutableRefObject<(HTMLElement | HTMLDivElement | null)[]>;
  index: number;
  items: Models.Document;
};

const Section = ({ items, sectionRefs, index }: Props) => {
  const { user } = useLoggedInUser();

  return (
    <section
      ref={(el) => (sectionRefs.current[index] = el)}
      id={`section_Id${index}`}
      key={items.$id}
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
      <div className="w-full">
        <div className="flex min-w-[200px] truncate justify-between   ">
          <span title={items.productName} className={`w-[100px] truncate `}>
            نام مشتری : {items.CustomerName}
          </span>
          <span>قیمت : {HandleSeparateThreeDigits(items.totalPrice)}</span>
        </div>{" "}
      </div>
    </section>
  );
};

export default Section;
