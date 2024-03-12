import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { get } from "../services/apiService";

const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  const [error, setError] = useState("");
  const getUser = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await get(`user/userExists/${userId}`);
    } catch (error) {
      if (
        error.response.status == 404 &&
        error.response.data.message == "User not found"
      ) {
        console.log(error.response.data.message);
        localStorage.clear();
        setError(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  if (!localStorage.getItem("access_token")) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  if (error) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
