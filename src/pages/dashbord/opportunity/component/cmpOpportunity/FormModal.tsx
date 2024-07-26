import FormikErrorMessage from "components/InputCmp/FormikErrorMessage";
import FormikInput from "components/InputCmp/FormikInput";
import FormikSelect from "components/optionAndSelect/FormikSelect";
import { Form, useFormikContext } from "formik";
import React from "react";
import { PropsImage } from "../type";
import { PropCreatePostsFormik } from "lib/apiOpportunity";
import ImageUploader from "components/ImagesComponent";
import Button from "components/Button";
import classNames from "classnames";

let hasAlerted = false;
const divHeight = "h-20";
function FormModal(props: PropsImage) {
  const { setUploadedFile, uploadedFile, onClose } = props;

  const inputClassName = "min-w-[180px] min-w-[150px]";

  const { values, setFieldValue, isSubmitting } =
    useFormikContext<PropCreatePostsFormik>();

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;

      setUploadedFile(result);
      setFieldValue("images", result);
    };

    return reader.readAsDataURL(file as any);
  };

  const handleSprate = (event: any) => {
    let number1 = event.replace(/,/g, "");
    let parsedNumber = parseInt(number1, 10);
    if (isNaN(parsedNumber)) {
      if (!hasAlerted) {
        hasAlerted = true;
        alert("مقدار وارد شده نامعتبر است.");
      }
      return "0";
    }

    let prValue = parsedNumber.toLocaleString();
    return prValue ? prValue : undefined;
  };

  const selectOpDa = [
    { label: "موبایل", value: "65bea9555cc39f2f9ba9" },
    { label: "لپ تاپ", value: "65bea9c0f112985182a8" },
    { label: "لوازم جانبی", value: "65bea9f0d2de7bfa0d34" },
  ];

  const handleClose = () => {
    setUploadedFile(null);
    onClose();
  };

  return (
    <Form>
      <div className="flex flex-row flex-wrap items-center gap-y-5 gap-x-5">
        <div className={divHeight}>
          <FormikInput
            className={inputClassName}
            label={"نام کالا"}
            labelProps={{ variant: "subtitle", required: true }}
            name="productName"
            placeholder="مثلا موبایل"
          />
          <FormikErrorMessage name="productName" />
        </div>
        <div className={divHeight}>
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
        <div className={divHeight}>
          <FormikInput
            label={"توضیحات"}
            className={inputClassName}
            labelProps={{ variant: "subtitle", required: true }}
            name="description"
            placeholder="توضیح راجب کالا"
          />
          <FormikErrorMessage name="description" />
        </div>
        <div className={classNames(divHeight, "mt-8")}>
          <FormikInput
            labelProps={{ variant: "subtitle", required: true }}
            className={inputClassName}
            label={"محل کالا"}
            name="location"
          />
          <FormikErrorMessage name="location" />
        </div>
        <div className={classNames(divHeight, "mt-4")}>
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
            label="دسته بندی"
            name="category"
            options={selectOpDa}
            className={classNames(inputClassName, "")}
          />
          <FormikErrorMessage name="location" />
        </div>

        <div className="h-20 mr-12">
          <ImageUploader
            handleUploadImage={(e) => {
              handleUploadImage(e);
            }}
            UploadImage={uploadedFile}
          />
        </div>
      </div>
      <div className="static flex justify-center mt-5 gap-x-8">
        <Button
          color="gray2"
          onClick={handleClose}
          disabled={isSubmitting}
          className={
            "text-white mt-7 px-6 font-medium text-lg py-2 bg-gray-500 rounded-lg"
          }
          type="button"
        >
          لغو
        </Button>
        <Button
          color="red"
          loading={isSubmitting}
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
            "text-white mt-7 px-6 font-medium text-lg py-2 bg-red-700 rounded-lg"
          }
          type="submit"
        >
          ثبت
        </Button>
      </div>
    </Form>
  );
}

export default FormModal;
