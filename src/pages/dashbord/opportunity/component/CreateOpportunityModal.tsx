import FormikErrorMessage from "components/InputCmp/FormikErrorMessage";
import FormikInput from "components/InputCmp/FormikInput";
import Modal from "components/ModalComponent";
import FormikSelect from "components/optionAndSelect/FormikSelect";
import { Form, Formik } from "formik";
import { CreatePost, PropCreatePosts, PropsGetOpp } from "lib/post";
import React, { ChangeEvent, Fragment, SetStateAction, useState } from "react";
import FetchCategorySelectOption from "./FetchCategory";
import Button from "components/Button";
import ImageUploader from "components/ImagesComponent";

export type PropsModal = {
  isShow: boolean;
  onclose: () => void;
};

function OpportunityModal(props: PropsModal) {
  const { isShow, onclose } = props;

  const inputClassName = "max-w-[200px] min-w-[150px]";
  const [uploadedFile, setUploadedFile] = useState<string | ArrayBuffer | null>(
    null
  );
  const postNewOpportunity = async (data: PropsGetOpp) => {
    const payload: PropCreatePosts = {
      category: data.category,
      images: String(uploadedFile),
      location: data.location as string,
      price: data.price as string,
      ProductName: data.ProductName as string,
      description: data.description,
    };
    CreatePost(payload).then((res) => {
      return res;
    });
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedFile(reader.result);
    };
    reader.readAsDataURL(file as any);
  };

  return (
    <Modal
      onClose={onclose}
      className="md:w-[700px] md:flex-wrap  h-96"
      visible={isShow}
    >
      <div>
        <Formik
          initialValues={{
            ProductName: "",
            price: "",
            description: "",
            location: "",
            category: "",
            images: "",
          }}
          onSubmit={async (values) => await postNewOpportunity(values)}
        >
          <Form className="flex flex-row flex-wrap items-center gap-y-5 gap-x-5">
            <div>
              <FormikInput
                className={inputClassName}
                label={"نام کالا"}
                name="ProductName"
                placeholder="مثلا موبایل"
              />
            </div>
            <div>
              <FormikInput
                type="number"
                className={inputClassName}
                textClassName="focus-visible:outline-none"
                label="قیمت"
                name="price"
                placeholder="مثال 10,000"
              />
            </div>
            <div>
              <FormikInput
                label={"توضیحات"}
                className={inputClassName}
                name="description"
                placeholder="توضیح راجب کالا"
              />
            </div>
            <div>
              <FormikInput
                className={inputClassName}
                label={"محل کالا"}
                name="location"
              />
            </div>
            <div>
              <FetchCategorySelectOption classNames={inputClassName} />
            </div>

            <div>
              <ImageUploader
                handleUploadImage={handleUploadImage}
                UploadImage={uploadedFile as string}
              />
            </div>
            <Button
              className={
                " text-white  mt-7 px-6 font-medium text-lg py-2 bg-red-700 rounded-lg "
              }
              type="submit"
            >
              ثبت
            </Button>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
}

export default OpportunityModal;
