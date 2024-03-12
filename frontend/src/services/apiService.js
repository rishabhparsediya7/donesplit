import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  },
});

const handleRequest = async (method, url, data = null) => {
  try {
    const response = await apiService({
      method: method,
      url: `${API_BASE_URL}/${url}`,
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const get = async (url) => {
  return handleRequest("GET", url);
};

export const post = async (url, data) => {
  return handleRequest("POST", url, data);
};

export const put = async (url, data) => {
  return handleRequest("PUT", url, data);
};

export const del = async (url) => {
  return handleRequest("DELETE", url);
};

export const patch = async (url, data) => {
  return handleRequest("PATCH", url, data);
};
