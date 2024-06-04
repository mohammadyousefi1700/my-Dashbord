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
        onClick={() => setIsCreateOpportunityOpenModal(true)}
        className="p-2 text-lg font-medium text-white bg-red-600 rounded-lg"
      >
        ایجاد فرصت فروش
      </Button>
      <div className="flex my-4">
        <BaseInput
          className="z-5 flex items-center outline-none w-[364px] h-10"
          inputClassName="bg-white flex items-center  border-1 !border-[#E3E3E3] border-anti-flash !rounded-[50px] w-[365px] h-[38px] "
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
      </div>
    </div>
  );
}

export default FiltersOpportunity;
