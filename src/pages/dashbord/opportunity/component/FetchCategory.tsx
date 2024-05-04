import FetchData from "components/fetchData";
import FormikSelect from "components/optionAndSelect/FormikSelect";
import { GetCategoryOpp } from "lib/category";

type Props = {
  classNames?: string;
  defualtValues?: any;
};

const FetchCategorySelectOption = (props: Props) => {
  const { classNames, defualtValues } = props;
  // const defualtValuesOptionTypeSelectComponent: {
  //   label: string;
  //   value: string;
  // } = {
  //   label: defualtValues?.EntityNameFilter as any,
  //   value: defualtValues?.$id as any,
  // };
  const jls = {
    label: "لپ تاپ",
    value: "65bea9c0f112985182a8",
  };
  const getCategry = async () => {
    const res = await GetCategoryOpp();
    return res;
  };
  return (
    <div className="">
      <FetchData request={getCategry} handleLoading={false} deps={[]}>
        {(data, { loading }) => {
          console.log("data", data);

          return (
            <FormikSelect
              className={classNames}
              label="دسته بندی"
              isLoading={loading}
              options={data as any}
              name="category"
              value={"65bea9555cc39f2f9ba9"}
            />
          );
        }}
      </FetchData>
    </div>
  );
};

export default FetchCategorySelectOption;
