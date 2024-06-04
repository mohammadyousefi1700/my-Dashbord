import FormikErrorMessage from "components/InputCmp/FormikErrorMessage";
import FormikInput from "components/InputCmp/FormikInput";
import Modal from "components/ModalComponent";
import { Form, Formik } from "formik";
import {
  CreatePost,
  PropCreatePosts,
  PropCreatePosts2,
  PropsGetOpp,
  UpdateOpportunity,
} from "lib/apiOpportunity";
import React, { ChangeEvent, useState } from "react";
import FetchCategorySelectOption from "./FetchCategory";
import Button from "components/Button";
import ImageUploader from "components/ImagesComponent";
import validatePostOpportunity from "./validate";

export type PropsModal = {
  isShow: boolean;
  onclose: () => void;
  dataRowUpdate: PropCreatePosts | null;
};

function OpportunityModal(props: PropsModal) {
  const { isShow, onclose, dataRowUpdate } = props;

  const inputClassName = "max-w-[200px] min-w-[150px]";
  const [uploadedFile, setUploadedFile] = useState<string | ArrayBuffer | null>(
    null
  );

  const postNewOpportunity = async (data: PropsGetOpp) => {
    const payload: PropCreatePosts = {
      category: data.category,
      images: String(uploadedFile),
      location: data.location as string,
      price: data.price?.replace(/,/g, "") as string,
      productName: data.productName as string,
      description: data.description,
    };
    CreatePost(payload).then((res) => {
      return res;
    });

    if (data.$id) {
      UpdateOpportunity(payload).then((res) => res);
    }
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedFile(reader.result);
    };
    reader.readAsDataURL(file as any);
  };

  const handleSprate = (event: any) => {
    let number1 = event.replace(/,/g, "");
    let prValue = parseInt(number1, 10).toLocaleString();

    return prValue ? prValue : undefined;
  };

  return (
    <Modal
      onClose={onclose}
      className="md:w-[700px] md:flex-wrap  h-96"
      visible={isShow}
    >
      <div>
        <Formik<PropCreatePosts2>
          validate={validatePostOpportunity}
          enableReinitialize
          initialValues={{
            category:
              {
                label: dataRowUpdate?.category.EntityNameFilter as string,
                value: dataRowUpdate?.category.$id as string,
              } || "",
            images: dataRowUpdate?.images || "",
            location: dataRowUpdate?.location || "",
            price: dataRowUpdate?.price || "",
            productName: dataRowUpdate?.productName || "",
            description: dataRowUpdate?.description || "",
          }}
          onSubmit={async (values) => {
            await postNewOpportunity(values);
          }}
        >
          {({ values, isSubmitting }) => {
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
                  <FetchCategorySelectOption
                    defualtValues={values.category}
                    classNames={inputClassName}
                  />
                </div>

                <div className="mr-12">
                  <ImageUploader
                    handleUploadImage={handleUploadImage}
                    UploadImage={uploadedFile as string}
                  />
                </div>
                <Button
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
                  BtnClassName={
                    " text-white  mt-7 px-6 font-medium text-lg py-2 bg-red-700 rounded-lg "
                  }
                  type="submit"
                >
                  ثبت
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
}

export default OpportunityModal;
