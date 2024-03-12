import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      localStorage.clear();
      navigate("/");
    } else {
      window.history.back();
    }
  });
  return <div>Logout</div>;
};

export default Logout;
