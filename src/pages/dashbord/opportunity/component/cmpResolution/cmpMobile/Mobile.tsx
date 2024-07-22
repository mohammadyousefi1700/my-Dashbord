import { Models } from "appwrite";
import Pagination from "components/Pagination";
import { useEffect, useRef } from "react";
import { FiltersOpportunityType } from "../../type";
import { PropCreatePosts } from "lib/apiOpportunity";
import Section from "./section";
type Props = {
  data: Models.DocumentList<Models.Document> | null;
  filters: FiltersOpportunityType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersOpportunityType>>;
  setOpenConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateOpp?: React.Dispatch<React.SetStateAction<PropCreatePosts | null>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function Mobile({
  data,
  filters,
  setFilters,
  setOpenConfirmModal,
  setUpdateOpp,
  setIsOpenModal,
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
            <Section
              setIsOpenModal={setIsOpenModal}
              setOpenConfirmModal={setOpenConfirmModal}
              setUpdateOpp={setUpdateOpp}
              index={index}
              key={index}
              items={items}
              sectionRefs={sectionRefs}
            />
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
