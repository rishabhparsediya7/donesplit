import React, { useEffect, useState } from "react";
import { get } from "../services/apiService";

const CreateExpense = () => {
  const [sharedWith, setSharedWith] = useState([]);
  const [listValues, setListValues] = useState([]);
  const [allFriends, setAllFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setListValues(() =>
      allFriends.filter((f) => {
        return f.friendName.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  };
  const fetchAllFriends = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await get(`user/friends/${userId}`);
      setAllFriends(response.friends);
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
  const handleShareFriend = (s) => {
    const newArray = sharedWith.filter((sw) => sw.friendId === s.friendId);
    if (newArray.length === 0) setSharedWith((prev) => [...prev, s]);
    else return;
  };
  useEffect(() => {
    fetchAllFriends();
  }, []);
  return (
    <div className="w-full">
      <div className="w-full">
        <div className="h-12 m-1 w-12 bg-gray-200 rounded-full">
          <a
            href={`/groups`}
            className="w-full flex justify-center align-middle p-1"
          >
            <i className="bi bi-chevron-left text-3xl text-gray-500 font-bolder"></i>
          </a>
        </div>
      </div>
      <div className="flex flex-col p-2 gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for friends"
          className="border-b-2 text-2xl p-1 border-gray-500 outline-none"
        />
        <ul>
          {searchTerm &&
            listValues.length > 0 &&
            listValues.map((s) => (
              <li
                className="bg-blue-900 text-white rounded-md p-2"
                key={s.friendId}
                onClick={() => handleShareFriend(s)}
              >
                {s.friendName}
              </li>
            ))}
        </ul>
        <div className="flex flex-wrap">
          <div className="bg-blue-900 text-white text-sm rounded-xl px-2 py-1">
            With you and :
          </div>
          {sharedWith &&
            sharedWith.map((s, index) => (
              <div
                className="bg-blue-900 text-white text-sm rounded-xl px-2 py-1"
                key={s.friendId}
              >
                {s.friendName}
              </div>
            ))}
        </div>
      </div>
      <div className="w-full p-4">
        <div className="flex flex-col gap-y-5 px-6 py-10 customshadow">
          <div className="flex justify-center">
            <h1 className="text-3xl mx-auto uppercase tracking-tighter">
              Let's Split Expenses
            </h1>
          </div>
          <div className="flex flex-col">
            <label htmlFor="Description">Description</label>
            <input
              type="text"
              className="border-b-2 text-2xl p-1 border-black outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="Description">Amount ( in Rs.)</label>
            <input
              type="number"
              className="border-b-2 text-2xl p-1 border-black outline-none"
            />
          </div>
          <button className="bg-black rounded-md tracking-wider text-white uppercase p-2">
            Create Expense
          </button>
        </div>
      </div>
      <div className="flex justify-center align-middle">
        <p className="customshadow rounded-md p-3">Paid by you and shared equally</p>
      </div>
    </div>
  );
};

export default CreateExpense;
