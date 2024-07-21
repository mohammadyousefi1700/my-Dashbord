import { Models } from "appwrite";
import ImageAndUploader from "components/ImagesComponent";
import Pagination from "components/Pagination";
import { ConvertDatePersian } from "Func/DatePer2";
import { HandleSeparateThreeDigits } from "Func/SeparateThreeDigits";
import { useEffect, useRef } from "react";
import { FiltersOpportunityType } from "../../type";
import { PropCreatePosts } from "lib/apiOpportunity";
type Props = {
  data: Models.DocumentList<Models.Document> | null;
  filters: FiltersOpportunityType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersOpportunityType>>;
  setOpenConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateOpp?: React.Dispatch<React.SetStateAction<PropCreatePosts | null>>;
};

function Mobile({
  data,
  filters,
  setFilters,
  setOpenConfirmModal,
  setUpdateOpp,
}: Props) {
  const sectionRefs = useRef<(HTMLDivElement | HTMLElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01 }
    );

    const currentRefs = sectionRefs.current;

    currentRefs.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      currentRefs.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [data]);

  return (
    <div id="scroll" className="w-full pl-4 max-h-[87vh]  overflow-y-scroll">
      <div className="w-full rounded-lg bg-[#cccc] p-2   min-h-[700px]">
        {data?.documents.map((items, index) => {
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
      <Pagination
        className="mr-1"
        current={filters.total}
        onchange={(currentPage) => {
          setFilters({ ...filters, total: currentPage });
        }}
        total={Number(data?.total || 1) / Number(8)}
      />
    </div>
  );
}

export default Mobile;
