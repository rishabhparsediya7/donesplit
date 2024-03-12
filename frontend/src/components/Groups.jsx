import React, { useEffect, useState } from "react";
import { get } from "../services/apiService";
import Navbar from "./Navbar";
import Tabs from "./Tabs";
import GroupList from "./GroupList";
import ErrorMessage from "./ErrorMessage";
const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState("");
  const fetchAllGroupsForUser = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await get(`groups/user/${userId}`);
      setGroups(response.groups);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchAllGroupsForUser();
  }, []);
  return (
    <div>
      <Navbar />
      {groups && <GroupList groups={groups} />}
      {error && <ErrorMessage error={error} />}
      <Tabs />
    </div>
  );
};

export default Groups;
