import FormikInput from "components/InputCmp/FormikInput";
import Modal from "components/ModalComponent";
import { Formik } from "formik";
import { CreatePost, PropCreatePosts, PropsGetOpp } from "lib/post";
import React, { SetStateAction } from "react";

export type PropsModal = {
  isShow: boolean;
  onclose: () => void;
};

function OpportunityModal(props: PropsModal) {
  const { isShow, onclose } = props;

  const postNewOpportunity = async (data: PropsGetOpp) => {
    const payload: PropCreatePosts = {
      accountIdSales: data.accountIdSales as string,
      category: data.category,
      images: data.images as string,
      location: data.location as string,
      salesPerson: data.salesPerson as string,
      price: data.price as string,
      ProductName: data.ProductName as string,
      description: data.description,
    };
  };

  return (
    <Modal onClose={onclose} visible={isShow}>
      <Formik onSubmit={postNewOpportunity} initialValues={[]}>
        <div>
          <FormikInput name="" />
        </div>
      </Formik>
    </Modal>
  );
}

export default OpportunityModal;
