import React, { useState } from "react";
import ModalForm from "./ModalForm";
import Input from "../utils/Input";

const CustomModalGroup = ({
  modalOpen,
  toggleModal,
  handleCreateGroup,
  groupFriends,
}) => {
  const [groupName, setGroupName] = useState("");
  const caller = () => {
    if (groupName == "") return;
    if (groupName.length <= 0) return;
    handleCreateGroup(groupFriends, groupName);
  };
  return (
    <div className="w-full h-full my-5 absolute top-1/2 left-1/2 customshadow py-4 px-8 transform -translate-x-1/2 -translate-y-1/2 flex justify-start flex-col align-middle rounded-md z-10">
      <div
        className="flex cursor-pointer justify-end"
        onClick={() => toggleModal(modalOpen)}
      >
        <i className="bi bi-x-circle-fill text-3xl absolute -top-2 right-0"></i>
      </div>
      <div className="flex flex-col gap-y-4 w-full">
        <input
          placeholder="Enter the group name"
          className="w-full border-b-2 p-2 text-lg border-black outline-none"
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button
          onClick={caller}
          className="w-full bg-black text-white rounded-md p-2 uppercase tracking-widest"
        >
          Let's do splitting!
        </button>
      </div>
    </div>
  );
};

export default CustomModalGroup;
