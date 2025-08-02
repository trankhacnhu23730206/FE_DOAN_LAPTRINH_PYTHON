// axiosPrivate.js
import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: "http://localhost:9080",
});

// Tự động thêm token vào header Authorization
axiosPrivate.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosPrivate;
