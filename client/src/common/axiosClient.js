import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";

  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
