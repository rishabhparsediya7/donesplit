import React, { useEffect, useState } from "react";
import { get } from "../services/apiService";
import bird from "../assets/bird.webp";
import dog from "../assets/dog.webp";
import elephant from "../assets/elephant.webp";
import sheep from "../assets/sheep.webp";
import tiger from "../assets/tiger.webp";
import CustomModalGroup from "./CustomModalGroup";
import { useNavigate } from "react-router-dom";
import friendsbg from "../assets/friendsbg.png";

const AllFriends = ({ handleCreateGroup }) => {
  const iconArray = [bird, dog, elephant, sheep, tiger];
  const [disabledItems, setDisabledItems] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [groupFriends, setGroupFriends] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const fetchAllFriends = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await get(`user/friends/${userId}`);
      setFriends(response.friends);
    } catch (error) {
      if (
        error.response.data.message == "Token expired" &&
        error.response.status == 401
      ) {
        localStorage.clear();
        navigate("/signin");
      } else {
        setError(error.response.data.message);
      }
    }
  };
  const handleAddFriend = async (friend) => {
    const newFriend = {
      _id: friend._id,
      userId: friend.friendId,
      email: friend.friendEmail,
      name: friend.friendName,
      permission: "READ",
    };
    setDisabledItems((prev) => {
      return { ...prev, [friend._id]: true };
    });
    setGroupFriends((prev) => [...prev, newFriend]);
  };
  const handleRemoveFriendFromGroup = (id) => {
    const newGroupFriends = [...groupFriends];
    const created = newGroupFriends.filter((f) => f._id !== id);
    const newDisabled = Array.from(disabledItems).filter((d) => d._id !== id);
    setGroupFriends(created);
    setDisabledItems(newDisabled);
  };
  const toggleModal = (state) => {
    setModalOpen(!state);
  };
  const handleGroups = async () => {
    toggleModal(modalOpen);
  };
  useEffect(() => {
    fetchAllFriends();
  }, []);
  return (
    <div>
      {modalOpen && (
        <CustomModalGroup
          modalOpen={modalOpen}
          toggleModal={toggleModal}
          handleCreateGroup={handleCreateGroup}
          groupFriends={groupFriends}
        />
      )}
      <div className="flex flex-col mx-4">
        {error && (
          <p className="bg-red-100 text-red-400 capitalize rounded-lg p-2 my-2">
            {error}
          </p>
        )}
        <div className="py-2 flex flex-wrap rounded-md text-white space-x-1">
          {groupFriends &&
            groupFriends.map((grFriend) => {
              return (
                <div key={grFriend._id}>
                  <p className="bg-yellow-300 rounded-xl flex flex-row w-fit text-black px-2 capitalize text-base">
                    {grFriend.name}
                    <i
                      className="bi bi-x-circle-fill text-base ml-2"
                      onClick={() => handleRemoveFriendFromGroup(grFriend._id)}
                    ></i>
                  </p>
                </div>
              );
            })}
        </div>
        {groupFriends.length > 0 && (
          <div>
            <button
              onClick={handleGroups}
              className="w-full bg-black text-white rounded-md p-2 uppercase tracking-widest"
            >
              Create Group
            </button>
          </div>
        )}
      </div>
      {friends.length > 0 && (
        <ul className="px-4">
          {friends &&
            friends.map((friend, index) => {
              return (
                <li
                  key={friend._id}
                  className={`flex -z-10 p-2 border-[0.01rem] border-t-0 border-r-0 border-l-0 border-black ${
                    disabledItems[friend._id] ? "opacity-50" : ""
                  }`}
                  onClick={
                    disabledItems[friend._id]
                      ? undefined
                      : () => handleAddFriend(friend)
                  }
                >
                  {friend.name}
                  <div className="h-16 w-16">
                    <img
                      className="h-16 w-16"
                      src={iconArray[index % friends.length]}
                      alt=""
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-lg capitalize">{friend.friendName}</p>
                    <p className="">{friend.friendEmail}</p>
                  </div>
                </li>
              );
            })}
        </ul>
      )}
      {friends.length == 0 && (
        <div className="flex justify-center flex-col">
          <img src={friendsbg} alt="" />
          <h3 className="mx-4 text-center text-xl">
            Add Some friends to start with splitting expenses
          </h3>
        </div>
      )}
    </div>
  );
};

export default AllFriends;
