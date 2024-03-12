import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const GroupList = ({ groups }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const getPermission = (members) => {
    const userId = localStorage.getItem("userId");
    const prmsn = members.filter((m) => m.userId === userId);
    return prmsn[0].permission;
  };

  const callgroup = (groupId) => {
    navigate(`/group/${groupId}`);
  };
  const getMembers = (members) =>
    members
      .map((m) => m.name.split(" ")[0])
      .sort()
      .join(", ");

  return (
    <div className="w-full p-4">
      <input
        type="search"
        placeholder="Seach in Groups"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 text-xl outline-none border-b-2 border-black"
      />
      <ul className="space-y-1 mt-1">
        {groups.map((g) => {
          const totalMembers = g.members.length;
          return (
            <li
              className="p-2 cursor-pointer flex gap-x-2 rounded-lg border-b-[1px] border-gray-400"
              key={g._id}
              onClick={() => callgroup(g._id)}
            >
              <div className="h-16 w-16 flex">
                <div className="h-16 w-16 bg-red-400 rounded-full flex justify-center align-middle text-4xl">
                  <p className="m-auto">{g.name.charAt(0).toUpperCase()}</p>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-full flex flex-col ">
                  <h1 className="text-2xl font-bold">{g.name}</h1>
                  <div>
                    <p className="italic truncate">{getMembers(g.members)}</p>
                  </div>
                </div>
                <div>
                  <div className="bg-indigo-400 text-center h-fit w-20 text-[12px] text-white rounded-xl p-1">
                    {totalMembers} Members
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GroupList;
