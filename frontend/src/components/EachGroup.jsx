import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { get } from "../services/apiService";
import EachGroupDetail from "./EachGroupDetail";
import ErrorMessage from "./ErrorMessage";
import Tabs from "./Tabs";

const EachGroup = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState({});
  const fetchGroupDetails = async () => {
    try {
      const response = await get(`groups/${groupId}`);
      setGroup(response.group);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGroupDetails();
  }, []);
  return (
    <div>
      <Navbar />
      <EachGroupDetail group={group} />
      <Tabs />
    </div>
  );
};

export default EachGroup;
