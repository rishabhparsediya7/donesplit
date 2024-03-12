import React, { useEffect, useState } from "react";
import axios from "axios";
const usePost = ({ query, params }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  console.log(baseUrl);
  if (query == undefined || params == undefined)
    return { data, error, loading };
  useEffect(() => {
    const getResponse = async() => {
      try {
        const response = await axios.post(`${baseUrl}/${query}`, { params });
        if (response.status == 200 || response.status == 201) {
          console.log(response);
          setData(response.data);
          setLoading(false);
        } else {
          setError(response.error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setError(response.error);
      }
      getResponse();
    };
  }, [params]);
  return { data, error, loading };
};

export default usePost;
