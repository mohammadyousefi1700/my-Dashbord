import Modal from "components/ModalComponent";
import {
  PropCreatePosts,
  PropCreatePostsFormik,
  UpdateOpportunity,
} from "lib/apiOpportunity";
import React, { useEffect, useState } from "react";
import { database } from "appwrite.config";
import { ID } from "appwrite";
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

  // Load the initial image if dataRowUpdate is provided
  useEffect(() => {
    if (dataRowUpdate) {
      setUploadedFile(dataRowUpdate.images as any);
    } else {
      setUploadedFile(null);
    }
  }, [dataRowUpdate]);

  const postNewOpportunity = async (data: PropCreatePosts) => {
    const payload = {
      $id: data.$id || ID.unique(), // Generate a unique ID if needed
      category: data.category,
      categoryId: data.categoryId,
      images: String(uploadedFile),
      location: data.location as string,
      price: data.price?.replace(/,/g, "") as string,
      productName: data.productName as string,
      description: data.description as string,
    };

    try {
      let res;
      if (data.$id) {
        res = await UpdateOpportunity(payload as any);
      } else {
        res = await CreatePost(payload);
      }

      if (res && (res.$createdAt || res.$updatedAt)) {
        onclose();
        toast.success("عملیات با موفقیت انجام شد.");
        if (fetchData) fetchData(); // Fetch new data if necessary
        setUploadedFile(null); // Reset uploaded file state
      }
    } catch (error) {
      console.error("Error posting opportunity:", error);
    }
  };

  const CreatePost = async (data: PropCreatePosts) => {
    return await database.createDocument(
      "65bea692defb4ac174b5",
      "65ca909e17dbfeda3482",
      ID.unique(),
      data
    );
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
              value: dataRowUpdate?.categoryId || "",
            },
            images: dataRowUpdate?.images || ("" as any),
            location: dataRowUpdate?.location || "",
            price: dataRowUpdate?.price || "",
            productName: dataRowUpdate?.productName || "",
            description: dataRowUpdate?.description || "",
            categoryLabel: dataRowUpdate?.category,
            $id: dataRowUpdate?.$id || "", // Ensure to include ID for updates
          }}
          onSubmit={async (values) => {
            await postNewOpportunity({
              productName: values.productName,
              category: values.categoryLabel,
              categoryId: values.category.value, // Use value for the category ID
              description: values.description,
              images: values.images,
              location: values.location,
              price: values.price,
              $id: values.$id,
            });
          }}
        >
          {({ errors, touched }) => (
            <FormModal
              onClose={onclose}
              uploadedFile={uploadedFile}
              setUploadedFile={setUploadedFile} // Pass the setUploadedFile correctly
            />
          )}
        </Formik>
      </div>
    </Modal>
  );
};
