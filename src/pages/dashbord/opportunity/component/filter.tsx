import Button from "components/Button";
import { setFiltersTypeOpportunity } from "./type";
import BaseInput from "components/InputCmp/BaseInput";
import { debounce } from "lodash";
import { Search } from "heroicons-react";

function FiltersOpportunity(props: setFiltersTypeOpportunity) {
  const { filters, setFilters, setIsCreateOpportunityOpenModal } = props;

  return (
    <div className="w-full ">
      <Button
        color="red"
        onClick={() => setIsCreateOpportunityOpenModal(true)}
        className="p-2 text-lg font-medium text-white bg-red-600 rounded-lg"
      >
        ایجاد فرصت فروش
      </Button>
      <div className="flex w-full my-4 gap-x-3">
        <BaseInput
          className="z-5 flex items-center outline-none md:min-w-[400px] sm:min-w-[80px] lg:min-w-[400px] max-w-[364px] h-10"
          inputClassName="bg-white flex items-center  border-1 !border-[#E3E3E3] border-anti-flash !rounded-[50px] md:min-w-[400px] sm:min-w-[80px] lg:min-w-[400px]  max-w-[365px] h-[38px] "
          textClassName="placeholder-gray-disable-text-button outline-none font-medium "
          placeholder="جستجوی نام کالا"
          style={{
            fontSize: "13px",
            fontWeight: "500",
            lineHeight: "32px",
            marginRight: "3px",
          }}
          trailingIcon={(props: any) => {
            return (
              <Search
                color={"#9F9FA0"}
                width={18}
                height={17}
                {...props}
                className={"stroke-[#9F9FA0] stroke-[3px]  "}
              />
            );
          }}
          defaultValue={filters?.productName || undefined}
          onChange={debounce((event) => {
            setFilters?.({
              ...filters,
              productName: event?.target.value,
            });
          }, 1000)}
        />
        <svg
          onClick={() =>
            setFilters?.((state) => ({ ...state, fetchData() {} }))
          }
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className=" w-9 rounded-lg p-1 cursor-pointer  border-2 text-blue-700   border-blue-700 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </div>
    </div>
  );
}

export default FiltersOpportunity;
