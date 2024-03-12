import React from "react";
import ModalForm from "./ModalForm";

const CustomModal = ({ state, toggleModal }) => {
  return (
    <div className="px-2 w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-start flex-col align-middle rounded-md z-10">
      <div
        className="flex cursor-pointer justify-end"
        onClick={() => toggleModal(!state)}
      >
        <i className="bi bi-x-circle-fill text-3xl absolute -top-2 right-0"></i>
      </div>
      <div className="flex">
        {state && <ModalForm toggleModal={toggleModal} />}
      </div>
    </div>
  );
};

export default CustomModal;
