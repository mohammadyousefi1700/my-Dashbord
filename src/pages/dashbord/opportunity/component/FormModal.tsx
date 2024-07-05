import FormikErrorMessage from "components/InputCmp/FormikErrorMessage";
import FormikInput from "components/InputCmp/FormikInput";
import FormikSelect from "components/optionAndSelect/FormikSelect";
import { Form, useFormikContext } from "formik";
import React from "react";
import { PropsImage } from "./type";
import { PropCreatePostsFormik } from "lib/apiOpportunity";
import ImageUploader from "components/ImagesComponent";

function FormModal(props: PropsImage) {
  const { setUploadedFile, uploadedFile } = props;

  const inputClassName = "min-w-[180px] min-w-[150px]";

  const { values, setFieldValue, isSubmitting } =
    useFormikContext<PropCreatePostsFormik>();

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedFile(reader.result);
    };
    reader.readAsDataURL(file as any);
  };
  let hasAlerted = false;

  const handleSprate = (event: any) => {
    let number1 = event.replace(/,/g, "");

    let prValue = parseInt(number1, 10).toLocaleString();
    if (prValue === "NaN") {
      if (!hasAlerted) {
        alert("مقدار وارد شده نامعتبر است.");
        hasAlerted = true;
      }
      prValue = "0";
    }
    return prValue ? prValue : undefined;
  };

  const selectOpDa = [
    { label: "موبایل", value: "65bea9555cc39f2f9ba9" },
    { label: "لپ تاپ", value: "65bea9c0f112985182a8" },
    { label: "لوازم جانبی", value: "65bea9f0d2de7bfa0d34" },
  ];
  return (
    <Form className="flex flex-row flex-wrap items-center gap-y-5 gap-x-5">
      <div>
        <FormikInput
          className={inputClassName}
          label={"نام کالا"}
          labelProps={{ variant: "subtitle", required: true }}
          name="productName"
          placeholder="مثلا موبایل"
        />
        <FormikErrorMessage name="productName" />
      </div>
      <div>
        <FormikInput
          className={inputClassName}
          textClassName="focus-visible:outline-none"
          labelProps={{ variant: "subtitle", required: true }}
          label="قیمت"
          name="price"
          placeholder="مثال 10,000"
          value={values.price && handleSprate(values.price)}
        />
        <FormikErrorMessage name="price" />
      </div>
      <div>
        <FormikInput
          label={"توضیحات"}
          className={inputClassName}
          labelProps={{ variant: "subtitle", required: true }}
          name="description"
          placeholder="توضیح راجب کالا"
        />
        <FormikErrorMessage name="description" />
      </div>
      <div className="mt-8">
        <FormikInput
          labelProps={{ variant: "subtitle", required: true }}
          className={inputClassName}
          label={"محل کالا"}
          name="location"
        />
        <FormikErrorMessage name="location" />
      </div>
      <div>
        <FormikSelect
          renderValue={() => values.categoryLabel}
          onSelect={async (e) => {
            await setFieldValue(
              "category",
              values.category.value ? "65bea9f0d2de7bfa0d34" : e.value
            );
            await setFieldValue(
              "categoryLabel",
              values.categoryLabel ? values.categoryLabel : e.label
            );
          }}
          value={"65bea9f0d2de7bfa0d34"}
          label="دسته بندی"
          name="category"
          options={selectOpDa}
          className={inputClassName}
          // value={"65bea9c0f112985182a8"}
        />
      </div>

      <div className="mr-12">
        <ImageUploader
          handleUploadImage={handleUploadImage}
          UploadImage={uploadedFile as string}
        />
      </div>
      <button
        // loading={isSubmitting}
        disabled={
          !isSubmitting &&
          values.productName &&
          values.description &&
          values.location &&
          values.price
            ? false
            : true
        }
        className={
          " text-white  mt-7 px-6 font-medium text-lg py-2 bg-red-700 rounded-lg "
        }
        type="submit"
      >
        ثبت
      </button>
    </Form>
  );
}

export default FormModal;
