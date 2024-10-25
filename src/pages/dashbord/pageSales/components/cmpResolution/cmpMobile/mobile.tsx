import { Models } from "appwrite";
import Pagination from "components/Pagination";
import { useEffect, useRef } from "react";
import Section from "./section";
import { FiltersTypePageSales } from "../../type";
type Props = {
  data: Models.DocumentList<Models.Document> | null;
  filters: FiltersTypePageSales;
  setFilters: React.Dispatch<React.SetStateAction<FiltersTypePageSales>>;
};

function Mobile({ data, filters, setFilters }: Props) {
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
    <div id="scroll" className="w-full pl-4 max-h-[87vh]  ">
      <div className="w-full rounded-lg bg-[#cccc] p-2   min-h-[700px]">
        {data?.documents.map((items, index) => {
          return (
            <Section
              index={index}
              key={items.$id}
              items={items}
              sectionRefs={sectionRefs}
            />
          );
        })}
      </div>
      <Pagination
        numberClassName2="w-6 leading-2 px-2"
        boxNumberClassName2="w-6 leading-2"
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
