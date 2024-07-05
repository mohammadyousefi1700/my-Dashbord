import ImageUploader from "components/ImagesComponent";
import Modal from "components/ModalComponent";
import {
  PropCreatePosts,
  PropCreatePostsFormik,
  UpdateOpportunity,
} from "lib/apiOpportunity";
import React, { useState } from "react";
import { database } from "appwrite.config";
import { ID } from "appwrite";
// import BaseInput from "components/InputCmp/BaseInput";
import Button from "components/Button";
import { Formik, Form } from "formik";
import FormikInput from "components/InputCmp/FormikInput";
import FormikErrorMessage from "components/InputCmp/FormikErrorMessage";
import FormikSelect from "components/optionAndSelect/FormikSelect";
import validatePostOpportunity from "./validate";
import { PropsImage } from "./type";
import FormModal from "./FormModal";

export type PropsModal = {
  isShow: boolean;
  onclose: () => void;
  dataRowUpdate: PropCreatePosts | null;
};

//   const postNewOpportunity = async (data: PropsGetOpp) => {
//     if (data.$id) {
//       const payload: PropCreatePosts2 = {
//         $id: data.$id,
//         category: {
//           $id: data.category.value,
//           EntityNameFilter: data.category.label,
//         },
//         images: String(uploadedFile),
//         location: data.location as string,
//         price: data.price?.replace(/,/g, "") as string,
//         productName: data.productName as string,
//         description: data.description,
//       };
//       UpdateOpportunity(payload).then((res) => res);
//     }
//     console.log("data", data.category);

//     if (!data.$id) {
//       const payload: PropCreatePosts2 = {
//         category: {
//           $id: data.category.value,
//           EntityNameFilter: data.category.label,
//         },
//         images: String(uploadedFile),
//         location: data.location as string,
//         price: data.price?.replace(/,/g, "") as string,
//         productName: data.productName as string,
//         description: data.description,
//       };
//       CreatePost(payload).then((res) => {
//         return res;
//       });
//     }
//   };

// const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files && e.target.files[0];

//   const reader = new FileReader();
//   reader.onloadend = () => {
//     setUploadedFile(reader.result);
//   };
//   reader.readAsDataURL(file as any);
// };
// let hasAlerted = false;

// const handleSprate = (event: any) => {
//   let number1 = event.replace(/,/g, "");

//   let prValue = parseInt(number1, 10).toLocaleString();
//   if (prValue === "NaN") {
//     if (!hasAlerted) {
//       alert("مقدار وارد شده نامعتبر است.");
//       hasAlerted = true;
//     }
//     prValue = "0";
//   }
//   return prValue ? prValue : undefined;

export const CreateOpportunityModal = (props: PropsModal) => {
  const { isShow, onclose, dataRowUpdate } = props;
  const [uploadedFile, setUploadedFile] = useState<string | ArrayBuffer | null>(
    null
  );
  console.log("dataRowUpdate", dataRowUpdate);

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setState((prevValues: any) => ({ ...prevValues, [name]: value }));
  // };

  const postNewOpportunity = async (data: PropCreatePosts) => {
    console.log("dataPost", data);

    if (data.$id) {
      const payload = {
        $id: data.$id,
        category: data.category,
        categoryId: data.categoryId,
        images: String(uploadedFile),
        location: data.location as string,
        price: data.price?.replace(/,/g, "") as string,
        productName: data.productName as string,
        description: data.description as string,
      };
      UpdateOpportunity(payload as any).then((res) => res);
    }

    if (!data.$id) {
      const payload = {
        category: data.category,
        categoryId: data.categoryId,
        images: String(uploadedFile),
        location: data.location as string,
        price: data.price?.replace(/,/g, "") as string,
        productName: data.productName as string,
        description: data.description as string,
      };
      CreatePost(payload).then((res) => {
        return res;
      });
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
      onClose={() => {
        onclose();
      }}
      className="md:w-[700px] md:flex-wrap  h-96"
      visible={isShow}
    >
      <div>
        <Formik<PropCreatePostsFormik>
          validate={validatePostOpportunity}
          enableReinitialize
          initialValues={{
            category:
              {
                label: dataRowUpdate?.category as string,
                value: dataRowUpdate?.categoryId as string,
              } || "",
            images: dataRowUpdate?.images || "",
            location: dataRowUpdate?.location || "",
            price: dataRowUpdate?.price || "",
            productName: dataRowUpdate?.productName || "",
            description: dataRowUpdate?.description || "",
            categoryLabel: dataRowUpdate?.category,
          }}
          onSubmit={async (values) => {
            await postNewOpportunity({
              productName: values.productName,
              category: values.categoryLabel,
              categoryId: values.category as any,
              description: values.description,
              images: values.images,
              location: values.location,
              price: values.price,
              $id: values.$id,
            });
          }}
        >
          <FormModal
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
          />
        </Formik>
      </div>
    </Modal>
  );
};
