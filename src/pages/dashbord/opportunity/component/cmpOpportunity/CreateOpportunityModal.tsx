import Modal from "components/ModalComponent";
import {
  CreatePost,
  PropCreatePosts,
  PropCreatePostsFormik,
  UpdateOpportunity,
} from "lib/apiOpportunity";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import validatePostOpportunity from "../validate";
import FormModal from "./FormModal";
import { toast } from "react-toastify";

export type PropsModal = {
  isShow: boolean;
  onclose: () => void;
  dataRowUpdate: PropCreatePosts | null;
  fetchData?: () => void;
};

export const CreateOpportunityModal = (props: PropsModal) => {
  const { isShow, onclose, dataRowUpdate, fetchData } = props;
  const [uploadedFile, setUploadedFile] = useState<string | ArrayBuffer | null>(
    null
  );

  useEffect(() => {
    if (dataRowUpdate) {
      setUploadedFile(dataRowUpdate.images as any);
    } else {
      setUploadedFile(null);
    }
  }, [dataRowUpdate]);

  const postNewOpportunity = async (data: PropCreatePosts) => {
    const payload = {
      description: data.description,
      location: data.location,
      price: data.price?.replace(/,/g, "") as string,
      images: data.images,
      productName: data.productName,
      category: data.category,
    };

    try {
      let res;
      if (data.$id) {
        res = await UpdateOpportunity(payload, data.$id);
      } else {
        res = await CreatePost(payload);
      }

      if (res && (res.$createdAt || res.$updatedAt)) {
        onclose();
        toast.success("عملیات با موفقیت انجام شد.");
        if (fetchData) setTimeout(() => fetchData(), 1000);
        setUploadedFile(null);
      }
    } catch (error) {
      console.error("Error posting opportunity:", error);
    }
  };

  return (
    <Modal
      onClose={onclose}
      className="md:w-[700px] md:flex-wrap h-96"
      visible={isShow}
    >
      <div>
        <Formik<PropCreatePostsFormik>
          validate={validatePostOpportunity}
          enableReinitialize
          initialValues={{
            category: {
              label: dataRowUpdate?.category || "",
              value: dataRowUpdate?.categoryId?.value || "",
            },
            images: dataRowUpdate?.images || null,
            location: dataRowUpdate?.location || "",
            price: dataRowUpdate?.price || "",
            productName: dataRowUpdate?.productName || "",
            description: dataRowUpdate?.description || "",
            categoryLabel: dataRowUpdate?.category,
            $id: dataRowUpdate?.$id || "",
            categoryId: dataRowUpdate?.categoryId?.value || "",
          }}
          onSubmit={async (values) => {
            await postNewOpportunity({
              productName: values.productName,
              category: values.categoryLabel,
              categoryId: values.category as any,
              description: values.description,
              images: values?.images as any,
              location: values.location,
              price: values.price,
              $id: values.$id,
            });
          }}
        >
          <FormModal
            onClose={onclose}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
          />
        </Formik>
      </div>
    </Modal>
  );
};
