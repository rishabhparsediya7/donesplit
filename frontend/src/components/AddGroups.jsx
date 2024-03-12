import React, { useState } from "react";
import Navbar from "./Navbar";
import Input from "../utils/Input";
import CustomModal from "./CustomModal";
import AllFriends from "./AllFriends";
import { post } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import Tabs from "./Tabs";

const AddGroups = () => {
  const [friend, setFriend] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleCreateGroup = async (groupFriends, name) => {
    try {
      const ownerId = localStorage.getItem("userId");
      const response = await post("groups/create", {
        name: name,
        ownerId: ownerId,
        members: groupFriends,
      });
      console.log(response);
      navigate("/groups");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (e) => {
    setFriend(e.target.value);
  };
  const handleModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <div>
      <Navbar />
      {modalOpen && <CustomModal state={modalOpen} toggleModal={handleModal} />}
      <div>
        <Input
          placeholder={"Search for your friends"}
          type={"text"}
          icon={"bi-search-heart-fill"}
          handler={handleSearch}
          value={friend}
        />
      </div>
      <AllFriends handleCreateGroup={handleCreateGroup} />
      <button
        onClick={handleModal}
        className="w-16 flex justify-center align-middle fixed bottom-16 right-4 h-16 bg-black/40 text-white border-black rounded-full"
      >
        <h1 className="text-6xl">+</h1>
      </button>
      <Tabs />
    </div>
  );
};

export default AddGroups;
