import Modal from "components/ModalComponent";
import React from "react";

type Props = {
  onclose: () => void;
  isShow: boolean;
  onClick: () => void;
  text: string;
  onReloadTable: () => void;
};

function ModalOnConfirm(props: Props) {
  const { isShow, onclose, text, onClick, onReloadTable } = props;
  return (
    <Modal
      onClose={() => {
        onclose();
      }}
      visible={isShow}
    >
      <div className="text-lg font-extrabold ">{text}</div>
      <div className="flex justify-center gap-5 mt-4">
        <button
          className="px-6 font-bold text-[20px] rounded-lg text-white outline-none hover:outline-none p-2 bg-gray-600"
          onClick={() => onclose()}
        >
          لغو
        </button>
        <button
          className="px-6 font-bold text-[20px] rounded-lg text-white p-2 bg-red-600 outline-none hover:outline-none"
          onClick={() => {
            onClick();
            onReloadTable();
          }}
        >
          تایید
        </button>
      </div>
    </Modal>
  );
}

export default ModalOnConfirm;
