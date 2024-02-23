import Modal from "components/ModalComponent";
// import { Formik } from "formik";
// import { CreatePost, PropCreatePosts } from "lib/post";
// import React, { SetStateAction } from "react";

export type PropsModal = {
  isShow: boolean;
  onclose: () => void;
};

function OpportunityModal(props: PropsModal) {
  const { isShow, onclose } = props;

  // const postNewOpportunity = async () => {
  //   const payload: PropCreatePosts = {};
  // };

  return (
    <Modal onClose={onclose} visible={isShow}>
      {/* <Formik onSubmit={} initialValues={}> */}
      <div></div>
      {/* </Formik> */}
    </Modal>
  );
}

export default OpportunityModal;
